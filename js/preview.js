'use strict';

(
  function() {
    var galleryOverlay = document.querySelector('.gallery-overlay');
    var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

    // Функция закрытия по клавише ESC с проверкой на активность элемента в момент закрытия.
    function onPopupEscPress(evt) {
      if (evt.keyCode === ESC_KEYCODE && uploadFormDescription !== document.activeElement) {
        closeEffectForm();
        closePopup();
      }
    }

    document.addEventListener('keydown', onPopupEscPress);

    function closePopup() {
      galleryOverlay.classList.add('hidden');
    }

    galleryOverlayClose.addEventListener('click', function() {
      closePopup();
    });

    galleryOverlayClose.addEventListener('keydown', function(evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        closePopup();
      }
    });
  }
)();
