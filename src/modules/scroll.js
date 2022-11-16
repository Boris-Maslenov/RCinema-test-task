const scroll = (fn) => {

    let links = document.querySelectorAll('[scroll]');
    const speed = 0.3;
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            if(fn) fn();
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