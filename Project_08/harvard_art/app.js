const BASE_URL = 'https://api.harvardartmuseums.org';
const KEY = 'apikey=dd7906e7-a941-4d32-bdf9-866bbf29ac5f'; 

async function fetchObjects() {
    const url = `${ BASE_URL }/object?${ KEY }`;
    onFetchStart();
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
    finally {
        onFetchEnd();
    }
}

async function fetchAllCenturies() {
    const url = `${ BASE_URL }/century?${ KEY }&size=100&sort=temporalorder`;
    if (localStorage.getItem('centuries')) {
        return JSON.parse(localStorage.getItem('centuries'));
    }
    onFetchStart();
    try {
        const response = await fetch(url);
        const data = await response.json();
        const records = data.records;
        localStorage.setItem('centuries', JSON.stringify(records));
        return records;
    } catch (error) {
       console.error(error);      
    }
    finally {
        onFetchEnd();
    }
}

async function fetchAllClassifications() {
 const url = `${ BASE_URL }/classification?${ KEY }&size=100&sort=name`;
    if (localStorage.getItem('classifications')) {
        return JSON.parse(localStorage.getItem('classifications'));
    }
    onFetchStart();
    try {
        const response = await fetch(url);
        const data =  await response.json();
        const records = data.records;
        localStorage.setItem('classifications', JSON.stringify(records));
        return records;
    } catch (error) {
        console.error(error);
    }
    finally{
        onFetchEnd();
    }
} 

async function prefetchCategoryLists() {
    onFetchEnd();
    try {
        const [
        classifications, centuries
        ] = await Promise.all([
        fetchAllClassifications(),
        fetchAllCenturies()
        ]);
        $('.classification-count').text(`(${ classifications.length })`);
        classifications.forEach(classification => {
            $('#select-classification').append(`<option value="${ classification.name }">${ classification.name }</option>`)
        });
        $('.century-count').text(`(${ centuries.length })`);
        centuries.forEach(century => {
            $('#select-century').append(`<option value="${ century.name }">${ century.name }</option>`)
        })
    } catch (error) {
        console.error(error);
    }
    finally{
        onFetchEnd();
    }
}

function buildSearchString() {
    let classificationValue = $('#select-classification').val();
    let centuryValue = $('#select-century').val();
    let inputValue = $('#keywords').val();
    const newUrl = `${ BASE_URL }/object?${ KEY }&classificaion=${ classificationValue }&century=${ centuryValue }&keyword=${ inputValue }`;
    return encodeURI(newUrl);
}

$('#search').on('submit', async function(event) {
    event.preventDefault();
    onFetchStart();
    try {
        const url = buildSearchString();
        const response = await fetch(url);
        const data = await response.json();
        const { info, records} = data;
        updatePreview(records, info);
    } catch (error) {
        console.error(error);
    }
    finally {
        onFetchEnd();
    }
});

function onFetchStart() {
    $('#loading').addClass('active');
}
  
function onFetchEnd() {
    $('#loading').removeClass('active');
}

function renderPreview(record) {
    const {description, primaryimageurl, title} = record;
    return  $(`<div class="object-preview">
    <a href="#">
    ${ title && primaryimageurl ? `<img src="${primaryimageurl}"/>
    <h3>${title}</h3>`: title ?`<h3>${title}</h3>`: description ? `<h3>${description}</h3>`:`<img src="${primaryimageurl}"/>`}
    </a>
    </div>`).data('record', record);
}
  
  
function updatePreview(records, info) {
    const root = $('#preview');
    const results = $('.results');
    results.empty();
    records.forEach(record => {
        results.append(renderPreview(record));
    });
    if (info.next) {
        $('#preview .next ').data("url", info.next);
        $('#preview .next').attr('disabled', false);
    } else {
        $('#preview .next ').data("url", null);
        $('#preview .next').attr('disabled', true);
    }

    if (info.prev) {
        $('#preview .previous').data("url", info.prev);
        $('#preview .previous').attr('disabled', false);
    } else {
        $('#preview .previous').data("url", null);
        $('#preview .previous').attr('disabled', true);
    }
}

$('#preview .next, #preview .previous').on('click', async function () {
    const url = $(this).data("url")
    onFetchStart()
    try {
        const response =  await fetch(url);
        const data = await response.json();
        const {records, info} = data;
        updatePreview( records, info );
    } catch (error) {
        console.error(error);
    }
    finally {
        onFetchEnd();
    }
});

$('#preview').on('click', '.object-preview', function (event) {
    event.preventDefault();
    const data = $(event.target).closest('.object-preview').data('record');
    $('#feature').html(renderFeature(data));
});

$('#feature').on('click', 'a', async function (event) {
    const url = $(this).attr("href");
    if (url.startsWith('mailto')) { return; }
    event.preventDefault();
    onFetchStart();
    try {
        const response = await fetch(url);
        const data = await response.json();
        const {records, info} = data;
        updatePreview(records, info);
    } catch (error) {
        console.error(error)
    }
    finally{
        onFetchEnd();
    }
});

function renderFeature(record) {
    const {  title, dated, description, culture, style, technique, medium, dimensions, people, department, division, contact, creditline, images, primaryimageurl } = record;
    return $(`<div class="object-feature">
    <header>
        <h3>${title}</h3>
        <h4>${dated}</h4>
    </header>
    <section class="facts">
        ${factHTML ("Description", description)}
        ${factHTML ("Culture", culture, 'culture')}
        ${factHTML ("Style", style)}
        ${factHTML ("Technique", technique, "technique")}
        ${factHTML ("Medium", medium, 'medium')}
        ${factHTML ("Dimensions", dimensions)}
        ${people ? people.map((person) => {
            return factHTML('Person', person.displayname, 'person');
            }).join('') : ''}
        ${factHTML ("Department", department)}
        ${factHTML ("Division", division)}
        ${factHTML ('Contact', `<a target="_blank" href="mailto:${ contact }">${ contact }</a>`) }    
        ${factHTML ("Credit", creditline)}
    </section>
    <section class="photos">
        ${ photosHTML(images, primaryimageurl)}
    </section>
    </div>`);
}

function searchURL(searchType, searchString) {
    return `${ BASE_URL }/object?${ KEY }&${ searchType}=${ searchString }`;
}

function factHTML(title, content, searchTerm = null) {
    if (!content) {
        return "";
    }
    if (searchTerm === null) {
        return `<span class="title">${title}</span>
        <span class="content">${content}</span>`
    }
    if (searchTerm) {
        return`<span class="title">${title}</span>
        <span class="content"><a href=${searchURL(searchTerm, content)}>${content}</a></span>`
    }
}

function photosHTML(images, primaryimageurl) {
    if (images && images.length > 0) {
        images.map((element) => {
           return `<img src="${element.baseimageurl}">`;
    });
    }
    if (primaryimageurl) {
        return `<img src="${primaryimageurl}">`;
    } else {
        return "";
    }
}

prefetchCategoryLists();
fetchAllClassifications();
fetchAllCenturies();
