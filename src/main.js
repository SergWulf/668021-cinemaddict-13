import HeaderProfileView from "./view/header-profile.js";
import MainFilterView from "./view/main-filter.js";
import SortView from "./view/main-sort.js";
import {films, filmsTop, filmsMost, filters} from "./mock/data.js";
import ListFilmPresenter from "./presenter/list-films";
import {render, RenderPosition} from "./functions/render";

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`main`);

render(siteHeader, new HeaderProfileView(), RenderPosition.BEFOREEND);
render(siteMain, new MainFilterView(filters), RenderPosition.BEFOREEND);
render(siteMain, new SortView(), RenderPosition.BEFOREEND);

const listFilmPresenter = new ListFilmPresenter(siteMain);
listFilmPresenter.init(films, filmsTop, filmsMost);
