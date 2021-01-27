import MainContainerView from "../view/main-content";
import MainContainerNoFilmView from "../view/no-films.js";
import HeadListFilmsView from "../view/head-films.js";
import TopListFilmsView from "../view/top-films.js";
import MostListFilmsView from "../view/most-films.js";
import ButtonShowMoreView from "../view/film-more.js";
import SortView from "../view/main-sort.js";
import FilmPresenter from "../presenter/film.js";
import {findCommentsByFilmId} from "../functions/find.js";
import {FILM_COUNT, FILM_MOST_COUNT, FILM_TOP_COUNT} from "../mock/data.js";
import {render, RenderPosition, remove, replace} from "../functions/render.js";
import {UserAction, UpdateType} from "../const.js"


export default class FilmList {
  constructor(filmListContainer, filmsModel, commentsModel) {
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._filmListContainer = filmListContainer;
    this._renderedFilmCardsCount = 0;

    this._filmPresenter = {};

    this._sortComponent = new SortView();
    this._loadMoreButtonComponent = new ButtonShowMoreView();


    this._filmListComponent = new MainContainerView();
    this._filmHeadListComponent = new HeadListFilmsView();
    this._filmTopListComponent = new TopListFilmsView();
    this._filmMostListComponent = new MostListFilmsView();

    this._noFilmsComponent = new MainContainerNoFilmView();


    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleButtonSort = this._handleButtonSort.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._filmListComponent, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setClickButtonSortHandler(this._handleButtonSort);

    render(this._filmListContainer, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmHeadListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmTopListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmMostListComponent, RenderPosition.BEFOREEND);

    this._renderFilmsContainer();
  }

  _getFilms() {
    return this._filmsModel.getFilms();
  }

  _sortFilms(type) {
    switch (type) {
      case `rating`:
        return this._getFilms().slice().sort((prev, next) => {
          return next.rating - prev.rating;
        });
      case `date`:
        return this._getFilms().slice().sort((prev, next) => {
          return next.release - prev.release;
        });
      case `most`:
        return this._getFilms().slice().map((filmMost) => {
          filmMost.countComments = findCommentsByFilmId(filmMost.id).length;
          return filmMost;
        }).sort((prev, next) => {
          return next.countComments - prev.countComments;
        });
    }
    return this._getFilms().slice();
  }

  _handleButtonSort(typeSort) {
    this._filmHeadListComponentNew = new HeadListFilmsView();
    // Пофиксить render
    this._renderFilms(this._filmHeadListComponentNew, this._sortFilms(typeSort), FILM_COUNT, 0);
    replace(this._filmHeadListComponentNew, this._filmHeadListComponent);
    remove(this._filmHeadListComponent);
    remove(this._loadMoreButtonComponent);
    this._filmHeadListComponent = this._filmHeadListComponentNew;
    this._renderLoadMoreButton();
  }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._commentsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._commentsModel.deleteComment(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  }


  _handleLoadMoreButtonClick() {
    this._renderHeadFilms();
  }

  _renderFilms(filmContainer, currentListFilms) {
    for (let i = 0; i < currentListFilms.length; i++) {
      const comments = findCommentsByFilmId(currentListFilms[i][`id`]);
      const filmContainerDiv = filmContainer.getElement().querySelector(`.films-list__container`);
      const filmPresenter = new FilmPresenter(filmContainerDiv, comments, this._handleViewAction);
      filmPresenter.init(currentListFilms[i]);
      this._filmPresenter[currentListFilms[i].id] = filmPresenter;
    }
  }

  _renderHeadFilms() {
    this._currentCount = FILM_COUNT;
    if (this._getFilms().length < (this._renderedFilmCardsCount + this._currentCount)) {
      this._currentCount = this._getFilms().length - this._renderedFilmCardsCount;
    }
    const films = this._getFilms().slice(this._renderedFilmCardsCount, this._renderedFilmCardsCount + this._currentCount);
    this._renderFilms(this._filmHeadListComponent, films);
    this._renderedFilmCardsCount = this._filmHeadListComponent.getElement().querySelectorAll(`.film-card`).length;

    if (this._renderedFilmCardsCount >= this._getFilms().length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderTopFilms() {
    const films = this._sortFilms(`rating`).slice(0, FILM_TOP_COUNT);
    this._renderFilms(this._filmTopListComponent, films);
  }

  _renderMostFilms() {
    const films = this._sortFilms(`most`).slice(0, FILM_MOST_COUNT);
    this._renderFilms(this._filmMostListComponent, films);
  }

  _renderNoFilms() {
    render(this._filmListComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderLoadMoreButton() {
    render(this._filmHeadListComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderFilmsContainer() {
    // Отображение всех контейнеров если есть хотя бы 1 фильм, иначе заглушка
    if (this._getFilms().length > 0) {
      render(this._filmListComponent, this._filmHeadListComponent, RenderPosition.BEFOREEND);
      render(this._filmListComponent, this._filmTopListComponent, RenderPosition.BEFOREEND);
      render(this._filmListComponent, this._filmMostListComponent, RenderPosition.BEFOREEND);
    } else {
      this._renderNoFilms();
    }

    this._renderHeadFilms();
    this._renderLoadMoreButton();
    this._renderTopFilms();
    this._renderMostFilms();
  }
}
