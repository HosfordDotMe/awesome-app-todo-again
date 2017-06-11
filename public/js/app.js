const TodoApp = {
  rootElement: '#app',
  todos: JSON.parse(localStorage.getItem('todos')),
  init() {
    this.emptyLocalCheck();
    this.cacheDOM();
    this.bindEvents();
    this.render();
  },
  emptyLocalCheck() {
    if (!this.todos) {
      this.todos = [];
    }
  },
  cacheDOM() {
    this.root = document.querySelector(this.rootElement);
    this.createForm = this.root.querySelector('.create-form');
    this.taskInput = this.root.querySelector('.task-input');
    this.todoList = this.root.querySelector('.todo-list');
  },
  bindEvents() {
    this.createForm.addEventListener('submit', (event) => this.addTodo(event));
  },
  addTodo(event) {
    event.preventDefault();
    const taskValue = this.taskInput.value;
    if (!taskValue) {
      return;
    }
    const todo = {
      task: taskValue,
      isComplete: false
    };
    this.todos.push(todo);
    this.render();
    this.taskInput.value = '';
  },
  cacheDeleteButtons() {
    this.deleteButtons = this.root.querySelectorAll('.delete');
  },
  bindDeleteEvents() {
    this.deleteButtons.forEach((button, index) => {
      button.addEventListener('click', () => this.deleteTodo(index));
    });
  },
  cacheCheckMarks() {
    this.checkMarks = this.root.querySelectorAll('.completed');
  },
  bindCheckMarks() {
    this.checkMarks.forEach((checkMark, index) => {
      checkMark.addEventListener('click', () => this.completeTodo(checkMark,index));
    });
  },
  completeTodo(check,index) {
    if (check.checked === true ) {
      this.todos[index].isComplete = true;
    } else {
      this.todos[index].isComplete = false;
    }
    this.render();
  },
  deleteTodo(index) {
    this.todos.splice(index, 1);
    this.render();
  },
  renderTasks() {
    if (this.todos.length < 1) {
      return;
    }
    this.todos.map(todo => {
      const lis = document.createElement('li');
      lis.textContent = `${todo.task}`;
      lis.className = 'todo-task';
      this.todoList.appendChild(lis);

      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'X';
      deleteButton.className = 'delete';
      lis.appendChild(deleteButton);

      const checkMark = document.createElement('input');
      checkMark.setAttribute('type', 'checkbox');
      checkMark.className = 'completed';
      lis.prepend(checkMark);

      if (todo.isComplete === true) {
        lis.style.textDecoration = 'line-through';
        checkMark.setAttribute('checked', 'true');
      }
    });
  },
  clearTasks() {
    while (this.todoList.hasChildNodes()) {
      this.todoList.removeChild(this.todoList.firstChild);
    }
  },
  storeLocally() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  },
  render() {
    this.clearTasks();
    this.renderTasks();
    this.cacheDeleteButtons();
    this.bindDeleteEvents();
    this.cacheCheckMarks();
    this.bindCheckMarks();
    this.storeLocally();
  },
};
TodoApp.init();
