'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var PICTURES_COUNT = 25;
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var MIN_VALUE = 25;
var MAX_VALUE = 100;
var MAX_LENGTH_HASHTAGS = 20;
var MAX_HASHTAGS = 5;
var BORDER_RED = '2px solid red';
var COMMENTS_LENGTH_MAX = 140;

var uploadSelectImage = document.querySelector('#upload-select-image');
var selectFile = uploadSelectImage.querySelector('#upload-file');
var uploadFormCancel = uploadSelectImage.querySelector('.upload-form-cancel');
var uploadFormDescription = uploadSelectImage.querySelector('.upload-form-description');
var uploadResizeControlsValue = uploadSelectImage.querySelector('.upload-resize-controls-value');
var effectImagePreview = uploadSelectImage.querySelector('.effect-image-preview');
var reduceImageSize = uploadSelectImage.querySelector('.upload-resize-controls-button-dec');
var increaseImageSize = uploadSelectImage.querySelector('.upload-resize-controls-button-inc');
var uploadOverlay = uploadSelectImage.querySelector('.upload-overlay');
var uploadEffectControls = uploadOverlay.querySelector('.upload-effect-controls');
var uploadFormSubmit = uploadOverlay.querySelector('.upload-form-submit');
var uploadFormHashtags = uploadOverlay.querySelector('.upload-form-hashtags');

selectFile.addEventListener('change', function(evt) {
  document.querySelector('.upload-overlay').classList.remove('hidden');
  document.querySelector('.upload-image').classList.add('hidden');
});

uploadFormCancel.addEventListener('click', closeEffectForm);

// Функция закрытия формы кадрирования.
function closeEffectForm() {
  document.querySelector('.upload-overlay').classList.add('hidden');
  document.querySelector('.upload-image').classList.remove('hidden');
  selectFile.value = '';
}

uploadFormCancel.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeEffectForm();
  }
});

// Функция валидации комментариев.
function validityComments() {
  uploadFormDescription.setCustomValidity('');

  if (uploadFormDescription.value.length > COMMENTS_LENGTH_MAX) {
    uploadFormDescription.setCustomValidity('Комментарий не должен содержать более 140 символов. Текущее количество символов: ' + uploadFormDescription.value.length);
    return false;
  }
    return true;
}

// Функция изменения масштаба изображения.
function changeImageSize(indication) {
  var newValue = parseInt(uploadResizeControlsValue.value, 10) + 25 * indication;
  if (newValue >= MIN_VALUE && newValue <= MAX_VALUE) {
    uploadResizeControlsValue.value = newValue + '%';
    effectImagePreview.style.transform = 'scale(' + newValue / 100 + ')';
  }
}

// Обработчик события для уменьшения размера фотографии.
reduceImageSize.addEventListener('click', function() {
  changeImageSize(-1);
});

// Обработчик события для увеличения размера фотографии.
increaseImageSize.addEventListener('click', function() {
  changeImageSize(1);
});

// Функция применения эффекта к изображению.
function changeImageEffect(event) {
  var target = event.target;
  var filterName = target.value;
  var defaultClass = 'effect-image-preview';

  if (target.tagName !== 'INPUT') {
    return;
  }
  effectImagePreview.className = defaultClass + ' ' + 'effect-' + filterName;
}

// Функция обработчика события для изменения эффектов изображению по клику.
function clickImageEffect() {
  uploadEffectControls.addEventListener('click', changeImageEffect);
}

// Функция валидации хэш-тегов.
function validityHashtags() {
  var arrayHashtags = uploadFormHashtags.value.split(' ');
  uploadFormHashtags.setCustomValidity('');

  if (arrayHashtags.length === 1 && arrayHashtags[0] === '') {
    return true;
  }

  if (arrayHashtags.length > MAX_HASHTAGS) {
    uploadFormHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    return false;
  }

  for (var j = arrayHashtags.length - 1; j >= 0; j--) {
    arrayHashtags[j] = uploadFormHashtags.value.toLowerCase();
  }

  for (var i = arrayHashtags.length - 1; i >= 0; i--) {
    if (arrayHashtags[i][0] !== '#') {
      uploadFormHashtags.setCustomValidity('Хэш-тег начинается с символа `#` (решётка) и состоит из одного слова');
      return false;
    }
    if (arrayHashtags[i].length > MAX_LENGTH_HASHTAGS) {
      uploadFormHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
      return false;
    }
    if (arrayHashtags.indexOf(arrayHashtags[i]) !== i) {
      uploadFormHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      return false;
    }
  }
  return true;
}

// Функция добавления красной рамки.
function addRedBorder(elem) {
  elem.style.border = BORDER_RED;
}

// Функция удаления красной рамки.
function deleteRedBorder() {
  uploadFormHashtags.style.border = '';
  uploadFormDescription.style.border = '';
}
