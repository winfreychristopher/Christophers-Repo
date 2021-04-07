const VALUES = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ];

  function draw(valueList) {
    $('.card-list').empty();
    valueList.forEach(value => {
        $('.card-list').append(`<div class="card">${value}</div>`)
    });
}

$('.controls button').click(function () {
    $('.controls .selected').removeClass('selected');
    $(this).addClass('selected');
  });

$('.all').click(function () {
    draw(VALUES);
})

$('.even').click( function () {
    let evenValues = VALUES.filter( (x) => x % 2 === 0);
    draw(evenValues);
 })

$('.odd').click(function () {
    let oddValues = VALUES.filter( (x) => x % 2 === 1);
    draw(oddValues);
})

$('.card-list').on('click', '.card', function () { 
    let newValue = VALUES.indexOf(Number($(this).text()));
    VALUES.splice(newValue, 1);
    $(this).remove();
});


draw(VALUES);