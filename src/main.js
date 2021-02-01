import HeaderProfileView from "./view/header-profile.js";
import {comments} from "./mock/data.js";
import ListFilmPresenter from "./presenter/film-list.js";
import {render, RenderPosition} from "./functions/render.js";
import FilmsModel from "./model/films.js";
import CommentsModel from "./model/comments.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import Api from "./api.js";
import {UpdateType} from "./const.js";

window.filmsFromServer = [];

const AUTHORIZATION = `Basic TwentyOneToLoadBomb`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;
const api = new Api(END_POINT, AUTHORIZATION);


const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`main`);

render(siteHeader, new HeaderProfileView(), RenderPosition.BEFOREEND);

const filmsModel = new FilmsModel();

const commentsModel = new CommentsModel();
//commentsModel.setComments(comments);

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(siteMain, filterModel, filmsModel);
const listFilmPresenter = new ListFilmPresenter(siteMain, filmsModel, commentsModel, filterModel, api);

filterPresenter.init();
listFilmPresenter.init();

api.getFilms()
  .then((films) => {
/*    const commentsToModel = [];
    for(let i = 0; i < films.length; i++) {
      api.getComments(films[i])
        .then(comments => {
          comments.map((comment) => {
            comment.filmId = films[i].id;
            commentsToModel.push(comment);
          });
        });
    }*/
    filmsModel.setFilms(UpdateType.INIT, films);
    const footerStatistics = document.querySelector(`.footer__statistics`);
    const countFilms = document.createElement(`p`);
    countFilms.textContent = `${filmsModel.getFilms().length} movies inside`;
    footerStatistics.appendChild(countFilms);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });






