import AbstractView from "./abstract.js";

const clickableSelectorsCardByFilm = [`.film-card__poster`, `.film-card__title`, `.film-card__comments`];
const classActiveStatus = `film-card__controls-item--active`;

const createFilmCardTemplate = (film, countComments) => {

  return `<article class="film-card" data-id="${film.id}">
          <h3 class="film-card__title">${film.title}</h3>
          <p class="film-card__rating">${film.rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${film.release}</span>
            <span class="film-card__duration">${film.runtime}</span>
            <span class="film-card__genre">${film.genres[0]}</span>
          </p>
          <img src="${film.poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${film.description}</p>
          <a class="film-card__comments">${countComments} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${film.isWatchList ? classActiveStatus : ``}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${film.isWatched ? classActiveStatus : ``}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${film.isFavorite ? classActiveStatus : ``}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};


export default class FilmCard extends AbstractView {
  constructor(film, comments) {
    super();
    this._film = film;
    this._comments = comments;

    this._clickShowPopupHandler = this._clickShowPopupHandler.bind(this);
    this._clickButtonFavoriteHandler = this._clickButtonFavoriteHandler.bind(this);
    this._clickButtonWatchedHandler = this._clickButtonWatchedHandler.bind(this);
    this._clickButtonWatchListHandler = this._clickButtonWatchListHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film, this._comments);
  }

  _clickShowPopupHandler(evt) {
    evt.preventDefault();
    this._callback.click(this._film.id);
  }

  _clickButtonFavoriteHandler(evt) {
    evt.preventDefault();
    evt.target.classList.toggle(classActiveStatus);
    this._callback.favoriteClick();
  }

  _clickButtonWatchedHandler(evt) {
    evt.preventDefault();
    evt.target.classList.toggle(classActiveStatus);
    this._callback.watchedClick();
  }

  _clickButtonWatchListHandler(evt) {
    evt.preventDefault();
    evt.target.classList.toggle(classActiveStatus);
    this._callback.watchListClick();
  }

  setClickButtonFavoriteHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._clickButtonWatchListHandler);
  }

  setClickButtonWatchedHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._clickButtonWatchedHandler);
  }

  setClickButtonWatchListHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._clickButtonFavoriteHandler);
  }

  setClickShowPopupHandler(callback) {
    this._callback.click = callback;
    clickableSelectorsCardByFilm.forEach((selector) => {
      this.getElement().querySelector(selector).addEventListener(`click`, this._clickShowPopupHandler);
    });
  }
}
