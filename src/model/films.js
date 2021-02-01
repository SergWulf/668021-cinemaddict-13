import Observer from "../functions/observer.js";

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {

    window.filmsFromServer.push(film);

    const adaptedFilm = Object.assign({},
        film,
        {
          "poster": `./${film.film_info.poster}`,
          "title": film.film_info.title,
          "originalTitle": film.film_info.alternative_title,
          "rating": film.film_info.total_rating,
          "director": film.film_info.director,
          "screenwriters": film.film_info.writers,
          "actors": film.film_info.actors,
          "release": film.film_info.release.date,
          "runtime": film.film_info.runtime,
          "countries": film.film_info.release.release_country,
          "genres": film.film_info.genre,
          "description": film.film_info.description,
          "ageRating": `+${film.film_info.age_rating}`,
          "isWatchList": film.user_details.watchlist,
          "isWatched": film.user_details.already_watched,
          "isFavorite": film.user_details.favorite,
          "countComments": film.comments.length
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedFilm.comments;
    delete adaptedFilm.film_info;
    delete adaptedFilm.dueDate;
    delete adaptedFilm.isArchive;
    delete adaptedFilm.repeating;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {

    const adaptedFilm = Object.assign(
        {},
        window.filmsFromServer[film.id],
        {
          "user_details": {
            "watchlist": film.isWatchList,
            "already_watched": film.isWatched,
            "favorite": film.isFavorite,
            "watching_date": null
          }
        }
    );

    return adaptedFilm;
  }
}
