/// reference path="Graphics.d.ts" />
/// <reference path="definitions/createjs/tweenjs/Tween.d.ts"/>
/// <reference path="definitions/createjs/tweenjs/Ease.d.ts"/>
/// <reference path="definitions/createjs/easeljs/utils/Ticker.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Stage.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Shape.d.ts"/>
// -------------------------------------------------------------------------------------------------------------------
//		GLOBAL
// --------------------------------------------------------------------------------------------------------------------
window.onload = function () {
    if(window.top != window) {
        document.getElementById("header").style.display = "none";
    }
    var tweenTweenSparkTable = new TweenJSTweenSparkTable();
    tweenTweenSparkTable.init();
};
var TweenJSTweenSparkTable = (function () {
    // --------------------------------------------------------------------------------------------------------------------
    //		Constructor
    // --------------------------------------------------------------------------------------------------------------------
    function TweenJSTweenSparkTable() {
        this.count = 0;
        this.selectedIndex = 0;
        this.clips = [];
        this.update = false;
    }
    // --------------------------------------------------------------------------------------------------------------------
    //		PUBLIC METHODS
    // --------------------------------------------------------------------------------------------------------------------
        TweenJSTweenSparkTable.prototype.init = function () {
        var _this = this;
        this.canvas = document.getElementById("testCanvas");
        this.stage = new createjs.Stage(this.canvas);
        this.resetRuninng = false;
        var graphics = new createjs.Graphics();
        this.ease = createjs.Ease// shortcut.
        ;
        this.dataProvider = [
            {
                type: "divider",
                label: "Ease Equations"
            }, 
            {
                type: Ease.backIn,
                label: "backIn"
            }, 
            {
                type: Ease.backInOut,
                label: "backInOut"
            }, 
            {
                type: Ease.backOut,
                label: "backOut"
            }, 
            {
                type: Ease.bounceIn,
                label: "bounceIn"
            }, 
            {
                type: Ease.bounceInOut,
                label: "bounceInOut"
            }, 
            {
                type: Ease.bounceOut,
                label: "bounceOut"
            }, 
            {
                type: Ease.circIn,
                label: "circIn"
            }, 
            {
                type: Ease.circInOut,
                label: "circInOut"
            }, 
            {
                type: Ease.circOut,
                label: "circOut"
            }, 
            {
                type: Ease.cubicIn,
                label: "cubicIn"
            }, 
            {
                type: Ease.cubicInOut,
                label: "cubicInOut"
            }, 
            {
                type: Ease.cubicOut,
                label: "cubicOut"
            }, 
            {
                type: Ease.elasticIn,
                label: "elasticIn"
            }, 
            {
                type: Ease.elasticInOut,
                label: "elasticInOut"
            }, 
            {
                type: Ease.elasticOut,
                label: "elasticOut"
            }, 
            {
                type: Ease.linear,
                label: "linear"
            }, 
            {
                type: Ease.none,
                label: "none"
            }, 
            {
                type: Ease.quadIn,
                label: "quadIn"
            }, 
            {
                type: Ease.quadInOut,
                label: "quadInOut"
            }, 
            {
                type: Ease.quadOut,
                label: "quadOut"
            }, 
            {
                type: Ease.quartIn,
                label: "quartIn"
            }, 
            {
                type: Ease.quartInOut,
                label: "quartInOut"
            }, 
            {
                type: Ease.quartOut,
                label: "quartOut"
            }, 
            {
                type: Ease.quintIn,
                label: "quintIn"
            }, 
            {
                type: Ease.quintInOut,
                label: "quintInOut"
            }, 
            {
                type: Ease.quintOut,
                label: "quintOut"
            }, 
            {
                type: Ease.sineIn,
                label: "sineIn"
            }, 
            {
                type: Ease.sineInOut,
                label: "sineInOut"
            }, 
            {
                type: Ease.sineOut,
                label: "sineOut"
            }, 
            {
                type: "divider",
                label: "Custom Eases"
            }, 
            {
                type: Ease.getBackIn(2.5),
                label: "getBackIn"
            }, 
            {
                type: Ease.getBackInOut(2.5),
                label: "getBackInOut"
            }, 
            {
                type: Ease.getBackOut(2.5),
                label: "getBackOut"
            }, 
            {
                type: Ease.getElasticIn(2, 5),
                label: "getElasticIn"
            }, 
            {
                type: Ease.getElasticInOut(2, 5),
                label: "getElasticInOut"
            }, 
            {
                type: Ease.getElasticOut(2, 5),
                label: "getElasticOut"
            }, 
            {
                type: Ease.getPowIn(2.5),
                label: "getPowIn"
            }, 
            {
                type: Ease.getPowInOut(20.5),
                label: "getPowInOut"
            }, 
            {
                type: Ease.getPowOut(2.5),
                label: "getPowOut"
            }
        ];
        var eases = document.getElementById("eases");
        var cloneElement = document.createElement("a");
        cloneElement.href = "#";
        for(var i = 0, l = this.dataProvider.length; i < l; i++) {
            var item = this.dataProvider[i];
            if(item.type == "divider") {
                var element = document.createElement("span");
                element.innerHTML = item.label;
                eases.appendChild(element);
                continue;
            }
            var element = cloneElement.cloneNode(true);
            element.id = i.toString();
            element.onclick = function (event) {
                _this.selectItem(element);
            }// TODO: Is fromElement ok ?
            ;
            element.innerHTML = item.label;
            eases.appendChild(element);
            if(item.label == "linear") {
                this.selectedItem = element;
                element.className = "selected";
            }
        }
        createjs.Ticker.addListener(window);
        this.container = new createjs.Container();
        this.container.x = 20;
        this.container.y = 20;
        this.stage.addChild(this.container);
        this.prevPoint = new createjs.Point(212, 0);
        this.bar = new createjs.Shape();
        this.bar.graphics.f("#FFFFFF").ss(1).dr(2, 0, 4, 15).dr(2, 330, 4, 15).ef().ss(1).f("#FFFFFF").dr(3, 10, 2, 320);
        this.bar.alpha = 0.7;
        this.container.addChild(this.bar);
        var bounds = new createjs.Shape();
        bounds.graphics.ss(1).s("#FFFFFF").mt(0, 0).lt(0, 350).lt(700, 350).lt(700, 0);
        bounds.alpha = 0.7;
        this.container.addChild(bounds);
        this.stage.update();
        this.run();
    };
    TweenJSTweenSparkTable.prototype.stop = function () {
        //Ticker.removeListener(window);
            };
    TweenJSTweenSparkTable.prototype.selectItem = function (selectedElement) {
        var _this = this;
        if(this.clips.length > 0) {
            this.fade();
        }
        if(this.selectedItem != null && this.selectedItem != selectedElement) {
            this.selectedItem.className = "";
        }
        this.selectedItem = selectedElement;
        this.selectedIndex = parseInt(this.selectedItem.id);
        this.selectedItem.className = "selected";
        this.selectedFunction = this.dataProvider[this.selectedIndex].type;
        this.resetRuninng = true;
        createjs.Tween.get(this.bar, {
            override: true
        }).to({
            x: 0,
            y: 0
        }, 500).call(function () {
            _this.resetComplete();
        });
        return false;
    };
    TweenJSTweenSparkTable.prototype.run = function (easeType) {
        this.currentClip = new createjs.Shape();
        this.clips.push(this.currentClip);
        this.stage.addChild(this.currentClip);
        this.update = true// TODO: What is this?
        ;
        this.oldX = 0;
        this.prevPoint.x = this.prevPoint.y = 0;
        createjs.Tween.get(this.bar, {
            override: true
        }).to({
            x: 700
        }, 1500, easeType);
    };
    TweenJSTweenSparkTable.prototype.resetComplete = function () {
        this.count = 0;
        this.bar.x = 0;
        this.resetRuninng = false;
        this.currentClip = null;
        this.run(this.selectedFunction);
    };
    TweenJSTweenSparkTable.prototype.tick = function () {
        if(this.bar.x != this.oldX && !this.resetRuninng) {
            var g = this.currentClip.graphics;
            var pt = new createjs.Point(this.container.x + this.prevPoint.x, this.container.y + this.prevPoint.y);
            g.moveTo(pt.x, pt.y);
            this.count++;
            this.prevPoint.x = this.bar.x;
            this.prevPoint.y = (this.count * 11);
            g.setStrokeStyle(1, "round", "round");
            this.hue = (this.selectedIndex / this.dataProvider.length) * 360;
            g.beginStroke(createjs.Graphics.getHSL(this.hue, 50, 50));
            g.lineTo(this.container.x + this.prevPoint.x, this.container.y + this.prevPoint.y);
            g.beginStroke(createjs.Graphics.getHSL(this.hue, 100, 50));
            g.beginFill(createjs.Graphics.getHSL(this.hue, 100, 50));
            g.drawCircle(pt.x, pt.y, 2);
            g.endFill();
            this.stage.update();
        } else {
            if(this.resetRuninng) {
                this.stage.update();
            }
        }
        this.oldX = this.bar.x;
    };
    TweenJSTweenSparkTable.prototype.fade = function () {
        var _this = this;
        for(var i = 0; i < this.clips.length; i++) {
            var clip = this.clips[i];
            var tween = createjs.Tween.get(clip, {
                override: true
            });
            tween.to({
                alpha: clip.alpha - 0.4
            }, 1000).call(function (cTween) {
                _this.fadeTweenComplete(tween);
            });
        }
    };
    TweenJSTweenSparkTable.prototype.fadeTweenComplete = function (tween) {
        var clip = tween.target;
        if(clip.alpha <= 0) {
            this.stage.removeChild(clip);
            var index = this.clips.indexOf(clip);
            this.clips.splice(index, 1);
        }
    };
    return TweenJSTweenSparkTable;
})();
//@ sourceMappingURL=tweenjs-tween-spark-table.js.map
