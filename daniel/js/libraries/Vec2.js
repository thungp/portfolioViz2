// Simple Vec2 class
Vec2 = function() {
	var x, y;
	// This is how it comes in with createVector()
	x = arguments[0] || 0;
	y = arguments[1] || 0;
	/**
	 * The x component of the vector
	 * @property x
	 * @type {Number}
	 */
	this.x = x;
	/**
	 * The y component of the vector
	 * @property y
	 * @type {Number}
	 */
	this.y = y;
};

Vec2.prototype.add = function(vec2){
	this.x += vec2.x;
	this.y += vec2.y;
	return this;
};

Vec2.prototype.addSclr = function(sclr){
	this.x += sclr;
	this.y += sclr;
	return this;
};

Vec2.prototype.sub = function(vec2){
	this.x -= vec2.x;
	this.y -= vec2.y;
	return this;
};

Vec2.prototype.mult = function (n) {
	this.x *= n || 0;
	this.y *= n || 0;
	this.z *= n || 0;
	return this;
};

Vec2.prototype.div = function(n){
	this.x /= n;
	this.y /= n;
	return this;
};

Vec2.prototype.set = function(vec2){
	this.x = vec2.x;
	this.y = vec2.y;
	return this;
};

Vec2.prototype.mag = function(){
	return Math.sqrt(this.x*this.x + this.y*this.y);
};

Vec2.prototype.heading = function () {
	var h = Math.atan2(this.y, this.x);
	return h;
};

Vec2.prototype.copy = function () {
	return new Vec2(this.x, this.y);
};

Vec2.prototype.normalize = function () {
	return this.div(this.mag());
};

Vec2.sub = function (v1, v2, target) {
	if (!target) {
		target = v1.copy();
	} else {
		target.set(v1);
	}
	target.sub(v2);
	return target;
};
