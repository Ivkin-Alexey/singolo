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