import Observer from "../functions/observer.js";
import {FilterType} from "../const.js"

export default class Filters extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  setFilters(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilters() {
    return this._activeFilter;
  }
}
