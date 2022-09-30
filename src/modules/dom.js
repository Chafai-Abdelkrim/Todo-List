import { format, isPast, add, addDays } from "date-fns";
import { todos, updateStatus, restoreTodo } from "./todos";
import { openEditModal } from "./modal";
import { projects, removeProject, restoreProject } from "./projects";

const createDiv = (className) => {
    const div = document.createElement("div");
    div.classList.add(className);
    return div;
};

const createH1 = (className) => {
    const h1 = document.createElement("h1");
    h1.classList.add(className);
    return h1;
};

const createH2 = (className) => {
    const h2 = document.createElement("h2");
    h2.classList.add(className);
    return h2;
};

const createH3 = (className) => {
    const h3 = document.createElement("h3");
    h3.classList.add(className);
    return h3;
};

const createPara = (className) => {
    const para = document.createElement('p');
    para.classList.add(className);
    return para;
};

const createBtn = (className) => {
    const btn = document.createElement('button');
    btn.classList.add(className);
    return btn;
};

const createCheckbox = (className) => {
    const checkbox = document.createElement('input');
    checkbox.classList.add(className);
    checkbox.setAttribute('type', 'checkbox');
    return checkbox;
};

const createNavItem = (className, projectName) => {
    const li = document.createElement('li');
    const link = document.createElement('a');

    li.classList.add(className);
    link.classList.add(`${className}-link`);
    link.setAttribute('href', 'javascript:void(0);');
    link.append(createIcon('arrow'), projectName);
    li.append(link);

    return li;
};

const createLegend = (className) => {
    const legend = document.createElement('legend');
    legend.classList.add(className);
    
    return legend;
};

const createLabel = (className) => {
    const label = document.createElement('label');
    label.classList.add(`${className}-label`);
    label.setAttribute('for', `${className}-input`);

    return label;
};

const createInput = (className, inputType) => {
    const input = document.createElement('input');
    input.classList.add(`${className}-input`);
    input.setAttribute('type', inputType);
    input.setAttribute('id', `${className}-input`);
    input.setAttribute('name', `${className}-input`);

    return input;
};

const createTextarea = (className) => {
    const textarea = document.createElement('textarea');
    textarea.classList.add(`${className}-input`);
    textarea.setAttribute('id', `${className}-input`);
    textarea.setAttribute('name', `${className}-input`);

    return textarea;
};

const createTodoCard = (todo) => {
    const currentPage = document.querySelector('.main-container').getAttribute('data-id');
    const todoContainer = document.querySelector('.todo-container');
    const container = createDiv('todo-card');
    const checkbox = createCheckbox('todo-card-input');
    const title = createPara('todo-card-title');
    const date = createPara('todo-card-date');
    const editBtn = createBtn('todo-card-edit');
    const deleteBtn = createBtn('todo-card-delete');
    const btnContainer = createDiv('todo-card-container');

    checkbox.checked = todo.checked;
    checkbox.addEventListener('click', () => updateStatus(todo.index, checkbox.checked));
    title.innerText = todo.title;
    date.innerText = format(new Date(todo.date), 'dd/MM/y');

    editBtn.append(createIcon('edit'));
    editBtn.addEventListener('click', () => openEditModal(todo));

    deleteBtn.append(createIcon('delete'));
    deleteBtn.addEventListener('click', () => removeTodo(todo));

    btnContainer.append(editBtn, deleteBtn);

    if (isPast(addDays(new Date(todo.date)))) {
        date.innerText = "Expired";
        date.classList.add('is-expired');
    }

    if (todo.isImportant) {
        const important = createPara('todo-card-important');
        important.innerText = 'Important';
        container.append(important);
    }

    if (todo.isTrash) {
        const restoreBtn = createBtn('todo-card-restore');
        restoreBtn.append(createIcon('restore'));
        restoreBtn.addEventListener('click', () => restoreTodo(todo));
        btnContainer.insertBefore(restoreBtn, btnContainer.lastChild);
    }

    if (currentPage === 'Today' || currentPage === 'Upcoming' || currentPage === 'Completed' || currentPage === 'Trash') {
        const todoType = createPara('todo-card-type');
        if (isNaN(todo.type)) {
            todoType.innerText = todo.type;
            todoType.setAttribute('title', todo.type);
        } else {
            todoType.innerText = projects[parseInt(todo.type)].title;
            todoType.setAttribute('title', projects[parseInt(todo.type)].title);
        }
        container.append(todoType);
    }

    container.append(checkbox, title, date, btnContainer);
    todoContainer.append(container);
};

