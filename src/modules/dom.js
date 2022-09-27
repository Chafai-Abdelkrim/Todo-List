import { format, isPast, add, addDays } from "date-fns";
import { todos, updateStatus, restoreTodo } from "./todos";
import { openEditModal } from "./modal";

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

const createTodoCard = (todo) => {
    const currentPage = document.querySelector('.main-container').getAttribute('data-id');
    const todoContainer = document.querySelector('.todo-container');
    const container = createDiv('todo-card');
    const checkbox = createCheckbox('todo-card-input');
    const title = createPara('todo-card-title');
    const date = createPara('todo-card-date');
    const editBtn = createBtn('todo-card-edit');
    const deleteBtn = createBtn('todo-card-delete');
    const btnContainer = createDiv('tpdp-card-container');

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