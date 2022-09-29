import { format, isPast, add, addDays } from "date-fns";
import { todos, updateStatus, restoreTodo } from "./todos";
import { openEditModal } from "./modal";
import { removeProject, restoreProject } from "./projects";

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

export { createProjectCard, createNavItem }