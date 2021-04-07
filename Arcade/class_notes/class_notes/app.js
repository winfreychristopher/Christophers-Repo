const postUrl = 'http://clever-neumann-583.herokuapp.com'



async function fetchPosts() {
    try {
        const response = await fetch(`${postUrl}/posts`);
        const data = await response.json();    
        return data
    } catch (error) {
        console.error(error);
    }
}

async function renderPosts() {
    const posts =  await fetchPosts();
    console.log(posts);
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
renderPosts();
// function fetchPosts() {
//     fetch(`${postUrl}/posts`).then((repsone) => {
//         return repsone.json();
//     })
//     .then((data)) => {
//         return data;
//     }
// }




