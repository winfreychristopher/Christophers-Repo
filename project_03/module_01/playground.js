$('.card.red h3').text('Abacus Central');
$('.card.blue h3').text('Grenadine Dreams');
$('.card.white h3').html('<code>CODE</code> Central');
$('header h1').text('Hello, World!');
$('body').css('font-family','sans-serif')
        .css('background-color',  '#777');
$('section').css('display', 'flex');
$('.white').css('border', '2px black solid')
            .css('background-color', 'white')
            .css('margin', '10px')
            .css('padding', '5px')
            .css('flex', '1');
$('.red').css('border', '2px black solid')
            .css('background-color', 'red')
            .css('margin', '10px')
            .css('padding', '5px')
            .css('color', 'white')
            .css('flex', '1');
$('.blue').css('border', '2px black solid')
            .css('background-color', 'blue')
            .css('margin', '10px')
            .css('padding', '5px')
            .css('color', 'white')
            .css('flex', '1');
$('code').css('font-size', '1.7em');
$('.lead-cards p').css('font-family', 'cursive');
$('section:nth-of-type(2)').css('transform', 'rotate(30deg) scale(.5)')
                            .css('transition', 'transform 3s ease')                     
$('.deprecated').remove();