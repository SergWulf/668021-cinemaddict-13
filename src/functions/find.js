import {comments, films} from "../mock/data.js";

// Функция поиска фильма по id
export const findFilmById = (id) => {
  return films.find((film) => film.id === id);
};

// Функция поиска комментариев к фильму
export const findCommentsByFilmId = (id) => {
  return comments.filter((comment) => comment.filmId === id);
};
