class Accordion {
    constructor(accordionSelector, headSelector, contentSelector, duration = 150, allClosed) {
      this.accordion = document.querySelector(accordionSelector);
      this.accordionElements = document.querySelectorAll(accordionSelector + ' > *');
      this.headSelector = headSelector;
      this.contentSelector = contentSelector;
      this.duration = duration;
      this.classOpening = 'opening';
      this.classOpened = 'opened';
      this.allClosed = allClosed;
    }
  
    clickHandler = (e, element) => {
      e.preventDefault();
      const target = e.target;
      const head = element.querySelector(this.headSelector);
      if(!head.contains(target)) return;
      const content = element.querySelector(this.contentSelector);
      const display = window.getComputedStyle(content).display;
      if (content.matches(`.${this.classOpening}`)) return;
      if (display === 'none') {
        this.slideDown(head, content);
        if(this.allClosed){
          this.accordionElements.forEach(elem => {
            if(elem !== element){
                const head = elem.querySelector(this.headSelector);
                const content = elem.querySelector(this.contentSelector);
                if(content.matches(`.${this.classOpened}`)) {
                  this.slideUp(head, content);
                }
            }
          });
        }
      }
      if (content.matches(`.${this.classOpened}`)) {
        this.slideUp(head, content);
      }
    }
  
    buttonAnimation = (button) => {
      const opened = button.matches(`.${this.classOpened}`);
      if (opened) {
        button.classList.remove(this.classOpened);
        button.classList.add(this.classOpening);
        button.style.transition = `transform ${this.duration}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`;
        requestAnimationFrame(() => {
          button.style.transform = 'rotate(0deg)';
        });
        const clean = () => {
          button.classList.remove(this.classOpening);
          button.style.transition = '';
          button.style.transform = '';
          button.removeEventListener('transitionend', clean);
        }
        button.addEventListener('transitionend', clean);
      } else {
        button.classList.add(this.classOpening);
        button.style.transition = `transform ${this.duration}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`;
        setTimeout(() => {
          button.style.transform = 'rotate(45deg)';
        },4);
        const clean = () => {
          button.classList.remove(this.classOpening);
          button.classList.add(this.classOpened);
          button.style.transition = '';
          button.removeEventListener('transitionend', clean);
        }
        button.addEventListener('transitionend', clean);
      }
    }
  
    slideUp = (head, content) => {
      const paren = head.parentNode;
      paren.classList.remove('active');
      const button = head.querySelector('.js-accordion-button') || null;
      if(button) this.buttonAnimation(button);
      const height = window.getComputedStyle(content).height;
      content.style.height = height;
      content.style.overflow = 'hidden';
      content.classList.add(this.classOpening);
      content.style.transition = `all ${this.duration}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`;
      setTimeout(() => {
        content.style.height = 0;
        content.style.marginTop = '0';
        content.style.marginBottom = '0';
      },4);
      const clear = () => {
        content.classList.remove(this.classOpening);
        content.classList.remove(this.classOpened);
        content.style.cssText = "height: ''; overflow: ''; margin-top: ''; margin-bottom: '';";
        content.removeEventListener('transitionend', clear);
      }
      content.addEventListener('transitionend', clear);
    }
  
    slideDown = (head, content) => {
      const paren = head.parentNode;
      paren.classList.add('active');
      const button = head.querySelector('.js-accordion-button') || null;
      if(button) this.buttonAnimation(button);
      const marginTop = window.getComputedStyle(content).marginTop;
      const marginBottom = window.getComputedStyle(content).marginBottom;
      content.style.marginTop = '0';
      content.style.marginBottom = '0';
      content.style.display = 'block';
      const height = window.getComputedStyle(content).height;
      content.style.overflow = 'hidden';
      content.style.height = 0;
      content.classList.add(this.classOpening);
      content.style.transition = `all ${this.duration}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`;
      setTimeout(() => {
        content.style.height = height;
        content.style.marginTop = marginTop;
        content.style.marginBottom = marginBottom;
      },4);
  
      const clear = () => {
        content.classList.remove(this.classOpening);
        content.classList.add(this.classOpened);
        content.style.cssText = "display: block; height: auto; overflow: ''; transition: ''; margin-top: ''; margin-bottom: ''";
        content.removeEventListener('transitionend', clear);
      }
      content.addEventListener('transitionend', clear);
    }
  
    init = () => {
      if(!this.accordion || !this.accordionElements){
        console.log('Accordion: не все аргументы переданы!');
        return;
      }
      this.accordionElements.forEach(elem => {
        elem.addEventListener('click', e => this.clickHandler(e, elem));
        const content = elem.querySelector(this.contentSelector);
        if(content.matches('.opened')) {
          const head = elem.querySelector(this.headSelector);
          this.slideDown(head, content);
        }
      });
    }
  }
  
export default Accordion;
