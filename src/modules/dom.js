import { format, isPast, add, addDays } from "date-fns";

const createDiv = (className) => {
    const div = document.createElement("div");
    div.classList.add(className);
    return div;
}

const createH1 = (className) => {
    const h1 = document.createElement("h1");
    h1.classList.add(className);
    return h1;
}

const createH2 = (className) => {
    const h2 = document.createElement("h2");
    h2.classList.add(className);
    return h2;
}

const createH3 = (className) => {
    const h3 = document.createElement("h3");
    h3.classList.add(className);
    return h3;
}

const createPara = (className) => {
    const para = document.createElement('p');
    para.classList.add(className);
    return para;
}

const createBtn = (className) => {
    const btn = document.createElement('button');
    btn.classList.add(className);
    return btn;
}

const createCheckbox = (className) => {
    const checkbox = document.createElement('input');
    checkbox.classList.add(className);
    checkbox.setAttribute('type', 'checkbox');
    return checkbox;
}

const createNavItem = (className, projectName) => {
    const li = document.createElement('li');
    const link = document.createElement('a');

    li.classList.add(className);
    link.classList.add(`${className}-link`);
    link.setAttribute('href', 'javascript:void(0);');
    link.append(createIcon('arrow'), projectName);
    li.append(link);

    return li;
}

