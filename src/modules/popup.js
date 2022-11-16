const popup = (buttonsSelector) => {

    const animationOpen = 'fadeInDown',
        animationClose = 'fadeOutUp',
        animationOverlayIn = 'animate__fadeIn',
        animationOverlayOut = 'animate__fadeOut';

    function overlayClear(e) {
        const target = e.target;
        target.classList.remove(animationOverlayOut);
        target.style.display = 'none';
        target.removeEventListener('animationend', overlayClear);
    }

    function popupClear(e) {
        const target = e.target;
        target.classList.remove(`animate__${animationClose}`);
        target.style.display = 'none';
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.marginRight = '';
        target.removeEventListener('animationend', popupClear);
    }

    const calcScroll = () => {
        const div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.append(div);
        const scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }

    const popupHandler = e => {
        e.preventDefault();
        const closePopup = () => {
            overlay.classList.remove(animationOverlayIn);
            overlay.classList.add(animationOverlayOut);

            popup.classList.remove(`animate__${animationOpen}`);
            popup.classList.add(`animate__${animationClose}`);

            popup.addEventListener('animationend', popupClear);
            overlay.addEventListener('animationend', overlayClear);
        }

        const popupID = e.target.hash;
        const popup = document.querySelector(popupID);
        const popupContent = popup.querySelector('.popup__content');
        const overlay = document.querySelector('.overlay');

        overlay.classList.add(animationOverlayIn);
        overlay.style.display = 'block';

        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.marginRight = `${calcScroll()}px`;

        popup.classList.add(`animate__${animationOpen}`);
        popup.style.display = 'block';

        popup.addEventListener('click', e => {
            const target = e.target;
            if (!popupContent.contains(target) || target.closest('.popup__close')) {
                e.preventDefault();
                closePopup();
            }
        });
    }

    document.querySelectorAll(buttonsSelector).forEach(btn => btn.addEventListener('click', e => {
        e.preventDefault();
        popupHandler(e)
    }));

}

export default popup;