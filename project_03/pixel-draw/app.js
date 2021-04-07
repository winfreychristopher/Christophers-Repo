function makeGrid () {
    for ( let index = 0; index < 64; index++) {
        let div = $('<div class="cell"></div>');
        $(".grid").append(div);
    }
}
makeGrid();

function makePalette () {
    const PALETTE = [
        'red',
        'blue',
        'yellow',
        'green',
        'black',
        'white',
        'pink',
        'purple',
        '#7A604E'
    ]
    for (let index = 0; index < PALETTE.length; index++) {
        const nextColor = PALETTE[index];
        const button = $('<button>').css('background-color', nextColor);
        $('.palette').append(button);
    }
    $('.palette button').first().addClass('active');
}
makePalette();

function onPaletteClick () {
    $('.palette button').removeClass('active');
    $(this).addClass('active');
}
    $('.palette button').click(onPaletteClick);

function onGridClick () {
    let backgroundColor = $('.active').css('background-color');
    if( $(this).css('background-color') === backgroundColor) {
       $(this).css('background-color' ,'')
    } else {
        $(this).css('background-color', backgroundColor);
    }
}
$('.grid .cell').click(onGridClick);

function onClearClick () {
    $('.grid .cell').css('background-color', '');
}
$('.controls .clear').click(onClearClick);

function onFillAllClick () {
    let backgroundColor = $('.active').css('background-color');
    $('.grid .cell').css('background-color', backgroundColor);
}
$('.controls .fill-all').click(onFillAllClick);

function onFillEmptyClick () {
    const gridCells = $('.grid .cell');
    const backgroundColor = $('.active').css('background-color');
    for ( let i = 0; i < gridCells.length; i++){
        let nextElement = $(gridCells[i]);
        if (nextElement.css('background-color') === 'rgba(0, 0, 0, 0)') {
            nextElement.css('background-color', backgroundColor);
          }
    }
}
$('.controls .fill-empty').click(onFillEmptyClick)