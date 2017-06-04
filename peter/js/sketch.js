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
var explosionX = 20, explosionY = 555;
var initialized = false;
var canvasWidth;
var canvasHeight;
var gCanvas;

var stop = false;
var frameCount = 0;
var results;

var fps, fpsInterval, startTime, now, then, elapsed;


// created this as I can't seem to access canvas width and heigth from inside
// the init function. 
// in example code from professor, he is able to access it from the draw function.
function initializeOnce(canvas) {
	if(initialized == false) {
		console.log("initialzied code called");
		initialized = true;
		friction = .875;
		damping = .786;
		explosionRadii = 20;
		explosionForce = 2.4;
		canvasWidth = canvas.width;
		canvasHeight = canvas.height;

		for(var i =  0; i < count; i++) {
			pos.push(new Vec2(canvas.width/2, 0));
			spd.push(new Vec2(-2 + Math.random()*4, -0 + Math.random()*2));
			radii.push((Math.random() * 5) + 10 );
			gravity.push(( Math.random() * .01 ) + .06 );

		}
		
		canvas.addEventListener('click', onClick, false);
		console.log("addEventListenerSet");
		gCanvas = canvas;
	}

}

function init(fps) {

    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    console.log(startTime);
    draw();



	// calc elapsed time since last loop



	// fill(100,255,30);
	// createCanvas(600,400);

	// console.log(spd);
	//background(255,128,0);

	//fill(255,255,0);
	//rect(0,0, 30,80);
	  // create sliders
	  // rSlider = createSlider(0, 255, 100);
	  // rSlider.position(20, 20);
	  // gSlider = createSlider(0, 255, 0);
	  // gSlider.position(20, 50);
	  // bSlider = createSlider(0, 255, 255);
	  // bSlider.position(20, 80);
}

function draw(timeStamp) {
    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

	// if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

		var canvas = document.getElementById('myCanvas');
		var ctx = canvas.getContext('2d');
		initializeOnce(canvas);



		//ctx.globalAlpha = 0.2;
		ctx.fillStyle = '#999999';
	    ctx.rect(0, 0, canvas.width, canvas.height);
	    ctx.fill();

		// var r = rSlider.value();
	 // 	var g = gSlider.value();
	 //  	var b = bSlider.value();

	  	// background(r, g, b);
	  	// text("red", rSlider.x * 2 + rSlider.width, 35);
	  	// text("green", gSlider.x * 2 + gSlider.width, 65);
	  	// text("blue", bSlider.x * 2 + bSlider.width, 95);
		// Reference how to draw ellipse in HTML5 Canvas
		// http://www.williammalone.com/briefs/how-to-draw-ellipse-html5-canvas/

		for(var i =  0; i < count; i++) {
			drawEllipse(pos[i].x, pos[i].y, radii[i]*2, radii[i]*2, ctx);
			pos[i].x += spd[i].x;
			spd[i].y +=  gravity[i];
			pos[i].y += spd[i].y;
			checkCollissions(pos[i], spd[i], radii[i]);
			//checkMouseEvents();

			explodeParticlesNear(pos[i], spd[i], radii[i]);

		}
	}
	window.requestAnimationFrame(draw);

}

function onClick(e) {
	console.log("onClick called" + e);
    var element = gCanvas;
    var offsetX = 0, offsetY = 0

     if (element.offsetParent) {
      do {
        offsetX += element.offsetLeft;
        offsetY += element.offsetTop;
      } while ((element = element.offsetParent));
    }

    x = e.pageX - offsetX;
    y = e.pageY - offsetY;
    explosionX = x;
    explosionY = y;

    console.log("onclick explosionX =  " + explosionX + ", explosionY=" + explosionY);
    console.log("canvasHeight = " + canvasHeight);
    console.log("pos[0].x=" + pos[0].x  + "pos[0].y=" + pos[0].y);
    console.log("pos[1].x=" + pos[1].x  + "pos[1].y=" + pos[1].y);
    // console.log(y);
}


function checkCollissions(pos, spd, rad) {
	if (pos.x > canvasWidth - rad) {
		spd.x *= -1;
	} else if (pos.x < rad) {
		spd.x *= -1;
	}

	if (pos.y > canvasHeight - rad) {
		pos.y = canvasHeight - rad;
		spd.y *= -1;
		spd.y *= damping;
		spd.x *= friction;
	} 

}

function explodeParticlesNear(pos, spd, rad) {

	//console.log("[in explodeParticlesNear] explosionX" + explosionX + ", " + explosionY);
	//console.log("particle x=" + pos.x + ', particle y=' + pos.y);
	//console.log("pos.x = " + pos.x + ", pos.y=" + pos.y);
	if( (pos.x > explosionX - explosionRadii) && (pos.x < explosionX + explosionRadii)
		&& (pos.y >= explosionY - explosionRadii) && (pos.y < explosionY + explosionRadii) ) {
		console.log("explosion detetected");
		if(spd.x < explosionForce && spd.x > 0) {
			spd.x = -1 * explosionForce;
		} else if (spd.x > (-1 * explosionForce) < 0) {
			spd.x = -1 * explosionForce;
		} else {
			spd.x = getRandom(-1 * explosionForce, explosionForce);
		}


		//spd.x += explosionForce;
		spd.x *= explosionForce;
		if(spd.y < explosionForce & spd.y > 0) {
			spd.y = -1 * explosionForce;
		} else if (spd.y > (-1 * explosionForce) < 0) {
			spd.y = -1 * explosionForce;
		} else {
			spd.y = getRandom(-1 * explosionForce, explosionForce);
		}

		//spd.y *= -1;
		//spd.y += explosionForce;
		//spd.y *= random( -1 * explosionForce, explosionForce);
		pos.x += getRandom(-1 * explosionRadii, explosionRadii);
		pos.y += getRandom(-1 * explosionRadii, explosionRadii);

	}
}

function getRandom(min, max) {
    return Math.random() * (max - min + 1) + min;
}
function mouseClicked() {
  explosionX = mouseX;
  explosionY = mouseY;

}

// ref: http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
function checkMouseEvents() {

	if(isMousePressed) {
		var red = random(255);
		var green = random(255);
		var blue = random(255);
		fill(red, green, blue);
	}
}

// http://www.williammalone.com/briefs/how-to-draw-ellipse-html5-canvas/
function drawEllipse(centerX, centerY, width, height, context) {
	
  context.beginPath();
  
  context.moveTo(centerX, centerY - height/2); // A1
  
  context.bezierCurveTo(
    centerX + width/2, centerY - height/2, // C1
    centerX + width/2, centerY + height/2, // C2
    centerX, centerY + height/2); // A2

  context.bezierCurveTo(
    centerX - width/2, centerY + height/2, // C3
    centerX - width/2, centerY - height/2, // C4
    centerX, centerY - height/2); // A1
 
  context.fillStyle = "white";
  context.fill();
  context.strokeSytle="black";
  context.stroke();
  context.closePath();	
}

init(5);
