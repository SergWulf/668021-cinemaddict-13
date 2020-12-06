// Функция задания уникального идентификатора фильму, взятая из демонстрации академии.
const nanoid = (t = 21) => {
  let e = ``;
  let r = crypto.getRandomValues(new Uint8Array(t));
  for (; t--;) {
    let n = 63 & r[t];
    e += n < 36 ? n.toString(36) : n < 62 ? (n - 26).toString(36).toUpperCase() : n < 63 ? `_` : `-`;
  }
  return e;
};

// Функция возвращающая случайное значение из диапазона
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Функция перемешивания массива, благополучно взятая из харбра, по совету, чтобы не изобретать велосипед :)
const shuffle = (arr) => {
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};


// Текст для заполнения описания к фильмам.
export const textTemplate = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;

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
  ];
  return pathsPosters[getRandomInteger(0, pathsPosters.length - 1)];
};

const generateDescription = () => {
  const listSentences = textTemplate.replace(/\.\s/g, `.`).split(`.`);
  return shuffle(listSentences).slice(0, getRandomInteger(1, 5)).join(`. `);
};

const generateRating = () => {
  return `${getRandomInteger(5, 9)}.${getRandomInteger(0, 9)}`;
}

const generateGenres = () => {
  const genres = [
    `action`,
    `comedy`,
    `drama`,
    `fantasy`,
    `horror`,
    `mystery`,
    `romance`,
    `thriller`,
    `western`
  ];

  return shuffle(genres).slice(0, getRandomInteger(1, 3));
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
    release: `1957`,
    runtime: `1h 15m`,
    country: `USA`,
    genres: generateGenres(),
    description: `${generateDescription()}.`,
    ageRating: `+18`,
    isWatchList: false,
    isWatched: false,
    isFavorite: false
  };
};
