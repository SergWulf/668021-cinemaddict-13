import AbstractView from "./abstract.js";

const createButtonShowMoreTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ButtonShowMore extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createButtonShowMoreTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(this._callback.container);
  }

  setClickHandler(callback, container) {
    this._callback.click = callback;
    this._callback.container = container;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
