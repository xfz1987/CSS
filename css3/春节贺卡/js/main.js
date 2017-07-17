window.onload = function(){
    var music = document.getElementById('music');
    var audio = document.getElementsByTagName('audio')[0];
    var page1 = document.getElementById('page1');
    var page2 = document.getElementById('page2');
    var page3 = document.getElementById('page3');

    //点击音乐图标，控制音乐播放效果
    music.addEventListener('touchstart',function(){
        if(audio.paused){
            console.log(111);
            audio.play();
            this.className = 'play';
            //this.style.animationPlayState = 'running';//兼容性不好
            //this.style.webkitanimationPlayState = 'running';//兼容性不好
        }else{
            audio.pause();
            this.className = '';//差
            //this.style.animationPlayState = 'paused';//兼容性不好
            //this.style.webkitanimationPlayState = 'paused';//兼容性不好
        }
    },false);

    //点击跳页
    page1.addEventListener('touchstart',function(){
        page1.style.display = 'none';
        page2.style.display = 'block';
        page3.style.display = 'block';
        page3.style.top = '100%';

        setTimeout(function(){
            page2.className = 'page fadeOut';
            page3.className = 'page fadeIn';
        },5500);
    },false);


    //音乐播放完停止时，自动停止光盘旋转效果
    audio.addEventListener('ended',function(){
        music.className = '';
    },false)
}