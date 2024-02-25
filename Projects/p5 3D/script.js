var cam;
var sensitivity = 0.15;
var speed = 0.15;
var mouseMovementX = 0;
var mouseMovementY = 0;
var floorTexture, wallTexture;
var playerHeight = 50;
var floorHeight = -2;
var playerSpawnHeight = 100;
var player = {
    transform: {
        velocity: { x: 0, y: 0, z: 0 },
        position: { x: 0, y: playerSpawnHeight, z: 0 }
    },
};
var gravityAcc = 9.8 / 1000;
var jumpForce = 5	;
var grounded = false;

function preload() {
    floorTexture = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Parquet_flooring_in_Mus%C3%A9e_des_arts_d%C3%A9coratifs_de_Strasbourg.jpg/1280px-Parquet_flooring_in_Mus%C3%A9e_des_arts_d%C3%A9coratifs_de_Strasbourg.jpg");
   // wallTexture = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Stone_wall.jpg/440px-Stone_wall.jpg");
}
var obstacles = []
function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    cam = createCamera();
    debugMode();
    perspective(PI / 3.0, width / height, 0.1, 5000);
	 obstacles.push(new Obstacle(0, 0, 0, 100, 100, 100));
}

function draw() {
    background(0, 0, 255);
    noStroke();

    cam.pan(radians(-mouseMovementX));
    cam.tilt(radians(mouseMovementY));

    for (var k = -5; k < 5; k++) {
        for (var l = -5; l < 5; l++) {
            push();
            translate(k * 250, -floorHeight, l * 250);
            rotateX(radians(90));
            fill(100);
            texture(floorTexture);
            plane(250);
            pop();
        }
    }


    if (keyIsDown(87)) { // W key
        cam.move(0, 0, -speed * deltaTime)
    }
	 if (keyIsDown(83)) { // S key
        cam.move(0, 0, speed * deltaTime)
    }
	 if (keyIsDown(65)) { // A key
        cam.move(-speed * deltaTime, 0, 0)
    }
	 if (keyIsDown(68)) { // D key
        cam.move(speed * deltaTime, 0, 0)
    }
	 
	 playerHeight = keyIsDown(67) ? 25 : 50;
	 speed = keyIsDown(16) ? 0.25 : 0.15
	 
	 player.transform.position = {x: cam.eyeX, y: player.transform.position.y, z: cam.eyeZ}

	 if(grounded) {
		 	player.transform.velocity.y = 0;
			
		 	if(keyIsDown(32)) {
				player.transform.velocity.y = jumpForce;
				grounded = false;
			} else {
				if (player.transform.position.y - floorHeight != playerHeight) {
					player.transform.position.y = floorHeight + playerHeight;
				}
			}
	 } else {
	 		player.transform.velocity.y -= gravityAcc * deltaTime;
	 }

	 if(player.transform.position.y - playerHeight <= floorHeight) {
	 		player.transform.position.y = floorHeight + playerHeight;
	 		grounded = true;
	 }
	 player.transform.position = addVectorObjects(player.transform.position, player.transform.velocity)
    cam.setPosition(player.transform.position.x, -player.transform.position.y, player.transform.position.z);
	 for(var obstacle of obstacles) {
	 	obstacle.drawBox();
	 }
}

function mouseClicked() {
    if (canvas.requestPointerLock) {
        canvas.requestPointerLock();
    }
}
var timer
document.body.addEventListener("mousemove", function (e) {
    mouseMovementX = e.movementX * sensitivity;
    mouseMovementY = e.movementY * sensitivity;

	 clearTimeout(timer)
	 timer = setTimeout(()=>{ mouseMovementX = 0; mouseMovementY = 0;  }, 10)
});
function addVectorObjects(obj1, obj2) {
    return {
        x: obj1.x + obj2.x,
        y: obj1.y + obj2.y,
        z: obj1.z + obj2.z
    };
}
class Obstacle {
	constructor(x, y, z, width, length, height) {
		this.position = {x: x, y: -y, z: z}
		this.scale = {x: width, y: height, z: length}
		this.drawBox();
	}
	drawBox() {
		translate(this.position.x, this.position.y, this.position.z);
		box(this.scale.x, this.scale.y, this.scale.z);
	}
	getPosition() {
		return {x: this.position.x, y: -this.position.y, z: this.position.z}
	}
	setPosition(position) {
		this.position = {x: position.x, y: -position.y, z: position.z}
	}
	getScale() {
		return scale; 
	}
	setScale(scale) {
		this.scale = scale;
	}
}


