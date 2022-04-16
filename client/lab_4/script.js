let slidePosition = 0;
const slides = document.querySelectorAll('.carousel_item');
const slidesArray=Array.from(slides);
const totalSlides = slidesArray.length;

document.
    querySelector('carousel_button--next')
    .addEventListener('click',function(){
        moveToNextSlide();
    });

document.
    querySelector('carousel_button--prev')
    .addEventListener('click',function(){
        moveToNextSlide();
    });
    
function updateSlidePostion() {
    slidesArray.forEach((slide) => {
        console.log(slide);
        slide.classList.remove('carousel__item--visable');
        slide.classList.add('carousel__item--hidden');
    });
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