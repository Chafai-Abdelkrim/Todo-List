import { removeAllProjectTodos, updateAllProjectTodos } from './todos';
import { createProjectCard, createNavItem } from './dom';
import { buildGeneral, buildProjectPage } from './build-pages';

const LOCALSTORAGE_KEY = 'todolist.projects';
const projects = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [
    {
        title: 'Test Project',
        desc: 'This is a test project with fake content, remove it if you want!',
        isTrash: false,
    },
];

const saveProjects = () => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(projects));
}

const createNewProject = (title, description) => {
    const newProject = {
        title: title,
        desc: description,
        isTrash: false,
    }
    projects.push(newProject);
    renderProjectNav();
    buildProjectPage(projects[projects.length - 1], projects[projects.length - 1].id);
};

const editProject = (project, title, description) => {
    const currentProject = projects[project.id];
    currentProject.title = title;
    currentProject.desc = description;
    renderProjectNav();
    buildProjectPage(project, project.id);
};

const removeProject = (project, index) => {
    if (project.isTrash) {
        removeAllProjectTodos(project);
        projects.splice(index, 1);
        renderTrashProjects();
    } else {
        updateAllProjectTodos();
        project.isTrash = true;
        renderProjectNav();
        buildGeneral();
    }
};

const restoreProject = (project) => {
    project.isTrash = false;
    renderTrashProjects();
    renderProjectNav();
};

const renderProjectNav = () => {
    const projectNav = document.querySelector('#projects-list');
    projectNav.textContent = '';

    projects.forEach((project, index) => {
        project.id = index;
        if (!project.isTrash) {
            const navItem = createNavItem('header-project-item', project.title);
            navItem.addEventListener('click', () => buildProjectPage(project, index));
            projectNav.append(navItem);
        }
    });
    saveProjects();
};

const renderTrashProjects = () => {
    const projectContainer = document.querySelector('.project-container');

    projectContainer.textContent = '';
    projects.forEach((project, index) => {
        if (project.isTrash) createProjectCard(project, index);
    });
    saveProjects();
}

export { projects, createNewProject, editProject, removeProject, restoreProject };