let red;
let green; 
let blue; 

function updateValues () {
    red = $('#red').val();
    green = $('#green').val();
    blue = $('#blue').val();
}
updateValues();

function updatePage () {
    $(".red-value").text(red);
    $(".green-value").text(green);
    $(".blue-value").text(blue);
    const stringColor = `rgb( ${red}, ${green}, ${blue})`
    $(".preview").css("background-color", stringColor);
}
updatePage();

function updateAll () {
    updateValues();
    updatePage();
}
updateAll();
$('.controls input').on('input', updateAll);