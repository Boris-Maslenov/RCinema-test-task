import './index.html';
import './scss/style.scss';

import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import Accordion from './modules/accordion';
import popup from './modules/popup';

//Accordion init
new Accordion('.accordion', '.accordion__head', '.accordion__content', 222, true).init();

// init Swiper:
const locationSlider = new Swiper('.location-slider', {
    autoplay: true,
modules: [Navigation],
slidesPerView: 3,
spaceBetween: 30,
navigation: {
    nextEl: '.location-section__slide-next',
    prevEl: '.location-section__slide-prev',
    },
});

const gallerySlider = new Swiper('.gallery-slider', {
modules: [Navigation],
slidesPerView: 1,
navigation: {
    nextEl: '.gallery-section__slide-next',
    prevEl: '.gallery-section__slide-prev',
    },
});

const reviewsSlider = new Swiper('.reviews-slider', {
    direction: "vertical",
    modules: [Navigation],
    autoplay: true,
    slidesPerView: 2,
    spaceBetween: 30,
    navigation: {
        nextEl: '.reviews-section__slide-next',
        prevEl: '.reviews-section__slide-prev',
        },
    });
// popup init
popup('.btn_open-popup');