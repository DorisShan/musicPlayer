var dataList;
var root = window.player;
var render = root.render;
var renderSongList = root.renderSongList;
var bindEvent = root.bindEvent;
var infoIndex = 0;
var audio = root.audioControl;
var setTime = root.setTime;

(function ($, root) {

    function getData () {
        $.ajax({
            url: '../mock/data.json',
            type: 'GET',
            success: function (data) {
                console.log(data)
                dataList = data;
                render(data[0]);
                renderSongList(dataList);
                bindEvent();
                audio.getAudio(data[0].audio);

            }
        })
    }
    getData();

} (window.Zepto, window.player || (window.player = {})))