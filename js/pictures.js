'use strict';

var PICTURES_COUNT = 25;
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function createPictureObject(id) {
  return {
    url: 'photos/' + id + '.jpg',
    likes: 15 + Math.floor(Math.random() * 185),
    comments: (Math.random() > 0.5) ?
      [getRandomElement(COMMENTS)] :
      [getRandomElement(COMMENTS), getRandomElement(COMMENTS)]
  };
}

function createPictureElement(picture) {
  var pictureElement = document.querySelector('#picture-template').content.cloneNode(true);

  pictureElement.querySelector('img').src = picture.url;
  pictureElement.querySelector('.picture-likes').innerHTML = picture.likes;
  pictureElement.querySelector('.picture-comments').innerHTML = picture.comments.length;

  return pictureElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < PICTURES_COUNT; i++) {
  var picture = createPictureObject(i + 1);
  fragment.appendChild(createPictureElement(picture));

  var galeryOverlay = document.querySelector('.gallery-overlay');
  galeryOverlay.classList.remove('hidden');
  galeryOverlay.querySelector('.gallery-overlay-image').src = picture.url;
  galeryOverlay.querySelector('.likes-count').innerHTML = picture.likes;
  galeryOverlay.querySelector('.comments-count').innerHTML = picture.comments.length;
}
document.querySelector('.pictures').appendChild(fragment);

