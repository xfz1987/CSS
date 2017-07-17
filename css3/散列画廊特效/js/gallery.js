/*common methods*/
function g(selector){
    var method = selector.substring(0, 1) === '#' ? 'getElementById' : 'getElementsByClassName';
    return document[method](selector.substr(1));
}

var Gallery = (function(){
    function Gallery(){
        this._addPhoto();
        this._rsort(this._random([1,data.length]));
    }
    Gallery.prototype = {
        //利用模板替换输出内容
        _addPhoto:function(){
            //获取模板字符串
            var tpl = g('#wrap').innerHTML.replace(/(^\s*)|(\s*$)/g,'');//清除头尾的空白符
            var html = [],nav=[];
            for(var i=0,len=data.length;i<len;i++){
                var index = i+1;
                var _html = tpl.replace(/{index}/,index)
                               .replace(/{img}/,data[i].img)
                               .replace(/{caption}/,data[i].caption)
                               .replace(/{desc}/,data[i].desc);
                html.push(_html);
                nav.push('<span id="i_'+ index +'" class="i" onclick="Gallery.turn(g(\'#photo_' + index + '\'))"></span>');
            }
            html.push('<div class="nav">' + nav.join('') + '</div>');
            g('#wrap').innerHTML = html.join('');
        },
        //海报排序
        _rsort:function(n){
            var temp = [];
            //所有图片去之前增加的类
            var _photos = g('.photo');
            for(var i=0,len=_photos.length;i<len;i++){
                _photos[i].className = _photos[i].className.replace(/\s*photo_center\s*/,' ')
                                                           .replace(/\s*photo_front\s*/,' ')
                                                           .replace(/\s*photo_back\s*/,' ');
                _photos[i].className += ' photo_front';
                _photos[i].style.left='';
                _photos[i].style.top='';
                _photos[i].style['-webkit-transform'] = 'rotate(360deg) scale(1.3)';//为了让中间的图片比其他图片大点，并且增加一个旋转效果
                temp.push(_photos[i]);
            }
            //给指定元素添加 photo_center
            g('#photo_'+n).className += ' photo_center';
            //去除中间展示的数组
            var arr = temp.filter(function(item) {
                return !/photo_center/.test(item.className);
            });

            /*左右分区*/
            var photo_left = arr.splice(0,Math.ceil(arr.length/2));
            var photo_right = arr;
            var ranges = this._range();
            //获取位置的范围，作为位置随机的参数,分别给左右分区中的各个图片进行缩放、位置、选择进行设置
            for(i=0,len=photo_left.length;i<len;i++){
                var photo = photo_left[i];
                photo.style.left = this._random(ranges.left.x) + 'px';
                photo.style.top = this._random(ranges.left.y) + 'px';
                photo.style['-webkit-transform'] = 'rotate('+ this._random([-90,90]) +'deg) scale(1)';
            }
            for(i=0,len=photo_right.length;i<len;i++){
                var photo = photo_right[i];
                photo.style.left = this._random(ranges.right.x) + 'px';
                photo.style.top = this._random(ranges.right.y) + 'px';
                photo.style['-webkit-transform'] = 'rotate('+ this._random([-90,90]) +'deg) scale(1)';
            }

            //给控制区域设置样式
            var items = g('.i');
            for(i=0,len=items.length;i<len;i++){
                items[i].className = items[i].className.replace(/\s*i_cur\s*/,' ').replace(/\s*i_back\s*/,' ');
            }
            g('#i_'+n).className += ' i_cur';
        },
        //翻转控制,共有方法
        turn:function(el){
            var cls = el.className;
            var n = el.id.split('_')[1];
            if(!/photo_center/.test(cls)){//如果当前元素非中心图片，则重新排序，并将当前元素设置为中心图片
                return this._rsort(n);
            }
            if(/photo_front/.test(cls)){
                cls = cls.replace(/photo_front/,' photo_back ');
                g('#i_'+n).className += ' i_back';
            }else{
                cls = cls.replace(/photo_back/,' photo_front');
                g('#i_'+n).className = g('#i_'+n).className.replace(/\s*i_back\s*/,' ');
            }
            return el.className = cls;
        },
        //计算左右分区的位置范围
        _range:function(){
            var range = {
                left:{x:[],y:[]},
                right:{x:[],y:[]}
            };
            //获取最外围容器的宽度和高度
            var wrap = {
                width:g('#wrap').offsetWidth,
                height:g('#wrap').offsetHeight
            };
            //获取每一张海报的宽度和高度，因为海报的大小都是一样的，所以取第一张
            var photo = {
                width:g('.photo')[0].offsetWidth,
                height:g('.photo')[0].offsetHeight
            };
            //按照自己想要显示的区域进行计算，左右区域的高度 (top) 范围是一样的
            range.left.x = [-photo.width, wrap.width/2 - photo.width/2];
            range.left.y = [-photo.height, wrap.height];
            range.right.x = [wrap.width/2 + photo.width/2, wrap.width + photo.width];
            range.right.y = range.left.y;

            return range;
        },
        /**
        * 生成随机数
        * @param  arr [数组，包含两个元素，最大值和最小值]
        * @return {[type]}     [description]
        */
        _random:function(arr){
            var min = Math.min(arr[0],arr[1]);
            var max = Math.max(arr[0],arr[1]);
            return Math.floor(Math.random()*(max-min)+min);
        }

    }
    return new Gallery();
})();

