var $ = function(prop) {
	return document.querySelector(prop);
};

var ang = function(a) {
	return a * (Math.PI / 180);
};
var playerSpeed = 5;
var sensitivityX = 0.15;
var sensitivityY = 0.15;
var mx = 0,
	 my = 0;
var keys = [];
var cam;
var yAng = 0;
var floorTexture, wallTexture;
var playerHeight = 25;
var floorHeight = 0;
document.body.addEventListener("mousemove", function(e) {
	mx = e.movementX;
	my = e.movementY;
});
var D = {
	cx: 0,
	cy: 0,
	cz: 0,
	x: 0,
	y: 100,
	z: 200,
	r: 0,
	r2: 0,
};

function preload() {
	floorTexture = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Parquet_flooring_in_Mus%C3%A9e_des_arts_d%C3%A9coratifs_de_Strasbourg.jpg/1280px-Parquet_flooring_in_Mus%C3%A9e_des_arts_d%C3%A9coratifs_de_Strasbourg.jpg");
	wallTexture = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Stone_wall.jpg/440px-Stone_wall.jpg");

}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight, WEBGL);
	cam = createCamera();
	debugMode()

}
var speed = 1;
var gravityAc = 9.8;
var grounded = false;
function draw() {
	background(0);
	noStroke();
	cam.pan(ang(-D.cx));
	cam.tilt(ang(D.cy));
	D.r -= (mx * sensitivityX);
	yAng -= (my * sensitivityY);

	if(floorHeight <= D.y - playerHeight) {
		speed += gravityAc * deltaTime;
	} else {
		speed = 0;
		grounded = true;
	}
	D.y -= speed * 0.0001
	console.log(`player Y: ${D.y} | floor Y: ${floorHeight} | toePos: ${D.y - playerHeight}`)
	cam.setPosition(D.x, -D.y, D.z);

	for (var i = -2.5; i < 2.5; i++) {
		for (var j = -2.5; j < 2.5; j++) {
			push();
			translate(i * 500, 1, j * 500);
			rotateY(ang(90));
			fill((i + 10) * 20, (j + 10) * 20, (i + j) * 20);
			texture(wallTexture);

			box(100);
			pop();
		}
	}
	for (var k = -5; k < 5; k++) {
		for (var l = -5; l < 5; l++) {
			push();
			translate(k * 500, 50, l * 500);
			rotateX(ang(90));
			fill(100);
			texture(floorTexture);
			plane(500);
			pop();
		}
	}


	D.cx = mx * sensitivityX;
	D.cy = my * sensitivityY;

	if (keys[87]) {
		D.z -= cos(ang(D.r)) * playerSpeed;
		D.x -= sin(ang(D.r)) * playerSpeed;
	}
	if (keys[83]) {
		D.z += cos(ang(D.r)) * playerSpeed;
		D.x += sin(ang(D.r)) * playerSpeed;
	}
	if (keys[65]) {
		D.z -= cos(ang(D.r + 90)) * playerSpeed;
		D.x -= sin(ang(D.r + 90)) * playerSpeed;
	}

	if (keys[68]) {
		D.z += cos(ang(D.r + 90)) * playerSpeed;
		D.x += sin(ang(D.r + 90)) * playerSpeed;
	}
	if(keys[32]) {
		if(grounded) {
		speed = -3000;
}
	}
	if (mx > 0) {
		mx--;
	}
	if (mx < 0) {
		mx++;
	}
	if (my > 0) {
		my--;
	}
	if (my < 0) {
		my++;
	}
	if (yAng < -30) {
		if (my > 0) {
			sensitivityY = 0;
		}
		if (my < 0) {
			sensitivityY = 0.15;
		}
	}
	if (yAng > 30) {
		if (my < 0) {
			sensitivityY = 0;
		}
		if (my > 0) {
			sensitivityY = 0.15;
		}
	}
}

function keyPressed() {
	keys[keyCode] = true;
}

function keyReleased() {
	keys[keyCode] = false;
}

function mouseClicked() {
	//got this stuff from Willard's Minecraft
	if (canvas.requestPointerLock) {
		canvas.requestPointerLock();
	}
}