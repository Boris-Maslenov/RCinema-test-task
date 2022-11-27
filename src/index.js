import './index.html';
import './scss/style.scss';
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import Accordion from './modules/accordion';
import popup from './modules/popup';
import burger from './modules/burger';
import scroll from './modules/scroll';
import VideoPlayer from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {
//Accordion init
new Accordion('.accordion', '.accordion__head', '.accordion__content', 222, true).init();

// init Swiper:
const locationSlider = new Swiper('.location-slider', {
modules: [Navigation, Pagination],
slidesPerView: 3,
navigation: {
    nextEl: '.location-section__slide-next',
    prevEl: '.location-section__slide-prev',
    },
    breakpoints: {
        320: {
            slidesPerGroup: 1,
            spaceBetween: 20,
            slidesPerView: 'auto',
            pagination: {
                el: ".swiper-pagination_locations",
                clickable: true,
            },
        },
        1242: {
            spaceBetween: 30,
            pagination: false,
        },
    },

});

const gallerySlider = new Swiper('.gallery-slider', {
modules: [Navigation, Pagination],
slidesPerView: 1,
spaceBetween: 20,
navigation: {
    nextEl: '.gallery-section__slide-next',
    prevEl: '.gallery-section__slide-prev',
    },
    pagination: {
        el: ".swiper-pagination_gallery",
        clickable: true,
    },
});

const reviewsSlider = new Swiper('.reviews-slider', {

    modules: [Navigation, Pagination],
    autoplay: true,
    slidesPerView: 2,
    spaceBetween: 30,
    direction: "horizontal",
    navigation: {
        nextEl: '.reviews-section__slide-next',
        prevEl: '.reviews-section__slide-prev',
        },
    pagination: {
        el: ".swiper-pagination_reviews",
        clickable: true,
    },
    breakpoints: {
        320: {
            direction: "horizontal",
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
            direction: "horizontal",
        },
        992: {
            spaceBetween: 20,
            direction: "horizontal",
        },
        1242: {
            direction: "vertical",
        },
    },
    });

// popup init
popup('.btn_open-popup');

// open mobile menu
const MobileMenu = burger();

// scroll end hidden mobile menu
scroll(MobileMenu, 1242);

// video player

const player = new VideoPlayer('#video', '.video-loyout__button');

player.init();


});