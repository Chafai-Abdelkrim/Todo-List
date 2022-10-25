import { editTodo, createNewTodo } from "./todos";
import { createTodoPopupElements, createProjectPopupElements } from "./dom";
import { createNewProject, editProject } from "./projects";

const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup-form');

const closePopup = document.querySelector('.popup-form-close');
closePopup.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.add('display-none');
    popupForm.removeEventListener('submit', newTodoEvent);
    popupForm.removeEventListener('submit', editTodoEvent);
    popupForm.removeEventListener('submit', newProjectEvent);
    popupForm.removeEventListener('submit', editProjectEvent);
});

const openPopup = () => {
    createTodoPopupElements('New Todo');
    popupForm.addEventListener('submit', newTodoEvent);
    popup.classList.remove('display-none');
};

const openEditPopup = (todo) => {
    createTodoPopupElements('Edit task');

    const titleInput = document.querySelector('.popup-form-title-input');
    const dateInput = document.querySelector('.popup-form-date-input');
    const priorityInput = document.querySelector('.popup-form-priority-input');

    titleInput.value = todo.title;
    dateInput.value = todo.date;
    priorityInput.value = todo.isImportant;

    popup.classList.remove('display-none');
    popupForm.addEventListener('submit', editTodoEvent);
    popupForm.currentIndex = todo.index;
};

const openProjectPopup = () => {
    createProjectPopupElements('New Project');
    popupForm.addEventListener('submit', newProjectEvent);
    popup.classList.remove('display-none');
};

const openEditProjectPopup = (project) => {
    createProjectPopupElements('Edit Project');

    const titleInput = document.querySelector('.popup-form-title-input');
    const descInput = document.querySelector('.popup-form-desc-input');

    titleInput.value = project.title;
    descInput.value = project.desc;

    popup.classList.remove('display-none');
    popupForm.addEventListener('submit', editProjectEvent);
    popupForm.currentProject = project;
};

const newTodoEvent = (e) => {
    const projectType = document.querySelector('.main-container').getAttribute('data-id');
    const titleInput = document.querySelector('.popup-form-title-input');
    const dateInput = document.querySelector('.popup-form-date-input');
    const priorityInput = document.querySelector('.popup-form-priority-input');

    e.preventDefault();
    createNewTodo(projectType, titleInput.value, dateInput.value, priorityInput.checked);
    popup.classList.add('display-none');
    popupForm.removeEventListener('submit', newTodoEvent);
}

const editTodoEvent = (e) => {
    const titleInput = document.querySelector('.popup-form-title-input').value;
    const dateInput = document.querySelector('.popup-form-date-input').value;
    const priorityInput = document.querySelector('.popup-form-priority-input').checked;

    e.preventDefault();
    editTodo(e.currentTarget.currentIndex, titleInput, dateInput, priorityInput);
    popup.classList.add('display-none');
    popupForm.removeEventListener('submit', editTodoEvent);
};

const newProjectEvent = (e) => {
    const titleInput = document.querySelector('.popup-form-title-input');
    const descInput = document.querySelector('.popup-form-desc-input');

    e.preventDefault();
    createNewProject(titleInput.value, descInput.value);
    popup.classList.add('display-none');
    popupForm.removeEventListener('submit', newProjectEvent);
};

const editProjectEvent = (e) => {
    const titleInput = document.querySelector('.popup-form-title-input');
    const descInput = document.querySelector('.popup-form-desc-input');

    e.preventDefault();
    editProject(e.currentTarget.currentProject, titleInput.value, descInput.value);
    popup.classList.add('display-none');
    popupForm.removeEventListener('submit', editProjectEvent);
};


export { openPopup, openEditPopup, openProjectPopup, openEditProjectPopup };
