let slidePosition = 0;
const slides = document.querySelectorAll('.carousel_item');
const slidesArray=Array.from(slides);
const totalSlides = slidesArray.length;

function updateSlidePostion(){
    slidesArray.forEach((slide) => {
        console.log(slide);
        slide.classList.remove('carousel__item--visible');
        slide.classList.add('carousel__item--hidden');
    });
    slides[slidePosition].classList.add('carousel__item--visible');
}

document.
    querySelector('#carousel_button--next')
    .addEventListener("click", function() {
        movetonextslide();
    });
document.
    querySelector('carousel_button--prev')
    .addEventListener("click", function() {
        moveToPrevSlide();
    });
    function updateSlidePostion() {
        for(let slide of slides) {
            slide.classList.remove('carusel_item--visable');
            slide.classList.add('photo-grid-item--hidden');
        }
        slides[slidePosition].classList.add('carousel_item--visale');
    }


function moveToNextSlide(){ 
    updateSlidePostion();

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