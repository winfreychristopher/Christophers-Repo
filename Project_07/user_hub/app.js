const BASE_URL = 'https://jsonplace-univclone.herokuapp.com';

function fetchUsers () {
  return fetchData(`${BASE_URL}/users`);
}

function renderUser(user) {
  const {name, email, company} = user
  user = `<div class="user-card">
  <header>
    <h2>${name}</h2>
  </header>
  <section class="company-info">
    <p><b>Contact:</b> ${email}</p>
    <p><b>Works for:</b> ${company.name}</p>
    <p><b>Company creed:</b> "${company.catchPhrase}"</p>
  </section>
  <footer>
    <button class="load-posts">POSTS BY ${name}</button>
    <button class="load-albums">ALBUMS BY ${name}</button>
  </footer>
  </div>`
  return user
}

function renderUserList(userList) {
  $('#user-list').empty()
  userList.forEach(user => {
    $('#user-list').append(renderUser(user));
    $('.user-card').last().data('user', user);
  });
}


$('#user-list').on('click', '.user-card .load-posts', function () {
  // load posts for this user
  // render posts for this user
 let user = $(this).closest('.user-card').data('user');
 fetchUserPosts(user.id).then(renderPostList);
});


$('#user-list').on('click', '.user-card .load-albums', function () {
  // load albums for this user
  // render albums for this user
 let user = $(this).closest('.user-card').data('user');
 fetchUserAlbumList(user.id).then(renderAlbumList);
});

/* get an album list, or an array of albums */
function fetchUserAlbumList(userId) {
  return fetchData(`${ BASE_URL }/users/${userId}/albums?_expand=user&_embed=photos`);
}

fetchUserAlbumList(1).then(function (albumList) {
  console.log(albumList);
});

function fetchData(url) {
  return fetch(url).then((response) => {
    return response.json();
  }).catch((err) => {
    console.error(err);
  })
}


/* render a single album */
function renderAlbum(album) {
  const {title, photos} = album
  let template = `<div class="album-card">
  <header>
    <h3>${title}, by ${album.user.name} </h3>
  </header>
  <section class="photo-list">
  </section>
</div>`

photos.forEach(photo => {
  $('.photo-list').append(renderPhoto(photo));
});
return template
}

/* render a single photo */
function renderPhoto(photo) {
  const {thumbnailUrl, url, title} = photo
   let template = `<div class="photo-card">
  <a href="${thumbnailUrl}" target="_blank">
    <img src="${url}" width= "150" height= "150">  
    <figure>${title}</figure>
  </a>
  </div>`
  return template
}

/* render an array of albums */
function renderAlbumList(albumList) {
  $('#app section.active').removeClass('active');
  $('#album-list').addClass('active');
  $('#album-list').empty();

  albumList.forEach(album => {
    $('#album-list').append(renderAlbum(album));
  })
}

function fetchUserPosts(userId) {
  return fetchData(`${ BASE_URL }/users/${ userId }/posts?_expand=user`);
}

function fetchPostComments(postId) {
  return fetchData(`${ BASE_URL }/posts/${ postId }/comments`);
}




function setCommentsOnPost(post) {
  // post.comments might be undefined, or an []
  fetchData(`${BASE_URL}/comments`)
  if(post.comments) {
    return Promise.reject(null)
  }
  // if undefined, fetch them then set the result
  return fetchPostComments(post.id)
    .then((comments) =>{
      post.comments = comments;
      return post
    });
  // if defined, return a rejected promise
}

function renderPost(post) {
  const { title, user, body} = post
  let template = `<div class="post-card">
  <header>
    <h3>${title}</h3>
    <h3>--- ${user.name}</h3>
  </header>
  <p>${body}</p>
  <footer>
    <div class="comment-list"></div>
    <a href="#" class="toggle-comments">(<span class="verb">show</span> comments)</a>
  </footer>
</div>`
return template
}

function renderPostList(postList) {
  $('#app section.active').removeClass('active');
  $('#post-list').empty();
  $('#post-list').addClass('active');

  postList.forEach((post) => {
    $('#post-list').append(renderPost(post));
    $('.post-card').last().data('post', post);
  })
}


function toggleComments(postCardElement) {
  const footerElement = postCardElement.find('footer');

  if (footerElement.hasClass('comments-open')) {
    footerElement.removeClass('comments-open');
    footerElement.find('.verb').text('show');
  } else {
    footerElement.addClass('comments-open');
    footerElement.find('.verb').text('hide');
  }
}

$('#post-list').on('click', '.post-card .toggle-comments', function () {
  const postCardElement = $(this).closest('.post-card');
  const post = postCardElement.data('post');

  setCommentsOnPost(post)
    .then(function (post) {
      console.log('building comments for the first time...', post);
      const commentItems = postCardElement.find('.comment-list');
      commentItems.empty();
      post.comments.forEach((comment) => {
        commentItems.append(`<h3> ${comment.body}--${comment.email}</h3>`);
        toggleComments(postCardElement);
      });
    })
    .catch(function () {
      console.log('comments previously existed, only toggling...', post);
      toggleComments(postCardElement);
    });
});


fetchUserPosts(1).then(console.log);

fetchPostComments(1).then(console.log);

function bootstrap() {
  // move the line about fetchUsers into here
  fetchUsers().then(renderUserList);
}

bootstrap();
// // fetchUsers().then(renderUserList);