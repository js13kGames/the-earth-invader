gc = document.getElementById("game");
gctx = gc.getContext("2d");

var target = new Target(20, 20);

var test = new Enemy(600, 400, 20, 20);
test.assignTarget(target);

var keysDown = {};
window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
});

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
	target.render();
};

var then = Date.now();
main();