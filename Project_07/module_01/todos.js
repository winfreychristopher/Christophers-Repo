const TODOS_URL = `https://jsonplace-univclone.herokuapp.com/todos`

fetch(TODOS_URL)

  .then(function (response) {
    // This converts the response body to an object, returning is crucial here
    return response.json();
    console.log(response.json())
  })
  .then(function (data) {
    // do something with the data
    console.log(data);
  })
  .catch(function (error) {
    // do something with the error
    console.error(error);
  });


function fetchTodos() {
    return fetch(TODOS_URL).then(function (result) {
        return result.json();
    }).catch(function (error) {
        console.error(error)
    });
}


function renderAllTodos(todos) {
    $('.todo-list').empty()
    todos.filter((todo) => {
        return todo.completed
    }).forEach(todo => {
        $('.complete').append(renderTodo(todo))          
    })
    todos.filter((todo) => {
        return !todo.completed
    }).forEach(todo => {
        $('.incomplete').append(renderTodo(todo))
    })
}

function renderTodo(todo) {
    todo = `<div class="todo">
    <h3>${todo.title}</h3>
    <footer>
      <button>${todo.completed === false ? "UNDO" : "DONE"}</button>
    </footer>
  </div>`

  return todo
}

function bootstrap() {
    fetchTodos().then((data) => {
        renderAllTodos(data)
    })    
}

bootstrap();