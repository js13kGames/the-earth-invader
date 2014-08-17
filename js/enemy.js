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
	this.target = target;
};

Enemy.prototype.update = function(delta) {
	if(! (this.target === undefined)){
		this.targetX = this.target.x;
		this.targetY = this.target.y;

		// Calculate direction towards player
		var toPlayerX = this.targetX - this.x;
		var toPlayerY = this.targetY - this.y;

		// Normalize
		var toPlayerLength = Math.sqrt(toPlayerX * toPlayerX + toPlayerY * toPlayerY);
		toPlayerX = toPlayerX / toPlayerLength;
		toPlayerY = toPlayerY / toPlayerLength;

		this.rotation = Math.atan2(toPlayerY, toPlayerX);

		//Move towards the player
		if (toPlayerLength > 55){
			this.angle = Math.acos((this.x-this.target.x)/toPlayerLength);
			this.x += toPlayerX * this.speed;
			this.y += toPlayerY * this.speed;

		}//Move away from player
		else if (toPlayerLength < 45){
			this.angle = Math.acos((this.x-this.target.x)/toPlayerLength);
			this.x -= toPlayerX * this.speed;
			this.y -= toPlayerY * this.speed;

		}//orbit
		else{
			this.angle -= Math.acos(1-Math.pow(3/toPlayerLength,2)/2);

			this.x = ((toPlayerLength * Math.cos(this.angle)) + (this.target.x));
			this.y = ((toPlayerLength * Math.sin(this.angle)) + (this.target.y));
			
			
		}

		console.log(this.angle);
	}
};

Enemy.prototype.render = function() {
	gctx.save();
	gctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    gctx.rotate(this.rotation);
	gctx.beginPath();
	gctx.fillStyle = "red";
	gctx.fillRect(this.x - (this.x + this.width/2), this.y - (this.y + this.height/2), this.width, this.height);
	gctx.restore();
};