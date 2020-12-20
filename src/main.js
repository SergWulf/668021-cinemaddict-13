import HeaderProfileView from "./view/header-profile.js";
import MainFilterView from "./view/main-filter.js";
import SortView from "./view/main-sort.js";
import MainContainerView from "./view/main-content.js";
import FilmCardView from "./view/film-card.js";
import ButtonShowMoreView from "./view/film-more.js";
import {createFilmPopupTemplate} from "./view/film-popup.js";
import {FILM_COUNT, FILM_MOST_COUNT, FILM_TOP_COUNT, films, filmsTop, filmsMost, filters} from "./mock/data.js";
import {findFilmById, findCommentsByFilmId} from "./functions/find.js";
import {renderTemplate, renderElement, RenderPosition} from "./util.js";


const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`main`);
const clickableSelectorsCardByFilm = [`.film-card__poster`, `.film-card__title`, `.film-card__comments`];
let renderedFilmCardsCount = 0;

renderElement(siteHeader, new HeaderProfileView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMain, new MainFilterView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMain, new SortView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMain, new MainContainerView().getElement(), RenderPosition.BEFOREEND);

const clickByCard = (filmId) => {
  const footerContainer = document.querySelector(`footer`);
  const clickFilm = findFilmById(filmId);
  const commentsFilm = findCommentsByFilmId(filmId);
  renderTemplate(footerContainer, createFilmPopupTemplate(clickFilm, commentsFilm), `afterend`);

  const filmPopupClose = document.querySelector(`.film-details__close-btn`);
  filmPopupClose.addEventListener(`click`, () => {
    const filmPopup = document.querySelector(`.film-details`);
    filmPopup.parentElement.removeChild(filmPopup);
  });
};

const renderCardsFilms = (filmContainer, listFilms, count, renderedCount) => {
  if (listFilms.length < (renderedCount + count)) {
    count = listFilms.length;
  }
  for (let i = renderedCount; i < (renderedCount + count); i++) {
    const countComments = findCommentsByFilmId(listFilms[i][`id`]).length;
    renderElement(filmContainer, new FilmCardView(listFilms[i], countComments).getElement(), RenderPosition.BEFOREEND);
    const cards = filmContainer.querySelectorAll(`.film-card`);
    const card = cards[cards.length - 1];
    const currentFilmId = card.getAttribute(`data-id`).toString();
    clickableSelectorsCardByFilm.forEach((selector) => {
      card.querySelector(selector).addEventListener(`click`, () => {
        clickByCard(currentFilmId);
      });
    });
  }
};

const renderCardsFilmsHead = (containerHead) => {
  // Если есть кнопка в разметке, то удаляем ее.
  const showMore = containerHead.querySelector(`.films-list__show-more`);
  if (showMore) {
    showMore.parentElement.removeChild(showMore);
  }
  renderCardsFilms(containerHead, films, FILM_COUNT, renderedFilmCardsCount);
  // Если количество отображенных фильмов меньше общего количества фильмов,
  // то рисуем кнопку show more, иначе кнопка не нужна
  renderedFilmCardsCount = containerHead.querySelectorAll(`.film-card`).length;
  if (renderedFilmCardsCount < films.length) {
    renderElement(containerHead, new ButtonShowMoreView().getElement(), `beforeend`);
    containerHead.querySelector(`.films-list__show-more`).addEventListener(`click`, () => {
      renderCardsFilmsHead(containerHead);
    });
  }
};

const renderCardsFilmsTop = (containerTop) => {
  renderCardsFilms(containerTop, filmsTop, FILM_TOP_COUNT, 0);
};

const renderCardsFilmsMost = (containerMost) => {
  renderCardsFilms(containerMost, filmsMost, FILM_MOST_COUNT, 0);
};

// Отрисовка карточек фильмов в 3-ех блоках
const filmContainerHead = document.querySelector(`.films-list:nth-of-type(1) .films-list__container`);
renderCardsFilmsHead(filmContainerHead);
const filmContainerTop = document.querySelector(`.films-list:nth-of-type(2) .films-list__container`);
renderCardsFilmsTop(filmContainerTop);
const filmContainerMost = document.querySelector(`.films-list:nth-of-type(3) .films-list__container`);
renderCardsFilmsMost(filmContainerMost);
