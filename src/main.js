import {createHeaderProfileTemplate} from "./view/header-profile.js";
import {createMainFilterTemplate} from "./view/main-filter.js";
import {createMainSortTemplate} from "./view/main-sort.js";
import {createMainContentTemplate} from "./view/main-content.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createButtonShowMoreTemplate} from "./view/film-more.js";
import {createFilmPopupTemplate} from "./view/film-popup.js";
import {generateFilm} from "./mock/film.js";
import {generateComment} from "./mock/comment.js";
import {generateFilter} from "./mock/filter.js";


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const films = [];
const comments = [];

// Генерируем моки: фильмы и комментарии.
for (let i = 0; i < 25; i++) {
  films.push(generateFilm());
  // Генерируем кол-во комментарием к фильму от 0 до 5
  const commentCount = getRandomInt(6);
  // При создании комментария передаем параметр фильма id,
  // тем самым связывая фильм с комментариями
  for (let j = 0; j < commentCount; j++) {
    comments.push(generateComment(films[i].id));
  }
}

// Генерируем фильтры для фильмов
const filters = generateFilter(films);

const FILM_COUNT = 5;
const FILM_TOP_COUNT = 2;
const FILM_MOST_COUNT = 2;
let countRenderCardFilms = 0;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`main`);

render(siteHeader, createHeaderProfileTemplate(), `beforeend`);
render(siteMain, createMainFilterTemplate(filters), `beforeend`);
render(siteMain, createMainSortTemplate(), `beforeend`);
render(siteMain, createMainContentTemplate(), `beforeend`);

// Функция поиска фильма по id
const searchFilmId = (id) => {
  const searchFilm = [];
  films.forEach((film) => {
    if (film[`id`] === id) {
      searchFilm.push(film);
    }
  });
  return searchFilm[0];
};

// Функция поиска комментариев к фильму
const searchCommentsFilmId = (id) => {
  const commentsFilm = [];
  comments.forEach((comment) => {
    if (comment[`filmId`] === id) {
      commentsFilm.push(comment);
    }
  });
  return commentsFilm;
};

/*
  1. Вешаем обработчик на каждую картинку в карточке
  2. Обработчик вызывает отрисовку popup.
  3. При нажатии на крестик в попапе, он удаляется из разметки.
 */

const createEventsForCardFilm = () => {
  const footerContainer = document.querySelector(`footer`);
  document.querySelectorAll(`.film-card`).forEach((card) => {
    // Вешаем обработчик на картинку
    card.children[3].addEventListener(`click`, () => {
      const filmId = card.getAttribute(`data-id`).toString();
      const clickFilm = searchFilmId(filmId);
      const commentsFilm = searchCommentsFilmId(filmId);
      render(footerContainer, createFilmPopupTemplate(clickFilm, commentsFilm), `afterend`);

      const filmPopupClose = document.querySelector(`.film-details__close-btn`);
      filmPopupClose.addEventListener(`click`, () => {
        const filmPopup = document.querySelector(`.film-details`);
        filmPopup.parentElement.removeChild(filmPopup);
      });
    });
  });
};

const renderCardsFilms = (filmContainer, listFilms, count) => {
  // Проверка 1
  // Если есть кнопка в разметке, то удаляем ее.
  const showMore = filmContainer.querySelector(`.films-list__show-more`);
  if (showMore) {
    showMore.parentElement.removeChild(showMore);
  }
  // Отрисовка заданного количества фильмов
  for (let i = countRenderCardFilms; i < (countRenderCardFilms + count); i++) {
    const countComments = searchCommentsFilmId(listFilms[i][`id`]).length;
    render(filmContainer, createFilmCardTemplate(listFilms[i], countComments), `beforeend`);
  }
  // Проверка №2
  // Если контейнер для отображения фильмов главный,
  // и количество отображенных фильмов меньше общего количества фильмов,
  // то рисуем кнопку show more, иначе кнопка не нужна
  countRenderCardFilms = filmContainer.querySelectorAll(`.film-card`).length;
  if ((filmContainer.classList.contains(`all-movies`)) && (countRenderCardFilms < films.length)) {
    render(filmContainer, createButtonShowMoreTemplate(), `beforeend`);
    filmContainer.querySelector(`.films-list__show-more`).addEventListener(`click`, () => {
      renderCardsFilms(filmContainer, films, FILM_COUNT);
    });
  }
};

// Отрисовка карточек фильмов в 3-ех блоках
const filmContainerHead = document.querySelector(`.films-list:nth-of-type(1) .films-list__container`);
renderCardsFilms(filmContainerHead, films, FILM_COUNT);
const filmContainerTop = document.querySelector(`.films-list:nth-of-type(2) .films-list__container`);
renderCardsFilms(filmContainerTop, films, FILM_TOP_COUNT);
const filmContainerMost = document.querySelector(`.films-list:nth-of-type(3) .films-list__container`);
renderCardsFilms(filmContainerMost, films, FILM_MOST_COUNT);

// Повесить обработчики на карточки
createEventsForCardFilm();


