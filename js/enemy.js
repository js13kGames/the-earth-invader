Enemy = function(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.cx = x + (this.width / 2);
	this.cy = y + (this.height / 2);
	this.speed = 3;

	this.rotation = 0;
};

Enemy.prototype.assignTarget = function(target) {
	this.targetX = target.x;
	this.targetY = target.y;
};

Enemy.prototype.update = function(delta) {
	if(!((this.targetX === undefined) || (this.targetY === undefined))){
		// Calculate direction towards player
		toPlayerX = this.targetX - this.x;
		toPlayerY = this.targetY - this.y;

		// Normalize
		toPlayerLength = Math.sqrt(toPlayerX * toPlayerX + toPlayerY * toPlayerY);
		toPlayerX = toPlayerX / toPlayerLength;
		toPlayerY = toPlayerY / toPlayerLength;


		//Move towards the player
		this.x += toPlayerX * this.speed;
		this.y += toPlayerY * this.speed;
	}
};

Enemy.prototype.render = function() {
	gctx.beginPath();
	gctx.fillStyle = "red";
	gctx.fillRect(this.x, this.y, this.width, this.height);
};