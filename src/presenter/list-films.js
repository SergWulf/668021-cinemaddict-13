import MainContainerView from "./view/main-content.js";
import MainContainerNoFilmView from "./view/no-films.js";
import HeadListFilmsView from "./view/head-films.js";
import TopListFilmsView from "./view/top-films.js";
import MostListFilmsView from "./view/most-films.js";
import FilmCardView from "./view/film-card.js";
import ButtonShowMoreView from "./view/film-more.js";
import FilmPresenter from "./view/film.js";
import {findCommentsByFilmId} from "./functions/find.js";
import {FILM_COUNT, FILM_MOST_COUNT, FILM_TOP_COUNT, films, filmsTop, filmsMost, filters} from "./mock/data.js";
import {render, RenderPosition, remove} from "./functions/render";

let renderedFilmCardsCount = 0;

export default class FilmList {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;

    this._filmListComponent = new MainContainerView();
    this._filmHeadListComponent = new HeadListFilmsView();
    this._filmTopListComponent = new TopListFilmsView();
    this._filmMostListComponent = new MostListFilmsView();
    this._loadMoreButtonComponent = new ButtonShowMoreView();
    this._noFilmsComponent = new MainContainerNoFilmView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(listFilms, listTopFilms, listMostFilms) {
    this._listFilms = listFilms.slice();
    this._listTopFilms = listTopFilms.slice();
    this._listMostFilms = listMostFilms.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
    render(this._filmListContainer, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmHeadListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmTopListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmMostListComponent, RenderPosition.BEFOREEND);

    this._renderFilmsContainer();
  }

  _handleLoadMoreButtonClick() {
    this._renderHeadFilms();

    if (renderedFilmCardsCount < this._listFilms.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderFilm(currentFilm) {

  }

  _renderFilms(filmContainer, films, count, renderedCount) {
    // Метод для рендеринга N-фильмов за раз
    if (films.length < (renderedCount + count)) {
      count = films.length;
    }
    for (let i = renderedCount; i < (renderedCount + count); i++) {
      const comments = findCommentsByFilmId(films[i][`id`]);
      const filmContainerDiv = filmContainer.getElement().querySelector(`.films-list__container`);
      const filmPresenter = new FilmPresenter(filmContainerDiv, films[i], comments);
      filmPresenter.init();
      // Presenter Film *******
      filmCard.setClickShowPopupHandler(clickByCard);
      //
    }
  }

  _renderHeadFilms() {
    this._renderFilms(this._filmHeadListComponent, this._listFilms, FILM_COUNT, renderedFilmCardsCount);
    renderedFilmCardsCount = this._filmHeadListComponent.getElement().querySelectorAll(`.film-card`).length;
  }

  _renderTopFilms() {
    this._renderFilms(this._filmTopListComponent, this._listTopFilms, FILM_TOP_COUNT, 0);
  }

  _renderMostFilms() {
    this._renderFilms(this._filmMostListComponent, this._listMostFilms, FILM_MOST_COUNT, 0);
  }

  _renderNoFilms() {
    render(this._filmListComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderLoadMoreButton() {
    // Метод отрисовки кнопки
    render(this._filmHeadListComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderFilmsContainer() {
    // Отображение всех контейнеров если есть хотя бы 1 фильм, иначе заглушка
    if ((this._listFilms) && (this._listFilms.length > 0)) {
      render(this._filmListComponent, this._filmHeadListComponent, RenderPosition.BEFOREEND);
      render(this._filmListComponent, this._filmTopListComponent, RenderPosition.BEFOREEND);
      render(this._filmListComponent, this._filmMostListComponent, RenderPosition.BEFOREEND);
    }
    else {
      this._renderNoFilms();
    }

    this._renderHeadFilms();
    this._renderLoadMoreButton();
    this._renderTopFilms();
    this._renderMostFilms();
  }
}
