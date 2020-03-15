/*---------------------------NAVIGATION--------------------------------*/
let activeLink = document.querySelector('.header_navigation__item.active');
const header = document.querySelector('.header');
const nav = document.querySelector('.header_navigation');
nav.onclick = function (event) {
    event.preventDefault();
    const target = event.target;
    if (target.tagName === 'A') {
        highlight(target);
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: document.querySelector(target.hash).offsetTop - header.clientHeight
        });
    }
};

function highlight(elem) {
    if (activeLink) {
        activeLink.classList.remove('active');
    }
    activeLink = elem;
    activeLink.classList.add('active');
}

/*---------------------------SLIDER--------------------------------*/
let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName('slider_slide');
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

function setEventListeners() {
    const next = document.getElementsByClassName('slider_link-next')[0],
        prev = document.getElementsByClassName('slider_link-prev')[0];
    next.addEventListener('click', () => plusSlides(1));
    prev.addEventListener('click', () => plusSlides(-1));
}

setEventListeners();
showSlides(slideIndex);

/*---------------------------DISPLAY--------------------------------*/
const vertical = document.querySelector('.home_button-vertical'),
    horizontal = document.querySelector('.home_button-horizontal'),
    verticalDisplay = document.querySelector('.slider__iphone_vertical_display'),
    horizontalDisplay = document.querySelector('.slider__iphone_gorizontal_display');

function toggleDisplay(display) {
    display.classList.toggle('hidden');
}

vertical.addEventListener('click', () => toggleDisplay(verticalDisplay));
horizontal.addEventListener('click', () => toggleDisplay(horizontalDisplay));