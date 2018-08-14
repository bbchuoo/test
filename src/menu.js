
var menuLayer = cc.Layer.extend({
    sprite:null,
    menubg:null,

    ctor:function () {

        this._super();

        this.menubg = new cc.Sprite(res.menubg_png);
        this.menubg.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/2
        });
        this.addChild(this.menubg);



        var item = new cc.MenuItemFont("star",this.item,this);
        item.attr({x:-160,y:-240});

        var menu = new cc.Menu(item);
        this.addChild(menu);




        return true;
    },
    item:function(){
        cc.director.pushScene(new item1Scene());

    },

});

var menuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new menuLayer();
        this.addChild(layer);
    }
});

