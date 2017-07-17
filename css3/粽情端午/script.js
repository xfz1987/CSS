window.onload = function(){
    var g = function(id){
        return document.getElementById(id)
    };

    var TimeLine = function(){
        this.quences = [];//动画序列
    };

    TimeLine.prototype = {
        add:function(timeout,func,log){
            this.quences.push({
                timeout:timeout,
                func:func,
                log:log
            });
            return this;//链式调用
        },
        play:function(ff){//参数支持快进
            for(var i=0,len=this.quences.length;i<len;i++){
                (function(q){
                    var fn = q.func,
                        timeout = Math.max(q.timeout - (ff||0),0);
                        log = q.log;
                    setTimeout(fn,timeout);
                    setTimeout(function(){
                        console.log('time->'+timeout+',log->'+log);
                    },timeout);
                })(this.quences[i]);
            }
        }
    };

    /*初始场景*/
    var s1 = new TimeLine();
    //粽子展开场景
    var s2 = new TimeLine();
    //粽子旋转场景
    var s3 = new TimeLine();

    //定义初始动画
    s1.add(1,function(){
        g('c_zz_box').className += ' c_zz_box_rock';
        g('c_line').onclick = function(){
            s2.play();
        };
    }).play();

    //定义粽子展开的动画
    s2.add(1,function(){
        g('c_zz_box').className = 'c_zz_box';
        g('text').className += ' text_in';
    }).add(100,function(){
        g('c_line').className = 'c_line_2';
    }).add(500,function(){
        g('c_line').className = 'c_line_3';
    }).add(1800,function(){
        g('c_line').className = 'c_line_4';
    }).add(1500,function(){
        g('c_line').className = 'c_line_0';
    }).add(2000,function(){
        g('c_zz').className += ' c_zz_out';
        g('c_zz_r').className += ' c_zz_r_in';
        g('leaf_l').className += ' leaf_l_in';
        g('leaf_r').className += ' leaf_r_in';
        g('c_t_1').className += ' c_t_in';
        g('c_t_2').className += ' c_t_mirror_0';
    }).add(2500,function(){
        g('leaf_l').className += ' leaf_l_out';
        g('leaf_r').className += ' leaf_r_out';
        g('leaf_b').className += ' leaf_b_in';
        s3.play();
    });

    //旋转动画
    s3.add(1000,function(){
        g('c_zz_r').className = 'c_zz_r c_zz_r_in c_zz_r_view_1';
    }).add(1200,function(){
        g('c_zz_r').className = g('c_zz_r').className.replace(/\d/g,'2');
        g('c_t_1').className = 'c_t_1 c_t_in c_t_view_2';
        g('c_t_2').className = 'c_t_2 c_t_in c_t_mirror_2';
    }).add(1400,function(){
        g('c_zz_r').className = g('c_zz_r').className.replace(/\d/g,'3');
        g('c_t_1').className = 'c_t_1 c_t_in c_t_view_3';
        g('c_t_2').className = 'c_t_2 c_t_in c_t_mirror_3';
    }).add(1600,function(){
        g('c_zz_r').className = g('c_zz_r').className.replace(/\d/g,'4');
        g('c_t_1').className = 'c_t_1 c_t_in c_t_view_4';
        g('c_t_2').className = 'c_t_2 c_t_in c_t_mirror_4';
    }).add(1800,function(){
        g('c_zz_r').className = g('c_zz_r').className.replace(/\d/g,'0');
        g('c_t_1').className = 'c_t_1 c_t_in c_t_view_0';
        g('c_t_2').className = 'c_t_2 c_t_in c_t_mirror_0';
    });

    //逆时针再转
    s3.add(3000,function(){
        g('c_zz_r').className = g('c_zz_r').className.replace(/\d/g,'4')
        g('c_t_1').className = 'c_t_1 c_t_in c_t_view_4';
        g('c_t_2').className = 'c_t_2 c_t_in c_t_mirror_4';
    }).add(3200,function(){
        g('c_zz_r').className = g('c_zz_r').className.replace(/\d/g,'3');
        g('c_t_1').className = 'c_t_1 c_t_in c_t_view_3';
        g('c_t_2').className = 'c_t_2 c_t_in c_t_mirror_3';
    }).add(3400,function(){
        g('c_zz_r').className = g('c_zz_r').className.replace(/\d/g,'2');
        g('c_t_1').className = 'c_t_1 c_t_in c_t_view_2';
        g('c_t_2').className = 'c_t_2 c_t_in c_t_mirror_2';
    }).add(3600,function(){
        g('c_zz_r').className = g('c_zz_r').className.replace(/\d/g,'1');
        g('c_t_1').className = 'c_t_1 c_t_in c_t_view_0';
        g('c_t_2').className = 'c_t_2 c_t_in c_t_mirror_0';
    }).add(5000,function(){
        s3.play();
    });

    //解决粽子肉初次动画的闪动bug
    var imgs = ['images/zzr_2.png','images/zzr_3.png','images/zzr_4.png'];
    var imgs_onload = function(){
        imgs.pop();
        if(imgs.length === 0){
            s1.play();
        }
    }
    for(var i=0,len=imgs.length;i<len;i++){
        var img = new Image;
        img.onload = imgs_onload();
        img.src = imgs[i];
    }
}