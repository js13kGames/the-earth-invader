///////////////// GLOBAL VARIABLES \\\\\\\\\\\\\\\\\
var currentcanvas;
var keysDown = {};
var mouseX = 0; //global mouse coords
var mouseY = 0;

var winheight = 0; //window width & height
var winwidth = 0;


////////////////// LOAD IN SPRITES \\\\\\\\\\\\\\\\\\
var sprite_player = new Image();

var sprite_fire = new Image();
var sprite_rock = new Image();
var sprite_water = new Image();
var sprite_air = new Image();

var boom_fire = new Image();
var boom_rock = new Image();
var boom_water = new Image();
var boom_air = new Image();

sprite_player.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAACB1BMVEUAAAB+V0x5Z2EhIBpXVVE+PDZ2c3BUUUw/PjwwLysuLCccGxMWFhHSNQ4PDguBfnxnYVhNTEZHRUFEQj5DQDtnPjA1NC8sKCMmJRoZGRkeHRgYFxcTEg7799aDc2/TzWmTg2J3amF4ZV9nZF1fWVTAl1DIoE1RT0pXTEhZUUfPyEZsUERKSETJnDiWSTgzMi+VRiutRyrKSSeHPScrKicoJyQlIyFgXCBFQh5OSx2yPR0rKhseHRs7ORqDJBbkQRPgPxPnPRHyPBHpPw7uOAnoNgngOQj8+vL29ODx77/587OGhIOMgXzc1Hh8d3RqZ2R3aWLOxmCjilqEaVpwYlqWbFl9YlljYll0YFlpXVmjjFhhXljGwVaMfVafhFXTylSvm1R9YFHGs09eVE2wkEyubkySekusXEp3ckmbiUhvVkfbzkaDeUTFu0HEm0FeXEBaS0BMSkDVyz9xZz99ez18Uj3FmzycUjzKkzpVQDpAPjhCPzc8OjawTzWNTDVqRTVFRDPToTJwbjKERTHisy5XOistLCuySip9PiqfmCdHQiVTUSRxbSE2NCGLgyCAMyCSNh4zKx1sLxzEOhuYOhukNBurNxpQJxmvlhfoRRaYkBV6cBW6LxTvQRMjIxMkIRK8sxHEMxFZJhATEQ70Iw0fHg2PKAvoOQnaKwj0Oge9KAYFBQXsMgSiyY3CAAAAA3RSTlMA/QkiuOOKAAABTklEQVQoz2KgFKzEIe5g7+w8F4u4XJh2nWF7bWoFugQ/Wzi7OrtmslJKI5qEnzKLoA4nMweLYlAeilFsyiw6HJx8qyWBUlG6CAmj4JAsjRoTM2ZJmzYR9oC4MoRMot5kUX1xi54ma2YTDvWIBJiEi6G2lWu/uOUCrZjZzDamYoU5SVCZ5VbNBgvtps/S8pLNzZeSljaz7lrK5wSUWOPGy8u7YtWyGfGAyboHZvAs5pORkSlqWQLS4zZ1wpQ5dov6sj095M3n8fBI83DPB+thcDWuNOadNLG7U963xEJCylS/oRjmBD2N+mmtnL22lua23FJcwpqZcFenK0UWiLCKiTNLcEtyCamkIXnVhy1aiJWVi5tZQkxQIFYVOXi82VSERKo4uVjZBRTU0ILUn0VYmLVaEEOCgYmx3KBDVLQ0VBVL3Dk6OtjPxBHfLpQmJABQO0XZ4Qew3wAAAABJRU5ErkJggg==';

sprite_fire.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAOVBMVEUAAAD/ugD/xgD/kwD/vgD/hwD/fQD/6AD/swD/qAD/3AD/nwD/mgD/ggD/lgD/jgD/1QD/0AD/dwAZEj0xAAAAAnRSTlMADH8lgRMAAABiSURBVAgdBcGHAcMgEACxy3c6eP9hIwEw7SYAsHW5vZ4AHjFm2esJxPfFbiWvw4wv/MxRcpPla+w9WxPpfHFUhzYzecy1lquWmVxQPe5lJfcHHrpHK+kJcI42k54AwGiSAH82EAPJABiB9wAAAABJRU5ErkJggg==';
sprite_rock.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMBAMAAACkW0HUAAAAKlBMVEUAAACWTBeGQhKKRBOCQBJxOBBtNg+QSBV0OhBfMA59PhF4PBFmMw9IJQ2Rt3ZcAAAAAXRSTlMAQObYZgAAAFlJREFUCNdjYGAQFGQAkUZKhgwMjELaW5QFGBg1wsJWKTCYu+Yc63JnKNp69maEM4NQ6Nybqc4MwkszZ2a7MzC7hh3bosDAqOLR1VTAwCBs4qIOMqbYmIEBAAogE865++QUAAAAAElFTkSuQmCC';
sprite_water.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAV1BMVEUAAACE0vuE0vsJgsEUisUJeLELdKoikstCqd4If7w8pds2oNcdj8oQgrwJfLkNe7QwnNMYjMgOhsMUf7d8zvdtxfNbuekyn9cllc8hi8AaiMAypuRPseOwitA1AAAAA3RSTlMAEgSF73AUAAAAa0lEQVQIHQXBhQHDMBAAsUsfzHaY2v3nrMSHzxTqHQCAb1lkTe0BuOIiKt1sADGsKuO9m0O+VMXsPHJziqok3/b9VGdWSebjd0R1iqoks7Zod5irSOpm3YFcwioisjlAjnOtYRsAMMXwPgB/e/QEuuONR8gAAAAASUVORK5CYII=';
sprite_air.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAS1BMVEUAAADt7e3o5+e6tLTq6uro5ubv7+/n5ubs7Ozu7u7d2tra19fv7+/Szs7s6+vY1NTp6Ojh3d3n5eXk4eHKxcXFwMC7tbWopKSyrq4u3EvSAAAACXRSTlMANB7+OygEQUBBWsCSAAAAbElEQVQIHRXBhwHDIAwEwAe3qEvgkv0njXMHYP0QpfQVrzaGu4+4GtCzWISz7F6xkSplSYTtIKW/FLMF5C7CEmLXg5zFrzBbHpCSu49iO7/Yk0jVJ9t5o40xSyLClg4ck1l1yrnh1TZVqr0DP+LRBkPdaWJGAAAAAElFTkSuQmCC';

