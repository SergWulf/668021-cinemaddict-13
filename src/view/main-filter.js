import AbstractView from "./abstract.js";

const createMainFilterTemplate = (filters, currentFilterType) => {
  const [all, watchList, history, favorites] = filters;
  const classActive = `main-navigation__item--active`;

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item ${(all.type === currentFilterType) ? classActive : ``}" data-filter="${all.type}">${all.name}</a>
      <a href="#watchlist" class="main-navigation__item ${(watchList.type === currentFilterType) ? classActive : ``}" data-filter="${watchList.type}">${watchList.name} <span class="main-navigation__item-count">${watchList.count}</span></a>
      <a href="#history" class="main-navigation__item ${(history.type === currentFilterType) ? classActive : ``}" data-filter="${history.type}">${history.name}<span class="main-navigation__item-count">${history.count}</span></a>
      <a href="#favorites" class="main-navigation__item ${(favorites.type === currentFilterType) ? classActive : ``}" data-filter="${favorites.type}">${favorites.name}<span class="main-navigation__item-count">${favorites.count}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class Filter extends AbstractView {
  constructor(filters, currentFilter) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilter;
    this._filterLinks = this.getElement().querySelectorAll(`.main-navigation__item`);

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMainFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.getAttribute(`data-filter`));
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this._filterLinks.forEach((filterLink) => {
      filterLink.addEventListener(`click`, this._filterTypeChangeHandler);
    });
  }
}
