import FilmCardView from "../view/film-card.js";
import FilmPopupView from "../view/film-popup.js";
import {render, replace, RenderPosition, append, remove} from "../functions/render";
import {ESCAPE} from "../util.js";

const footerContainer = document.querySelector(`footer`);

export default class Film {
  constructor(filmContainer, filmComments, changeData) {
    this._filmContainer = filmContainer;

    this._filmComments = filmComments;

    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._changeData = changeData;

    this._handleFilmClick = this._handleFilmClick.bind(this);

    this._handlePopupFilmClickClose = this._handlePopupFilmClickClose.bind(this);
    this._handleIconClick = this._handleIconClick.bind(this);

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);

    this._setFilmPopupHandlers = this._setFilmPopupHandlers.bind(this);
  }

  _handleIconClick() {

  }

  _handlePopupFilmClickClose() {
    remove(this._filmPopupComponent);
    document.body.classList.remove(`hide-overflow`);
    this._filmComponentNew = new FilmCardView(this._film, this._filmComments.length);
    replace(this._filmComponentNew, this._filmComponent);
    this._filmComponent = this._filmComponentNew;
    this._setFilmHandlers();
  }

  _setFilmPopupHandlers() {
    this._filmPopupComponent.setClickClosePopupHandler(this._handlePopupFilmClickClose);
    this._filmPopupComponent.setClickLabelFavoriteHandler(this._handleFavoriteClick);
    this._filmPopupComponent.setClickLabelWatchedHandler(this._handleWatchedClick);
    this._filmPopupComponent.setClickLabelWatchListHandler(this._handleWatchListClick);
    this._filmPopupComponent.setClickLabelIconsHandler(this._handleIconClick);
  }

  _handleFilmClick() {
    this._filmPopupComponent = new FilmPopupView(this._film, this._filmComments, this._setFilmPopupHandlers);
    append(footerContainer, this._filmPopupComponent);
    document.body.classList.add(`hide-overflow`);

    this._setFilmPopupHandlers();

    document.body.addEventListener(`keyup`, (evt) => {
      if ((evt.key === ESCAPE) && (document.querySelector(`.film-details`))) {
        this._handlePopupFilmClickClose();
      }
    });
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._film, {isFavorite: !this._film.isFavorite}));
  }

  _handleWatchListClick() {
    this._changeData(Object.assign({}, this._film, {isWatchList: !this._film.isWatchList}));
  }

  _handleWatchedClick() {
    this._changeData(Object.assign({}, this._film, {isWatched: !this._film.isWatched}));
  }

  _setFilmHandlers() {
    this._filmComponent.setClickShowPopupHandler(this._handleFilmClick);
    this._filmComponent.setClickButtonFavoriteHandler(this._handleFavoriteClick);
    this._filmComponent.setClickButtonWatchedHandler(this._handleWatchedClick);
    this._filmComponent.setClickButtonWatchListHandler(this._handleWatchListClick);
  }

  init(film) {
    this._film = film;

    if (this._filmComponent === null) {
      this._filmComponent = new FilmCardView(this._film, this._filmComments.length);
      render(this._filmContainer, this._filmComponent, RenderPosition.BEFOREEND);
      this._setFilmHandlers(this._filmComponent);
    }
  }

}
