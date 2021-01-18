import FilmCardView from "./view/film-card.js";
import FilmPopupView from "./view/film-popup.js";

import {render, RenderPosition, append, remove} from "./functions/render";

export default class Film {
  constructor(filmContainer, film, filmComments) {
    this._filmContainer = filmContainer;
    this._film = film;
    this._filmComments = filmComments;

    this._filmComponent = new FilmCardView(this._film, this._filmComments.length);
    this._filmPopupComponent = new FilmPopupView(this._film, this._filmComments);

    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handlePopupFilmClickClose = this._handlePopupFilmClickClose.bind(this);

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
  }

  _handleFilmClick() {

  }

  _handlePopupFilmClickClose() {

  }

  _handleFavoriteClick() {

  }

  _handleWatchListClick() {

  }

  _handleWatchedClick() {

  }

  init() {
    render(this._filmContainer, this._filmComponent, RenderPosition.BEFOREEND);
    this._filmComponent.setClickShowPopupHandler(this._handleFilmClick);
  }

}
