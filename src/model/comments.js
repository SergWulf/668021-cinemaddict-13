import Observer from "../functions/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(updateType, comments) {
    this._comments = comments.slice();

    this._notify(updateType);
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, update) {
    this._comments = [
      update,
      ...this._comments
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(comment) {
    const adaptedComment = Object.assign({},
      comment,
      {
        // "filmId": filmId,
        "description": comment.comment,
        "createDate": comment.date
      });
    delete adaptedComment.comment;
    delete adaptedComment.date;
    return adaptedComment;
  }
}
