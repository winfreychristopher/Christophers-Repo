const postUrl = 'http://clever-neumann-583.herokuapp.com'

async function fetchPosts() {
    try {
        const response = await fetch(`${postUrl}/posts`, {
            method: 'GET',
            headers: {
                "JWT_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVkMWZiMDJlZTU3MzAwMDRlZWZiODQiLCJpYXQiOjE2MTY3MTY1MzR9.a6P64RdHUofG10bwixi0_TvruwxZhiuv7GHdrHZ04pw"
            }
        });
        const data = await response.json();    
        return data
    } catch (error) {
        const loginContainer = $('#login');
        loginContainer.append(
            `
        <form>
            <div class="form-group">
              <h3>Register</h3>  
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Password">
            </div>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck2">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>`)
    }
}


const postHtml = (post) => {
    return `<div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${post.description}</p>
        <footer class="blockquote-footer">${post.author || ""}</footer>    </div>
    </div>`
}

(async () => {
    const posts = await fetchPosts();
    posts.forEach(post => {
        $('#posts').append(postHtml(post))});
})();
// renderPosts();
