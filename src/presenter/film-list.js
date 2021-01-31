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
import {UserAction, UpdateType, SortType, FilterType} from "../const.js";
import {filter} from "../util.js";

export default class FilmList {
  constructor(filmListContainer, filmsModel, commentsModel, filterModel) {
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;
    this._filmListContainer = filmListContainer;
    this._renderedFilmCardsCount = 0;

    this._filmPresenter = {};
    this._openPopup = null;

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

    this._handleSetOpenPopup = this._handleSetOpenPopup.bind(this);
    this._handleCheckOpenPopup = this._handleCheckOpenPopup.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._commentsModel.addObserver(this._handleModelEvent);
  }

  init() {

    this._currentFilterType = this._filterModel.getFilter();
    this._currentSortType = SortType.DEFAULT;
    this._activeFilterFilms = null;

    render(this._filmListComponent, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setClickButtonSortHandler(this._handleButtonSort);

    render(this._filmListContainer, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmHeadListComponent, RenderPosition.BEFOREEND);
    /*    render(this._filmListComponent, this._filmTopListComponent, RenderPosition.BEFOREEND);
        render(this._filmListComponent, this._filmMostListComponent, RenderPosition.BEFOREEND);*/

    this._renderFilmsContainer();
  }

  _handleSetOpenPopup(currentPopup) {
    if (this._openPopup === null) {
      this._openPopup = currentPopup;
    } else {
      this._openPopup = null;
    }
  }

  _handleCheckOpenPopup() {
    if (this._openPopup !== null) {
      remove(this._openPopup);
      document.body.classList.remove(`hide-overflow`);
      this._openPopup = null;
    }
  }

  _getFilms() {
    // глобальная функция

    switch (this._currentFilterType) {
      case FilterType.ALL:
        this._activeFilterFilms = filter[FilterType.ALL](this._filmsModel.getFilms());
        break;
      case FilterType.WATCHED:
        this._activeFilterFilms = filter[FilterType.WATCHED](this._filmsModel.getFilms());
        break;
      case FilterType.WATCHLIST:
        this._activeFilterFilms = filter[FilterType.WATCHLIST](this._filmsModel.getFilms());
        break;
      case FilterType.FAVORITES:
        this._activeFilterFilms = filter[FilterType.FAVORITES](this._filmsModel.getFilms());
        break;
    }

    switch (this._currentSortType) {
      case SortType.RATING:
        return this._activeFilterFilms.slice().sort((prev, next) => {
          return next.rating - prev.rating;
        });
      case SortType.DATE:
        return this._activeFilterFilms.slice().sort((prev, next) => {
          return next.release - prev.release;
        });
      case SortType.MOST:
        return this._activeFilterFilms.slice().map((filmMost) => {
          filmMost.countComments = findCommentsByFilmId(filmMost.id).length;
          return filmMost;
        }).sort((prev, next) => {
          return next.countComments - prev.countComments;
        });
      case SortType.DEFAULT:
        return this._activeFilterFilms.slice();
    }
    return this._filmsModel.getFilms();
    /*
      1. Проверяет флаг активного фильтра, в зависимости от этого возвращает отфильтроанный массив.

      2. Проверяет флаг активной сортировки, если сортировка default, то ничего не делаем, а возвращаем отфильтрованный массив.
      3. Если сортировка по date или rating, то берём отфильтрованный массив и сортируем его, и возвращаем его.

      P.S.
      Не по теме:

      Обработчик фильтра.
      При нажатии на кнопку фильтра: устанавливается активный фильтр и подсвечивается в меню фильтров,
       сбрасывается активная сортировка в default и также подсвечиваем в меню сортировки default,
       происходит перерисовка фильмов.

      Обработчик кнопки сортировки:
      При нажатии на кнопку сортировки: устанавливаем активную сортировку, просиходит перерисовка фильмов.
    * */
  }

  _sortFilms(type) {
    switch (type) {
      case SortType.RATING:
        this._currentSortType = SortType.RATING;
        break;
      case SortType.DATE:
        this._currentSortType = SortType.DATE;
        break;
      case SortType.MOST:
        this._currentSortType = SortType.MOST;
        break;
      case SortType.DEFAULT:
        this._currentSortType = SortType.DEFAULT;
    }
  }

  _replaceHeadContainer() {
    this._filmHeadListComponentNew = new HeadListFilmsView();
    const films = this._getFilms().slice(0, FILM_COUNT);
    this._renderFilms(this._filmHeadListComponentNew, films);
    replace(this._filmHeadListComponentNew, this._filmHeadListComponent);
    remove(this._filmHeadListComponent);
    remove(this._loadMoreButtonComponent);
    this._filmHeadListComponent = this._filmHeadListComponentNew;
    this._renderedFilmCardsCount = this._filmHeadListComponent.getElement().querySelectorAll(`.film-card`).length;
    if (this._getFilms().length > 5) {
      this._renderLoadMoreButton();
    }
  }

  _handleButtonSort(typeSort) {
    this._sortFilms(typeSort);
    this._replaceHeadContainer();
  }

  _handleViewAction(actionType, updateType, update) {
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
    // В зависимости от типа изменений решаем, что делать:
    // - обновить данные
    // - обновить данные и перерисовать список фильмов
    // - обновить данные фильтра и перерисовать список фильмов
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть данные фильма
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._filmPresenter[data.id].init(data);
        this._replaceHeadContainer();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._currentFilterType = this._filterModel.getFilter();
        this._currentSortType = SortType.DEFAULT;
        this._sortComponent.init();
        this._replaceHeadContainer();
        break;
      case UpdateType.DELETE:
        this._filmPresenter[data.filmId].init();
        this._filmPresenter[data.filmId].replacePopupComponent();
        break;
      case UpdateType.ADD:
        this._filmPresenter[data.filmId].init();
        this._filmPresenter[data.filmId].replacePopupComponent();
    }
  }

