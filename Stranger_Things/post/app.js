const BASE_URL = "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";

let searchKeyword = "";
let posts = null;

async function fetchPosts () {
    try {
        const response = await fetch(`${BASE_URL}/posts`)
        const {data} = await response.json()
        return data.posts
    } catch (error) {
        console.error(error)
    }
}

async function renderPosts (fetch = false) {
    $('.post-container').empty()
    if(fetch){posts = await fetchPosts()}
    console.log(posts);
    posts.filter(post => post.title.toLowerCase().includes(searchKeyword.toLowerCase())).forEach(post => {
        $('.post-container').prepend(createPostHtml(post))
    });
}

function createPostHtml (post) {
    const {author: {username}, createdAt, description, location, price, title, updatedAt, willDeliver, _id } = post

    return $(`
        <div id=${_id} class="post-card">
            <h2 class="post-title">${title}</h2>
            <h3 class="creation-date"> Post Date: ${createdAt}</h3>
            <p class="card-text"> Seller: ${username}</p>
            <p class="card-text"> Description: ${description}</p>
            <p class="card-text price"> Price: ${price}</p>
            <p class="card-text"> Location: ${location}</p>
            <p class="card-text"> Will Deliver: ${willDeliver}</p>
            <p class="card-text"> Last updated: ${updatedAt}</p>
            ${localStorage.getItem('user') === username ? `<button class="delete">Delete</button>` : ""}
            ${localStorage.getItem('user') && localStorage.getItem('user') !== username ? `<button class="message-button">Message User</button>`: ""}
        </div>`).data("post", post)
}

$(document).on("click", '.delete',async function (){
    let post = $(this).closest('.post-card').data('post')
    console.log(post._id)
    try {
        const response = await fetch(`${BASE_URL}/posts/${post._id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
        })
        const data = await response.json()
        console.log(data);
        if(data.success) {
            $(this).closest('.post-card').remove()
        } else {
            $(this).closest('.post-card').append("Delete Failed!!!")
        }
    } catch (error) {
        console.error(error);
    }
}) 

$(document).on('click', '.message-button', function (){
    console.log("hello world")
    $('.message-box').empty()
    $(this).closest('.post-card').append(`    <form class="message-box hidden">
    <div class ="form-container">
        <label><p>Message Body</p></label>
        <input type="text" class="message-description" placeholder="Message...">
        <button type="submit" class="sendmessage-button">Send Message</button>
    </div>
</form>
`)
})

$(document).on('click', '.sendmessage-button',  async function(event){
    event.preventDefault()
    console.log('im working')
    let messageDescription = $('.message-description').val();
    let post = $(this).closest('.post-card').data('post')
    try {
        const response =  await fetch(`${BASE_URL}/posts/${post._id}/messages`, {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
                message: {
                    content: messageDescription
                }
            })
        })
        const data = await response.json()
        console.log(data)
        if(data.success) {
            $('.message-box').empty()
            $('.message-box').html('<p>Message Sent!</p>')
        }
    } catch (error) {
        console.error(error)
    }

})

async function userData () {
    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
        })
        const {data} = await response.json()
        console.log(data.messages)
        return data.messages
    } catch (error) {
        console.error(error)
    }
}

function createMessageHTML (message) {
    const { content, fromUser:{username}, post:{title}} = message

    return $(`<div class="message-card">
                <h2>Response to:${title}</h2>
                <p>From:${username}</p>
                <p>${content}</p>
                </div>`)
}

async function renderMessage () {
    const message = await userData()
    message.forEach(message => {
        $('.messages').prepend(createMessageHTML(message))
    });
}

$('.search-bar').on('keyup', function (){
    searchKeyword = $(this).val()
    renderPosts()
})

async function loggedIn () {
    console.log(localStorage.getItem("authToken") ? "Logged in" : "not logged in")
    if(localStorage.getItem('authToken')) {
        $('.nav-login').text('Logout')
        $('.nav-login').addClass('logout')
    }
}

$('.nav-login').on('click', function(event){
    event.preventDefault()
    console.log('log in button')
    localStorage.clear();
    $(this).removeClass('logout')
    $(this).text('Login')
})
loggedIn()

$('.nav-listings').on('click', function () {
    window.location.href = "../post/index.html"
})
   

$('.nav-home').on('click', function () {
    window.location.href = "../home/index.html"
})

$('.nav-login').on('click', function () {
    if($('.nav-login').text() === "Login"){
    window.location.href = "../login/login.html"
    }
})

renderMessage()
renderPosts(true);