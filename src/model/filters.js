import Observer from "../functions/observer.js";

export default class Filters extends Observer {
  constructor() {
    super();
    this._filters = [];
  }

  setFilters(filters) {
    this._filters = filters.slice();
  }

  getFilters() {
    return this._filters;
  }
}
