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

/*---------------------------PORTFOLIO--------------------------------*/
let portfolioActiveLink = document.querySelector('.portfolio_tag.active');
const portfolioTags = document.querySelector('.portfolio_tags');
const galleryImages = document.querySelectorAll('.portfolio_gallery__item');

setImagesOrder(portfolioActiveLink.dataset.order);

portfolioTags.onclick = function (event) {
    event.preventDefault();
    const target = event.target.closest('LI');
    if (target && target.tagName === 'LI') {
        highlightPortfolioTag(target);
        setImagesOrder(target.dataset.order);
    }
};

function highlightPortfolioTag(elem) {
    if (portfolioActiveLink) {
        portfolioActiveLink.classList.remove('active');
    }
    portfolioActiveLink = elem;
    portfolioActiveLink.classList.add('active');
}

function setImagesOrder(order) {
    for (let i = 0; i < galleryImages.length; i++) {
        const newOrder = i + (Math.floor(Math.random() * 100) * order);
        galleryImages[i].style.order = `${newOrder}`;
    }
}

/*---------------------------PORTFOLIO INTERACTION WITH IMAGES--------------------------------*/
let imageActive;
const portfolioGallery = document.querySelector('.portfolio_gallery');

portfolioGallery.onclick = function (event) {
    const target = event.target.closest('li');
    if (target.tagName === 'LI') {
        highlightPortfolioImages(target);
    }
};

function highlightPortfolioImages(elem) {
    if (imageActive) {
        imageActive.classList.remove('active');
    }
    imageActive = elem;
    imageActive.classList.add('active');
}

/*---------------------------FORM MODAL WINDOW--------------------------------*/
const submitButton = document.querySelector('.j-submit');
const name = document.querySelector('.j-name');
const email = document.querySelector('.j-email');
const subject = document.querySelector('.j-subject');
const description = document.querySelector('.j-description');

submitButton.addEventListener('click', sendForm);

function sendForm(event) {
    if (name.value && email.value) {
        event.preventDefault();
        createModalWindow();
        name.value = '';
        email.value = '';
        subject.value = '';
        description.value = '';
    }
}

function createModalWindow() {
    const body = document.querySelector('body');
    const modalWrapper= document.createElement('div');
    modalWrapper.classList.add('modal_wrapper');
    modalWrapper.innerHTML = `
        <div class="modal_window">
            <h3 class="modal_window__title">Письмо отправлено</h3>
            <p class="modal_window__subject">${subject.value ? 'Тема: ' + subject.value : 'Без темы'}</p>
            <p class="modal_window__description">${description.value ? 'Описание: ' + description.value : 'Без описания'}</p>
            <button class="modal_window__button">OK</button>
        </div>
    `;
    document.documentElement.classList.add('no-scroll');
    body.appendChild(modalWrapper)
        .addEventListener('click', outsideClick);
    body.addEventListener('keyup', closeOnEscape);
    document.querySelector('.modal_window__button').addEventListener('click', closeModalWindow);
}

function closeModalWindow() {
    const body = document.querySelector('body');
    document.querySelector('.modal_wrapper').remove();
    document.documentElement.classList.remove('no-scroll');
    body.removeEventListener('click', outsideClick);
    body.removeEventListener('keyup', closeOnEscape);
}

function outsideClick(event) {
    if (!event.target.closest('.modal_window')) {
        closeModalWindow();
    }
}

function closeOnEscape(event) {
    if (event.key === 'Escape') {
        closeModalWindow();
    }
}