boom_fire.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAilBMVEUAAAD/Pw//Lw//kAP/Qwz/QAz/FxL/fgT/aAb/hgP/Swn/cgX/dwT/UQj/YQb/iwP/ngL/Rwr/Wgf/bQb/dQX/Kw7/Nwz/Sgn/fgD/ExP/Kg//ewP/agX/Pwv/VQj/FxL/YQb/agX/Tgj/FBP/Pwz/HhH/nAH/owL/mAL/qQH/yAD/uQH/sAH/1gAycOBjAAAAJ3RSTlMAAgT+BgsJ/v389/39/Pn+/vv7+PXz8vEcFhH69vT08vDs4y387iQsv7HRAAAAnUlEQVQIHQXBhQHCQBAEwD15jbvgGgH6b48ZQEdWoLsbgCbY16UnGjIC9GIBe4qeY6LQvmIQc57mQ3G0R88ATcypJOWhFQKjqmtqZd1kdYwR5po4WT77Rw4NGxDRLS33374UiX8CoKYov9uyyMRvmOhdK5uTEGZlZPnV3tK1ltydyeAOYAhNHyhmM2AAOoVH543GzEB17M52flRKAP4ZPwpqAq4EtQAAAABJRU5ErkJggg==';
boom_rock.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAbFBMVEV1Xg6ehQ1sVg8AAAChiAyulAyQeA2AaQ+JcQ91XxF5Yg5/aA9oUw9fSRCJcQ2HcA9mUA98ZA5tVxByXBBfShBnUQ9tVw+UfQ5tVw9wWg9nUQ9oUhBfShCMcw+XfQ+FbBCbgwuqjhaylhmfhBJCRDr6AAAAHXRSTlMEAQwADAf+/f79/PUIFBT3/v79+/r59/cb99mBd8UDXQUAAACWSURBVAgdDcEHAsIgEATAXY7e0uwKJPH/f9QZwIBakKApEKiYMpm84WNMGZhHojgrxlkQouaW0BqWDgHIS/Qh9GEhNADLzbnw7S0LgJJLcq4d32Xd3h/c733f+3F2P3yM0Pp6ncN5NM+qK0jFS9v3tkDhT/Tkg7UxqD+ImUat1ujtWZAhLipmS431hQLeHjR1UkatG9QPaPsInqWXDWQAAAAASUVORK5CYII=';
boom_water.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAxlBMVEUAAABCltg6iNIzhdAfXcIiXcM0dcw3jtNCftBDkdYvb8k5ktQqeswkascwiNAvhc8tgM04mtc7jNMphM4sf809ktVBodpDnNgqfcwziNAugs43jtMldskyhdA6l9YofMswjdExfc4aY8Myd8w4idEjbsg6jtM4hdBHsd9MsuArbsk7pNk4htAaY8Mvd8s0l9QibscfZsQ1k9QwcMkxg881i9I5jtMqectIoNpJlddGg9MzjNI8ltZRvuRKtuBOseBHsN9Eqtxc7/LmAAAAO3RSTlMADwkDEAgC/R0VBf37Hv7+/v39/Pbz/v39+fn28/Lw8O7t7amki2VUJh8a/v349vX18O/s4c20oYhIMg6F3XkAAACuSURBVAgdBcEFAsIwAASwq8vccBju7tBh//8UCWADIe2lRyFBOWh6WgrW9wQwLzjoSI2NPFZA0Cs0pL63ZmanKO/Xxwyckau/Sdw0q20NoINgEkerMPutnxBoN1uNKH5/v+mMMII8i8Kk9np9lAvzMyhbDOPf+1NXfl52IcAPlXNVWk2l5YAYeo2b70ZeV4MDE883pHTkkQyIhGnvKZYdZdmiGAgwArB5p6khCbV/ugkQqCbu2aMAAAAASUVORK5CYII=';
boom_air.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAq1BMVEUAAADp4+Px7e3t5ubo4eHa09PVysrv7Ozu5+fm39/z8PDw6enf2dno4+PZ0tLVycnj29vq5OT08/Ps5ubr5ubs6ur+/PzAsLD8+/vAtrb28/PLvr7SysrEtbXPyMjQycnz8fHi3Nzazs7f2tr29PTs6eni39/n4+PNwMC7s7PDsrLr5eXRw8Pq4+PLvr7s6urFtrbp5ubFtLT////18vLr4+Ph2Njq39/d09Mjzk5BAAAANHRSTlMA/v7++vn49AL+/f317u0H+vn19PDeSy0QDwn78fHw6ebk4uHUv7+glIiDZ1RJRzw1Ix8cfDwE3AAAAItJREFUCB0FwQVig0AAALAc7tRt7u5A+/+XLQG+1o9w2PjoC37yG/x1revuc1fs8znbJtl4ytv3w3YZ+85q6PLVbRqit9MAdmkZx2OUDOegf8nKcQynYwavF2fZNEXHKa6i2ZWH1TIJZRhDjF9IQxQPQw3QhEhVV+jxPJsjXbQUXCYNuFsAKOxZ3/MP1sYKW7vFUKgAAAAASUVORK5CYII=';
/////////////////------------------\\\\\\\\\\\\\\\\\

var renderops = {
	levelselect: false,
	game: false
}

var Options = {
	planType: "fire",
	wepType: "fire"
};

var planTraits = {
	fire: {
		plancolor: "#F72A0A",
		planstroke: "#CF2308"
	},
	air: {
		plancolor: "#DEDEDE",
		planstroke: "#BFBFBF"
	},
	water: {
		plancolor: "#076DF2",
		planstroke: "#0658C4"
	},
	rock: {
		plancolor: "#6B4303",
		planstroke: "#593802"
	}
}

