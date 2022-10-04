import { buildCompleted, buildInbox, buildTrash, buildUpcoming } from './modules/build-pages';
import { openProjectModal } from './modules/modal';
import { renderProjectNav } from './modules/projects';
import './styles.css';

const addProjectNavBtn = document.querySelector('.header-nav-btn');
const navLinks = document.querySelectorAll('.header-home-item-link');
const mobileNavBtn = document.querySelector('.mobile-nav-btn');

addProjectNavBtn.addEventListener('click', () => {
    openProjectModal();
});

mobileNavBtn.addEventListener('click', () => {
    document.querySelector('.header').classList.toggle('is-active');
    document.querySelector('.main-container').classList.toggle('is-active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        switch (link.innerText) {
            case 'Inbox':
                buildInbox();
                break;
            case 'Today':
                buildToday();
                break;
            case 'Upcoming':
                buildUpcoming();
                break;
            case 'Completed': 
                buildCompleted();
                break;
            case 'Trash':
                buildTrash();
                break;
        }
    });
});

renderProjectNav();
buildInbox();