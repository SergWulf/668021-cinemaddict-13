import {FilterType} from "./const.js";
export const ESCAPE = `Escape`;

export const runtimeToHourAndMinutes = (filmRuntime) => {
  const hourRuntime = Math.floor(filmRuntime / 60);
  const minutesRuntime = filmRuntime % 60;
  return {
    "hours": hourRuntime,
    "minutes": minutesRuntime
  };
};

export const FILTER = {
  [FilterType.ALL]: (films) => films.filter((film) => film.id),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isWatchList),
  [FilterType.WATCHED]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite)
};