var wepTraits = {
	fire: {
		color: "orange",
		rof: 5, //rate of fire
		speed: 15,
		damage: 15
	},
	air: {
		color: "ghostwhite",
		rof: 12,
		speed: 15,
		damage: 8
	},
	water: {
		color: "deepskyblue",
		rof: 20,
		speed: 20,
		damage: 10
	},
	rock: {
		color: "saddlebrown",
		rof: 30,
		speed: 10,
		damage: 25
	}
}

//var enemycolors = ["#CF2308", "#BFBFBF", "#0658C4", "#593802"];
var enemyTraits = {
	fire: {
		img: sprite_fire,
		boom: boom_fire,
		speed: 3,
		rof: 20,
		health: 50,
		damage: 10,
		bulletColor: "orange"
	},
	air: {
		img: sprite_air,
		boom: boom_air,
		speed: 4,
		rof: 100,
		health: 25,
		damage: 5,
		bulletColor: "ghostwhite"
	},
	water: {
		img: sprite_water,
		boom: boom_water,
		speed: 3,
		rof: 100,
		health: 75,
		damage: 15,
		bulletColor: "deepskyblue"
	},
	rock: {
		img: sprite_rock,
		boom: boom_rock,
		speed: 2,
		rof: 100,
		health: 100,
		damage: 20,
		bulletColor: "saddlebrown"
	}

}
/////////////////------------------\\\\\\\\\\\\\\\\\


///////////////// CLASSES \\\\\\\\\\\\\\\\\\\\\\\\\\
//Init the enemy class
Enemy = function(x, y, width, height, orbit, type, pBullets, eBullets, rof) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.type = type;
	this.speed = enemyTraits[this.type].speed;
	this.orbit = orbit; //property determining distance of orbit
	this.health = enemyTraits[this.type].health;

	this.rof = enemyTraits[this.type].rof; //rate of fire
	this.count = 0; //counter for shooting
	this.trigger = Math.floor(Math.random()*this.rof); //number 0 to rof-1 that will be used as signal to fire

	this.pBullets = pBullets; //player bullets, object will check for collision with these
	this.eBullets = eBullets; //enemy bullets, object will push a new Bullet to these every time it shoots

	this.radius = this.width * 1.2; //have collision circle cover corners better at expense of overcoverage on middle of sides

	this.alive = true; //used for determining damage and whether to draw
	this.explode = false;

	//This allows for the enemy to rotate to face the player
	this.rotation = 0;
};

//Tells the enemy object which object to follow, in the actual game, it will be the player
Enemy.prototype.assignplayer = function(player) {
	this.player = player;
};

//Update the enemy's position
Enemy.prototype.update = function(delta) {
	if(! (this.player === undefined) && this.alive){ //only update if alive
		this.count = (this.count+1) % this.rof; //update counter

		this.playerX = this.player.x;
		this.playerY = this.player.y;

		// Calculate direction towards player
		var toPlayerX = this.playerX - this.x;
		var toPlayerY = this.playerY - this.y;

		// Normalize
		var toPlayerLength = Math.sqrt(toPlayerX * toPlayerX + toPlayerY * toPlayerY);
		toPlayerX = toPlayerX / toPlayerLength;
		toPlayerY = toPlayerY / toPlayerLength;

		this.rotation = Math.atan2(toPlayerY, toPlayerX);

		////////SHOOTING////////
		if (this.count == this.trigger && this.player.name !== "Planet") { //don't shoot if orbiting the planet
			var bullet = new Bullet(this.x, this.y, 3, toPlayerX, toPlayerY, 8, 10, enemyTraits[this.type].bulletColor, Options.planType, this, false);
			this.eBullets.push(bullet);
		}

		////////MOVEMENT////////

		var approach = true; // tracks if enemy is currently approaching player
		//Move towards the player
		if (toPlayerLength > this.orbit+5 || this.player.shield <= 0){ //if shield is down enemy will continue to approach 
			this.angle = Math.atan2(toPlayerY,toPlayerX)+Math.PI;
			this.x += toPlayerX * this.speed;
			this.y += toPlayerY * this.speed;
			//approach = true;

		}//Move away from player
		else if (toPlayerLength < this.orbit-5){
			this.angle = Math.atan2(toPlayerY, toPlayerX)+Math.PI;
			this.x -= toPlayerX * this.speed * 2;
			this.y -= toPlayerY * this.speed * 2;
			//approach = true;

		}//orbit
		else{
			this.angle -= 0.02;//Math.acos(1-Math.pow(3/toPlayerLength,2)/2);
			this.x = ((toPlayerLength * Math.cos(this.angle)) + (this.player.x));
			this.y = ((toPlayerLength * Math.sin(this.angle)) + (this.player.y));
			
		}


		//check for collision with bullet
		for (var i = 0; i < this.pBullets.length; i++) {
			if (this.pBullets[i].alive && collision(this,this.pBullets[i]) && this.health > 0) {
				this.health -= wepTraits[Options.wepType].damage;
				this.pBullets[i].alive = false;
				var hit = new Audio("hit.wav");
				hit.play();
			} else if (this.pBullets[i].alive && collision(this,this.pBullets[i])) { //if it collides with a bullet, kill itself and the bullet
				this.pBullets[i].alive = false;
				this.alive = false;
				this.explode = 1; //draw explosion sprite
				var eDeath = new Audio("enemyDeath.wav");
				eDeath.play();
			}
		}

	}
};

//As it sounds, draw the enemy object
Enemy.prototype.draw = function(ctx) {
	if (this.alive) { //only draw if alive
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation);
		ctx.drawImage(enemyTraits[this.type].img,-6,-6);
		ctx.restore();
	}
	else {
		if (this.explode) {
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.rotate(this.rotation);
			ctx.drawImage(enemyTraits[this.type].boom,-6,-6,28,28);
			ctx.restore();
			this.explode = (this.explode+1)%7; //add a count, when this.explode hits 4 (or 0) it will go false
		}
	}
};

