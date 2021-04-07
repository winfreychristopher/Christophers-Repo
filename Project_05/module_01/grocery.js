const BASE_GROCERIES = [
    { name: 'banana', price: 49 },
    { name: 'tomato', price: 129 },
    { name: 'orange', price: 99 },
    { name: 'pepper', price: 139 },
    { name: 'milk', price: 449 }
  ];


function populateBase () {
    // BASE_GROCERIES.forEach(buildGroceryElement);
    BASE_GROCERIES.forEach(grocery => {
        let newDiv = buildGroceryElement(grocery);
        $('.grocery-list').append(newDiv);
    });
    
}

function buildGroceryElement (grocery) {
    let newElement = `<div class="grocery-item">${grocery.name}: $${grocery.price/100}</div>`;
    return newElement;
}

populateBase();


$('#new-grocery').submit(function(event) {
    event.preventDefault();
    let groceryName = $('#grocery-name').val();
    let groceryPrice = $('#grocery-price').val();
    newItems = { name: groceryName, price: groceryPrice }
    $('.grocery-list').append(buildGroceryElement(newItems));
    $(this).trigger('reset');
});