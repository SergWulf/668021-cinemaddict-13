import {createHeaderProfileTemplate} from "./view/header-profile.js";
import {createMainMenuTemplate} from "./view/main-menu.js";
import {createMainSortTemplate} from "./view/main-sort.js";
import {createMainContentTemplate} from "./view/main-content.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createButtonShowMoreTemplate} from "./view/film-more.js";
import {createFilmPopupTemplate} from "./view/film-popup.js";

const FILM_COUNT = 5;
const FILM_TOP_COUNT = 2;
const FILM_MOST_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`main`);


render(siteHeader, createHeaderProfileTemplate(), `beforeend`);
render(siteMain, createMainMenuTemplate(), `beforeend`);
render(siteMain, createMainSortTemplate(), `beforeend`);
render(siteMain, createMainContentTemplate(), `beforeend`);

const filmContainerHead = document.querySelector(`.films-list:nth-of-type(1) .films-list__container`);
for (let i = 0; i < FILM_COUNT; i++) {
  render(filmContainerHead, createFilmCardTemplate(), `beforeend`);
}
render(filmContainerHead, createButtonShowMoreTemplate(), `beforeend`);

const filmContainerTop = document.querySelector(`.films-list:nth-of-type(2) .films-list__container`);
for (let i = 0; i < FILM_TOP_COUNT; i++) {
  render(filmContainerTop, createFilmCardTemplate(), `beforeend`);
}

const filmContainerMost = document.querySelector(`.films-list:nth-of-type(3) .films-list__container`);
for (let i = 0; i < FILM_MOST_COUNT; i++) {
  render(filmContainerMost, createFilmCardTemplate(), `beforeend`);
}


/* По заданию нужно отрисовать popup, но дело в том, что его ведь нужно отрисовывать по событию,
  кликнув на любую картинку, если сразу отрисовать, то получается ерунда какая-то,
  пока сделаю по событию

  1. Вешаем обработчик на каждую картинку в карточке
  2. Обработчик вызывает отрисовку popup.
  3. При нажатии на крестик в попапе, он удаляется из разметки.
 */

const footerContainer = document.querySelector(`footer`);
document.querySelectorAll(`.film-card`).forEach((card) => {
  card.children[3].addEventListener(`click`, () => {
    render(footerContainer, createFilmPopupTemplate(), `afterend`);
    const filmPopupClose = document.querySelector(`.film-details__close-btn`);
    filmPopupClose.addEventListener(`click`, () => {
      const filmPopup = document.querySelector(`.film-details`);
      filmPopup.parentElement.removeChild(filmPopup);
    });
  });
});