//Init the player/turret
Turret = function (x,y,name, eArrays, eBullets) {
	this.x = x; 
	this.y = y;
	this.speed = 200;
	this.health = 500; //balance parameter
	this.shield = 200;
	this.direction = 0; //radians
	this.name = name;
	this.dmgcount = 0; //count for timing since last damaged, will be used for regenerating shield

	this.radius = 40;
	this.eArrays = eArrays; //array of enemy arrays 
	this.eBullets = eBullets;

};

Turret.prototype.checkCollision = function (enemyArray) {
	for (var i = 0; i < enemyArray.length; i++) {
		if (enemyArray[i].alive && collision(this,enemyArray[i])) {
			if (this.shield > 0) {
				this.shield -= enemyTraits[Options.planType].damage;
				this.dmgcount = 60;
			} else {
				this.health -= enemyTraits[Options.planType].damage;
			}
			if (enemyArray[i].name === "bullet") {
				enemyArray[i].alive = false;
			}
		}
	}
}

Turret.prototype.update = function (delta, gc) { //call this to update properties and draw
	//keyboard handlers
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
	var dDir = this.findDirection(mouseX,mouseY); //delta in direction

	//collision
	for (var i = 0; i < this.eArrays.length; i++) {
		this.checkCollision(this.eArrays[i]);
	}

	this.checkCollision(this.eBullets);

	//damage-related stuff

	if (this.dmgcount > 0) {
		this.dmgcount--;
	}

	if (this.shield < 500 && this.shield > 0 && this.dmgcount == 0) {
		this.shield += 0.25; //shield will regenerate very slowly
	}

	if (this.shield <= 0) {
		this.radius = 10; //collision detection radius set to 40 (shield), reduced when shield is 
		this.shield = 0;
	}

	if (this.health < 0) {
		this.health = 0;
	}

	this.direction += dDir;
};

Turret.prototype.draw = function (ctx) { 
	ctx.save(); //save the state to stack before rotating
	ctx.translate(this.x,this.y);
	ctx.rotate(this.direction);

	//draw shield
	var shieldColor = "#"; 
	for (var i = 0; i < 3; i++) {
		shieldColor += (Math.floor(Math.random()*200)+55).toString(16); //keeping individual RGB values between 100 and 200, just b/c
	}

	ctx.beginPath();
	ctx.arc(0, 0, 40, 0, 2 * Math.PI, false);
	ctx.lineWidth = 4;
	ctx.strokeStyle = shieldColor;//rgb(Math.floor(100 + 70*Math.random()),Math.floor(100 + 70*Math.random()),Math.floor(100 + 70*Math.random()));
	if (this.shield > 0) { //only draw if greater than 0
		ctx.stroke(); 
	}
	ctx.closePath();	

	ctx.drawImage(sprite_player,-12,-12);
	// ctx.beginPath();
	// ctx.arc(0, 0, 10, 0, 2 * Math.PI, false);
	// ctx.fillStyle = 'green';
	// ctx.fill();
	// ctx.lineWidth = 2;
	// ctx.strokeStyle = '#003300';
	// ctx.stroke();


	// ctx.fillStyle = "#FF0000";
	// ctx.fillRect(-15,-1,10,2);
	// ctx.closePath();
	ctx.restore(); //restore back to original
};

Turret.prototype.findDirection = function (mX,mY) {
	var distanceX = this.x - mX;
	var distanceY = this.y - mY;
	var newDir = Math.atan2(distanceY,distanceX); //find angle from arctangent
	var dDir = newDir - this.direction; //delta in direction
	return dDir;
};

Planet = function(x, y, name, color, stroke, bullets) {
	this.x = x;
	this.y = y;
	this.health = 5000;
	this.shield = 1000;
	this.name = name;
	this.radius = 70;
	this.color = color;
	this.bullets = bullets;
	this.stroke = stroke;
	this.alive = true;
}

Planet.prototype.update = function(delta) {
	for (var i = 0; i < this.bullets.length; i++) {
		if (this.bullets[i].alive && collision(this,this.bullets[i]) && this.shield > 0) {
			this.shield -= wepTraits[Options.wepType].damage;
			this.bullets[i].alive = false;
			var hit = new Audio("hit.wav");
			hit.play();
		} else if (this.bullets[i].alive && collision(this,this.bullets[i]) && this.health > 0) {
			this.health -= wepTraits[Options.wepType].damage;
			this.bullets[i].alive = false;
			var hit = new Audio("hit.wav");
			hit.play();
		} else if (this.bullets[i].alive && collision(this,this.bullets[i])) { //if it collides with a bullet, kill itself and the bullet
			this.bullets[i].alive = false;
			this.alive = false;
			var death = new Audio("enemyDeath.wav");
			death.play();
		}
	}
}

Planet.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.lineWidth = 5;
	ctx.strokeStyle = this.stroke;
	ctx.stroke();

	//draw shield
	var shieldColor = "#"; 
	for (var i = 0; i < 3; i++) {
		shieldColor += (Math.floor(Math.random()*200)+55).toString(16); //keeping individual RGB values between 100 and 200, just b/c
	}

	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius * 1.5, 0, 2 * Math.PI, false);
	ctx.lineWidth = 7;
	ctx.strokeStyle = shieldColor;//rgb(Math.floor(100 + 70*Math.random()),Math.floor(100 + 70*Math.random()),Math.floor(100 + 70*Math.random()));
	if (this.shield > 0) { //only draw if greater than 0
		ctx.stroke(); 
	}
	ctx.closePath();
}

Star = function(x, y, color) {
	this.x = x;
	this.y = y;
	this.color = color;
}

Star.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI, false);
	ctx.fillStyle = this.color;
	ctx.fill();
}

Healthbar = function(x, y, owner) {
	this.x = x;
	this.y = y;
	this.maxhealth = owner.health;
	this.health = owner.health;
	this.healthpercent = 1;
	this.name = owner.name;
	this.playsound = true;
	if (owner.shield) {
		this.maxshield = owner.shield;
		this.shield = owner.shield;
		this.shieldpercent = 1;
	}
}

