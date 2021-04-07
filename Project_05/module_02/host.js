const GUEST_LIST = [
    { name: 'Leonard', count: 6},
    { name: 'Sharon', count: 4}
];


function buildGuestCard(guest) {
    return `<div class="guest-card">
    <span>${guest.name}, party of ${guest.count}</span>
    </div>`
}


function renderGuestList() {
    $('.guest-list').empty();
    GUEST_LIST.forEach(guest => {
    $('.guest-list').append(buildGuestCard(guest))    
    });
}


function addGuestToList(event) {
    event.preventDefault();
    let guestName = $('#guest-name').val();
    let guestCount = $('#guest-count').val();
    let newGuest = { name: guestName, count: guestCount}
    $('.guest-form').trigger('reset');
    GUEST_LIST.push(newGuest);
    renderGuestList();
}


function serveNextGuest() {
    GUEST_LIST.shift();
    renderGuestList();
}

$('.guest-form').submit(addGuestToList);

$('#serve').click(serveNextGuest);

renderGuestList();