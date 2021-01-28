const filmToFilterMap = {
  watch: (films) => films.filter((film) => film.isWatchList).length,
  watched: (films) => films.filter((film) => film.isWatched).length,
  favorites: (films) => films.filter((film) => film.isFavorite).length
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films)
  }));
};
