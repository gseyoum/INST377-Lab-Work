/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
let slidePosition = 0;
const slides = document.querySelectorAll('.photo-grid-item');
const totalSlides = slides.length;

document.querySelector('#carousel_button--next')
  .addEventListener('click', () => {
    moveToNextSlide();
    console.log('test');
  });

document.querySelector('#carousel_button--prev')
  .addEventListener('click', () => {
    moveToPrevSlide();
    console.log('test');
  });

function updateSlidePostion() {
  for (const slide of slides) {
    slide.classList.remove('photo-visible');
    slide.classList.add('photo-grid-item--hidden');
  }
  slides[slidePosition].classList.add('photo-visible');
  slides[slidePosition].classList.remove('photo-grid-item--hidden');
  console.log(slides);
  console.log(slidePosition);
}

function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  updateSlidePostion();
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }
  updateSlidePostion();
}