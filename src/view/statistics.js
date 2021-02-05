import dayjs from "dayjs";
import SmartView from "./smart.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {runtimeToHourAndMinutes} from "../util.js";
import {films} from "../mock/data";

const BAR_HEIGHT = 50;
const statisticCtx = document.querySelector(`.statistic__chart`);
// 1. Рассчитаем сколько всего сколько просмотрено вильмов, это фильтр watched.length.
// 2. В этом же массиве возьмем данные в минутах и отобразим из в часах и минутах.
//

/*
// Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
statisticCtx.height = BAR_HEIGHT * 5;

const myChart = new Chart(statisticCtx, {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    labels: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`],
    datasets: [{
      data: [11, 8, 7, 4, 3],
      backgroundColor: `#ffe800`,
      hoverBackgroundColor: `#ffe800`,
      anchor: `start`
    }]
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 20
        },
        color: `#ffffff`,
        anchor: 'start',
        align: 'start',
        offset: 40,
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: `#ffffff`,
          padding: 100,
          fontSize: 20
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        barThickness: 24
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    }
  }
});*/


const createStatisticsTemplate = (data) => {
  const filmsRuntime = runtimeToHourAndMinutes(parseInt(data.allDuration, 10));
  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${data.watched} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${filmsRuntime.hours} <span class="statistic__item-description">h</span> ${filmsRuntime.minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${data.countGenres[0][0]}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

export default class Statistics extends SmartView {
  constructor(films) {
    super();

    this._data = {
      films
    };
    this._getCountsGenres();
    // this._dateChangeHandler = this._dateChangeHandler.bind(this);
  }

  init() {
    this._data.statistics = Object.assign({},
        {
          "watched": this._data.films.length,
          "allDuration": this._data.films.reduce((allRuntime, film) => {
            return allRuntime + film.runtime;
          }, 0),
          "countGenres": this._getCountsGenres()
        });
    console.log(this._data.statistics.countGenres);
  }

  removeElement() {
    super.removeElement();

  }

  getTemplate() {
    return createStatisticsTemplate(this._data.statistics);
  }

  restoreHandlers() {
    // this._setCharts();
  }

  _getCountsGenres() {
    // Цикло по массивам genre
    const nameGenres = new Set();
    const countsGenres = new Map();
    this._data.films.forEach((film) => {
      film.genres.forEach((genre) => {
        if (nameGenres.has(genre)) {
          countsGenres.set(genre, parseInt(countsGenres.get(genre), 10) + 1);
        }
        if (!nameGenres.has(genre)) {
          nameGenres.add(genre);
          countsGenres.set(genre, 1);
        }
      });
    });

    return [...countsGenres].slice().sort((prev, next) => {
      return next[1] - prev[1];
    });
  }

  _getTopGenre() {

  }
}
