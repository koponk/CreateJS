/// <reference path="definitions/createjs/preloadjs/PreloadJS.d.ts"/>
/// <reference path="definitions/createjs/soundjs/SoundJS.d.ts"/>

var mediaGrid;
window.onload = () => {	
	if (window.top != window) {
		document.getElementById("header").style.display = "none";
	}

	console.log("MediaGrid created");
	mediaGrid = new MediaGrid();
};



class MediaGrid 
{

	// Members
	private m_Preload:createjs.PreloadJS;

	constructor () 
	{
		// Create a new queue.
		this.m_Preload = new createjs.PreloadJS(true);

		// Use this instead to use tag loading
		//preload = new createjs.PreloadJS(false);
				
		this.m_Preload.installPlugin(createjs.SoundJS);
		
		this.m_Preload.onProgress = this.handleProgressEvent;
		this.m_Preload.onLoadStart = this.handleLoadStartEvent;
		this.m_Preload.onComplete = this.handleCompletedEvent;

		this.m_Preload.onFileProgress = this.handleFileProgress;
		this.m_Preload.onFileLoad = this.handleFileLoaded;
		this.m_Preload.onError = this.handleFileError;
		
	}

	private stop() 
	{
		if (this.m_Preload != null) 
		{
			this.m_Preload.close();
		}
	}

	// Load a single asset.
	private loadAsset(target):void 
	{
		var div = document.getElementById(target.id);
		div.innerHTML = "<label>Loading...</label>";
		this.m_Preload.loadFile(target.id);
	}

	private handleLoadStartEvent( event:createjs.PreloadEventArgs ):void 
	{
		console.log(event);
	}

	private handleProgressEvent( event:createjs.PreloadOverallProgressEventArgs ):void 
	{
		console.log(event);
	}

	private handleCompletedEvent( event:createjs.PreloadEventArgs ):void 
	{
		console.log(event);
	}

	private handleFileProgress( event:createjs.PreloadFileProgressEventArgs ):void 
	{
		console.log(event);
	}

	// Once each file is loaded, show it. Each ID corresponds to the related DIV.
	private handleFileLoaded( event:createjs.PreloadEventArgs ):void 
	{
		var div = document.getElementById(event.id);
		switch (event.type){
			case createjs.PreloadJS.CSS:
				var head = document.getElementsByTagName('head')[0];
				head.appendChild(event.result);
				div.innerHTML = "<label>Complete :)</label>";
				break;

			case createjs.PreloadJS.IMAGE:
				div.innerHTML = "<img src='"+event.id+"' width="+div.clientWidth+" height="+div.clientHeight+"/>";
				break;

			case createjs.PreloadJS.JAVASCRIPT:
				document.body.appendChild(event.result);
				div.innerHTML = "<label>Complete :)</label>";
				break;

			case createjs.PreloadJS.JSON:
			case createjs.PreloadJS.XML:
				alert(event.result);
				div.innerHTML = "<label>Complete :)</label>";
				break;

			case createjs.PreloadJS.SOUND:
				document.body.appendChild(event.result);
				
				// Get the sound instance and play it				
				var soundInstance = <createjs.SoundInstance>event.result;
				soundInstance.play();

				div.innerHTML = "<label>Complete :)</label>";
				break;
		}
		div.style.backgroundColor = "#222222";
	}

	// A file failed to load.
	private handleFileError( result:createjs.PreloadEventArgs ):void 
	{
		var div = document.getElementById(result.id);
		div.innerHTML = "<label>Error :(</label>";
		div.style.backgroundColor = "#992222";
	}

}
