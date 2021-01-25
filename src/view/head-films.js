import AbstractView from "./abstract.js";

const createHeadFilmsTemplate = () => {
  return `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container all-movies">
      </div>
    </section>`;
};

export default class HeadFilms extends AbstractView {
  getTemplate() {
    return createHeadFilmsTemplate();
  }
}
