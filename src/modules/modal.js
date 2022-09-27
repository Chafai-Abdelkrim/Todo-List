import { editTodo } from "./todos";

const modal = document.querySelector('.modal');
const modalForm = document.querySelector('.modal-form');

const openEditModal = (todo) => {
    createTodoModalElements('Edit task');

    const titleInput = document.querySelector('.modal-form-title-input');
    const dateInput = document.querySelector('.modal-form-date-input');
    const priorityInput = document.querySelector('.modal-form-priority-input');

    titleInput.value = todo.title;
    dateInput.value = todo.date;
    priorityInput.value = todo.isImportant;

    modal.classList.remove('display-none');
    modalForm.addEventListener('submit', editTodoEvent);
    modalForm.currentIndex = todo.index;
}

const editTodoEvent = (e) => {
    const titleInput = document.querySelector('.modal-form-title-input');
    const dateInput = document.querySelector('.modal-form-date-input');
    const priorityInput = document.querySelector('.modal-form-priority-input');

    e.preventDefault();
    editTodo(e.currentTarget.currentIndex, titleInput, dateInput, priorityInput);
    modal.classList.add('display-none');
    modalForm.removeEventListener('submit', editTodoEvent);
}



export { openEditModal }
