let slidePosition = 0;
const slides = document.querySelectorAll('.carousel__item');
const slidesArray=Array.from(slides);
const totalSlides = slidesArray.length;

function updateSlidePostion() {
    slidesArray.forEach((slide) => {
        console.log(slide);
        slide.classList.remove('carousel__item--visable');
        slide.classList.add('carousel__item--hidden');
    });
    // for (const slide of slide) {
    // }
    slides[slidePosition].classList.add('carousel__item--visable');
}

function moveToNextSlide(){ 
    if(slidePosition === totalSlides - 1) {
        slidePosition = 0;
    } else{
        slidePosition++;
    }
    updateSlidePostion();
}

function moveToPrevSlide() {
    if(slidePosition === 0){
        slidePosition = totalSlides - 1;
    } else{
        slidePosition--;
        } 
    updateSlidePostion();
}   

document.querySelector('.next')
    .addEventListener('click',() => {
        console.log('clicked next');
        moveToNextSlide();
});

document.querySelector('.prev')
    .addEventListener('click',() => {
        console.log('clicked prev');
        moveToNextSlide();
});