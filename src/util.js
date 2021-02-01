import {FilterType} from "./const.js";
export const ESCAPE = `Escape`;

export const FILTER = {
  [FilterType.ALL]: (films) => films.filter((film) => film.id),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isWatchList),
  [FilterType.WATCHED]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite)
};
