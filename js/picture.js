'use strict';

(
  function () {
    // Функция заполнения блока DOM элементами на основе массива JS объектов
    window.createPictureElement = function (picture) {
      var pictureElement = document.querySelector('#picture-template').content.cloneNode(true);

      pictureElement.querySelector('img').src = picture.url;
      pictureElement.querySelector('.picture-likes').innerHTML = picture.likes;
      pictureElement.querySelector('.picture-comments').innerHTML = picture.comments.length;

      pictureElement.querySelector('a').onclick = function(evt) {
        if (evt.type === 'click' || evt.keyCode === ENTER_KEYCODE) {
          evt.preventDefault();
        }
        fillPhotoToOverlay(picture);
      };
      return pictureElement;
    }

    // Функция заполения оверлея данными о первой картинке
    function fillPhotoToOverlay (picture) {
      var galeryOverlay = document.querySelector('.gallery-overlay');
      galeryOverlay.classList.remove('hidden');
      galeryOverlay.querySelector('.gallery-overlay-image').src = picture.url;
      galeryOverlay.querySelector('.likes-count').innerHTML = picture.likes;
      galeryOverlay.querySelector('.comments-count').innerHTML = picture.comments.length;
    }

    window.addSubmitListener = function () {
      uploadFormSubmit.addEventListener('click', function(evt) {
        deleteRedBorder();
        if (!validityHashtags()) {
          addRedBorder(uploadFormHashtags);
        }
        if (!validityComments()) {
          addRedBorder(uploadFormDescription);
        }
      });
    }
  }
)();
