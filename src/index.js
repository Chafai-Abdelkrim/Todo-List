import { buildToday, buildCompleted, buildInbox, buildTrash, buildUpcoming } from './modules/build-pages';
import { openProjectPopup } from './modules/popup';
import { renderProjectNav } from './modules/projects';
import './styles.css';

const addProjectNavBtn = document.querySelector('.header-nav-btn');
const navLinks = document.querySelectorAll('.header-home-item-link');
const mobileNavBtn = document.querySelector('#menu-btn');

addProjectNavBtn.addEventListener('click', () => {
    openProjectPopup();
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