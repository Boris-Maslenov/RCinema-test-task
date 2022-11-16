const scroll = () => {

    let links = document.querySelectorAll('[scroll]');
    const speed = 0.3;
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            let widthTop = document.documentElement.scrollTop;
            let hash = e.target.hash;
            let toBlock = document.querySelector(hash).getBoundingClientRect().top;
            let start = null;

            requestAnimationFrame(step);

            function step(time){
                if(start === null) start = time;
                let progress = time - start;
                let r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock) );
                console.log(r);
                document.documentElement.scrollTo(0, r);
                if(r !== widthTop + toBlock){
                    requestAnimationFrame(step);
                }
            }
        });
    });

}

export default scroll;