let slidePosition = 0;
const slides = document.querySelectorAll('carousel_item');
const totalSlides = slides.length;

document
  .querySelector('#carousel_button--next')
  .addEventListener("click", function() {
        movetonextslide();
    console.log('test');
    });
document.
    querySelector('#carousel_button--prev')
    .addEventListener("click",function(){
        moveToPrevSlide();
    });
    function updateSlidePostion() {
        for(let slide of slides){
            slide.classList.remove('photo-visible');
            slide.classList.add('photo-grid-item--hidden')
    }}


function moveToNextSlide(){
    if(slidePosition === totalSlides - 1){
        slidePosition = 0;
    } else{
        slidePosition++;
    }
    updateSlidePostion()
}

function moveToPrevSlide(){
    if(slidePosition === 0){
        slidePosition = totalSlides - 1;
    } else{
        slidePosition--;
    } 
    updateSlidePostion()
}