const createProjectCard = (project, index) => {
    const projectContainer = document.querySelector('.project-container');
    const container = createDiv('project-card');
    const title = createPara('project-card-title');
    const deleteBtn = createBtn('project-card-delete');
    const restoreBtn = createBtn('project-card-restore');
    const btnContainer = createDiv('project-card-container');

    title.innerText = project.title;

    deleteBtn.append(createIcon('delete'));
    deleteBtn.addEventListener('click', () => removeProject(project, index));
    restoreBtn.append(createIcon('restore'));
    restoreBtn.addEventListener('click', () => restoreProject(project));
    btnContainer.append(restoreBtn, deleteBtn);

    container.append(title, btnContainer);
    projectContainer.append(container);
};

const createTodoModalElements = (title) => {
    const formFieldset = document.querySelector('.modal-form-fieldset');
    const legend = createLegend('modal-form-legend');
    const labelName = createLabel('modal-form-title');
    const inputName = createInput('modal-form-title', 'text');
    const labelDate = createLabel('modal-form-date');
    const inputDate = createInput('modal-form-date', 'date');
    const lablePriority = createLabel('modal-form-priority')
    const inputPriority = createInput('modal-form-priority', 'checkbox');

    legend.innerText = title;
    labelName.innerText = 'Name';
    labelDate.innerText = 'Date';
    lablePriority.innerText = 'Is Important?';

    inputName.setAttribute('required', '');
    inputName.setAttribute('maxLength', '150');
    inputDate.setAttribute('required', '');

    lablePriority.appendChild(inputPriority);

    formFieldset.textContent = '';
    formFieldset.append(legend, labelName, inputName, labelDate, inputDate, lablePriority);
};

const createProjectModalElements = (title) => {
    const formFieldset = document.querySelector('.modal-form-fieldset');
    const legend = createLegend('modal-form-legend');
    const labelName = createLabel('modal-form-title');
    const inputName = createInput('modal-form-title', 'text');
    const labelDesc = createLabel('modal-form-desc');
    const inputDesc = createTextarea('modal-form-desc');

    legend.innerText = title;
    labelName.innerText = 'Project Name';
    labelDesc.innerText = 'Project Description';

    inputName.setAttribute('required', '');
    inputName.setAttribute('maxLength', '50');
    inputDesc.setAttribute('maxLength', '250');

    formFieldset.textContent = '';
    formFieldset.append(legend, labelName, inputName, labelDesc, inputDesc);
};

const  createIcon = (iconType) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    svg.setAttribute('width', '24px');
    svg.setAttribute('height', '24px');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('viewBox', '0 0 24 24');

    path.setAttribute('fill', 'currentColor');

    switch (iconType) {
        case 'delete':
            path.setAttribute('d', 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z');
            break;
        case 'restore':
            path.setAttribute('d', 'M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z');
            break;
        case 'edit':
            path.setAttribute('d', 'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z');
            break;
        case 'plus':
            path.setAttribute('d', 'M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z');
            break;
        case 'arrow':
            path.setAttribute('d', 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z');
            break;
        default:
            console.log(`There is no Icon with the (${iconType}) type.`);
            break;
    }
    svg.append(path);

    return svg;
};


export { createDiv, createH1, createH2, createH3, createPara, createBtn, createCheckbox,  createNavItem, createTodoCard, createProjectCard, createTodoModalElements, createProjectModalElements, createIcon };