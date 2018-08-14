

var itemLayer = cc.Layer.extend({
    sprite:null,
    itembg:null,
    img1:null,
    img2:null,
    imgrect:new Array(9),
    px:null,
    py:null,
    variable:0,
    player1:0,

    ctor:function () {

        this._super();

        //背景圖片
        this.itembg = new cc.Sprite(res.itembg_jpg);
        this.itembg.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/2
        });
        this.addChild(this.itembg);

        this.drawSegment(this);
        this.setUpMouse(this);
        this.setImg(this);

        return true;
    },
    drawSegment:function(layer){
        //使用DrawNode(繪製結點)來繪製圖形
        var stick1 = new cc.DrawNode();
        //drawSegment(繪製段)繪製線(從哪,到哪,半徑,顏色)
        stick1.drawSegment(
            cc.p(cc.winSize.width *1/5,cc.winSize.height *3/5),
            cc.p(cc.winSize.width *4/5,cc.winSize.height *3/5),
            4,
            cc.color(255,255,255)
        );
            this.addChild(stick1);

            var stick2 = new cc.DrawNode();
            stick2.drawSegment(
              cc.p(cc.winSize.width *1/5,cc.winSize.height *2/5),
              cc.p(cc.winSize.width *4/5,cc.winSize.height *2/5),
              4,
                cc.color(255,255,255)
            );
             this.addChild(stick2);

        var stick3 = new cc.DrawNode();
        stick3.drawSegment(
            cc.p(cc.winSize.width *2/5,cc.winSize.height *4/5),
            cc.p(cc.winSize.width *2/5,cc.winSize.height *1/5),
            4,
            cc.color(255,255,255)
        );
        this.addChild(stick3);

        var stick4 = new cc.DrawNode();
        stick4.drawSegment(
            cc.p(cc.winSize.width *3/5,cc.winSize.height *4/5),
            cc.p(cc.winSize.width *3/5,cc.winSize.height *1/5),
            4,
            cc.color(255,255,255)
        );
        this.addChild(stick4);
    },
    setImg:function(layer){

for(this.variable;this.variable<this.imgrect.length;this.variable++) {

    this.px = (this.variable % 3) + 1;
    this.py = parseInt(this.variable / 3);
    if (this.py === 0) {
        this.py += 3;
    }
    else if (this.py === 1) {
        this.py += 1;
    }
    else if (this.py === 2) {
        this.py -= 1;

    }
    this.imgrect[this.variable] = new cc.Rect(
        cc.winSize.width * this.px / 5,
        cc.winSize.height * this.py / 5,
        180,
        130,
    );
}
    },
    setUpMouse:function(layer){
        cc.eventManager.addListener({
            event:cc.EventListener.MOUSE,
            onMouseDown:function(event) {
                var x = event.getLocationX();
                var y = event.getLocationY();
                var point = new cc.Point(x, y);

                for(var i=0;i<layer.imgrect.length;i++){
                    if (cc.rectContainsPoint(layer.imgrect[i], point)&&layer.player1<5) {

                        layer.img1 = new cc.Sprite(res.giraffe_png);
                        layer.img1.x = layer.imgrect[i].x + layer.imgrect[i].width / 2;
                        layer.img1.y = layer.imgrect[i].y + layer.imgrect[i].height / 2;
                        layer.addChild(layer.img1);
                        layer.player1+=1;
                        cc.log(layer.player1);

                        for(var p=0;p<1;p++){
                            var a=0;
                            a=parseInt(Math.random()*9);
                            var b=a;
                            if(a!=i){
                                if(a!=b){
                                    layer.img2 = new cc.Sprite(res.panda_png);
                                    layer.img2.x = layer.imgrect[a].x + layer.imgrect[a].width / 2;
                                    layer.img2.y = layer.imgrect[a].y + layer.imgrect[a].height / 2;
                                    layer.addChild(layer.img2);
                                    cc.log("a!=i")
                                }

                            }
                            else{
                                p=0
                            }
                        }




                        // for(var b=0;b<1;b++){
                        //     var a=0;
                        //     a=parseInt(Math.random()*9);
                        //     if(a!=i){
                        //         layer.img2 = new cc.Sprite(res.panda_png);
                        //         layer.img2.x = layer.imgrect[a].x + layer.imgrect[a].width / 2;
                        //         layer.img2.y = layer.imgrect[a].y + layer.imgrect[a].height / 2;
                        //         layer.addChild(layer.img2);
                        //         layer.player1++;
                        //         cc.log("a!=i")
                        //     }
                        //     else{
                        //         layer.img2 = new cc.Sprite(res.panda_png);
                        //         layer.img2.x = layer.imgrect[a].x + layer.imgrect[a].width / 2;
                        //         layer.img2.y = layer.imgrect[a].y + layer.imgrect[a].height / 2;
                        //         layer.addChild(layer.img2);
                        //         layer.player1++;
                        //         cc.log("a==i")
                        //     }
                        //     }

                    }

                }

            } // end of down

        },this);
    },


});

var itemScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new itemLayer();
        this.addChild(layer);
    }
});

