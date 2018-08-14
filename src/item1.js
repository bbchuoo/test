

var item1Layer = cc.Layer.extend({
    sprite:null,
    itembg:null,
    imgrect:new Array(9),
    px:null,
    py:null,
    img1:null,
    img2:null,
    winner:[],
    checkPoint:[],
    gameOver:true,
    currentState:[],
    currentSetp:0,
    getclick:null,
    checkwinner:null,
    checkcombo:null,
    symbols:[],
    init:null,
    initgame:null,
    i:0,
    xx:null,
    yy:null,
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

        // this.setwinner(this);

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

        for(let i=0;i<this.imgrect.length;i++) {

            this.px = (i % 3) + 1;
            this.py = parseInt(i / 3);
            if (this.py === 0) {
                this.py += 3;
            }
            else if (this.py === 1) {
                this.py += 1;
            }
            else if (this.py === 2) {
                this.py -= 1;

            }
            this.imgrect[i] = new cc.Rect(
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
                for (layer.i=0; layer.i < layer.imgrect.length; layer.i++) {

                    if (cc.rectContainsPoint(layer.imgrect[layer.i], point)){

                        if(layer.gameOver) {

                            layer.getclick = layer.imgrect[layer.i];
                            if(layer.currentState[layer.i]==null){
                                layer.currentState.unshift(layer.getclick);

                                playRound(layer.imgrect[layer.i],layer);
                            }
                            else{
                                alert("點過了")
                            }


                        }



                    }


                }

            } // end of down

        },this);
    },

    // setwinner:function(){
    //     //定義勝利的組合
    //     // this.winner = {
    //     //     combo0 : [0,1,2],
    //     //     combo1:[3,4,5],
    //     //     combo2 : [6,7,8],
    //     //     combo3 : [0,3,6],
    //     //     combo4 : [1,4,7],
    //     //     combo5 : [2,5,8],
    //     //     combo6 : [0,4,8],
    //     //     combo7 : [2,4,6],
    //     //
    //     // };
    //     this.winner = [
    //         [0,1,2],
    //        [3,4,5],
    //        [6,7,8],
    //        [0,3,6],
    //         [1,4,7],
    //         [2,5,8],
    //         [0,4,8],
    //        [2,4,6],
    //
    //     ];

        // this.checkPoint=[
        //     [this.winner.combo0,this.winner.combo3,this.winner.combo6],
        //    [this.winner.combo0,this.winner.combo4],
        //    [this.winner.combo0,this.winner.combo5,this.winner.combo7],
        //    [this.winner.combo1,this.winner.combo3],
        //    [this.winner.combo1,this.winner.combo4,this.winner.combo6,this.winner.combo7],
        //   [this.winner.combo1,this.winner.combo5],
        //   [this.winner.combo2,this.winner.combo3,this.winner.combo7],
        //    [this.winner.combo2,this.winner.combo4],
        //   [this.winner.combo2,this.winner.combo5,this.winner.combo6],
        // ]
        // ;
        // cc.log(this.checkPoint.one);
    // },








});

var item1Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new item1Layer();
        this.addChild(layer);
    }
});

var turn = 0;
function playRound(objDest,layer){
if(turn==0){
        layer.img1 = new cc.Sprite(res.giraffe_png);
        layer.img1.x = objDest.x + objDest.width / 2;
        layer.img1.y = objDest.y + objDest.height / 2;
        layer.addChild(layer.img1);
        turn=1;

}
else if(turn==1) {
    layer.img2 = new cc.Sprite(res.panda_png);
    layer.img2.x = objDest.x + objDest.width / 2;
    layer.img2.y = objDest.y + objDest.height / 2;
    layer.addChild(layer.img2);
    turn = 0;
}
}



// function player1(objDest,layer){
//     layer.img1 = new cc.Sprite(res.giraffe_png);
//     layer.img1.x = objDest.x + objDest.width / 2;
//     layer.img1.y = objDest.y + objDest.height / 2;
//     layer.addChild(layer.img1);
// };
// function player2(objDest,layer){
//     layer.img2 = new cc.Sprite(res.panda_png);
//     layer.img2.x = objDest.x + objDest.width / 2;
//     layer.img2.y = objDest.y + objDest.height / 2;
//     layer.addChild(layer.img2);
// };
// function checkcombo (check,layer){
//
//     cc.log(check);
//     // var a0 = layer.currentState[check[0]];
//     // var a1 = layer.currentState[check[1]];
//     // var a2 = layer.currentState[check[2]];
//     // var w = (a0==a1 && a1==a2);
//     // if(w){
//     //     alert("winner");
//     // }
//     // return w;
// }