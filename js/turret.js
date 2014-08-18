
Turret = function (x,y) {
	this.x = x; 
	this.y = y;
	this.speed = 200;
	this.health = 1000; //balance parameter
	this.direction = 0; //radians

	this.updateArray = [0,0,0]; //x, y, health - all need to be done externally, event-based. Will only be set to non-0 if collision or appropriate keypress occurs

}

Turret.prototype.update = function (delta) { //call this to update properties and draw
	//console.log(this.updateArray);

	if (65 in keysDown) { //left
		if (this.x > 0) {
			this.x -= this.speed * delta;
		}
	}
	if (87 in keysDown) { //up
		if (this.y > 0) {
			this.y -= this.speed * delta;
		}
	}
	if (68 in keysDown) { //right
		if (this.x < gc.width - 20) {
			this.x += this.speed * delta;
		}
	}
	if (83 in keysDown) { //down
		if (this.y < gc.height - 20) {
			this.y += this.speed * delta;
		}
	}

	var dHealth = this.updateArray[2]; //change in health
	var dDir = this.findDirection(mouseX,mouseY); //delta in direction


	this.direction += dDir;
	this.health += dHealth;

	//turret.draw(this.x,this.y,this.direction); //draw first (keep old variables to clear out)

	//at end, clear updateArray
	this.updateArray = [0,0,0];
}

Turret.prototype.draw = function (x, y, dir) { 
	gctx.save(); //save the state to stack before rotating
	gctx.fillStyle = "#000000";		
	gctx.translate(x,y);
	gctx.rotate(dir);
	gctx.beginPath();
	gctx.fillRect(-10,-5,20,10);
	gctx.fillStyle = "#FF0000";
	gctx.fillRect(-15,-1,10,2);
	gctx.closePath();
	gctx.restore(); //restore back to original
}

Turret.prototype.findDirection = function (mX,mY) {
	var distanceX = this.x - mX;
	var distanceY = this.y - mY;
	var newDir = Math.atan2(distanceY,distanceX); //find angle from arctangent
	//console.log(newDir*180/Math.PI - this.direction);
	var dDir = newDir - this.direction; //delta in direction
	return dDir;
}

