import './index.html';
import './scss/style.scss';

import Accordion from './modules/accordion';

//Accordion init
new Accordion('.accordion', '.accordion__head', '.accordion__content', 222, true).init();