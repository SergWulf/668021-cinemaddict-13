import HeaderProfileView from "./view/header-profile.js";
import MainFilterView from "./view/main-filter.js";
import SortView from "./view/main-sort.js";
import MainContainerView from "./view/main-content.js";
import HeadListFilmsView from "./view/head-films.js";
import TopListFilmsView from "./view/top-films.js";
import MostListFilmsView from "./view/most-films.js";
import MainContainerNoFilmView from "./view/no-films.js";
import FilmCardView from "./view/film-card.js";
import ButtonShowMoreView from "./view/film-more.js";
import FilmPopupView from "./view/film-popup.js";
import {FILM_COUNT, FILM_MOST_COUNT, FILM_TOP_COUNT, films, filmsTop, filmsMost, filters} from "./mock/data.js";
import {findFilmById, findCommentsByFilmId} from "./functions/find.js";
import {ESCAPE} from "./util.js";
import {render, RenderPosition, append, remove} from "./functions/render";


const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`main`);
let renderedFilmCardsCount = 0;

// Отрисовка шапки, фильтров и сортировки. //позже удалю коммент :)
render(siteHeader, new HeaderProfileView(), RenderPosition.BEFOREEND);
render(siteMain, new MainFilterView(filters), RenderPosition.BEFOREEND);
render(siteMain, new SortView(), RenderPosition.BEFOREEND);

// PRESENTER LIST-FILM.js
const mainContainerView = new MainContainerView();
const filmContainerHead = new HeadListFilmsView();
const filmContainerTop = new TopListFilmsView();
const filmContainerMost = new MostListFilmsView();

render(siteMain, mainContainerView, RenderPosition.BEFOREEND);

// Отрисовка пустой страницы, если фильмов нет, иначе отрисовка фильмов
if ((films) && (films.length > 0)) {
  render(mainContainerView, filmContainerHead, RenderPosition.BEFOREEND);
  render(mainContainerView, filmContainerTop, RenderPosition.BEFOREEND);
  render(mainContainerView, filmContainerMost, RenderPosition.BEFOREEND);
} else {
  render(mainContainerView, new MainContainerNoFilmView(), RenderPosition.BEFOREEND);
}

const clickByCard = (filmId) => {
  const footerContainer = document.querySelector(`footer`);
  const clickFilm = findFilmById(filmId);
  const commentsFilm = findCommentsByFilmId(filmId);
  const filmPopup = new FilmPopupView(clickFilm, commentsFilm);
  append(footerContainer, filmPopup);
  document.body.classList.add(`hide-overflow`);
  const deletePopup = () => {
    remove(filmPopup);
    document.body.classList.remove(`hide-overflow`);
  };
  filmPopup.setClickClosePopupHandler(deletePopup);
  document.body.addEventListener(`keyup`, (evt) => {
    if ((evt.key === ESCAPE) && (document.querySelector(`.film-details`))) {
      deletePopup();
    }
  });
};

const renderCardsFilms = (filmContainer, listFilms, count, renderedCount) => {
  if (listFilms.length < (renderedCount + count)) {
    count = listFilms.length;
  }
  for (let i = renderedCount; i < (renderedCount + count); i++) {
    const countComments = findCommentsByFilmId(listFilms[i][`id`]).length;
    const filmCard = new FilmCardView(listFilms[i], countComments);
    render(filmContainer.getElement().querySelector(`.films-list__container`), filmCard, RenderPosition.BEFOREEND);
    filmCard.setClickShowPopupHandler(clickByCard);
  }
};

const renderCardsFilmsHead = () => {
  // Если есть кнопка в разметке, то удаляем ее.
  const showMore = filmContainerHead.getElement().querySelector(`.films-list__show-more`);
  if (showMore) {
    showMore.parentElement.removeChild(showMore);
  }
  renderCardsFilms(filmContainerHead, films, FILM_COUNT, renderedFilmCardsCount);
  // Если количество отображенных фильмов меньше общего количества фильмов,
  // то рисуем кнопку show more, иначе кнопка не нужна
  renderedFilmCardsCount = filmContainerHead.getElement().querySelectorAll(`.film-card`).length;
  if (renderedFilmCardsCount < films.length) {
    const buttonShowMore = new ButtonShowMoreView();
    render(filmContainerHead, buttonShowMore, RenderPosition.BEFOREEND);
    buttonShowMore.setClickHandler(renderCardsFilmsHead);
  }
};

const renderCardsFilmsTop = (containerTop) => {
  renderCardsFilms(containerTop, filmsTop, FILM_TOP_COUNT, 0);
};

const renderCardsFilmsMost = (containerMost) => {
  renderCardsFilms(containerMost, filmsMost, FILM_MOST_COUNT, 0);
};

// Отрисовка карточек фильмов в 3-ех блоках
renderCardsFilmsHead(filmContainerHead);
renderCardsFilmsTop(filmContainerTop);
renderCardsFilmsMost(filmContainerMost);
