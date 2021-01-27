import HeaderProfileView from "./view/header-profile.js";
import MainFilterView from "./view/main-filter.js";
import {films, comments} from "./mock/data.js";
import ListFilmPresenter from "./presenter/film-list";
import {render, RenderPosition} from "./functions/render";
import FilmsModel from "./model/films";
import CommentsModel from "./model/comments";
import FiltersModel from "./model/filters.js";

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`main`);

const filters = [
  {
    type: `all`,
    name: `ALL`,
    count: 0
  }
];

render(siteHeader, new HeaderProfileView(), RenderPosition.BEFOREEND);
render(siteMain, new MainFilterView(filters, `all`), RenderPosition.BEFOREEND);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const listFilmPresenter = new ListFilmPresenter(siteMain, filmsModel, commentsModel);
listFilmPresenter.init();
