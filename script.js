$(document).ready(function(){
  $("#addTodoTextInput").keypress(function(e){
       if(e.which==13){
         $("#addTerm").click();
       }
     }); 
  $("#toggleTodoPositionInput").keypress(function(e){
       if(e.which==13){
         $("#toggleTerm").click();
       }
     });
});
var todoList = {
  todos: [],
  addTodos: function(todoText) {
    this.todos.push({
      todoText:todoText,
      completed:false
                    });
  },
  changeTodo: function(position, newTodo){
    this.todos[position].todoText = newTodo;
  },
  deleteTodo: function(position){
    this.todos.splice(position,1);
  },
  toggleCompleted: function(position){
    this.todos[position].completed = !this.todos[position].completed
  },
  toggleAll: function(){
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    this.todos.forEach(function(todo){
      if(todo.completed === true){
        completedTodos++;
      }
    });
      this.todos.forEach(function(todo){
        if(completedTodos === totalTodos){
          todo.completed = false;
        }
        else{
          todo.completed = true;
        }
      });
  }
}

var handlers = {
  toggleAll: function(){
    todoList.toggleAll();
    view.displayTodos();
  },
  addTodo: function(){
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodos(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function(){
    var changeTodoTextInput = document.getElementById('changeTodoText');
    var changeTodoNumberInput = document.getElementById('changeTodoNumber');
    todoList.changeTodo(changeTodoNumberInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoTextInput.value = '';
    changeTodoNumberInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(){
    var toggleTodoPositionInput = document.getElementById('toggleTodoPositionInput');
    todoList.toggleCompleted(toggleTodoPositionInput.valueAsNumber);
    toggleTodoPositionInput.value='';
    view.displayTodos();
  }
}

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML='';
    todoList.todos.forEach(function(todo, position){
      var todoTextWithCompleted = '';
      var todoLi = document.createElement('li');
      if(todo.completed === true){
        todoTextWithCompleted = '(x) ' + todo.todoText + ' ';
      }
      else{
        todoTextWithCompleted = '( ) ' + todo.todoText + ' ';
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompleted;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function(){
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click',function(event){
    var elementClicked = event.target;
    if(elementClicked.className === 'deleteButton'){
      handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
}

view.setUpEventListeners();