import MainContainerView from "./view/main-content.js";
import MainContainerNoFilmView from "./view/no-films.js";
import HeadListFilmsView from "./view/head-films.js";
import TopListFilmsView from "./view/top-films.js";
import MostListFilmsView from "./view/most-films.js";
import FilmCardView from "./view/film-card.js";
import ButtonShowMoreView from "./view/film-more.js";
import FilmPopupView from "./view/film-popup.js";
import {render, RenderPosition} from "./functions/render";

export default class FilmList {
  constructor(filmContainer) {
    this._filmContainer = filmContainer;

    this._filmListComponent = new MainContainerView();
    this._filmHeadListComponent = new HeadListFilmsView();
    this._filmTopListComponent = new TopListFilmsView();
    this._filmMostListComponent = new MostListFilmsView();
    this._filmComponent = new FilmCardView();
    this._filmPopupComponent = new FilmPopupView();
    this._loadMoreButtonComponent = new ButtonShowMoreView();
    this._noFilmsComponent = new MainContainerNoFilmView();

    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handlePopupFilmClickClose = this._handlePopupFilmClickClose.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(listFilms) {
    this._listFilms = listFilms.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
    render(this._filmContainer, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderFilmsContainer();
  }

  _handleFilmClick() {

  }

  _handlePopupFilmClickClose() {

  }

  _handleLoadMoreButtonClick() {

  }

  _renderFilm() {
    // Метод, куда уйдёт отрисовка фильма
  }

  _renderFilms(from, to) {
    // Метод для рендеринга N-фильмов за раз
  }

  _renderHeadFilms() {

  }

  _renderTopFilms() {

  }

  _renderMostFilms() {

  }

  _renderNoFilms() {
    render(this._filmListComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderLoadMoreButton() {
    // Метод отрисовки кнопки
  }

  _renderFilmsContainer() {
    // Отображение всех контейнеров
    if ((this._listFilms) && (this._listFilms.length > 0)) {
      render(this._filmListComponent, this._filmHeadListComponent, RenderPosition.BEFOREEND);
      render(this._filmListComponent, this._filmTopListComponent, RenderPosition.BEFOREEND);
      render(this._filmListComponent, this._filmMostListComponent, RenderPosition.BEFOREEND);
    }
    else {
      this._renderNoFilms();
    }

    this._renderHeadFilms();
    this._renderTopFilms();
    this._renderMostFilms();
  }
}
