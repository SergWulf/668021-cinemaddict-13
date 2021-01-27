import HeaderProfileView from "./view/header-profile.js";
import MainFilterView from "./view/main-filter.js";
import {films, filters} from "./mock/data.js";
import ListFilmPresenter from "./presenter/film-list";
import {render, RenderPosition} from "./functions/render";
import FilmsModel from "./model/films";
import CommentsModel from "./model/comments";
import FiltersModel from "./model/filters";

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`main`);

render(siteHeader, new HeaderProfileView(), RenderPosition.BEFOREEND);
render(siteMain, new MainFilterView(filters), RenderPosition.BEFOREEND);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const listFilmPresenter = new ListFilmPresenter(siteMain, filmsModel);
listFilmPresenter.init();
