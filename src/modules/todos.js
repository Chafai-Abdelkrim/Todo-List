import { format, compareAsc, addDays, eachDayOfInterval} from 'date-fns';
import { createTodoCard } from './dom';
import { projects, restoreProject } from './projects';

const LOCALSTORAGE_KEY = 'todolist.todos';
const todos = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [
    {
        type: 'Inbox',
        checked: false,
        title: 'Welcome to the Todo List App',
        date: '3000-01-01',
        isImportant: true,
        isTrash: false,
    },
];

const saveTodos = () => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(todos));
};

const createNewTodo = (type, title, date, isImportant) => {
    const newTodo = {
        type: type,
        checked: false,
        title: title,
        date: date,
        isImportant: isImportant,
        isTrash: false,
    };
    todos.push(newTodo);
    renderTodos();
};

const editTodo = (index, title, date, isImportant) => {
    const currentTodo = todos[index];
    currentTodo.title = title;
    currentTodo.date = date;
    currentTodo.isImportant = isImportant;
    renderTodos();
};

const updateStatus = (index, value) => {
    todos[index].checked = value;
    setTimeout(renderTodos, 2000);
};

const removeTodo = (todo) => {
    if (todo.isTrash) {
        todos.splice(todo.index, 1);
        renderTodos();
    } else {
        todos[todo.index].isTrash = true;
        renderTodos();
    }
};

const  removeAllProjectTodos = (project) => {
    let i = todos.length;
    while (i--) {
        const todo = todos[i];
        if (todo.type == project.id) todos.splice(todo.index, 1);
    }
    renderTodos();
};

const updateAllProjectTodos = (project) => {
    todos.forEach( todo => {
        if (todo.type == project.id) todo.isTrash = true;
    });
};

const restoreTodo = (todo) => {
    if (typeof parseInt(todo.type) === 'number' ) {restoreProject(projects[parseInt(todo.type)])};
    todos[todo.index].isTrash = false;
    renderTodos();
};

const renderTodos = () => {
    const currentPage = document.querySelector('.main-container').getAttribute('data-id');
    const todoConatiner = document.querySelector('.todo-container');
    const filteredTodos = filterTodos(currentPage);
    todoConatiner.textContent = '';
    filteredTodos.forEach(todo => createTodoCard(todo));
    saveTodos();
};

const filterTodos = (currentPage) => {
    const sortBtn = document.querySelector('.todo-sort');

    const filteredTodos = todos.filter((todo, index) => {
        todo.index = index;
        switch (currentPage) {
            case 'Today':
                const todayTodos = todo.date === format(new Date(), 'yyyy-MM-dd') && todo.isTrash === false && todo.checked === false;
                return todayTodos;
            
            default:
                break;
        }
    });
};

const getDates = () => {
    const dates = eachDayOfInterval({
        start: addDays(new Date(), 1),
        end: addDays(new Date(), 7),
    });
    dates.forEach((date, i) => dates.splice(i, 1, format(date, 'yyyy-MM-dd')));
    return dates;
};


export { todos, updateStatus, createNewTodo, removeTodo, editTodo, restoreTodo, removeAllProjectTodos, updateAllProjectTodos}