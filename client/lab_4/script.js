let slidePosition = 0;
const slides = document.querySelectorAll('.carousel_item');
const slidesArray=Array.from(slides);
const totalSlides = slidesArray.length;

document.
    querySelector('next')
    .addEventListener("click", function() {
        movetonextslide();
    });
document.
    querySelector('prev')
    .addEventListener("click", function() {
        moveToPrevSlide();
    });

    function updateSlidePostion() {
        for(let slide of slides) {
            slide.classList.remove('visable');
            slide.classList.add('hidden');
        }
        slides[slidePosition].classList.add('visable');
    }


    function moveToNextSlide(){ 
        updateSlidePostion();

        if(slidePosition === totalSlides - 1) {
            slidePosition = 0;
        } else{
            slidePosition++;
        }
    }

    function moveToPrevSlide() {
        if(slidePosition === 0){
            slidePosition = totalSlides - 1;
        } else{
            slidePosition--;
        } 
            updateSlidePostion();
    }   