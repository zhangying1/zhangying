/**
 * Created by Administrator on 2016/7/2.
 */
$(function() {
    $(window).bind('resize', function () {
        if ($(document).width() <= 1000) {
            $('#navi').slideUp();
        } else {
            $('#navi').slideDown();
        }
        ;
    });
    //图片时钟
    var aImg = $('.navi ul .time img');

    function clock() {
        //设置时间
        var oDate = new Date();
        var d = oDate.getDay();
        var t = toDouble(oDate.getHours()) + '-' + toDouble(oDate.getMinutes()) + '-' + toDouble(oDate.getSeconds()) + '-' + d;
        var dArr = ['seven', 'one', 'two', 'three', 'four', 'five', 'six'];

        aImg.each(function (index) {
            if (t.charAt(index) == '-') {
                return true;
            }
            this.src = 'img/' + t.charAt(index) + '.png'
        });
        aImg.eq(-1).each(function (index) {
            this.src = 'img/' + dArr[d] + '.png'
        });
    };
    clock();
    setInterval(clock, 1000);

    //导航滑入滑出
    !(function(){
        var left = $('.navi .inform .left_arrow');
        var right = $('.navi .inform .right_arrow');
        function arrow(){
            $('.navi .inform li').eq(3).mouseover(function() {
                left.stop().animate({"left": "-102"},{easing: 'easeOutBack'});
                right.stop().animate({"left": "17"},{easing: 'easeOutBack'});
            });
            $('.navi .inform li').eq(2).mouseover(function() {
                left.stop().animate({"left": "2"},{easing: 'easeOutBack'});
                right.stop().animate({"left": "117"},{easing: 'easeOutBack'});
            })
            $('.navi .inform li').eq(1).mouseover(function() {
                left.stop().animate({"left": "105"},{easing: 'easeOutBack'});
                right.stop().animate({"left": "216"},{easing: 'easeOutBack'});
            })
            $('.navi .inform li').eq(0).mouseover(function() {
                left.stop().animate({"left": "201"},{easing: 'easeOutBack'});
                right.stop().animate({"left": "334"},{easing: 'easeOutBack'});
            })
        }
        arrow();
    })();
    //返回顶部
    !(function(){
        var oLast = $('.bottom .last');
        $(window).scroll(function(){
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop < 160){
                oLast.slideUp();
            }else{
                oLast.slideDown();
            }
        });
        var timer;
        oLast.click(function(){
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var start = scrollTop;
            var dis = 0 - start;

            var count = Math.floor(200/30);
            var iNow = 0;

            clearInterval(timer);
            timer = setInterval(function(){
                iNow++;
                var a = iNow/count;
                document.documentElement.scrollTop = document.body.scrollTop = a * dis + start;
                if(iNow == count){
                    clearInterval(timer);
                }
            },30);
        });
    })();
    
    //标题
    !(function(){
        var left = $('.content .title .left_arrow');
        var right = $('.content .title .right_arrow');
        var title = $('.content .title h2');
        var bFlag = false;
        var timer;
        title.mouseover(function(){
            clearTimeout(timer);
                if(bFlag)return;
                bFlag = true;
                left.stop().animate({"left": "370",'opacity': '1'});
                right.stop().animate({"left": "680",'opacity': '1'});
        });
        title.mouseout(function(){
            clearTimeout(timer);
            timer = setTimeout(function(){
               bFlag = false;
               left.stop().animate({"left": "0",'opacity': '0'});
               right.stop().animate({"left": "1100",'opacity': '0'});
           },300);
        });
    })();

    //灵魂回响
    !(function(){
        var soul = $('.top .css_1 .title_2 ul li');
        function overSoul(obj){
            obj.mouseover(function(){
                obj.find('a').slideDown();
                obj.find('span').slideDown();
            });
            obj.find('a').mouseout(function(){
                obj.find('a').slideUp();
                obj.find('span').slideUp();
            });
        };
        overSoul(soul.eq(0));
        overSoul(soul.eq(1));
        overSoul(soul.eq(2));
        overSoul(soul.eq(3));
    })();
    //选项卡
    !(function(){
        var aDiv = $('.content div');
        var aBtn = $('.btn div');

        aBtn.each(function(index){
            $(this).mouseover(function(){
                aBtn.removeClass('active');
                aDiv.removeClass('active');
                $(this).addClass('active');
                $(aDiv[index]).addClass('active');
            });
        });
    })();
});