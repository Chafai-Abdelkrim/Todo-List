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
}

const editTodo = (index, title, date, isImportant) => {
    const currentTodo = todos[index];
    currentTodo.title = title;
    currentTodo.date = date;
    currentTodo.isImportant = isImportant;
    renderTodos();
}

const updateStatus = (index, value) => {
    todos[index].checked = value;
}

const restoreTodo = (todo) => {
    if (typeof parseInt(todo.type) === 'number' ) {restoreProject(projects[parseInt(todo.type)])};
    todos[todo.index].isTrash = false;
    renderTodos();
}

export { todos, updateStatus, editTodo, restoreTodo}