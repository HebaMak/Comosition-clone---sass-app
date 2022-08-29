/* global $  */
$(function () {
    'use strict';
    $('.the-toggler').on('click', function () {
        $('.navbar').slideToggle();
     });

});

//slider
var slideIndex, slides, dots, captionText;

function initGallery () {
    slideIndex = 0;
    slides = document.getElementsByClassName('imageHolder');
    slides[slideIndex].style.opacity = 1;

    //show the caption for each slide
    captionText = document.querySelector('.captionHolder .captionText');
    captionText.innerText = slides[slideIndex].querySelector('.captionText').innerText;

    //create pagination (indicators)
    dots = [];
    var dotsContainer = document.getElementById('dotsContainer');

    for(var i = 0 ; i < slides.length ; i++) {
        var dot = document.createElement('span');
        dot.classList.add('dots');
        dot.setAttribute('onclick', 'moveSlide('+i+')');
        dotsContainer.append(dot);
        dots.push(dot);
    }
    dots[slideIndex].classList.add('active');
}
initGallery ();


//move slides functions
function plusSlides (n) { //n is slides index
  moveSlide(slideIndex + n);
}

function moveSlide (n) { //n is slides index
  var current, next;

  // for slides move =-=> moveSlideAnimClass is an object we add its properties
  var moveSlideAnimClass = { 
    forCurrent: '',
    forNext: ''
  }

  //for captions move
  var slideTextAnimClass;

    if(n > slideIndex) { //when click on next (right btn >)
      if(n >= slides.length) {
        n = 0 ;
      }
      moveSlideAnimClass.forCurrent = 'moveLeftCurrentSlide';
      moveSlideAnimClass.forNext = 'moveLeftNextSlide';
      slideTextAnimClass = 'slideTextFromTop';

    } else if (n < slideIndex) { //when click on previous (left btn <)
      if(n < 0) {
        n = slides.length - 1;
      }
      moveSlideAnimClass.forCurrent = 'moveRightCurrentSlide';
      moveSlideAnimClass.forNext = 'moveRightNextSlide';
      slideTextAnimClass = 'slideTextFromBottom';
    }

    if(n!= slideIndex) {
      next = slides[n];
      current = slides[slideIndex];
      for( var i = 0 ; i <slides.length ; i++) {
        slides[i].className = 'imageHolder';
        slides[i].style.opacity = 0;
        dots[i].classList.remove('active');
      }
      current.classList.add(moveSlideAnimClass.forCurrent);
      next.classList.add(moveSlideAnimClass.forNext);
      dots[n].classList.add('active');
      slideIndex = n;
    }

        //next caption enterance
        captionText.style.display = 'none';
        captionText.className = 'captionText ' + slideTextAnimClass;
        captionText.innerText = slides[n].querySelector('.captionText').innerText;
        captionText.style.display = 'block';
    } 

    //timer (interval)
    var timer = null ;
    function setTimer () {
        timer = setInterval (function () {
            plusSlides(1);
        },3000);
    }
    setTimer ();

    //(play/pause btn)
    function playPauseSlides () {
        var playPauseBtn = document.getElementById('playPauseBtn');
        if(timer == null) {
            setTimer ();
            playPauseBtn.style.backgroundPositionY = '0px';
        } else {
            clearInterval (timer);
            timer = null;
            playPauseBtn.style.backgroundPositionY = '-37px';
        }
    }