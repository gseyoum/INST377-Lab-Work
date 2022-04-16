let slidePosition = 0;
const slides = document.querySelectorAll('.carousel__item');
const slidesArray=Array.from(slides);
const totalSlides = slidesArray.length;

document.
    querySelector('next')
    .addEventListener('click',function(){
        moveToNextSlide();
    });

document.
    querySelector('prev')
    .addEventListener('click',function(){
        moveToNextSlide();
    });

    function updateSlidePostion() {
        slidesArray.forEach((slide) => {
            console.log(slide);
            slide.classList.remove('visable');
            slide.classList.add('hidden');
        });
        slides[slidePosition].classList.add('visable');
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