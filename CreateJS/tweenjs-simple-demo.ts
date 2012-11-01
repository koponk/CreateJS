/// <reference path="definitions/createjs/tweenjs/Tween.d.ts"/>
/// <reference path="definitions/createjs/tweenjs/Ease.d.ts"/>
/// <reference path="definitions/createjs/easeljs/utils/Ticker.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Stage.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Shape.d.ts"/>


// -------------------------------------------------------------------------------------------------------------------
//		GLOBAL
// --------------------------------------------------------------------------------------------------------------------


window.onload = () => {
	if (window.top != window) {
		document.getElementById("header").style.display = "none";
  }

	var tweenSimpleDemo: TweenJSSimpleDemo = new TweenJSSimpleDemo();
	tweenSimpleDemo.init();
};



class TweenJSSimpleDemo {

	// Membes
	private m_Canvas:HTMLCanvasElement;
  private m_Stage:createjs.Stage;


	// --------------------------------------------------------------------------------------------------------------------
	//		Constructor
	// --------------------------------------------------------------------------------------------------------------------
	constructor () { }


	// --------------------------------------------------------------------------------------------------------------------
	//		PUBLIC METHODS
	// --------------------------------------------------------------------------------------------------------------------
	public init(): void
	{
		this.m_Canvas = <HTMLCanvasElement>document.getElementById("testCanvas");
    this.m_Stage = new createjs.Stage(this.m_Canvas);
    this.m_Stage.autoClear = true;

    var ball = new createjs.Shape();
    ball.graphics.setStrokeStyle(5, 'round', 'round');
    ball.graphics.beginStroke(('#000000'));
    ball.graphics.beginFill("#FF0000").drawCircle(0,0,50);
    ball.graphics.endStroke();
    ball.graphics.endFill();
    ball.graphics.setStrokeStyle(1, 'round', 'round');
    ball.graphics.beginStroke(('#000000'));
    ball.graphics.moveTo(0,0);
    ball.graphics.lineTo(0,50);

    ball.graphics.endStroke();
    ball.x = 200;
    ball.y = -50;

    var tween = createjs.Tween.get(ball, {loop:true})
                  .to({x:ball.x, y:this.m_Canvas.height - 55, rotation:-360}, 1500, createjs.Ease.bounceOut)
                  .wait(1000)
                  .to({x:this.m_Canvas.width-55, rotation:360}, 2500, createjs.Ease.bounceOut)
									.wait(1000).call((tween: createjs.Tween) => { this.handleComplete(tween); })
                  .to({scaleX:2, scaleY:2, x:this.m_Canvas.width - 110, y:this.m_Canvas.height-110}, 2500, createjs.Ease.bounceOut)
                  .wait(1000)
                  .to({scaleX:.5, scaleY:.5, x:30, rotation:-360, y:this.m_Canvas.height-30}, 2500, createjs.Ease.bounceOut);

    this.m_Stage.addChild(ball);

		createjs.Ticker.addListener(this);    
	}


	// --------------------------------------------------------------------------------------------------------------------
	//		PRIVATE METHODS
	// --------------------------------------------------------------------------------------------------------------------
	private handleComplete(tween)
	{
		var ball = tween._target;
  }

  private tick()
	{
		this.m_Stage.update();
  }



}