Healthbar.prototype.update = function(delta, owner) {
	this.health = owner.health;
	this.healthpercent = this.health / this.maxhealth;
	if (this.shield !== false && owner.shield !== false) {
		this.shield = owner.shield;
		this.shieldpercent = this.shield / this.maxshield;
	}

}

Healthbar.prototype.draw = function(ctx) {
	ctx.beginPath()
	ctx.fillStyle = "red";
	ctx.fillRect(this.x, this.y, 300 * this.healthpercent, 20);
	ctx.font = "12pt Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText(this.name, this.x + 150, this.y + 15);

	if (this.shield !== false) {
		if (this.shield == 0) {
			if (this.playsound) {
				var shielddown = new Audio("shielddown.wav");
				shielddown.play();
				this.playsound = false;
			}
			ctx.fillStyle = "white";
			ctx.font = "12pt Arial";
			ctx.textAlign = "center";
			ctx.fillText("Shields down!", this.x + 150, this.y + 45);
		}
		else {
			ctx.fillStyle = "blue";
			ctx.fillRect(this.x, this.y + 30, 300 * this.shieldpercent, 20);
			ctx.font = "12pt Arial";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.fillText("Shields", this.x + 150, this.y + 45);
		}
	}	


	ctx.closePath();
}

Bullet = function(x, y, r, dx, dy, speed, damage, color, type, owner, playershot) {
	this.x = x;
	this.y = y;
	this.radius = r;
	this.dx = dx;
	this.dy = dy;
	this.speed = speed; //constant that determines the velocity the bullet travels at
	this.damage = damage; //The damage the bullet does
	this.name = "bullet";
	this.color = color;
	this.birth = Date.now();

	this.alive = true; //Used for determining damage and whether to draw
	this.owner = owner;


	this.rotation = 0;

	this.type = type;
	this.playershot = playershot;
};

//Update the bullet's position
Bullet.prototype.update = function(delta){
	if (this.x < 0 || this.x > winwidth || this.y < 0 || this.y > winheight) {
		this.alive = false;
	}
	else {
		this.x += this.speed * this.dx;
		this.y += this.speed * this.dy;
	}
	if ((this.type === "fire") && (distance(this.x,this.y,this.owner.x,this.owner.y) > 150) && (this.playershot)) {
		this.alive = false;
	}

};

//Draw the bullet object
Bullet.prototype.draw = function(ctx) {
	if (this.alive) { //only draw if alive
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
		ctx.fill();
		ctx.restore();
	}
};
/////////////////---------\\\\\\\\\\\\\\\\\\\\\\\\\\



//////////////// UTILITY FUNCTIONS//////////////////
//Commonly used stuff, such as finding distance
function distance (x1,y1,x2,y2) {
	dX2 = Math.pow((x2-x1),2);
	dY2 = Math.pow((y2-y1),2);
	return Math.sqrt(dX2 + dY2);
} 

function collision (a,b) {
	space = a.radius + b.radius;
	if (distance(a.x,a.y,b.x,b.y) < space) {
		return true; //collision
	}
	else {
		return false;
	}
}




///////////////// INIT FUNCTIONS \\\\\\\\\\\\\\\\\\\
//Inits the main menu, shows title and play button
function initMainMenu() {
	initStars();
	//This block initiliazes the mainmenu canvas, sets the context, and sets its width and height to that of the user's screen
	var canvas = document.getElementById('mainmenu');
	currentcanvas = 'mm';
	var ctx = canvas.getContext('2d');
	winwidth = document.documentElement.clientWidth;
	winheight = document.documentElement.clientHeight;
	canvas.width = winwidth;
	canvas.height = winheight;

	//Render the Title
	ctx.font = "30pt Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText("Earth Invader", winwidth / 2, 50);

	//Initialize Array of clickable elements, and then push in the parameters that would make a rectangle ***Note, this may be innefficient for just one element, consider revision
	var elements = [];
	elements.push({
		color: "red",
		width: 200,
		height: 75,
		top: winheight / 2 + 50,
		left: winwidth / 2 - 100
	});

	//render each object in elements as per parameters
	elements.forEach(function(element) {
		ctx.fillStyle = element.color;
		ctx.fillRect(element.left, element.top, element.width, element.height);
	});

	//render text on the start button
	ctx.fillStyle = "black";
	ctx.fillText("Start", winwidth / 2, winheight / 2 + 100);


	//Initialize click handler for start button. It checks every click on the canvas if it is in the bounds of any of the elements, in this case, the start button
	canvas.addEventListener('click', function(event) {
		var cLeft = canvas.offsetLeft;
		var cTop = canvas.offsetTop;
		var x = event.pageX - cLeft;
		var y = event.pageY - cTop;

		elements.forEach(function(element) {
			if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				initLevelSelect();
			}
		});
	}, false);
}

