let allTodos; [

    {  title: 'Exercise',
       dueDate: '04-19-21',
       description: 'Go work out',
       isComplete: false,
    },
    {  title: 'Workout',
       dueDate: '02-28-21',
       description: 'Go work out',
       isComplete: false,
    },
    {  title: 'The bugged one',
       dueDate: '02-19-21',
       description: 'Go work out',
       isComplete: false,
    },
    {  title: 'Gaming',
       dueDate: '02-19-21',
       description: 'Go work out',
       isComplete: true,
    },
    {  title: 'Exercise',
       dueDate: '05-19-21',
       description: 'Go work out',
       isComplete: true,
    },
    {  title: 'Pool',
       dueDate: '02-19-21',
       description: 'Go work out',
       isComplete: true,
    },
 
  ];


let pendingTodos, completedTodos, expiredTodos;


function createElementFromTodo(element) {
    let completeButton = !element.isComplete && isCurrent(element) ? '<button class="action complete">Complete</button>' : ""
    
    let newTodo = `<div class="todo">
        <h3><span class="title">${element.title}</span><span class="due-date">${element.dueDate}</span></h3>
        <pre>${element.description}</pre>
        <footer class="actions">
            ${completeButton}
            <button class="action delete">Delete</button>
        </footer>
    </div>`;
    newTodo = $(newTodo).data("element", element);
    return newTodo;
}


function renderTodos () {
    $('main .content').empty();
    splitTodos();
    pendingTodos.forEach(element => {
        $('.pending-todos').append(createElementFromTodo(element))});
    completedTodos.forEach(element => {
        $('.completed-todos').append(createElementFromTodo(element))});
    expiredTodos.forEach(element => {
        $('.expired-todos').append(createElementFromTodo(element))})

}

$('.left-drawer').click( function () {
    if ( $(this).hasClass('left-drawer')) {
        $('#app').toggleClass('drawer-open');
    }
})


$('.add-todo').click( function () {
    $('.modal').addClass('open');
})

$('create-todo').click( function (event) {
    event.preventDefault()
    allTodos.unshift(createTodoFromForm())
    $('.todo-form').trigger("reset");
    $('.modal').removeClass('open');
    storeData();
    renderTodos();
})

$('.cancel-create-todo').click( function () {
    $('.modal').removeClass('open');
})


function createTodoFromForm () {
    let formTodo = {
        title: $('#todo-title').val(),
        dueDate: $('#todo-due-date').val(),
        description: $('#todo-description').val(),
        isComplete: false
    }
    return formTodo
}


$('main').on('click', '.action.complete', function () {
    let mainForm = $(this).closest('.todo')
    let mainFormData = $(this).closest('.todo').data('element');
    mainFormData.isComplete = true;
    mainForm.slideUp(function () {
        renderTodos();
      });
      storeData();
});

$('main').on('click', '.action.delete', function () {
    let todo = $(this).closest('.todo').data('element')
    let todoIndex = allTodos.indexOf(todo)
    allTodos.splice(todoIndex, 1)
    $(this).closest('.todo').slideUp(function () {
        storeData();
        renderTodos();
    })
    
})

$('aside').on('click', '.action.remove-completed', function () {
  let completeTodos = allTodos.filter(element => {return !element.isComplete})
     allTodos = completeTodos
     storeData();
     renderTodos();
})

$('aside').on('click', '.action.remove-expired', function () {
    let pastDueTodos = allTodos.filter(element => { return isCurrent(element)})
    allTodos = pastDueTodos
    storeData();
    renderTodos();
})

function isCurrent (todo) {
    const todoDueDate = new Date(todo.dueDate);
    const now = new Date();
    return now < todoDueDate;
}


function splitTodos () {
    pendingTodos = allTodos.filter( element => {
       return !element.isComplete && isCurrent(element);
    });

    completedTodos = allTodos.filter( element =>{
        return element.isComplete
    });

    expiredTodos = allTodos.filter( element => {
        return !element.isComplete && !isCurrent(element);
    });
}

function storeData () {
    localStorage.setItem('allTodos', JSON.stringify(allTodos))
}

function retrieveData () {
    allTodos = JSON.parse(localStorage.getItem('allTodos')) || fetchDefaultTodos();
}

function fetchDefaultTodos () {
   let defaultTodos = [
       {
        title: 'Welcome to this Todo.app',
        dueDate: '04-1-21',
        description: 'This is a Todo.app card',
        isComplete: false,
       },
       {
        title: 'Use the buttons on the left to add tasks or clear complete/expired tasks.',
        dueDate: '04-1-21',
        description: 'The top button on the left will fill in these cards with your information.',
        isComplete: true,
       },
       {
        title: 'This project is made to help organize your day to day.',
        dueDate: '04-30-21',
        description: 'Fill these cards with quick descriptions or more to help you stay on top of your daily activities.',
        isComplete: false,
       },
       {
        title: 'Each task is organized based on its status. Pending in the first column and Completed in the column.',
        dueDate: '04-30-21',
        description:"Cards will never leave even when marked completed until you purposely delete them. This way you can review them to make sure everything got done.",
        isComplete: true,
       },
       {
        title: 'Expired tasks will move here.',
        dueDate: '01-30-21',
        description: 'I hope this was helpful in directing you on how to use this app.',
        isComplete: false,
       }
   ]
   return defaultTodos
}

function todoData () {
    storeData(),
    renderTodos()
}

retrieveData();
renderTodos();