import FilmCardView from "../view/film-card.js";
import FilmPopupView from "../view/film-popup.js";
import {render, replace, RenderPosition, append, remove} from "../functions/render.js";
import {ESCAPE} from "../util.js";
import {UserAction, UpdateType} from "../const.js";
import {FilterType} from "../const";

const footerContainer = document.querySelector(`footer`);

export default class Film {
  constructor(filmContainer, commentsModel, changeData, filterModel) {
    this._filmContainer = filmContainer;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;

    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._changeData = changeData;

    this._handleFilmClick = this._handleFilmClick.bind(this);

    this._handlePopupFilmClickClose = this._handlePopupFilmClickClose.bind(this);
    this._handleIconClick = this._handleIconClick.bind(this);
    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
    this._handleCtrlEnterClick = this._handleCtrlEnterClick.bind(this);

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);

    this._setFilmPopupHandlers = this._setFilmPopupHandlers.bind(this);
  }

  init(film) {
    if (film) {
      this._film = film;
    } else {
      console.log(`Идёт инициализация в презентере фильма, попап не должен быть null`, this);
    }
    this._filmComments = this._commentsModel.getComments().filter((comment) => {
      return comment.filmId === this._film.id;
    });
    if (this._filmPopupComponent !== null) {
      console.log(`Попап существует, сейчас попробуем обновить комменты для его отрисовки`);
      this._filmPopupComponent.init(this._filmComments);
      console.log(`Начинаем перерисовывать попап`);
      this._filmPopupComponent.updateElement();
      console.log(`Ура, все перерисовалось!`);
    }
    if (this._filmComponent === null) {
      this._filmComponent = new FilmCardView(this._film, this._filmComments.length);
      render(this._filmContainer, this._filmComponent, RenderPosition.BEFOREEND);
      this._setFilmHandlers();
    }
  }

  replacePopupComponent() {

  }

  _handleIconClick() {

  }

  _handleCtrlEnterClick(dataComment) {
    this._changeData(UserAction.ADD_COMMENT, UpdateType.ADD, dataComment);
  }

  _handleDeleteCommentClick(commentId) {
    const removeComment = this._filmComments.find((comment) => {
      return comment.id === commentId;
    });
    this._changeData(UserAction.DELETE_COMMENT, UpdateType.DELETE, removeComment);
  }

  _handlePopupFilmClickClose() {
    console.log('Этого сообщения не должно быть видно!')
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
    this._filmPopupComponent.setClickButtonDeleteHandler(this._handleDeleteCommentClick);
    this._filmPopupComponent.setClickCtrlEnterPopupHandler(this._handleCtrlEnterClick);
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
    console.log(`Попап появился и уже не должен пропадать!`, this);
  }

  _patchFilm(patch, cardFilter) {
    if (cardFilter === this._filterModel.getFilter()) {
      this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, Object.assign({}, this._film, patch));
    }

    this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, Object.assign({}, this._film, patch));
  }

  _handleFavoriteClick() {
    this._patchFilm({isFavorite: !this._film.isFavorite}, FilterType.FAVORITES);
  }

  _handleWatchListClick() {
    this._patchFilm({isWatchList: !this._film.isWatchList}, FilterType.WATCHLIST);
  }

  _handleWatchedClick() {
    this._patchFilm({isWatched: !this._film.isWatched}, FilterType.WATCHED);
  }

  _setFilmHandlers() {
    this._filmComponent.setClickShowPopupHandler(this._handleFilmClick);
    this._filmComponent.setClickButtonFavoriteHandler(this._handleFavoriteClick);
    this._filmComponent.setClickButtonWatchedHandler(this._handleWatchedClick);
    this._filmComponent.setClickButtonWatchListHandler(this._handleWatchListClick);
  }

}
