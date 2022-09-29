import { editTodo, createNewTodo } from "./todos";
import { createTodoModalElements, createProjectModalElements } from "./dom";

const modal = document.querySelector('.modal');
const modalForm = document.querySelector('.modal-form');

const openModal = () => {
    createTodoModalElements('New Todo');
    modalForm.addEventListener('submit', newTodoEvent());
    modal.classList.remove('display-none');
};

const closeModal = document.querySelector('.modal-form-close');
closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('display-none');
    modalForm.removeEventListener('submit', newTodoEvent);
    modalForm.removeEventListener('submit', editTodoEvent);
    modalForm.removeEventListener('submit', newProjectEvent);
    modalForm.removeEventListener('submit', editProjectEvent);
});

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
};

const newTodoEvent = (e) => {
    const projectType = document.querySelector('.main-container').getAttribute('data-id');
    const titleInput = document.querySelector('.modal-form-title-input');
    const dateInput = document.querySelector('.modal-form-date-input');
    const priorityInput = document.querySelector('.modal-form-priority-input');

    e.preventDefault();
    createNewTodo(projectType, titleInput.value, dateInput.value, priorityInput.checked);
    modal.classList.add('display-none');
    modalForm.removeEventListener('submit', newTodoEvent);
}

const editTodoEvent = (e) => {
    const titleInput = document.querySelector('.modal-form-title-input');
    const dateInput = document.querySelector('.modal-form-date-input');
    const priorityInput = document.querySelector('.modal-form-priority-input');

    e.preventDefault();
    editTodo(e.currentTarget.currentIndex, titleInput, dateInput, priorityInput);
    modal.classList.add('display-none');
    modalForm.removeEventListener('submit', editTodoEvent);
};

const newProjectEvent = (e) => {

};

const editProjectEvent = (e) => {
    
};


export { openEditModal };
