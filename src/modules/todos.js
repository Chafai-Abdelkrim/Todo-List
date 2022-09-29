import { format, compareAsc, addDays, eachDayOfInterval} from 'date-fns';

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

export { todos, updateStatus, editTodo, restoreTodo, removeAllProjectTodos, updateAllProjectTodos}