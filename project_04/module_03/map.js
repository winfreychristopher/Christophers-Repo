function onMapClick (event) {
    const appElement = $(this);
    const target = $(event.target);
    const userPressedShiftKey = event.shiftKey;
    const isPin = target.hasClass('pin');
    // console.log( appElement, target, userPressedShiftKey)
    
    if (userPressedShiftKey && isPin) {
        target.remove()
    } else if (!isPin) {
        const pinX = event.offsetX;
        const pinY = event.offsetY;
        const newPin = $('<div></div>')
                        .addClass('pin')
                        .css("top", pinY)               
                        .css("left", pinX);
        $(appElement).append(newPin)
    }
}
$('.app').click(onMapClick)