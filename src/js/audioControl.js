(function ($, root) {

    function AudioManager() {
        this.Audio = new Audio();
        this.status = 'pause';
    }

    AudioManager.prototype = {
        play: function () {
            this.Audio.play();
            this.status = 'play';
        },
        pause: function () {
            this.Audio.pause();
            this.status = 'pause';
        },
        getAudio: function (src) {
            this.Audio.src = src;
            this.Audio.load();
        },
        getAudioDuration: function () {
            console.log(this.Audio.duration);
        }
    }
    root.audioControl= new AudioManager();

} (window.Zepto, window.player || (window.player = {})))