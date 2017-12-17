'use strict';

(
  function() {
    // Функция для получения рандомного элемента.
    function getRandomElement(array) {
      return array[Math.floor(Math.random() * array.length)];
    }

    // Функция создания DOM элемента на основе JS объекта
    window.createPictureObject = function (id) {
      return {
        url: 'photos/' + id + '.jpg',
        likes: 15 + Math.floor(Math.random() * 185),
        comments: (Math.random() > 0.5) ?
          [getRandomElement(COMMENTS)] :
          [getRandomElement(COMMENTS), getRandomElement(COMMENTS)]
      };
    }
  }
)();
