var pixelWidth = 5;
var screenArray = [];
function setup() {
	var screenWidth = 1350;
	var screenHeight = 600;
	var pixelWidth = 5;
  	createCanvas(screenWidth, screenHeight);
	canvas.style.border = "1px black solid"
	createArray(screenArray, height / pixelWidth, width / pixelWidth)
}

function draw() {
	noStroke()
	for(var column = screenArray.length - 1; column >= 0; column--) {
		
		for(var row = screenArray[0].length - 1; row >= 0; row--) {
			
			if(screenArray[0].length - 1 == row || screenArray[column][row].color == "255,255,255" || paused) continue
			
			if(screenArray[column][row + 1].color == "255,255,255") {
				screenArray[column][row + 1] = screenArray[column][row];
				screenArray[column][row] = {colorObj: color(255,255,255), color: "255,255,255"};

				fill(screenArray[column][row + 1].colorObj)
				rect(column * pixelWidth, (row + 1) * pixelWidth, pixelWidth, pixelWidth)
				fill(color(255,255,255))
				rect(column * pixelWidth, row * pixelWidth, pixelWidth, pixelWidth)

			} else {

				var goLeft = random() < 0.5;

				if(screenArray[column - 1 * (-1 * goLeft)] != undefined && screenArray[column - 1 * (-1 * goLeft)][row + 1].color == "255,255,255") {
					screenArray[column - 1 * (-1 * goLeft)][row + 1] = screenArray[column][row];
					screenArray[column][row] = {colorObj: color(255,255,255), color: "255,255,255"};

					fill(screenArray[column - 1 * (-1 * goLeft)][row + 1].colorObj)
					rect((column - 1 * (-1 * goLeft)) * pixelWidth, (row + 1) * pixelWidth, pixelWidth, pixelWidth)
					fill(color(255,255,255))
					rect(column * pixelWidth, row * pixelWidth, pixelWidth, pixelWidth)
				} else if(screenArray[column + 1 * (-1 * goLeft)] != undefined && screenArray[column + 1 * (-1 * goLeft)][row + 1].color == "255,255,255") {
					screenArray[column + 1 * (-1 * goLeft)][row + 1] = screenArray[column][row];
					screenArray[column][row] = {colorObj: color(255,255,255), color: "255,255,255"};

					fill(screenArray[column + 1 * (-1 * goLeft)][row + 1].colorObj)
					rect((column + 1 * (-1 * goLeft)) * pixelWidth, (row + 1) * pixelWidth, pixelWidth, pixelWidth)
					fill(color(255,255,255))
					rect(column * pixelWidth, row * pixelWidth, pixelWidth, pixelWidth)
				}

			}

		}
	}
}

function createArray(array, width, height) {
	for(var i = 0; i < height; i++) {
		array.push([]);
		for(var k = 0; k < width; k++) {
			array[i].push({colorObj: color(255,255,255), color: "255,255,255"});
		} 
	}
}
function mouseDragged() {
	mouseInteract();
}
function mousePressed() {
	mouseInteract();
}
function mouseInteract() {
	if(mouseX < 0 || mouseX > canvas.width || mouseY < 0 || mouseY > canvas.height) return;
	var column = Math.floor(mouseX / pixelWidth)
	var row = Math.floor(mouseY / pixelWidth)
	spawnGroup(screenArray, column, row, radius * 2)
}

var r = 0;
var g = 0;
var b = 0;
var radius = 4;
function spawnGroup(array, column, row, size) {
	for(var i = -Math.floor(size / 2); i < Math.floor(size / 2); i++) {
		for(var k = -Math.floor(size / 2); k < Math.floor(size / 2); k++) {
			try{
				array[column + i][row + k] = {colorObj: color(r,g,b), color: r+","+g+","+b}
				fill(screenArray[i + column][k + row].colorObj)
				rect((column + i) * pixelWidth, (row + k) * pixelWidth, pixelWidth, pixelWidth)
			} catch(err) { }
		}
	}
}
var sizeDescription = document.querySelector("#size");
var pauseIndicator = document.querySelector("#paused")
function growRadius() {
	radius++;
	sizeDescription.innerHTML = " " + radius + " "
}
function shrinkRadius() {
	if(radius == 1) return;
	radius--;
	sizeDescription.innerHTML = " " + radius + " "
}
var paused = false;
function keyPressed() {
	if(keyCode == 32) {
		paused = !paused;
		pauseIndicator.innerHTML = paused ? "Paused" : "Not Paused";
	}
}
