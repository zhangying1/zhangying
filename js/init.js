/**
 * Created by ijiajia on 2016/7/19.
 */
window.onload = function () {
    var oC=document.querySelector('#c1');

    var gd=oC.getContext('2d');
    var out=50;
    var frequency=0.2;
    // 加载资源
    loadImage(resource, function(){
        // 存炮弹
        var arrBullet=[];
        // 存鱼
        var arrFish=[];
        // 存金币
        var arrCoin=[];
        // 存死鱼
        var arrDieFish=[];
        // 存网
        var arrWeb=[];

        // 画大炮
        var c=new Cannon(7);
        setInterval(function(){
            gd.clearRect(0,0,oC.width,oC.height);
            // 生成鱼
            if(Math.random()<frequency){
                var f1=new Fish(rnd(1,6));

                if(Math.random()<0.5){
                    f1.x=-out;
                    f1.rotate=rnd(-45,45);
                }else{
                    f1.x=oC.width+out;
                    f1.rotate=rnd(135,225);
                }
                f1.y=rnd(100, oC.height-100);
                arrFish.push(f1);
            }
            // 画鱼
            for(var i=0; i<arrFish.length; i++){
                arrFish[i].draw(gd);
            }
            // 画子弹
            for(var i=0; i<arrBullet.length; i++){
                arrBullet[i].draw(gd);
            }
            // 画金币
            for(var i=0; i<arrCoin.length; i++){
                arrCoin[i].draw(gd);
            }
            // 画死鱼
            for(var i=0; i<arrDieFish.length; i++){
                arrDieFish[i].draw(gd);
            }
            // 画网
            for(var i=0; i<arrWeb.length; i++){
                arrWeb[i].draw(gd);

                arrWeb[i].scale+=0.05;
                if(arrWeb[i].scale>1.2){
                    arrWeb.splice(i, 1);
                    i--;
                }
            }
            // 画炮台
            gd.drawImage(JSON['bottom'],
                0,0,765,72,
                0,oC.height-70,765,72
            );
            // 画大炮
            c.draw(gd);
            // 判断子弹是否打中鱼
            for(var i=0; i<arrFish.length; i++){
                for(var j=0; j<arrBullet.length; j++){
                    if(arrFish[i].isIn(arrBullet[j].x, arrBullet[j].y)){
                        var type=arrFish[i].type;
                        var x=arrFish[i].x;
                        var y=arrFish[i].y;
                        var rotate=arrFish[i].rotate;
                        // 鱼死
                        arrFish.splice(i, 1);
                        i--;
                        // 子弹死
                        arrBullet.splice(j, 1);
                        j--;
                        // 生成金币
                        var coin=new Coin(type);
                        coin.x=x;
                        coin.y=y;
                        coin.songPlay();
                        arrCoin.push(coin);
                        // 生成死鱼
                        var dieFish=new DieFish(type);
                        dieFish.x=x;
                        dieFish.y=y;
                        dieFish.rotate=rotate;
                        arrDieFish.push(dieFish);
                        // 生成网
                        var web=new Web();
                        web.x=x;
                        web.y=y;
                        arrWeb.push(web);

                        setTimeout(function(){
                            arrDieFish.splice(dieFish);
                        }, 400);
                    }
                }
            }

            // 优化，子弹超出画布死
            for(var i=0; i<arrBullet.length; i++){
                if(
                    arrBullet[i].x<0 ||
                    arrBullet[i].y<0 ||
                    arrBullet[i].x>oC.width ||
                    arrBullet[i].y>oC.height
                ){
                    arrBullet.splice(i, 1);
                    i--;
                }
            }
            // 优化，鱼游出去，死
            for(var i=0; i<arrFish.length; i++){
                if(
                    arrFish[i].x<-out ||
                    arrFish[i].y<-out ||
                    arrFish[i].x>oC.width+out ||
                    arrFish[i].y>oC.height+out
                ){
                    arrFish.splice(i, 1);
                    i--;
                }
            }
        }, 16);
        oC.onclick=function(ev){
            var y=c.y-ev.pageY;
            var x=ev.pageX-c.x-oC.offsetLeft;

            var d=90-a2d(Math.atan2(y,x));
            c.rotate=d;
            c.emit();
            // 发射炮弹
            var bullet=new Bullet(c.type);
            bullet.x=c.x;
            bullet.y=c.y;
            bullet.rotate=c.rotate;
            arrBullet.push(bullet);

            var oAudio=new Audio();
            oAudio.src='snd/cannon.mp3';
            oAudio.play();
        };
    });
};