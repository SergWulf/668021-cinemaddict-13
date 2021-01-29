import HeaderProfileView from "./view/header-profile.js";
import {films, comments} from "./mock/data.js";
import ListFilmPresenter from "./presenter/film-list.js";
import {render, RenderPosition} from "./functions/render.js";
import FilmsModel from "./model/films.js";
import CommentsModel from "./model/comments.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`main`);

render(siteHeader, new HeaderProfileView(), RenderPosition.BEFOREEND);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(siteMain, filterModel, filmsModel);
const listFilmPresenter = new ListFilmPresenter(siteMain, filmsModel, commentsModel, filterModel);

filterPresenter.init();
listFilmPresenter.init();
