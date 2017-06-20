// Simple Vec2 class
Ball = function () {
	var pos, spd, radius, gravity, color;
	// This is how it comes in with createVector()
	pos = arguments[0] || 0;
	spd = arguments[1] || 0;
	radius = arguments[2] || 0;
	gravity = arguments[3] || 0;
	color = arguments[4] || 0;
	colorOrig = arguments[4] || 0;

	/**
	 * The pos of the ball
	 * @property pos
	 * @type {Vec2}
	 */
	this.pos = pos;

	/**
	 * The speed component of the ball
	 * @property spd
	 * @type {Vec2}
	 */
	this.spd = spd;

	/**
	 * The radius of the ball
	 * @property radius
	 * @type {Number}
	 */
	this.radius = radius;

	/**
	 * The gravity of the ball
	 * @property gravity
	 * @type {Number}
	 */
	this.gravity = gravity;

	/**
	 * The color of the ball
	 * @property color
	 * @type {Number}
	 */
	this.color = color;

		/**
	 * The original color of the ball
	 * @property colorOrig
	 * @type {Number}
	 */
	this.colorOrig = colorOrig;

	/**
	 * The mass of the ball
	 * @property mass
	 * @type {Number}
	 */
	this.mass = this.radius * 0.1;
};

Ball.prototype.ballCollision = function (otherBall) {
	for (var j = 0; j < count; j++) {
		if (this != otherBall[j]) {
			var distanceVector = Vec2.sub(otherBall[j].pos, this.pos);
			var distanceVectorMagnitude = distanceVector.mag();
			var minDistance = this.radius + otherBall[j].radius;
			if (distanceVectorMagnitude < minDistance) {
				var distanceCorrection = (minDistance - distanceVectorMagnitude) / 2.0;
				var d = distanceVector.copy();
				var correctionVector = d.normalize().mult(distanceCorrection);

				this.pos = this.pos.sub(correctionVector);
				otherBall[j].pos = otherBall[j].pos.add(correctionVector);

				var theta = distanceVector.heading();
				var sine = Math.sin(theta);
				var cosine = Math.cos(theta);

				var posTemp = [
					new Vec2(),
					new Vec2()
				];

				posTemp[1].x = cosine * distanceVector.x + sine * distanceVector.y;
				posTemp[1].y = cosine * distanceVector.y - sine * distanceVector.x;

				var spdTemp = [
					new Vec2(),
					new Vec2()
				];

				spdTemp[0].x = cosine * this.spd.x + sine * this.spd.y;
				spdTemp[0].y = cosine * this.spd.y - sine * this.spd.x;
				spdTemp[1].x = cosine * otherBall[j].spd.x + sine * otherBall[j].spd.y;
				spdTemp[1].y = cosine * otherBall[j].spd.y - sine * otherBall[j].spd.x;

				var spdFinal = [
					new Vec2(),
					new Vec2()
				];

				spdFinal[0].x = ((this.mass - otherBall[j].mass) * spdTemp[0].x + 2 * otherBall[j].mass * spdTemp[1].x) / (this.mass + otherBall[j].mass);
				if (spdTemp[0].y > 0) {
					spdFinal[0].y = spdTemp[0].y + this.gravity;
				} else {
					spdFinal[0].y = spdTemp[0].y - this.gravity;
				}

				spdFinal[1].x = ((otherBall[j].mass - this.mass) * spdTemp[1].x + 2 * this.mass * spdTemp[0].x) / (this.mass + otherBall[j].mass);
				if (spdTemp[1].y > 0) {
					spdFinal[1].y = spdTemp[1].y + this.gravity;
				} else {
					spdFinal[1].y = spdTemp[1].y - this.gravity;
				}


				posTemp[0].x += spdFinal[0].x;
				posTemp[0].y += spdFinal[0].y;
				posTemp[1].x += spdFinal[1].x;
				posTemp[1].y += spdFinal[1].y;

				posFinal = [];
				posFinal.push(new Vec2());
				posFinal.push(new Vec2());

				posFinal[0].x = cosine * posTemp[0].x - sine * posTemp[0].y;
				posFinal[0].y = cosine * posTemp[0].y + sine * posTemp[0].x;
				posFinal[1].x = cosine * posTemp[1].x - sine * posTemp[1].y;
				posFinal[1].y = cosine * posTemp[1].y + sine * posTemp[1].x;


				otherBall[j].pos.x = this.pos.x + posFinal[1].x;
				otherBall[j].pos.y = this.pos.y + posFinal[1].y;
				this.pos = this.pos.add(posFinal[0]);


				this.spd.x = cosine * spdFinal[0].x - sine * spdFinal[0].y;
				this.spd.y = cosine * spdFinal[0].y + sine * spdFinal[0].x;

				otherBall[j].spd.x = cosine * spdFinal[1].x - sine * spdFinal[1].y;
				otherBall[j].spd.y = cosine * spdFinal[1].y + sine * spdFinal[1].x;
			}
		}
	}
}
