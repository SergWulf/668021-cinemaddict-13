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
import {render, RenderPosition, remove, replace} from "../functions/render";
import {updateItem} from "../util.js";

export default class FilmList {
  constructor(filmListContainer, listFilms, listTopFilms, listMostFilms, filmsModel) {
    this._filmsModel = filmsModel;
    this._filmListContainer = filmListContainer;
    this._renderedFilmCardsCount = 0;

    this._listDefaultFilms = listFilms.slice();
    this._listHeadFilms = listFilms.slice();
    this._listTopFilms = listTopFilms.slice();
    this._listMostFilms = listMostFilms.slice();

    this._filmPresenter = {};

    this._sortComponent = new SortView();

    this._filmListComponent = new MainContainerView();
    this._filmHeadListComponent = new HeadListFilmsView();
    this._filmTopListComponent = new TopListFilmsView();
    this._filmMostListComponent = new MostListFilmsView();
    this._loadMoreButtonComponent = new ButtonShowMoreView();
    this._noFilmsComponent = new MainContainerNoFilmView();


    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleButtonSort = this._handleButtonSort.bind(this);
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
      case `default`:
        this._listHeadFilms = this._listDefaultFilms.slice();
        break;
      case `rating`:
        this._listHeadFilms = this._listDefaultFilms.slice().sort((prev, next) => {
          return next.rating - prev.rating;
        });
        break;
      case `date`:
        this._listHeadFilms = this._listDefaultFilms.slice().sort((prev, next) => {
          return next.release - prev.release;
        });
        break;
      default:
        this._listHeadFilms = this._listDefaultFilms.slice();
    }
  }

  _handleButtonSort(typeSort) {
    this._sortFilms(typeSort);
    this._filmHeadListComponentNew = new HeadListFilmsView();
    this._renderFilms(this._filmHeadListComponentNew, this._listHeadFilms, FILM_COUNT, 0);
    replace(this._filmHeadListComponentNew, this._filmHeadListComponent);
    remove(this._filmHeadListComponent);
    remove(this._loadMoreButtonComponent);
    this._filmHeadListComponent = this._filmHeadListComponentNew;
    this._renderLoadMoreButton();
  }

  _handleFilmChange(updatedFilm) {
    this._listHeadFilms = updateItem(this._listHeadFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }


  _handleLoadMoreButtonClick() {
    this._renderHeadFilms();

    if (this._renderedFilmCardsCount === this._listHeadFilms.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderFilms(filmContainer, currentListFilms, count, renderedCount) {
    if (currentListFilms.length < (renderedCount + count)) {
      count = currentListFilms.length - renderedCount;
    }
    for (let i = renderedCount; i < (renderedCount + count); i++) {
      const comments = findCommentsByFilmId(currentListFilms[i][`id`]);
      const filmContainerDiv = filmContainer.getElement().querySelector(`.films-list__container`);
      const filmPresenter = new FilmPresenter(filmContainerDiv, comments, this._handleFilmChange);
      filmPresenter.init(currentListFilms[i]);
      this._filmPresenter[currentListFilms[i].id] = filmPresenter;
    }
  }

  _renderHeadFilms() {
    this._renderFilms(this._filmHeadListComponent, this._listHeadFilms, FILM_COUNT, this._renderedFilmCardsCount);
    this._renderedFilmCardsCount = this._filmHeadListComponent.getElement().querySelectorAll(`.film-card`).length;
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
    render(this._filmHeadListComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderFilmsContainer() {
    // Отображение всех контейнеров если есть хотя бы 1 фильм, иначе заглушка
    if (this._listHeadFilms.length > 0) {
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