//Initialize the level select menu. So far, it is basically just a main menu again, nothing new.
function initLevelSelect() {
	var canvas = document.getElementById('levelselect');
	currentcanvas = 'ls';
	var ctx = canvas.getContext('2d');
	winwidth = document.documentElement.clientWidth;
	winheight = document.documentElement.clientHeight;
	canvas.width = winwidth;
	canvas.height = winheight;

	renderops.levelselect = true;
	var infoBox = "";

	canvas.addEventListener('click', function(event) {
		var cLeft = canvas.offsetLeft;
		var cTop = canvas.offsetTop;
		var x = event.pageX - cLeft;
		var y = event.pageY - cTop;

		if (y > canvas.height - 150 && y < canvas.height - 150 + 75 && x > canvas.width / 2 - 100 && x < canvas.width / 2 - 100 + 200) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			renderops.levelselect = false;
			clearScreen();
			initGame();
		}

		if(y > 200 && y < 275 && x > (canvas.width/4)/2+100 && x < (canvas.width/4)/2+100+200){
			Options.planType = "fire";
		}
		if(y > 200 && y < 275 && x > (canvas.width/2)-250 && x < (canvas.width/2)-250+200){
			Options.planType = "air";
		}
		if(y > 200 && y < 275 && x > (canvas.width/2)+50 && x < (canvas.width/2)+50 + 200){
			Options.planType = "water";
		}
		if(y > 200 && y < 275 && x > ((canvas.width/2) + 50) + ((canvas.width/2)-250)-((canvas.width/4)/2 + 100) && x < ((canvas.width/2) + 50) + ((canvas.width/2)-250)-((canvas.width/4)/2 + 100) + 200){
			Options.planType = "rock";
		}


		if(y > 400 && y < 475 && x > (canvas.width/4)/2+100 && x < (canvas.width/4)/2+100+200){
			Options.wepType = "fire";
		}
		if(y > 400 && y < 475 && x > (canvas.width/2)-250 && x < (canvas.width/2)-250+200){
			Options.wepType = "air";
		}
		if(y > 400 && y < 475 && x > (canvas.width/2)+50 && x < (canvas.width/2)+50 + 200){
			Options.wepType = "water";
		}
		if(y > 400 && y < 475 && x > ((canvas.width/2) + 50) + ((canvas.width/2)-250)-((canvas.width/4)/2 + 100) && x < ((canvas.width/2) + 50) + ((canvas.width/2)-250)-((canvas.width/4)/2 + 100) + 200){
			Options.wepType = "rock";
		}
	}, false);
	canvas.addEventListener("mousemove", function (e) {
		var rect = canvas.getBoundingClientRect(); //get bounding rectangle
		x = e.clientX - rect.left;
		y = e.clientY - rect.top; //clientX & Y are for whole window, left and top are offsets

		if(y > 200 && y < 275 && x > (canvas.width/4)/2+100 && x < (canvas.width/4)/2+100+200){
			infoBox = "Fire Planet Info";
		} else if(y > 200 && y < 275 && x > (canvas.width/2)-250 && x < (canvas.width/2)-250+200){
			infoBox = "Air Planet Info";
		} else if(y > 200 && y < 275 && x > (canvas.width/2)+50 && x < (canvas.width/2)+50 + 200){
			infoBox = "Water Planet Info";
		} else if(y > 200 && y < 275 && x > ((canvas.width/2) + 50) + ((canvas.width/2)-250)-((canvas.width/4)/2 + 100) && x < ((canvas.width/2) + 50) + ((canvas.width/2)-250)-((canvas.width/4)/2 + 100) + 200){
			infoBox = "Rock Planet Info";
		} else if(y > 400 && y < 475 && x > (canvas.width/4)/2+100 && x < (canvas.width/4)/2+100+200){
			infoBox = "Fire Weapon Info";
		} else if(y > 400 && y < 475 && x > (canvas.width/2)-250 && x < (canvas.width/2)-250+200){
			infoBox = "Air Weapon Info";
		} else if(y > 400 && y < 475 && x > (canvas.width/2)+50 && x < (canvas.width/2)+50 + 200){
			infoBox = "Water Weapon Info";
		} else if(y > 400 && y < 475 && x > ((canvas.width/2) + 50) + ((canvas.width/2)-250)-((canvas.width/4)/2 + 100) && x < ((canvas.width/2) + 50) + ((canvas.width/2)-250)-((canvas.width/4)/2 + 100) + 200){
			infoBox = "Rock Weapon Info";
		} else {
			infoBox = "";
		}
	}); 

	var main = function(){
		if (renderops.levelselect) {
			render();
			requestAnimationFrame(main);
		}
	};

	//clears the screen
	var clearScreen = function(){
		ctx.clearRect(0,0,canvas.width, canvas.height);
	};

	//clears the screen, and redraws the objects
	var render = function(){
		clearScreen();

		ctx.font = "30pt Arial";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("Level Select", winwidth / 2, 50);
		ctx.fillStyle = "green";
		ctx.fillRect(canvas.width / 2 - 100, canvas.height - 150, 200, 75);
		ctx.fillStyle = "black";
		ctx.fillText("Play", winwidth / 2, winheight - 100);

	//////////////////////////////////////////////////////////

		ctx.font = "20pt Arial";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("Select a Planet Type", winwidth / 2, 150);

		ctx.fillStyle = "red";
		ctx.fillRect((canvas.width / 4) / 2 + 100, 200, 200, 75);
		ctx.fillStyle = "black";
		ctx.fillText("Fire", (canvas.width / 4) / 2 + 200, 250);
		if (Options.planType === "fire") {
			ctx.strokeStyle == planTraits[Options.planType].planstroke;
			ctx.stroke();
		}

		ctx.fillStyle = "white";
		ctx.fillRect((canvas.width / 2) - 250, 200, 200, 75);
		ctx.fillStyle = "black";
		ctx.fillText("Air", (canvas.width / 2) - 150, 250);
		if (Options.planType === "air") {
			ctx.strokeStyle == planTraits[Options.planType].planstroke;
			ctx.stroke();
		}

		ctx.fillStyle = "blue";
		ctx.fillRect((canvas.width / 2) + 50, 200, 200, 75);
		ctx.fillStyle = "black";
		ctx.fillText("Water", (canvas.width / 2) + 150, 250);
		if (Options.planType === "water") {
			ctx.strokeStyle == planTraits[Options.planType].planstroke;
			ctx.stroke();
		}

		ctx.fillStyle = "brown";
		ctx.fillRect(((canvas.width / 2) + 50) + ((canvas.width / 2) - 250) - ((canvas.width / 4) / 2 + 100), 200, 200, 75);
		ctx.fillStyle = "black";
		ctx.fillText("Rock", ((canvas.width / 2) + 50) + ((canvas.width / 2) - 250) - ((canvas.width / 4) / 2 + 100) + 100, 250);
		if (Options.planType === "rock") {
			ctx.strokeStyle == planTraits[Options.planType].planstroke;
			ctx.stroke();
		}

	/////////////////////////////////////////////////////////////

		ctx.font = "20pt Arial";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("Select a Weapon Type", winwidth / 2, 350);

		ctx.fillStyle = "red";
		ctx.fillRect((canvas.width / 4) / 2 + 100, 400, 200, 75);
		ctx.fillStyle = "black";
		ctx.fillText("Fire", (canvas.width / 4) / 2 + 200, 450);
		if (Options.wepType === "fire") {
			ctx.strokeStyle == planTraits[Options.planType].planstroke;
			ctx.stroke();
		}

		ctx.fillStyle = "white";
		ctx.fillRect((canvas.width / 2) - 250, 400, 200, 75);
		ctx.fillStyle = "black";
		ctx.fillText("Air", (canvas.width / 2) - 150, 450);
		if (Options.wepType === "air") {
			ctx.strokeStyle == planTraits[Options.planType].planstroke;
			ctx.stroke();
		}

		ctx.fillStyle = "blue";
		ctx.fillRect((canvas.width / 2) + 50, 400, 200, 75);
		ctx.fillStyle = "black";
		ctx.fillText("Water", (canvas.width / 2) + 150, 450);
		if (Options.wepType === "water") {
			ctx.strokeStyle == planTraits[Options.planType].planstroke;
			ctx.stroke();
		}

		ctx.fillStyle = "brown";
		ctx.fillRect(((canvas.width / 2) + 50) + ((canvas.width / 2) - 250) - ((canvas.width / 4) / 2 + 100), 400, 200, 75);
		ctx.fillStyle = "black";
		ctx.fillText("Rock", ((canvas.width / 2) + 50) + ((canvas.width / 2) - 250) - ((canvas.width / 4) / 2 + 100) + 100, 450);
		if (Options.wepType === "rock") {
			ctx.strokeStyle == planTraits[Options.planType].planstroke;
			ctx.stroke();
		}

		ctx.font = "20pt Arial";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText(infoBox, winwidth / 2, 525);
	};

	main();
}

