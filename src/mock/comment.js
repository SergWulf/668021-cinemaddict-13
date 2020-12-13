import {getRandomInteger} from "./film.js";
import {TEXT_TEMPLATE} from "./film.js";

const generateEmotion = () => {
  const emotions = [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ];

  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

const generateAuthor = () => {
  const authors = [
    `Vasya`,
    `Petya`,
    `Snejanna`,
    `Yulia`,
    `Samantha`,
    `Jessica`,
    `Peter`,
    `Ivan`,
    `Sveta`
  ];
  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

const generateReview = () => {
  const listComments = TEXT_TEMPLATE.replace(/\.\s/g, `.`).split(`.`);
  return listComments[getRandomInteger(0, listComments.length - 1)];
};

export const generateComment = (id) => {
  return {
    filmId: id,
    description: generateReview(),
    emotion: generateEmotion(),
    author: generateAuthor(),
    createDate: `26/11/2020`,
  };
};
