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
    this._statisticsLink = this.getElement().querySelector(`.main-navigation__additional`);

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._statisticsHandler = this._statisticsHandler.bind(this);

  }

  getTemplate() {
    console.log(`Начинаем рисовать компонент фильтров и статистики`);
    return createMainFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    console.log('Кликаем на фильтр');
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.getAttribute(`data-filter`));
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this._filterLinks.forEach((filterLink) => {
      filterLink.addEventListener(`click`, this._filterTypeChangeHandler);
    });
  }

  _statisticsHandler(evt) {
    evt.preventDefault();
    this._callback.statisticsClick();
  }

  setStatisticsHandler(callback) {
    this._callback.statisticsClick = callback;
    console.log(`Ставим обработчик на кнопку статистики`);
    this._statisticsLink.addEventListener(`click`, (evt) => {
      console.log(`Ты где????????`);
    });

  }
}
