function getEle(ele) {
    return document.querySelector(ele);
}
var main = getEle("#main");
var oLis = document.querySelectorAll("#list>li");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 960;
if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);
});


function start(e) {
    music.play();
    this.touchStart = e.changedTouches[0].pageX;
}
function move(e) {
    e.preventDefault();
    this.flag = true;
    var touchMove = e.changedTouches[0].pageX;
    var pos = touchMove - this.touchStart;
    var index = this.index;
    [].forEach.call(oLis, function () {
        arguments[0].className = "";
        if (arguments[1] != index) {
            arguments[0].style.display = "none"
        }
        arguments[0].firstElementChild.id = "";
    });
    if (pos > 0) {//右
        this.prevsIndex = (index == 0 ? oLis.length - 1 : index - 1);
        var duration = -winW + pos;
    } else if (pos < 0) {//左
        this.prevsIndex = (index == oLis.length - 1 ? 0 : index + 1);
        var duration = winW + pos;
    }
    oLis[this.prevsIndex].style.webkitTransform = "translate(" + duration + "px,0)";
    oLis[this.prevsIndex].style.display = "block";
    oLis[this.prevsIndex].className = "zIndex";
}
function end(e) {
    if (this.flag) {
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "0.5s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd", function () {
            this.style.webkitTransition = "";
            this.firstElementChild.id = "a" + (this.index + 1);
        }, false)
    }
}

//音乐部分
var img = getEle(".img");
var flag = true;
img.addEventListener("touchstart", function () {
    if (flag) {
        music.pause();
        img.style.animation = "music paused";
        flag = false;
    } else {
        music.play();
        img.style.animation = "music 1s infinite";
        flag = true;
    }
}, false);

//var center = getEle(".center");
//var arr = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];
//for (var i = 0; i < arr.length; i++) {
//    arr[i].index=i;
//    arr[i].addEventListener("touchmove", function () {
//        center.style.width = (this.index + 1) / arr.length * 100 + "%";
//    }, false);
//}

var num = 0;
function fnLoad() {
    var progress = getEle(".progress");
    var loading = getEle("#loading");
    var arr = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];
    for (var i = 0; i < arr.length; i++) {
        var oImg = new Image();
        oImg.src = "img/" + arr[i];
        oImg.onload = function () {
            num++;
            progress.style.width = num / arr.length * 100 + "%";
            if (num == arr.length && loading) {
                progress.addEventListener("webkitTransitionEnd", function () {
                    main.removeChild(loading);
                    loading = null;
                }, false)
            }
        }
    }

}
fnLoad();