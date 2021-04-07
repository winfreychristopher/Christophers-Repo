// const BASE_URL = "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";

  $(document).ready( function(){
    // function homepage () {
      localStorage.getItem('authToken') ? $('.form-container').removeClass('hidden') : $('.form-container').addClass('hidden')
    // }
  })



$('.post-box').on("submit", async function(event) {
    console.log(localStorage.getItem('authToken'))
    event.preventDefault();
    let itemName = $('.user-item').val();
    let itemDescription = $('.item-description').val();
    let itemPrice = $('.item-price').val();
    try {
        const response = await fetch(`${BASE_URL}/posts`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
              post: {
                title: itemName,
                description: itemDescription,
                price: `$${itemPrice}`
              }
            })
        })
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error)
    }
})

// homepage();