import FilterView from "../view/main-filter.js";
import {render, RenderPosition, replace, remove} from "../functions/render.js";
import {FILTER} from "../util.js";
import {FilterType, UpdateType} from "../const.js";

export default class Filter {
  constructor(filterContainer, filterModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      console.log(`Панель фильтра и статистики нарисована!`);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  getComponentView() {
    return this._filterComponent;
  }

  _handleModelEvent() {
    console.log(`событие Init в презентере фильтров`);
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL,
        name: `All movies`,
        count: FILTER[FilterType.ALL](films).length
      },
      {
        type: FilterType.WATCHLIST,
        name: `WatchList`,
        count: FILTER[FilterType.WATCHLIST](films).length
      },
      {
        type: FilterType.WATCHED,
        name: `History`,
        count: FILTER[FilterType.WATCHED](films).length
      },
      {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        count: FILTER[FilterType.FAVORITES](films).length
      }
    ];
  }
}
