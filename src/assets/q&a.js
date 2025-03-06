const slider = document.querySelector('.slider');
const sliderList = slider.querySelector('.slider-list');
const sliderItems = slider.querySelectorAll('.slider-item');
const sliderNav = slider.querySelector('.slider-nav');
const sliderNavItems = slider.querySelectorAll('.slider-nav-item');
const sliderPrev = slider.querySelector('.slider-prev');
const sliderNext = slider.querySelector('.slider-next');

var currentIndex = 0;
var timer = null;


function init() {

sliderList.style.width = sliderItems.length * 100 + '%';

for (var i = 0; i < sliderItems.length; i++) {
    sliderItems[i].style.width = 100 / sliderItems.length + '%';
}

sliderNav.addEventListener('click', handleNavClick);
sliderPrev.addEventListener('click', handlePrevClick);
sliderNext.addEventListener('click', handleNextClick);

sliderList.addEventListener('click', function() {
            stopAutoPlay();
        });
// startAutoPlay();
}

function handleNavClick(event) {
if (event.target.classList.contains('slider-nav-item')) {
    var index = Array.prototype.indexOf.call(sliderNavItems, event.target);
    goToSlide(index);
}
}

function handlePrevClick(event) {
goToSlide(currentIndex - 1);
}

function handleNextClick(event) {
goToSlide(currentIndex + 1);
}

function goToSlide(index) {
if (index < 0) {
    index = sliderItems.length - 1;
} else if (index >= sliderItems.length) {
    index = 0;
}
currentIndex = index;
sliderList.style.transform = 'translateX(-' + currentIndex * 100 / sliderItems.length + '%)';
updateNav();
}

function updateNav() {
for (var i = 0; i < sliderNavItems.length; i++) {
    if (i === currentIndex) {
    sliderNavItems[i].classList.add('active');
    } else {
    sliderNavItems[i].classList.remove('active');
    }
}
}

function startAutoPlay() {
timer = setInterval(function() {
    goToSlide(currentIndex + 1);
}, 10000);
}

function stopAutoPlay() {
clearInterval(timer);
timer = null;
}

init()