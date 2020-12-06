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

// Генерируем моки: фильмы и комментарии.
for (let i = 0; i < 25; i++) {
  // Генерируем фильм и добавляем его в массив
  films.push(generateFilm());
  // Генерируем кол-во комментарием к фильму от 0 до 5
  const commentCount = getRandomInt(6);
  // При создании комментария передаем параметр фильма id,
  // тем самым связывая фильм с комментариями
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

// Отрисовка общего списка фильмов
const filmContainerHead = document.querySelector(`.films-list:nth-of-type(1) .films-list__container`);
for (let i = 0; i < FILM_COUNT; i++) {
  render(filmContainerHead, createFilmCardTemplate(films[i]), `beforeend`);
}
render(filmContainerHead, createButtonShowMoreTemplate(), `beforeend`);

// Отрисовка колонки с фильмами ТОР
const filmContainerTop = document.querySelector(`.films-list:nth-of-type(2) .films-list__container`);
for (let i = 0; i < FILM_TOP_COUNT; i++) {
  render(filmContainerTop, createFilmCardTemplate(films[i]), `beforeend`);
}

// Отрисовска колонки с фильмами MOST
const filmContainerMost = document.querySelector(`.films-list:nth-of-type(3) .films-list__container`);
for (let i = 0; i < FILM_MOST_COUNT; i++) {
  render(filmContainerMost, createFilmCardTemplate(films[i]), `beforeend`);
}


/*
  1. Вешаем обработчик на каждую картинку в карточке
  2. Обработчик вызывает отрисовку popup.
  3. При нажатии на крестик в попапе, он удаляется из разметки.
 */

// Функция поиска фильма по id
const searchFilmId = (id) => {
  const searchFilm = [];
  films.forEach((film) => {
    if (film[`id`] === id) {
      searchFilm.push(film);
    };
  });
  return searchFilm[0];
};

// Функция поиска комментариев к фильму
const searchCommentsFilmId = (id) => {
  const commentsFilm = [];
  comments.forEach((comment) => {
    if (comment[`filmId`] === id) {
      commentsFilm.push(comment);
    };
  });
  return commentsFilm;
};

const footerContainer = document.querySelector(`footer`);
document.querySelectorAll(`.film-card`).forEach((card) => {
  // Вешаем обработчик на картинку
  card.children[3].addEventListener(`click`, () => {
    // Отрисовывем после футера попап, кототрый с помощью css правил перекрывает собой
    // все отображение на страничке
    // ...
    // 1. Считать атрбиут ID.
    const filmId = card.getAttribute(`data-id`).toString();
    const clickFilm = searchFilmId(filmId);
    console.log(clickFilm);
    const commentsFilm = searchCommentsFilmId(filmId)
    // 2. Найти фильма с данный атрибутом. Сделать в виде отдельной функции.
    // 3. Найти комментарии с данным атрибутом. Сделать в виде отдельной функции.
    render(footerContainer, createFilmPopupTemplate(clickFilm, commentsFilm), `afterend`);
    // Находим крестик в попап и вешаем на него обработчик, который
    // находит попап в разметке и удаляет его
    const filmPopupClose = document.querySelector(`.film-details__close-btn`);
    filmPopupClose.addEventListener(`click`, () => {
      const filmPopup = document.querySelector(`.film-details`);
      filmPopup.parentElement.removeChild(filmPopup);
    });
  });
});

