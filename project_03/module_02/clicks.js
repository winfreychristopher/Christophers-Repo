$('.one button').click(function () {
    $('.one span').text('Good Job!')
});

$('.two button').click(function () {
    $('.two').slideUp()
});

$('.three button').click(function () {
    let div = $('<p>Some Text</p>')
    $(".three span").append(div)
});

$('.four button').click(function () {
    $('.template-target').html($('template').html())
});

$('.five button').click(function () {
    $('.prepend-target').prepend($( '.five').clone())
});
$('.six button').click(function () {
    $('.six').css('transform', 'rotate(180deg)')
})

$('.seven button').click(function () {
    newButtn = $('<button>').text('CLICK TO DISAPEAR')
    .css('padding', '5px').css('margin','.5px')
    $(newButtn).click(function () {
        let newButtn = $(this)
        $(newButtn).fadeOut()
    })
    $('.seven').append(newButtn)
})