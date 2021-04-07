// const BASE_URL = "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";

$('#userinfo').on('submit', async function loginUsers (event) {
    event.preventDefault();
    let username = $('#loginusername').val();
    let password = $('#loginpassword').val();
    console.log(username, password)
    const user = {
        username: username,
        password: password
    }
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({user})
        })
        const {data} = await response.json();
        console.log(data);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem('user', username);
    } catch (error) {
        console.error(error);
        $('.errormessage').text('Invalid Username or Password');
    } finally{
        window.location.reload()
    }
    })

$('.register-button').on('click', async function registerUsers (event) {
    event.preventDefault();
    let username = $('#loginusername').val();
    let password = $('#loginpassword').val();
    console.log(username, password)
    const user = {
        username: username,
        password: password
    }
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({user})
        })
        const {data} = await response.json();
        console.log(data);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem('user', username);
    } catch (error) {
        console.error(error);
    }
})


