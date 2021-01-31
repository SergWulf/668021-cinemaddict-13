import Observer from "../functions/observer.js";
import {generateRandomBoolean} from "../functions/random";

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
    const adaptedFilm = Object.assign(
      {},
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
        "isFavorite": film.user_details.favorite
      }
    );

    // Ненужные ключи мы удаляем
    delete adaptedFilm.comments;
    delete adaptedFilm.film_info;
    delete adaptedFilm.dueDate;
    delete adaptedFilm.isArchive;
    delete adaptedFilm.isFavorite;
    delete adaptedFilm.repeating;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    // Нужно преобразовать poster и AgeRating
    const release = Object.assign({},
      {
        "release_country": film.countries,
        "date": film.release
      });

    const filmInfo = Object.assign({}, {
      "release": release,
      "poster": film.poster,
      "title": film.title,
      "alternative_title": film.originalTitle,
      "total_rating": film.rating,
      "director": film.director,
      "writers": film.screenwriters,
      "actors": film.actors,
      "runtime": film.runtime,
      "genre": film.genres,
      "description": film.description,
      "age_rating": film.ageRating,
    });

    const userDetails = Object.assign({}, {
      "watchlist": film.isWatchList,
      "already_watched": film.isWatched,
      "favorite": film.isFavorite
    });

    const adaptedFilm = Object.assign(
      {},
      film,
      {
        "film_info": filmInfo,
        "user_details": userDetails,
      }
    );

    // Ненужные ключи мы удаляем
    delete adaptedFilm.poster;
    delete adaptedFilm.title;
    delete adaptedFilm.originalTitle;
    delete adaptedFilm.rating;
    delete adaptedFilm.director;
    delete adaptedFilm.screenwriters;
    delete adaptedFilm.actors;
    delete adaptedFilm.release;
    delete adaptedFilm.runtime;
    delete adaptedFilm.countries;
    delete adaptedFilm.genres;
    delete adaptedFilm.description;
    delete adaptedFilm.ageRating;
    delete adaptedFilm.isWatchList;
    delete adaptedFilm.isWatched;
    delete adaptedFilm.isFavorite;

    return adaptedFilm;
  }
}
