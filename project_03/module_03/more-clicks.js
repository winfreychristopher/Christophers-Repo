$('.task-input button').click(function () {
    const val = $('.task-input input').val();
    if ( val.length > 0 ) {
        $('.task-list').append($('<li>').text(val));
        $('input').val("");
    }
});

$('.decider button').click(function () {
    const statuselement = $('.decider .status')
    statuselement.toggleClass('active')
        if (statuselement.hasClass('active')) {
        statuselement.text("on");
        $('.decider button').text("Turn Off");
        // $('.status').toggleClass('.active')
        $('.decider img').attr('src', 'https://media.giphy.com/media/szmSyB2PnehgY/giphy.gif')
    } else {
        // statuselement.toggleClass('active')
        statuselement.text("off");
        // $('.decider span').removeClass('.active')
        // $('.status').toggleClass('.active')
        $('.decider button').text("Turn On")
        $('.decider img').attr('src', 'https://si.wsj.net/public/resources/images/BN-WB523_1109RO_12S_20171109172506.jpg')
    }
})

$('.cool-kids button').click(function () {
    let backgroundcolor = $(this).css('background-color')
    $('.cool-kids main').css('background-color', backgroundcolor)
})
