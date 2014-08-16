Target = function(x, y){
	this.x = x;
	this.y = y;
};

Target.prototype.render = function() {
	gctx.beginPath();
	gctx.fillStyle = "green";
	gctx.fillRect(this.x, this.y, 20, 20);
	gctx.stroke();
};