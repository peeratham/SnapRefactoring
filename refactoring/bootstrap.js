function createWorld(canvas){

	// window.onload = function () {
		// world = new WorldMorph(canvas);
		// world.worldCanvas.focus();
		// world.isDevMode = true;
		ide = new IDE_Morph();
		// ide.openIn(world);
		// ide.refactoring();
		// setInterval(loop, 1);
	// };
	
	function loop() {
		ide.stepFrame();
		// world.doOneCycle();
	}
}

function updateIDE(){
	ide.stepFrame();
}


