(function ($, root) {

    function renderImg (src) {
        $('.pic_box img').attr('src', src)
        var Img = new Image();
        Img.src = src;
        Img.onload = function () {
            root.blurImg(Img, $('.wrapper'));
        }
    }

    function renderInfo (data) {
        $('.song_name').text(data.song);
        $('.singer_name').text(data.singer);
        $('.album_name').text(data.album);
    }

    function renderIsLike (isLike) {
        if(isLike){
            $('.like').addClass('isLike');
        }else{
            $('.like').removeClass('isLike');
        }
    }

    function renderAllTime(time) {
        var allTime = setTime(time);
        $('.all_time').text(allTime);
    }

    function renderSongList (dataList) {
        console.log(dataList)
        var str = '';
        dataList.forEach(function (item, index) {
            str += `
            <li class="li_list">
            <div class="number">`+ (index + 1) + `</div>
            <div class="detail">
                <div class="detail_song">` + item.song + `(` + item.album + `)` + `</div>
                <div class="detail_singer">` + item.singer + `</div>
            </div>
            </li>
            `
        })
        $('.allSongs').html(str);
    }

    function render (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
        renderAllTime(data.duration);
    }

    root.render = render;
    root.renderSongList = renderSongList;

} (window.Zepto, window.player || (window.player = {})))