  deletePopup() {
    const isPopup = document.querySelector(`.film-details`);
    if (isPopup) {
      isPopup.remove();
    }
  }

  _handleLoadMoreButtonClick() {
    this._renderHeadFilms();
  }

  _renderFilms(filmContainer, currentListFilms) {
    for (let i = 0; i < currentListFilms.length; i++) {
      const filmContainerDiv = filmContainer.getElement().querySelector(`.films-list__container`);
      const filmPresenter = new FilmPresenter(filmContainerDiv, this._commentsModel, this._handleViewAction, this._filterModel, this._handleSetOpenPopup, this._handleCheckOpenPopup);
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
    const prevSortType = this._currentSortType;
    const prevActiveFilter = this._currentFilterType;
    this._currentSortType = SortType.RATING;
    this._currentFilterType = FilterType.ALL;
    const films = this._getFilms().slice(0, FILM_TOP_COUNT);
    this._renderFilms(this._filmTopListComponent, films);
    this._currentSortType = prevSortType;
    this._currentFilterType = prevActiveFilter;
  }

  _renderMostFilms() {
    const prevSortType = this._currentSortType;
    const prevActiveFilter = this._currentFilterType;
    this._currentSortType = SortType.MOST;
    this._currentFilterType = FilterType.ALL;
    const films = this._getFilms().slice(0, FILM_MOST_COUNT);
    this._renderFilms(this._filmMostListComponent, films);
    this._currentSortType = prevSortType;
    this._currentFilterType = prevActiveFilter;
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
      /*      render(this._filmListComponent, this._filmTopListComponent, RenderPosition.BEFOREEND);
            render(this._filmListComponent, this._filmMostListComponent, RenderPosition.BEFOREEND);*/
    } else {
      this._renderNoFilms();
    }

    this._renderHeadFilms();
    if (this._getFilms().length > 5) {
      this._renderLoadMoreButton();
    }

    /*    this._renderTopFilms();
        this._renderMostFilms();*/
  }
}
