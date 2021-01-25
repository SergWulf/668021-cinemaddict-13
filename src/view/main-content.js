import AbstractView from "./abstract.js";

const createMainContainerTemplate = () => {
  return `<section class="films"></section>`;
};

export default class Content extends AbstractView {
  getTemplate() {
    return createMainContainerTemplate();
  }
}
