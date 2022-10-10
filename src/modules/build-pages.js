import { createH1, createH3, createBtn, creatrDiv, createPara, createIcon, createDiv } from './dom';
import { removeProject, renderTrashProjects } from './projects';
import { renderTodos } from './todos';
import { openEditProjectPopup, openPopup } from './popup';

const buildInbox  = () => {
    const nav = document.querySelector('.header');
    const mainContainer = document.querySelector('.main-container');
    const title = createH1('project-title');
    const desc = createPara('project-desc');
    const btnContainer = createDiv('project-controls');
    const todoContainer = createDiv('todo-container');
    const sortBtn = createBtn('todo-sort');
    const createTodoBtn = createBtn('todo-create');

    nav.classList.remove('is-active');
    mainContainer.classList.remove('is-active');
    mainContainer.setAttribute('data-id', 'Inbox');

    title.innerText = 'Inbox';
    desc.innerText = 'A list of all the Todo tasks';

    sortBtn.innerText = 'All';
    sortBtn.addEventListener('click', () => {
        sortBtn.innerText === 'All' ? (sortBtn.innerText = 'Important') : (sortBtn.innerText = 'All');
        renderTodos();
    });
    createTodoBtn.append(createIcon('plus'));
    createTodoBtn.addEventListener('click', () => openPopup());
    btnContainer.append(sortBtn, createTodoBtn);

    mainContainer.textContent = '';
    mainContainer.append(title, desc, btnContainer, todoContainer);

    renderTodos();
};

const buildToday = () => {
    const nav = document.querySelector('.header');
    const mainContainer = document.querySelector('.main-container');
    const title = createH1('project-title');
    const desc = createPara('project-desc');
    const todoContainer = createDiv('todo-container');

    nav.classList.remove('is-active');
    mainContainer.classList.remove('is-active');
    mainContainer.setAttribute('data-id', 'Today');

    title.innerText = 'Today';
    desc.innerText = 'All tasks to do today';

    mainContainer.textContent = '';
    mainContainer.append(title, desc, todoContainer);

    renderTodos()
};

const buildUpcoming = () => {
    const nav = document.querySelector('.header');
    const mainContainer = document.querySelector('.main-container');
    const title = createH1('project-title');
    const desc = createPara('project-desc');
    const todoContainer = createDiv('todo-container');

    nav.classList.remove('is-active');
    mainContainer.classList.remove('is-active');
    mainContainer.setAttribute('data-id', 'Upcoming');

    title.innerText = 'Upcoming';
    desc.innerText = 'All upcoming tasks to do next week';

    mainContainer.textContent = '';
    mainContainer.append(title, desc, todoContainer);

    renderTodos();
};

const buildCompleted = () => {
    const nav = document.querySelector('.header');
    const mainContainer = document.querySelector('.main-container');
    const title = createH1('project-title');
    const desc = createPara('project-desc');
    const todoContainer = createDiv('todo-container');

    nav.classList.remove('is-active');
    mainContainer.classList.remove('is-active');
    mainContainer.setAttribute('data-id', 'Completed');

    title.innerText = 'Completed';
    desc.innerText = 'All completed tasks';

    mainContainer.textContent = '';
    mainContainer.append(title, desc, todoContainer);

    renderTodos();
};

const buildTrash = () => {
    const nav = document.querySelector('.header');
    const mainContainer = document.querySelector('.main-container');
    const title = createH1('project-title');
    const desc = createPara('project-desc');
    const toggleBtn = createBtn('project-type');
    const todoContainer = createDiv('todo-container');
    const projectContainer = createDiv('project-container');

    nav.classList.remove('is-active');
    mainContainer.classList.remove('is-active');
    mainContainer.setAttribute('data-id', 'Trash');

    title.innerText = 'Trash';
    desc.innerText = 'All deleted todos and projects';

    toggleBtn.innerText = 'Todos';
    projectContainer.classList.add('display-none');
    toggleBtn.addEventListener('click', () => {
        if (toggleBtn.innerText === 'Todos') {
            toggleBtn.innerText = 'Projects';
            document.querySelector('.todo-container').classList.add('display-none');
            document.querySelector('.project-container').classList.remove('display-none');
        } else {
            toggleBtn.innerText = 'Todos';
            document.querySelector('.project-container').classList.add('display-none');
            document.querySelector('.todo-container').classList.remove('display-none');
        }
        renderTodos();
        renderTrashProjects();
    });

    mainContainer.textContent = '';
    mainContainer.append(title, desc, toggleBtn, todoContainer, projectContainer);
    
    renderTodos();
    renderTrashProjects();
};

const buildProjectPage = (project, index) => {
    const nav = document.querySelector('.header');
    const mainContainer = document.querySelector('.main-container');
    const title = createH1('project-title');
    const desc = createPara('project-desc');
    const headerContainer = createDiv('project-header-container');
    const btnContainer = createDiv('project-controls');
    const todoContainer = createDiv('todo-container');
    const deleteProjectBtn = createBtn('project-delete');
    const editProjectBtn = createBtn('project-edit');
    const sortBtn = createBtn('todo-sort');
    const createTodoBtn = createBtn('todo-create');0

    nav.classList.remove('is-active');
    mainContainer.classList.remove('is-active');
    mainContainer.setAttribute('data-id', index);

    title.innerText = project.title;
    desc.innerText = project.desc;

    editProjectBtn.append(createIcon('edit'));
    editProjectBtn.addEventListener('click', () => openEditProjectPopup(project));
    deleteProjectBtn.append(createIcon('delete'));
    deleteProjectBtn.addEventListener('click', () => removeProject(project, index));

    sortBtn.innerText = 'All';
    sortBtn.addEventListener('click', () => {
        sortBtn.innerText === 'All' ? (sortBtn.innerText = 'Important') : (sortBtn.innerText = 'All');
        renderTodos();
    });
    createTodoBtn.append(createIcon('plus'));
    createTodoBtn.addEventListener('click', () => openPopup());

    headerContainer.append(title, editProjectBtn, deleteProjectBtn);

    btnContainer.append(sortBtn, createTodoBtn);

    mainContainer.textContent = '';
    mainContainer.append(headerContainer, desc, btnContainer, todoContainer);

    renderTodos();
};

export { buildInbox, buildToday, buildUpcoming, buildCompleted, buildTrash, buildProjectPage };