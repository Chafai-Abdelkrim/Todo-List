import { createH1, createH3, createBtn, creatrDiv, createPara, createIcon, createDiv } from './dom';
import { removeProject, renderTrashProjects } from './projects';
import { renderTodos } from './todos';
import { openEditProjectModal, openModal } from './modal';

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
    createTodoBtn.addEventListener('click', () => openModal());
    btnContainer.append(sortBtn, createTodoBtn);

    mainContainer.textContent = '';
    mainContainer.append(title, desc, btnContainer, todoContainer);

    renderTodos();
};

