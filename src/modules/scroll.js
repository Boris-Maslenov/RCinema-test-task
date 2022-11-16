const scroll = (fn, breakPoint) => {


    const header = document.querySelector('header');
    let prev = 0;
    window.addEventListener('scroll', () => {
        const scroll = document.documentElement.scrollTop;
        if(scroll > prev && scroll > 300 && scroll < 800 ||  scroll < prev && scroll > 800 )  {
            header.classList.add('hidden');
        } else {
            if(header.matches('.hidden')){
                header.classList.remove('hidden');
            }
        }
        prev = scroll; 
    });

    let links = document.querySelectorAll('[scroll]');
    const speed = 0.3;
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            if(breakPoint && fn && window.innerWidth <= breakPoint)fn();
            let scrollTop = document.documentElement.scrollTop;
            let hash = e.target.hash;
            let toBlock = document.querySelector(hash).getBoundingClientRect().top;
            let start = null;
            requestAnimationFrame(step);
            function step(time){
                if(start === null) start = time;
                let progress = time - start; 
                let r = (toBlock < 0 ? Math.max(scrollTop - progress/speed, scrollTop + toBlock) : Math.min(scrollTop + progress/speed, scrollTop + toBlock) );
                document.documentElement.scrollTo(0, r);
                if(r !== scrollTop + toBlock){
                    requestAnimationFrame(step);
                }
            }
        });
    });

}

export default scroll;