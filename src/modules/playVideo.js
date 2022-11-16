class VideoPlayer {
    constructor(popupSelector, triggerSelector){
        this.popup = document.querySelector(popupSelector);
        this.close = this.popup.querySelector('.popup__close');
        this.trigger = document.querySelector(triggerSelector);
    }

    createPlayer(url){
        this.player = new YT.Player('frame', {
            width: '100%',
            height: '480',
            videoId: url,
          });
    }

    init(){
        const tag = document.createElement('script');
        tag.setAttribute('defer','');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        this.trigger.addEventListener('click', e => {
            if(document.querySelector('div#frame')){
                this.createPlayer('M7lc1UVf-VE');
            }
        })

        this.close.addEventListener('click', () => {
            this.player.stopVideo();
        });
    }

}
export default VideoPlayer;