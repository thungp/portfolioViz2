/* p5 Assignment 01/*
 * Peter Thung, Daniel Vance
 * https://processing.org/examples/circlecollision.html
 * I tried to build up Peter's work by adding collision as put together in Professor Ira's work on
 * the link above. Gravity and positioning gave me the biggest trouble, because I was unable to stop
 * multiple updates of the same circle in more than one draw cycle if it was colliding with the same
 * ball (clustering).
 */


//var ps = [];
var count = 50;
var pos = [];
var spd = [];
var radii = [];
var gravity = [];
var mass = [];
var friction, damping;
var explosionRadii;
var explosionForce;
var rSlider, gSlider, bSlider;
var explosionX, explosionY;

function setup() {
	fill(100, 255, 30);
	createCanvas(600, 400);
	friction = .875;
	damping = .786;
	explosionRadii = 10;
	explosionForce = 1.4;
	for (var i = 0; i < count; i++) {
		pos.push(new p5.Vector( width / 2, Math.random(0, 100)));
		// pos.push(new p5.Vector(0, 0, 0));
		// pos.push(new p5.Vector(150, 150, 0));
		spd.push(new p5.Vector(-2 + Math.random() * 1.3, 0 + Math.random() * 2));
		radii.push(random(5, 10))
		gravity.push(random(.01, .06));
		mass[i] = radii[i] * 0.1;
	}
	//	console.log(spd);
	//background(255,128,0);

	//fill(255,255,0);
	//rect(0,0, 30,80);
	// create sliders
	rSlider = createSlider(0, 255, 100);
	rSlider.position(20, 20);
	gSlider = createSlider(0, 255, 0);
	gSlider.position(20, 50);
	bSlider = createSlider(0, 255, 255);
	bSlider.position(20, 80);
}

function draw() {
	var r = rSlider.value();
 	var g = gSlider.value();
  	var b = bSlider.value();
  	background(r, g, b);
  	text("red", rSlider.x * 2 + rSlider.width, 35);
  	text("green", gSlider.x * 2 + gSlider.width, 65);
  	text("blue", bSlider.x * 2 + bSlider.width, 95);

	for (var i = 0; i < count; i++) {
		ellipse(pos[i].x, pos[i].y, radii[i] * 2, radii[i] * 2);
		checkCollisions(pos[i], spd[i], radii[i]);
		pos[i].x += spd[i].x;
		spd[i].y += gravity[i];
		pos[i].y += spd[i].y;
		for (var j = 0; j < count; j++) {
			if (i != j) {
				var distanceVector = p5.Vector.sub(pos[j], pos[i]);
				var distanceVectorMagnitude = distanceVector.mag();
				var minDistance = radii[i] + radii[j];
				if (distanceVectorMagnitude < minDistance) {

					var distanceCorrection = (minDistance - distanceVectorMagnitude) / 2.0;
					var d = distanceVector.copy();
					var correctionVector = d.normalize().mult(distanceCorrection);

					pos[i] = pos[i].sub(correctionVector);
					pos[j] = pos[j].add(correctionVector);

					var theta = distanceVector.heading();
					var sine = sin(theta);
					var cosine = cos(theta);

					var posTemp = [
						new p5.Vector(),
						new p5.Vector()
					];

					posTemp[1].x = cosine * distanceVector.x + sine * distanceVector.y;
					posTemp[1].y = cosine * distanceVector.y - sine * distanceVector.x;

					var spdTemp = [
						new p5.Vector(),
						new p5.Vector()
					];

					spdTemp[0].x = cosine * spd[i].x + sine * spd[i].y;
					spdTemp[0].y = cosine * spd[i].y - sine * spd[i].x;
					spdTemp[1].x = cosine * spd[j].x + sine * spd[j].y;
					spdTemp[1].y = cosine * spd[j].y - sine * spd[j].x;

					var spdFinal = [
						new p5.Vector(),
						new p5.Vector()
					];

					spdFinal[0].x = ((mass[i] - mass[j]) * spdTemp[0].x + 2 * mass[j] * spdTemp[1].x) / (mass[i] + mass[j]);
					if (spdTemp[0].y > 0) {
						spdFinal[0].y = spdTemp[0].y + gravity[i];
					} else {
						spdFinal[0].y = spdTemp[0].y - gravity[i];
					}

					spdFinal[1].x = ((mass[j] - mass[i]) * spdTemp[1].x + 2 * mass[i] * spdTemp[0].x) / (mass[i] + mass[j]);
					if (spdTemp[1].y > 0) {
						spdFinal[1].y = spdTemp[1].y + gravity[i];
					} else {
						spdFinal[1].y = spdTemp[1].y - gravity[i];
					}


					posTemp[0].x += spdFinal[0].x;
					posTemp[0].y += spdFinal[0].y;
					posTemp[1].x += spdFinal[1].x;
					posTemp[1].y += spdFinal[1].y;

					posFinal = [];
					posFinal.push(new p5.Vector());
					posFinal.push(new p5.Vector());

					posFinal[0].x = cosine * posTemp[0].x - sine * posTemp[0].y;
					posFinal[0].y = cosine * posTemp[0].y + sine * posTemp[0].x;
					posFinal[1].x = cosine * posTemp[1].x - sine * posTemp[1].y;
					posFinal[1].y = cosine * posTemp[1].y + sine * posTemp[1].x;


					pos[j].x = pos[i].x + posFinal[1].x;
					pos[j].y = pos[i].y + posFinal[1].y;
					pos[i] = pos[i].add(posFinal[0]);


					spd[i].x = cosine * spdFinal[0].x - sine * spdFinal[0].y;
					spd[i].y = cosine * spdFinal[0].y + sine * spdFinal[0].x;

					spd[j].x = cosine * spdFinal[1].x - sine * spdFinal[1].y;
					spd[j].y = cosine * spdFinal[1].y + sine * spdFinal[1].x;

					// ellipse(pos[i].x, pos[i].y, radii[i] * 2, radii[i] * 2);
					// ellipse(pos[j].x, pos[j].y, radii[j] * 2, radii[j] * 2);
				}
			}
		}
		// checkMouseEvents();
		// explodeParticlesNear(pos[i], spd[i], radii[i]);
	}
}

