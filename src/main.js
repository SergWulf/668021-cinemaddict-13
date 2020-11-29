import {createHeaderProfileTemplate} from "./view/header-profile.js";
import {createMainMenuTemplate} from "./view/main-menu.js";
import {createMainSortTemplate} from "./view/main-sort.js";
import {createMainContentTemplate} from "./view/main-content.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createButtonShowMoreTemplate} from "./view/film-more.js";
import {createFilmPopupTemplate} from "./view/film-popup.js";
import {generateFilm} from "./mock/film.js";
import {generateComment} from "./mock/comment.js";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const films = [];
const comments = [];

for (let i = 0; i < 25; i++) {
  films.push(generateFilm());
  const commentCount = getRandomInt(6);
  for (let j = 0; j < commentCount; j++) {
    comments.push(generateComment(films[i].id));
  }
}

// .
// Генерируем 25 фильмов. В каждой итерации создается объект "Фильм" и объект "Комментарии".
// Каждый объект добавляю в массив. Созданные комментарии тоже добавляем в отдельный массив.
// Для связи фильма и комментарием будет поле id. Допустим нужно в Popup вывести фильм, как
// только он будет загружен в Popup, извлекаются все комментарии, которые принадлежат этому фильму
// и прописываются в разметку.
// .

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
  render(filmContainerHead, createFilmCardTemplate(films[i]), `beforeend`);
}
render(filmContainerHead, createButtonShowMoreTemplate(), `beforeend`);

const filmContainerTop = document.querySelector(`.films-list:nth-of-type(2) .films-list__container`);
for (let i = 0; i < FILM_TOP_COUNT; i++) {
  render(filmContainerTop, createFilmCardTemplate(films[i]), `beforeend`);
}

const filmContainerMost = document.querySelector(`.films-list:nth-of-type(3) .films-list__container`);
for (let i = 0; i < FILM_MOST_COUNT; i++) {
  render(filmContainerMost, createFilmCardTemplate(films[i]), `beforeend`);
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

