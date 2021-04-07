function setActive (sectionNumber) {
    $('.left-nav a').removeClass('active');
    $('.content section').removeClass('active');
    const dataSectionSelector = "[data-section=" + sectionNumber + "]";
    // const dataSectionSelector = `[data-section=${sectionNumber}]`
    const dataLinkToSelector = "[data-link-to=" + sectionNumber + "]";
    $(dataSectionSelector).addClass('active');
    $(dataLinkToSelector).addClass('active');
}
$('.left-nav a').click(function () {
    const sectionNumber = $(this).attr('data-link-to');
    setActive(sectionNumber);
});
$(document).ready(function () {
    // any code we write here will execute once the document loads
    const sectionNumber = window.location.hash
    if ( sectionNumber) {
        setActive( sectionNumber.substring(1))
    }
  });