function checkCollisions(pos, spd, rad) {
	if (pos.x > width - rad) {
		pos.x = width - rad;
		spd.x *= -1;
		spd.x *= friction;
	} else if (pos.x < rad) {
		pos.x = rad
		spd.x *= -1;
		spd.x *= friction;
	}

	if (pos.y > height - rad) {
		pos.y = height - rad;
		spd.y *= -1;
		spd.y *= damping;
	} else if (pos.y < rad) {
		pos.y = rad;
		spd.y *= -1;
		spd.y *= damping;

	}

}

function explodeParticlesNear(pos, spd, rad) {
	if( (pos.x > explosionX - explosionRadii) && (pos.x < explosionX + explosionRadii)
		&& (pos.y >= height - explosionRadii) && (pos.y < height) ) {
		//spd.x *= -1;
		if(spd.x < explosionForce && spd.x > 0) {
			spd.x = -1 * explosionForce;
		} else if (spd.x > (-1 * explosionForce) < 0) {
			spd.x = -1 * explosionForce;
		} else {
			spd.x = random(-1 * explosionForce, explosionForce);
		}


		//spd.x += explosionForce;
		spd.x *= explosionForce;
		if(spd.y < explosionForce & spd.y > 0) {
			spd.y = -1 * explosionForce;
		} else if (spd.y > (-1 * explosionForce) < 0) {
			spd.y = -1 * explosionForce;
		} else {
			spd.y = random(-1 * explosionForce, explosionForce);
		}

		//spd.y *= -1;
		//spd.y += explosionForce;
		//spd.y *= random( -1 * explosionForce, explosionForce);
		pos.x += random(-1 * explosionRadii, explosionRadii);
		pos.y += random(-1 * explosionRadii, explosionRadii);

	}
}


function mouseClicked() {
  explosionX = mouseX;
  explosionY = mouseY;

}

function checkMouseEvents() {

	if(isMousePressed) {
		var red = random(255);
		var green = random(255);
		var blue = random(255);
		fill(red, green, blue);
	}
}
