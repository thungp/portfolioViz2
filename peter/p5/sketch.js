//p5 01
// peter Thung

//var ps = [];
var count = 200;
var pos = []
var spd = [];
var radii = [];
var gravity = []
var friction, damping;
var explosionRadii;
var explosionForce;
var rSlider, gSlider, bSlider;
var explosionX, explosionY;


function setup() {
	fill(100,255,30);
	createCanvas(600,400);
	friction = .875;
	damping = .786;
	explosionRadii = 10;
	explosionForce = 1.4;
	for(var i =  0; i < count; i++) {
		pos.push(new p5.Vector(width/2, 0));
		spd.push(new p5.Vector(-2 + Math.random()*4, -0 + Math.random()*2));
		radii.push(random(5, 10))
		gravity.push(random(.01, .06));

	}
	console.log(spd);
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
	
	for(var i =  0; i < count; i++) {
		ellipse(pos[i].x, pos[i].y, radii[i]*2, radii[i]*2);
		pos[i].x += spd[i].x;
		spd[i].y +=  gravity[i];
		pos[i].y += spd[i].y;
		checkCollissions(pos[i], spd[i], radii[i]);
		//checkMouseEvents();
		explodeParticlesNear(pos[i], spd[i], radii[i]);

	}
}

function checkCollissions(pos, spd, rad) {
	if (pos.x > width - rad) {
		spd.x *= -1;
	} else if (pos.x < rad) {
		spd.x *= -1;
	}

	if (pos.y > height - rad) {
		pos.y = height - rad;
		spd.y *= -1;
		spd.y *= damping;
		spd.x *= friction;
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