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

const updateStatus = (index, value) => {
    todos[index].checked = value;
}

export { todos, updateStatus }