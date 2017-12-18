'use strict';

(
  function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < PICTURES_COUNT; i++) {
      var picture = createPictureObject(i + 1);
      fragment.appendChild(createPictureElement(picture));

      clickImageEffect();
      addSubmitListener();
    }
    document.querySelector('.pictures').appendChild(fragment);
  }
)();
