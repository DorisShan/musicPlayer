(function ($, root) {

    function setTime (time) {
        var min = Math.floor(time / 60);
        var sec = Math.round(time % 60);
        min = min >= 10 ? min : '0' + min;
        sec = sec >= 10 ? sec : '0' + sec;
        return min + ':' + sec;
    }

    root.setTime = setTime;
    
} (window.Zepto, window.player || (window.player = {})))