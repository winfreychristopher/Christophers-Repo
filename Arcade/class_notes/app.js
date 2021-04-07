const BASE_URL = 'https://jsonplace-univclone.herokuapp.com';

function fetchUsers() {
  return fetchData(`${BASE_URL}/users`);
}

function renderUser(user) {
  const {company, email, name} = user;
  let template = `
<div class="user-card">
  <header>
    <h2>${name}</h2>
  </header>
  <section class="company-info">
    <p><b>Contact:</b>${email}</p>
    <p><b>Works for:</b>${company.name}</p>
    <p><b>Company creed:</b>${company.catchPhrase}</p>
  </section>
  <footer>
    <button class="load-posts">POSTS BY Bret</button>
    <button class="load-albums">ALBUMS BY Bret</button>
  </footer>
</div>`;

  return template;
}

function renderUserList(userList) {
  $('#user-list').empty();
  userList.forEach(user => {
    $('#user-list').append(renderUser(user));
    $('.user-card').last().data('user', user);
  });
}

function bootstrap() {
  fetchUsers().then(renderUserList);
}

function fetchUserAlbumList(userId) {
  return fetchData(`${BASE_URL}/users/${userId}/albums?_expand=user&_embed=photos`);
}

/* render a single photo */
function renderPhoto(photo) {
  const {thumbnailUrl, title, url} = photo;
  let template = `
<div class="photo-card">
  <a href="${thumbnailUrl}" target="_blank">
    <img src="${url}" width= "150" height= "150">
    <figure>${title}</figure>
  </a>
</div>`
  return template;
}

/* render a single album */
function renderAlbum(album) {
  const photos = album.photos;
  let template = `
<div class="album-card">
  <header>
    <h3>${photos.title}, by Bret </h3>
  </header>
  <section class="photo-list">
  </section>
</div>
  `
  photos.forEach(photo => {
    $('.photo-list').append(renderPhoto(photo));
  })
  return template;
}

/* render an array of albums */
function renderAlbumList(albumList) {
  $('#app section.active').removeClass('active');
  $('#album-list').empty();
  $('#album-list').addClass('active');
  albumList.forEach(album => {
    $('#album-list').append(renderAlbum(album));
  });
}

function fetchData(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error))
}

function fetchUserPosts(userId) {
  return fetchData(`${BASE_URL}/users/${userId}/posts?_expand=user`);
}

function fetchPostComments(postId) {
  return fetchData(`${BASE_URL}/posts/${postId}/comments`);
}

fetchPostComments(1).then(console.log);

function setCommentsOnPost(post) {
 // if we already have comments, don't fetch them again
  if (post.comments) {
    // #1: Something goes here
    return Promise.reject(new Error('comments already exist'));
  }
  // fetch, upgrade the post object, then return it
  return fetchPostComments(post.id)
          .then(function (comments) {
  // #2: Something goes here
            post.comments = comments;
            return post;
          });
}

function renderPost(post) {
  const { title, user, body } = post;
  let template = `
<div class="post-card">
  <header>
    <h3>${title}</h3>
    <h3>--- ${user.username}</h3>
  </header>
  <p>${body}</p>
  <footer>
    <div class="comment-list"></div>
    <a href="#" class="toggle-comments">(<span class="verb">show</span> comments)</a>
  </footer>
</div>`
  return template;
}
  
function renderPostList(postList) {
  $('#app section.active').removeClass('active');
  $('#post-list').empty();
  $('#post-list').addClass('active');

  postList.forEach(post => {
    $('#post-list').append(renderPost(post));
    $('.post-card').last().data('post', post);
  });
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
      const commentList = postCardElement.find('.comment-list');
      commentList.empty();
      post.comments.forEach(comment => {
        commentList.append(`<h3>${comment.body}\n--${comment.email}</h3>`)
      });
      toggleComments(postCardElement);
    })
    .catch(function () {
      console.log('comments previously existed, only toggling...', post);
      toggleComments(postCardElement);
    });
});

$('#user-list').on('click', '.user-card .load-posts', function () {
  // load posts for this user
  // render posts for this user
  const user = $(this).closest('.user-card').data('user');
  console.log(user);
  fetchUserPosts(user.id).then(renderPostList);
});

$('#user-list').on('click', '.user-card .load-albums', function () {
  // load albums for this user
  // render albums for this user
  const user = $(this).closest('.user-card').data('user');
  console.log(user);
  fetchUserAlbumList(user.id).then(renderAlbumList);
});

bootstrap();