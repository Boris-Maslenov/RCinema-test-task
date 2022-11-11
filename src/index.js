import './index.html';
import './scss/style.scss';

import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import Accordion from './modules/accordion';




//Accordion init
new Accordion('.accordion', '.accordion__head', '.accordion__content', 222, true).init();

// init Swiper:
const swiper = new Swiper('.location-slider', {
modules: [Navigation],
slidesPerView: 3,
spaceBetween: 30,
navigation: {
    nextEl: '.location-section__slide-next',
    prevEl: '.location-section__slide-prev',
    },
});