function initStars() {
	var starcanvas = document.getElementById("stars");
	var starctx = starcanvas.getContext("2d");
	var clientWidth = document.documentElement.clientWidth;
	var clientHeight = document.documentElement.clientHeight;
	starcanvas.width = clientWidth;
	starcanvas.height = clientHeight;
	var stars = [];
	var colors = ["blue", "white", "red", "yellow"]
	for (var y = 0; y < clientHeight; y += Math.round(Math.random() * 100) + 1) {
		for (var x = 0; x < clientWidth; x += Math.round(Math.random() * 100) + 1) {
			var color = colors[Math.round(Math.random() * 4)];
			var star = new Star(x, y, color);
			stars.push(star);
		};
	}
	for (var x = 0; x < clientWidth; x += Math.round(Math.random() * 100) + 1) {
		for (var y = 0; y < clientHeight; y += Math.round(Math.random() * 100) + 1) {
			var color = colors[Math.round(Math.random() * 4)];
			var star = new Star(x, y, color);
			stars.push(star);
		};
	} 
	render = function(){
		stars.forEach(function(star){
			star.draw(starctx)
		});
	};
	render();
}

//Because of issues with the files loading asynchronously and sometimes before the document was ready, I was forced to merge the three other files and encase them in an init function
function initGame() {
	//Initialize the game canvas, get its context, and set its width and height to that of the screen
	var gamecanvas = document.getElementById("game");
	var gamectx = gamecanvas.getContext("2d");
	currentcanvas = 'gc';
	var clientWidth = document.documentElement.clientWidth;
	var clientHeight = document.documentElement.clientHeight;
	gamecanvas.width = clientWidth;
	gamecanvas.height = clientHeight;
	var halfwidth = gamecanvas.width / 2;
	var halfheight = gamecanvas.height / 2;
	var gameOver = false;
	var winGame = false;
	renderops.game = true;

	//Variable to track if mouse is held down
	var mousedown = false;
	var shootcount = 0; //and how frequently to shoot
	var pBullets = [];
	var eBullets = [];
	var enemies = [];
	var defenders = [];

	var planet = new Planet(halfwidth, halfheight, "Planet", planTraits[Options.planType].plancolor, planTraits[Options.planType].planstroke, pBullets);
	var planethealth = new Healthbar(clientWidth - 310, 10, planet);

	//Create a player, an enemy, and assign the player to enemy so that it will follow it
	var player = new Turret(halfwidth, 45, "Player", [enemies,defenders], eBullets);
	var playerhealth = new Healthbar(10, 10, player);

	var spawns = [[40, 40], [40, halfheight], [40, clientHeight], [halfwidth, 40], [halfwidth, clientHeight], [clientWidth - 40, 40], [clientWidth - 40, halfheight], [clientWidth - 40, clientHeight - 40]];
	var enemytypes = ["fire", "air", "water", "rock"];
	var enemycount = 1;
	var defendercount = 1;

	var makeEnemies = function(x,y, type) {
		var randOrbit = Math.round(Math.random()*50) + 30; //30 to 80
		var enemy = new Enemy(x, y, 10, 10, randOrbit, type, pBullets, eBullets);
		enemy.assignplayer(player);
		enemies.push(enemy);
		if (enemycount < 7) {
			setTimeout(function(){
				makeEnemies(x, y, type);
			}, 1000);
			enemycount += 1;
		}
	};
	var makeDefenders = function(x,y, type) {
		var randOrbit = Math.round(Math.random()*50) + 40; //40 to 90
		var enemy = new Enemy(x, y, 10, 10, randOrbit, type, pBullets, eBullets, 100);
		enemy.assignplayer(planet);
		defenders.push(enemy);
		if (defendercount < 7) {
			setTimeout(function(){
				makeDefenders(x, y, type);
			}, 1000);
			defendercount += 1;
		}
	};
	makeEnemies(halfwidth, halfheight + 100, Options.planType);
	makeDefenders(clientWidth / 2 - 40, clientHeight / 2 - 40, Options.planType);

////////////////////////////////////////
/// Handlers

	gamecanvas.addEventListener('mousedown', function (e) {
		mousedown = true; //set to 0, thus starting count
		//shootcount = 0;
	}, false);
	gamecanvas.addEventListener('mouseup', function (e) {
		mousedown = false;
	}, false);
	gamecanvas.addEventListener("mousemove", function (e) {
		var rect = gamecanvas.getBoundingClientRect(); //get bounding rectangle
		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top; //clientX & Y are for whole window, left and top are offsets
	}, false);
	window.addEventListener('keydown', function (e) {
		keysDown[e.keyCode] = true;
	}, false);
	window.addEventListener('keyup', function(e) {
		delete keysDown[e.keyCode];
	}, false);

/////////////////////////////////////////

	//main game loop, updates and renders the game
	var main = function(){
		var now = Date.now();
		var delta = now - then;

		if (winGame) {
			win()
		} else if (!gameOver) {
			render();			
			update(delta / 1000);
		} else if (renderops.game) {
			death();
		};

		then = now;

		requestAnimationFrame(main);
	};

	//updates the positions of the player and enemy
	var update = function(delta){
		//first, decide if new bullet should be added
		if (mousedown) {
			shootcount++;
 			
 			if (shootcount % wepTraits[Options.wepType].rof == 1) { //use rate of fire property as modulo, fire every <rof> frames
 				var dx = mouseX - player.x; //use the global variables!
				var dy = mouseY - player.y ;
				var distanceToPlayer = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));


				var bullet = new Bullet(player.x, player.y, 3, dx/distanceToPlayer, dy/distanceToPlayer, wepTraits[Options.wepType].speed, wepTraits[Options.wepType].damage, wepTraits[Options.wepType].color, Options.wepType, player, true);
				var lasersnd = new Audio("laser.wav");
				lasersnd.play();
				pBullets.push(bullet);

 			} 
		}

		enemies.forEach(function(enemy){
			enemy.update(delta, gamecanvas);
		});
		defenders.forEach(function(enemy){
			enemy.update(delta, gamecanvas);
		});	
		pBullets.forEach(function(bullet){
			bullet.update();
		});
		eBullets.forEach(function(bullet){
			bullet.update();
		});

		player.update(delta, gamecanvas);
		playerhealth.update(delta, player);
		planethealth.update(delta, planet);
		planet.update(delta);


		if (((Date.now() - wave) / 1000) > 15) {
			wave = Date.now();
			enemycount = 1;
			var randomint = Math.floor(Math.random() * 8);
			makeEnemies(spawns[randomint][0], spawns[randomint][1], enemytypes[Math.floor(Math.random() * 4)]);
		};

		if (planet.health <= 0) {
			gameOver = true;
			win = true;
		}
		if (player.health <= 0) {
			gameOver = true;
		};
	};

	//clears the screen
	var clearScreen = function(){
		gamectx.clearRect(0,0,gamecanvas.width, gamecanvas.height);
	};

	//clears the screen, and redraws the objects
	var render = function(){
		clearScreen();

		planet.draw(gamectx);
		enemies.forEach(function(enemy){
			enemy.draw(gamectx);
		});
		defenders.forEach(function(enemy){
			enemy.draw(gamectx);
		});
		playerhealth.draw(gamectx);
		planethealth.draw(gamectx);
		gamectx.font = "20pt Arial";
		gamectx.fillStyle = "white";
		gamectx.textAlign = "center";
		gamectx.fillText(Math.floor((Date.now() - start) / 1000), winwidth / 2, 30);
		player.draw(gamectx);
		pBullets.forEach(function(bullet){
			bullet.draw(gamectx);
		});
		eBullets.forEach(function(bullet){
			bullet.draw(gamectx);
		});
	};

	var death = function(){
		clearScreen();

		gamectx.font = "100pt Impact";
		gamectx.fillStyle = "red";
		gamectx.textAlign = "center";
		gamectx.fillText("Game Over!", winwidth / 2, winheight / 2);

		gamectx.font = "30pt Arial";
		gamectx.fillStyle = "white";
		gamectx.textAlign = "center";
		gamectx.fillText("Level Select", winwidth / 2, 50);
		gamectx.fillStyle = "green";
		gamectx.fillRect(gamecanvas.width / 2 - 100, gamecanvas.height - 150, 200, 75);
		gamectx.fillStyle = "black";
		gamectx.fillText("Replay", winwidth / 2, winheight - 100);
	};

	var win = function(){
		clearScreen();

		gamectx.font = "100pt Impact";
		gamectx.fillStyle = "green";
		gamectx.textAlign = "center";
		gamectx.fillText("You Win!", winwidth / 2, winheight / 2);

		gamectx.font = "30pt Arial";
		gamectx.fillStyle = "white";
		gamectx.textAlign = "center";
		gamectx.fillText("Level Select", winwidth / 2, 50);
		gamectx.fillStyle = "green";
		gamectx.fillRect(gamecanvas.width / 2 - 100, gamecanvas.height - 150, 200, 75);
		gamectx.fillStyle = "black";
		gamectx.fillText("Replay", winwidth / 2, winheight - 100);
	};

	gamecanvas.addEventListener('click', function(event) {
		var cLeft = gamecanvas.offsetLeft;
		var cTop = gamecanvas.offsetTop;
		var x = event.pageX - cLeft;
		var y = event.pageY - cTop;

		if (y > gamecanvas.height - 150 && y < gamecanvas.height - 150 + 75 && x > gamecanvas.width / 2 - 100 && x < gamecanvas.width / 2 - 100 + 200 && gameOver) {
			gamectx.clearRect(0, 0, gamecanvas.width, gamecanvas.height);
			gameOver = false;
			winGame = false;
			renderops.game = false;
			initLevelSelect();
		}
	}, false);

	//updates the time, runs the main loop
	var then = Date.now();
	var start = Date.now();
	var wave = Date.now();
	main();
}
/////////////////----------------\\\\\\\\\\\\\\\\\\\

///////////////// MISCELLANEOUS \\\\\\\\\\\\\\\\\\\\
function resize() {
	if (currentcanvas === 'mm') {
		initMainMenu();
	} else if (currentcanvas === 'ls') {
		initLevelSelect();
	} else if (currentcanvas === 'gc') {
		initGame();
	}
}
/////////////////---------------\\\\\\\\\\\\\\\\\\\\