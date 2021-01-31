import {nanoid} from "../functions/nanoid.js";
import {getRandomInteger, shuffle, generateRandomBoolean} from "../functions/random.js";

export const TEXT_TEMPLATE = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;

// Название фильмов
const generateTitle = () => {
  const titles = [
    `Made for each other`,
    `Popeye meets sinbad`,
    `Sagebrush trail`,
    `Santa Claus conquers the martians`,
    `The dance of life`,
    `The great flamarion`,
    `The man with the golden arm`
  ];

  return titles[getRandomInteger(0, titles.length - 1)];
};

const generateDirector = () => {
  const directors = [
    `Robert Zemeckis`,
    `Christopher Nolan`,
    `Woody Allen`,
    `Quentin Tarantino`,
    `James Cameron`,
    `George Lucas`,
    `Steven Spielberg`,
    `Martin Scorsese`
  ];

  return directors[getRandomInteger(0, directors.length - 1)];
};

const generateScreenwriters = (count = 3) => {
  const writers = [
    `Di Biadjo`,
    `Chelentano`,
    `Tarantino`,
    `Steeven Speelberg`,
    `Roy Joy`,
    `Mike Tyson`,
    `Ivan Susasin`
  ];

  return shuffle(writers).slice(0, getRandomInteger(1, count));
};

const generateActors = (count = 5) => {
  const actors = [
    `Leonardo Di Caprio`,
    `Sergey Burunov`,
    `Arnold Schwarzenegger`,
    `Nikolas Cage`,
    `Robert De Niro`,
    `Jack Nicholson`,
    `Tom Hanks`,
    `Johnny Depp`,
    `Brad Pitt`,
    `Bruce Willis`,
    `Tom Cruise`,
    `Gary Oldman`
  ];

  return shuffle(actors).slice(0, getRandomInteger(count, actors.length - 1));
};

const generatePoster = () => {
  const pathsPosters = [
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`
  ];
  return pathsPosters[getRandomInteger(0, pathsPosters.length - 1)];
};

const generateDescription = () => {
  const listSentences = TEXT_TEMPLATE.replace(/\.\s/g, `.`).split(`.`);
  return shuffle(listSentences).slice(0, getRandomInteger(1, 5)).join(`. `);
};

const generateRating = () => {
  return parseFloat(`${getRandomInteger(5, 9)}.${getRandomInteger(0, 9)}`);
};

const generateGenres = () => {
  const genres = [
    `Action`,
    `Comedy`,
    `Drama`,
    `Fantasy`,
    `Horror`,
    `Mystery`,
    `Romance`,
    `Thriller`,
    `Western`
  ];

  return shuffle(genres).slice(0, getRandomInteger(1, 3));
};

const generateYear = () => {
  return getRandomInteger(1930, 2020);
};

const generateRuntime = () => {
  const hour = getRandomInteger(1, 2);
  let minutes = getRandomInteger(0, 59);
  if (minutes < 10) {
    minutes = `0${minutes.toString()}`;
  }
  return `${hour}h ${minutes}m`;
};

const generateCountries = () => {
  const countries = [
    `Armenia`,
    `Austria`,
    `Azerbaijan`,
    `Belarus`,
    `Belgium`,
    `Bulgaria`,
    `Croatia`,
    `Czech Republic`,
    `Denmark`,
    `Estonia`,
    `Finland`,
    `France`,
    `Georgia`,
    `Germany`,
    `Greece`,
    `Hungary`,
    `Iceland`,
    `Ireland`,
    `Italy`,
    `Latvia`,
    `The Netherlands`,
    `Norway`,
    `Poland`,
    `Portugal`,
    `Romania`,
    `Russia`,
    `Slovakia`,
    `Slovenia`,
    `Spain`,
    `Sweden`,
    `Switzerland`,
    `Turkey`,
    `Ukraine`,
    `United Kingdom`,
    `USA`,
    `Canada`,
    `Mexico`
  ];

  return shuffle(countries).slice(0, getRandomInteger(1, 3)).join(`, `);
};

export const generateFilm = () => {
  return {
    id: nanoid(),
    poster: generatePoster(),
    title: generateTitle(),
    originalTitle: `Original Title`,
    rating: generateRating(),
    director: generateDirector(),
    screenwriters: generateScreenwriters(),
    actors: generateActors(),
    release: generateYear(),
    runtime: generateRuntime(),
    countries: generateCountries(),
    genres: generateGenres(),
    description: `${generateDescription()}.`,
    ageRating: `+18`,
    isWatchList: generateRandomBoolean(),
    isWatched: generateRandomBoolean(),
    isFavorite: generateRandomBoolean()
  };
};
