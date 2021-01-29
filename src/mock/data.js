import {generateFilm} from "./film.js";
import {generateComment} from "./comment.js";
import {generateFilter} from "./filter.js";
import {getRandomInteger} from "../functions/random.js";
import {findCommentsByFilmId} from "../functions/find.js";

export const FILM_COUNT = 5;
export const FILM_TOP_COUNT = 2;
export const FILM_MOST_COUNT = 2;
export const films = [];
export const comments = [];

// Генерируем моки: фильмы и комментарии.
for (let i = 0; i < 13; i++) {
  films.push(generateFilm());
  // Генерируем кол-во комментарием к фильму от 0 до 5
  const commentCount = getRandomInteger(0, 6);
  // При создании комментария передаем параметр фильма id,
  // тем самым связывая фильм с комментариями
  for (let j = 0; j < commentCount; j++) {
    comments.push(generateComment(films[i].id));
  }
}


export const filmsTop = films.slice().sort((prev, next) => {
  return next.rating - prev.rating;
});

export let filmsMost = films.slice();

filmsMost.forEach((filmMost) => {
  filmMost.countComments = findCommentsByFilmId(filmMost.id).length;
});

filmsMost = filmsMost.sort((prev, next) => {
  return next.countComments - prev.countComments;
});

// Генерируем фильтры для фильмов
export const filters = generateFilter(films);

