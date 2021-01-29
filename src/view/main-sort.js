import AbstractView from "./abstract.js";

const createMainSortTemplate = () => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort="default">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort="date">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort="rating">Sort by rating</a></li>
  </ul>`;
};

export default class Sort extends AbstractView {
  constructor() {
    super();
    this._classActiveSortButton = `sort__button--active`;
    this._sortButtons = this.getElement().querySelectorAll(`.sort__button`);
    this._clickButtonSortHandler = this._clickButtonSortHandler.bind(this);

  }

  init() {
    // как-то мудрёно получилось, потом поправлю
    this._sortButtons.forEach((sortButton) => {
      sortButton.classList.remove(this._classActiveSortButton);
    });
    this._sortButtons.forEach((sortButton) => {
      if (sortButton.getAttribute(`data-sort`) === `default`) {
        sortButton.classList.add(this._classActiveSortButton);
      }
    });
  }

  setClickButtonSortHandler(callback) {
    this._callback.sortClick = callback;
    this._sortButtons.forEach((sortButton) => {
      sortButton.addEventListener(`click`, this._clickButtonSortHandler);
    });
  }

  getTemplate() {
    return createMainSortTemplate();
  }

  _clickButtonSortHandler(evt) {
    evt.preventDefault();
    if (!evt.target.classList.contains(this._classActiveSortButton)) {
      this._sortButtons.forEach((sortButton) => {
        sortButton.classList.remove(this._classActiveSortButton);
      });
      evt.target.classList.add(this._classActiveSortButton);
      this._callback.sortClick(evt.target.getAttribute(`data-sort`));
    }
  }

}
