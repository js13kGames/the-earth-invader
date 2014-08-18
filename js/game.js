gc = document.getElementById("game");
gctx = gc.getContext("2d");

var target = new Turret(200, 200);

var test = new Enemy(600, 400, 20, 20);
test.assignTarget(target);

initEventHandlers();

var main = function(){
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	requestAnimationFrame(main);
};

var update = function(delta){
	test.update(delta);
	target.update(delta);
};

var clearScreen = function(){
	gctx.beginPath();
	gctx.fillStyle = "white";
	gctx.fillRect(0,0,gc.width, gc.height);
	gctx.stroke();
};

var render = function(){
	clearScreen();

	test.render();
	target.draw(target.x,target.y,target.direction);
};

var then = Date.now();
main();