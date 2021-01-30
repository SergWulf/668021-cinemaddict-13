import SmartView from "./smart.js";
import {nanoid} from "../functions/nanoid";

const createFilmPopupTemplate = (film, comments, dataCurrentComment) => {

  const titleGenres = film.genres.length > 1 ? `Genres` : `Genre`;
  const activeStatus = `checked`;
  let imgIcon = ``;
  if (dataCurrentComment.icon) {
    imgIcon = dataCurrentComment.icon.outerHTML;
  }

  const renderGenre = (genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
  };

  const renderGenres = (genres) => {
    return genres.map((genre) => renderGenre(genre)).join(` `);
  };

  const renderComment = (currentComment) => {
    return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${currentComment.emotion}.png" width="55" height="55" alt="emoji-${currentComment[`emotion`]}">
            </span>
            <div>
              <p class="film-details__comment-text">${currentComment.description}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${currentComment.author}</span>
                <span class="film-details__comment-day">${currentComment.createDate}</span>
                <button class="film-details__comment-delete" data-comment="${currentComment.id}">Delete</button>
              </p>
            </div>
          </li>`;
  };

  const renderComments = (commentaries) => {
    return commentaries.map((comment) => renderComment(comment)).join(` `);
  };

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${film.poster}" alt="${film.poster}">

          <p class="film-details__age">18+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${film.title}</h3>
              <p class="film-details__title-original">Original: ${film.title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${film.rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${film.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${film.screenwriters.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${film.actors.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${film.release}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${film.runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${film.countries}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${titleGenres}</td>
              <td class="film-details__cell">${renderGenres(film.genres)}</td>
            </tr>
          </table>

          <p class="film-details__film-description">
          ${film.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${film.isWatchList ? activeStatus : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${film.isWatched ? activeStatus : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${film.isFavorite ? activeStatus : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">${renderComments(comments)}</ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">${imgIcon}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmPopup extends SmartView {
  constructor(film, comments, callbackRestoreHandlers) {
    super();
    this._film = film;
    this._comments = comments;
    this._callback.renewHandlers = callbackRestoreHandlers;

    this._clickClosePopupHandler = this._clickClosePopupHandler.bind(this);
    this._clickCtrlEnterPopupHandler = this._clickCtrlEnterPopupHandler.bind(this);

    this._clickLabelFavoriteHandler = this._clickLabelFavoriteHandler.bind(this);
    this._clickLabelWatchedHandler = this._clickLabelWatchedHandler.bind(this);
    this._clickLabelWatchListHandler = this._clickLabelWatchListHandler.bind(this);

    this._clickLabelIconsHandler = this._clickLabelIconsHandler.bind(this);

    this._clickButtonDeleteComment = this._clickButtonDeleteComment.bind(this);

    this._renewHandlers = this._renewHandlers.bind(this);
  }

  init(newComments) {
    console.log(`Обновили комменты для отрисовки попапа`);
    this._comments = newComments;
  }

  getTemplate() {
    console.log(this._data);
    return createFilmPopupTemplate(this._film, this._comments, this._data);
  }

  restoreHandlers() {
    this.getElement().scrollTop = this._data.scrollPosition;
    this._renewHandlers();
  }

  setClickLabelFavoriteHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._clickLabelWatchListHandler);
  }

  setClickLabelWatchedHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._clickLabelWatchedHandler);
  }

  setClickLabelWatchListHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._clickLabelFavoriteHandler);
  }

  setClickLabelIconsHandler(callback) {
    this._callback.iconsClick = callback;
    this.getElement().querySelectorAll(`.film-details__emoji-label`).forEach((labelIcon) => {
      labelIcon.addEventListener(`click`, this._clickLabelIconsHandler);
    });
  }

  setClickButtonDeleteHandler(callback) {
    this._callback.deleteCommentClick = callback;
    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((deleteButtonComment) => {
      deleteButtonComment.addEventListener(`click`, this._clickButtonDeleteComment);
    });
  }

  setClickClosePopupHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickClosePopupHandler);
  }

  setClickCtrlEnterPopupHandler(callback) {
    this._callback.ctrlEnterClick = callback;
    document.addEventListener(`keydown`, this._clickCtrlEnterPopupHandler);
  }

  _renewHandlers() {
    this._callback.renewHandlers();
  }

  _clickButtonDeleteComment(evt) {
    evt.preventDefault();
    console.log(`Нажали на кнопку удалить коммент в попапе, передаем id коммента`);
    this.updateData({
      scrollPosition: this.getElement().scrollTop
    }, true);
    this._callback.deleteCommentClick(evt.target.getAttribute(`data-comment`));
  }

  _clickClosePopupHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _clickCtrlEnterPopupHandler(evt) {
    if ((evt.ctrlKey) && (evt.key === `Enter`)) {
      const currentDescription = this.getElement().querySelector(`.film-details__comment-input`).value;
      alert(currentDescription);
      if ((this._data.emotion) && (currentDescription.length !== 0)) {
        this.updateData({
          scrollPosition: this.getElement().scrollTop
        }, true);
      this._callback.ctrlEnterClick({
          id: nanoid(),
          filmId: this._film.id,
          description: currentDescription,
          emotion: this._data.emotion,
          author: `Movie Buff`,
          createDate: `26/11/2020`
      });
      }
    }
  }




  _clickLabelFavoriteHandler() {
    this._callback.favoriteClick();
  }

  _clickLabelWatchedHandler() {
    this._callback.watchedClick();
  }

  _clickLabelWatchListHandler() {
    this._callback.watchListClick();
  }

  _clickLabelIconsHandler(evt) {
    const iconImg = evt.target.cloneNode(false);
    iconImg.width = 70;
    iconImg.height = 70;
    this.updateData({
      icon: iconImg,
      emotion: iconImg.src.split(`/`).pop().split(`.`).shift(),
      scrollPosition: this.getElement().scrollTop
    });
    this._callback.iconsClick();
  }

}
