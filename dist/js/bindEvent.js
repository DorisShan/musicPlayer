(function ($, root) {

    function bindEvent() {
        var timer = null;
        var timePro = 0;

        $('.like').on('click', function () {
            $(this).toggleClass('isLike');
        })

        $('.play').on('click', function () {
            $(this).toggleClass('pause');
            if (audio.status == 'pause') {
                audio.status == 'play';
                audio.play();
                rotated ();
                timer = setInterval(timeRun, 500)
            } else if (audio.status == 'play') {
                audio.status == 'pause';
                audio.pause();
                clearInterval(timer);
                clearInterval(rotatedTimer);
            }

        })
        $('.pre').on('click', function () {
            $('.play').removeClass('pause');
            if (infoIndex == 0) {
                infoIndex = dataList.length - 1;
            } else {
                infoIndex--;
            }
            changeSong(infoIndex);
        })
        $('.next').on('click', function () {
            if (infoIndex == dataList.length - 1) {
                infoIndex = 0;
            } else {
                infoIndex++;
            }
            changeSong(infoIndex);
        })

        var startLeft = 0;
        var afterMoveLeft;
        var movePer
        $('.spot').on('touchstart', function (e) {
            var w = $('.b_bar').offset().width;
            var disX = e.targetTouches[0].pageX;
            clearInterval(timer);
            $('.spot').on('touchmove', function (e) {
                var disL = e.targetTouches[0].pageX - disX;
                afterMoveLeft = startLeft + disL;
                if (afterMoveLeft <= 0) {
                    afterMoveLeft = 0;
                } else if (afterMoveLeft >= w) {
                    afterMoveLeft = w;
                }
                $('.spot').css({ left: afterMoveLeft });
                $('.t_bar').css({ width: afterMoveLeft });
            })
            $('.spot').on('touchend', function (e) {
                $(this).off('touchmove');
                $(this).off('touchend');
                startLeft = afterMoveLeft;
                movePer = afterMoveLeft / w;
                audio.Audio.currentTime = audio.Audio.duration * movePer;
                timer = setInterval(timeRun, 500)
            })
        })

        $('.list').on('click', function (e) {
            e.stopPropagation();
            $('.song_list').addClass('show');
        })

        $('.wrapper').on('click', function () {
            $('.song_list').removeClass('show');
        })

        $('.li_list').each(function (index, item) {
            $(item).on('click', function (e) {
                $('.pic_box img').css({transform: 'rotateZ(0deg)'});
                $('.pic_box img').attr('ro_data', 0);
                if(audio.status == 'play'){
                    $('.play').trigger('click');
                }
                e.stopPropagation();
                infoIndex = index;
                render(dataList[infoIndex]);
                audio.getAudio(dataList[infoIndex].audio);
                $('.play').trigger('click');
            })
        })

        var rotatedTimer = null;
        function rotated () {
            var deg = $('.pic_box img').attr('ro_data');
            rotatedTimer = setInterval(function () {
                $('.pic_box img').css({transform: 'rotateZ(' + deg + 'deg)'})
                deg = +deg + .3;
                $('.pic_box img').attr('ro_data', deg);
            }, 20)
        }


        function timeRun() {
            var currentTime = setTime(audio.Audio.currentTime);
            $('.cur_time').text(currentTime);
            timePro = Math.round(audio.Audio.currentTime / audio.Audio.duration * 100) + '%';
            $('.spot').css({ left: timePro });
            $('.t_bar').css({ width: timePro });
        }

        function changeSong(index) {
            $('.pic_box img').css({transform: 'rotateZ(0deg)'});
            $('.pic_box img').attr('ro_data', 0);
            clearInterval(timer);
            clearInterval(rotatedTimer);
            timePro = 0;
            startLeft = 0
            render(dataList[index]);
            audio.getAudio(dataList[index].audio);
            $('.spot').css({ left: 0 });
            $('.t_bar').css({ width: 0 });
            if (audio.status == 'play') {
                audio.play();
                $('.play').addClass('pause');
                timer = setInterval(timeRun, 500)
                rotated ()
            } else if (audio.status == 'pause') {
                $('.cur_time').text('00:00');
            }
        }
    }

    root.bindEvent = bindEvent;

}(window.Zepto, window.player || (window.player = {})))