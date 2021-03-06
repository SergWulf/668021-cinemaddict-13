import HeaderProfileView from "./view/header-profile.js";
import MainFilterView from "./view/main-filter.js";
import {films, filmsTop, filmsMost, filters} from "./mock/data.js";
import ListFilmPresenter from "./presenter/film-list";
import {render, RenderPosition} from "./functions/render";

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`main`);

render(siteHeader, new HeaderProfileView(), RenderPosition.BEFOREEND);
render(siteMain, new MainFilterView(filters), RenderPosition.BEFOREEND);

const listFilmPresenter = new ListFilmPresenter(siteMain, films, filmsTop, filmsMost);
listFilmPresenter.init();
