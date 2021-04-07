const USERS_URL = `https://reqres.in/api/users?per_page=3`;

const metadata = {
  minPage: 1,
  currentPage: null,
  maxPage: null
};

function renderUser(user) {
  user = $(`<div class = "user">
   <h2>${user.first_name}${user.last_name}</h2>
   <h3>${user.email}</h3>
   <img src = ${user.avatar}>
  </div>`)
  return user
}

function renderUserList(userList) {
  $('#user-list').empty()
  // console.log(userList)
  userList.forEach( function (user) {
    // console.log(user)
    $('#user-list').append(renderUser(user));
  });

}

function updatePageInfo() {
  $('#page-info').text(
    `Page number ${metadata.currentPage} out of ${metadata.maxPage}`
  )
}

function updateButtons() {
  if(metadata.currentPage === metadata.minPage) {
    $('#back').attr('disabled', true);
  } else if (metadata.currentPage === metadata.maxPage) {
    $('#forward').attr('disabled', true);
  } else {
    $('#back').removeAttr('disabled');
    $('#forward').removeAttr('disabled');
  }
}


function fetchUserList(currentPage = 1) {
  fetch(`${ USERS_URL }&page=${ currentPage }`)
    .then( function (response) {
      return response.json();
    })
    .then( function (data) {
      console.log(data);
      metadata.currentPage = data.page;
      // console.log(metadata.currentPage)
      metadata.maxPage = data.total_pages;
      // console.log(metadata.maxPage)
      renderUserList(data.data);
      updatePageInfo()
      updateButtons()
    })
    .catch( function (error) {
      console.error(error);
    })
}


$('#back').on('click', function () {
  if(metadata.currentPage - 1 >= metadata.minPage) {
    // console.log(metadata.currentPage - 1)
    fetchUserList( metadata.currentPage - 1);
  }
});


$('#forward').on('click', function () {
  if(metadata.currentPage + 1 <= metadata.maxPage) {
    // console.log(metadata.currentPage - 1)
    fetchUserList( metadata.currentPage + 1);
  }
});


function bootstrap() {
  fetchUserList();
}

bootstrap();