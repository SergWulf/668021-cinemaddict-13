import {createHeaderProfileTemplate} from "./view/header-profile.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);

render(siteHeader, createHeaderProfileTemplate(), `beforeend`);
