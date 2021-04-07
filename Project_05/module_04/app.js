const DEFAULT_PREFERENCES = {
    darkMode: true,
    largeFont: false,
    expertMode: true,
  }
  
  let userPreferences;
  
function setPreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
}

function getPreferences() {
    userPreferences = (localStorage.getItem('userPreferences')) ? JSON.parse(localStorage.getItem('userPreferences')) : DEFAULT_PREFERENCES;
    // console.log(userPreferences)
}

function updateInterface() {
    setColorMode();
    setBaseFontSize();
    drawAside();
}

function setColorMode() {
    $('#app').attr('class', userPreferences.darkMode ? "dark" : "light")
}

function setBaseFontSize() {
    $('html').css( 'font-size', userPreferences.largeFont ? "24px" : "16px")
}

function drawAside() {
     $('aside').html(userPreferences.expertMode ? ` 
        <button>ALL USERS</button>
        <button>ALL USERS</button>
        <button>EXPERT USERS</button>
        <button>EXPERT USERS</button>
        <button>ALL USERS</button>
    `:
     `
        <button>ALL USERS</button>
        <button>ALL USERS</button>
        <button>ALL USERS</button>` ) 
}

function populateCustomControls() {
    console.log(userPreferences)
    Object.keys(userPreferences).forEach(element => {
        $(`input[name="${element}"]`).attr('checked', userPreferences[element])
    });
    // $('#dark-mode').attr('checked',  userPreferences.darkMode);
    // $('#large-font').attr('checked', userPreferences.largeFont);
    // $('#expert-mode').attr('checked', userPreferences.expertMode);
}

$('.trigger').click(function () {
$('.custom-controls').toggleClass('open');
});

$('.custom-controls').on('input', 'input', function () {
    userPreferences[$(this).attr("name")] = $(this).is(":checked")
    // console.log( userPreferences[$(this).attr("name")])
    setPreferences();
    updateInterface();
});

getPreferences();
// setPreferences();
populateCustomControls();
updateInterface();
