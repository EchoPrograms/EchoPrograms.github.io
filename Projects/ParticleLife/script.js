var interactionMatrix = 
	{
		red: { red: 15, green: 10, blue: -10, purple: 15 },
		green: { red: -10, green: 50, blue: 20, purple: 15 },
		blue: { red: 10, green: -10, blue: -10, purple: 15 },
		purple: { red: -10, green: -10, blue: -10, purple: -10 }
	};
var attractionTable = document.getElementById("attractionTable").childNodes[1]
var topLevelKeys = Object.keys(interactionMatrix)
var subLevelKeys = Object.keys(interactionMatrix[topLevelKeys[0]])
var started = false;
setTableDefaults()

function setTableDefaults() {
	for(var i = 2; i < attractionTable.childNodes.length; i += 2) {
		for(var k = 3; k < attractionTable.childNodes.length; k += 2) {
			attractionTable.childNodes[i].childNodes[k].childNodes[0].value = interactionMatrix[topLevelKeys[i/2 - 1]][subLevelKeys[(k - 1) / 2 - 1]]
		}
	}
}

function generateInteractionMatrix() {
	for(var i = 2; i < attractionTable.childNodes.length; i += 2) {
		for(var k = 3; k < attractionTable.childNodes.length; k += 2) {
			interactionMatrix[topLevelKeys[i/2 - 1]][subLevelKeys[(k - 1) / 2 - 1]] = attractionTable.childNodes[i].childNodes[k].childNodes[0].value 
		}
	}
}
function applyFriction() {
	frictionHalfLife = parseFloat(document.getElementById("frictionHalfLife").value)
}
var presetStatus = document.getElementById('presetStatus');
var presetList = JSON.parse(localStorage.getItem('presetList') ?? "[]");
var buttonStr = (name)=>{ return `<button id="savePreset" onclick='savePresetFromName("${name}")' type="button">Update Preset</button> 
						<button id="loadPreset" onclick='loadPreset("${name}")' type="button">Load Preset</button> 
						<button id="deletePreset" onclick='deletePreset("${name}")' type="button">Delete Preset</button> 
						<button id="exportPreset" onclick='exportPreset("${name}")' type="button">Export Preset</button> `}
var presetListDisplay = document.getElementById('presetList');
showPresetList()
function savePreset() {
	var name = document.getElementById('presetName').value
	if(name.search("<") != -1 || name.search(">") != -1) {
		presetStatus.innerHTML = "Invalid name";
		return
	}
	savePresetFromName(name)
}
function savePresetFromName(name) {
	deletePreset(name)
	generateInteractionMatrix()
	localStorage.setItem("interactionMatrix-"+name, JSON.stringify(interactionMatrix))
	localStorage.setItem("friction-"+name, frictionHalfLife)
	localStorage.setItem("particleDistance-"+name, startingSpace)
	localStorage.setItem("simDistance-"+name, simDistance)
	
	presetStatus.innerHTML = "Preset \"" + name + "\" saved";
	presetList.push(name)
	localStorage.setItem('presetList', JSON.stringify(presetList));

	showPresetList();
}

function showPresetList() {

	var tempString = "Presets: <br>";
	for(var i = 0; i < presetList.length; i++) {
		tempString += presetList[i] + "  " + buttonStr(presetList[i]) + "<br>"
	}
	presetListDisplay.innerHTML = tempString;
}
function loadPreset(name) {
	if(localStorage.getItem("interactionMatrix-" + name) == null) {
		presetStatus.innerHTML = "Preset \"" + name + "\" doesn't exist";
	} else {
		interactionMatrix = JSON.parse(localStorage.getItem("interactionMatrix-"+name)) ?? interactionMatrix
		frictionHalfLife = localStorage.getItem("friction-"+name)
		startingSpace = parseInt(localStorage.getItem("particleDistance-"+name))
		simDistance = isNaN(parseInt(localStorage.getItem("simDistance-"+name))) ? 50 : parseInt(localStorage.getItem("simDistance-"+name))
		console.log(startingSpace)
		presetStatus.innerHTML = "Preset \"" + name + "\" loaded";
		document.getElementById("startingDist").value = parseInt(startingSpace);
		document.getElementById("frictionHalfLife").value = frictionHalfLife;
		document.getElementById("simDistance").value = simDistance;
		document.getElementById("simDistanceDisplay").innerHTML = simDistance;
		setTableDefaults();
	}
}
function deletePreset(name) {
	var changeList = presetList.filter((a)=>{return a != name});
	localStorage.setItem("presetList", JSON.stringify(changeList))
	presetList = changeList
	showPresetList();
}
function importPreset() {
	var importEncoded = document.getElementById('presetString').value
	var importStrPlain = atob(importEncoded)
	var importObj = JSON.parse(importStrPlain);
	if(importObj.name.search("<") != -1 || importObj.name.search(">") != -1) {
		presetStatus.innerHTML = "Invalid name (This could be an attempt to run code on your browser, be sure the preset code is from a trustworthy source.)";
		return
	}
	deletePreset(importObj.name)
	localStorage.setItem("interactionMatrix-"+importObj.name, JSON.stringify(importObj.matrix))
	localStorage.setItem("friction-"+importObj.name, importObj.fricition)
	localStorage.setItem("particleDistance-"+importObj.name, importObj.starting)
	localStorage.setItem("simDistance-"+importObj.name, importObj.simDistance ?? 50)

	interactionMatrix = importObj.matrix
	frictionHalfLife = importObj.fricition
	startingSpace = importObj.starting
	simDistance = importObj.simDistance;
	
	setTableDefaults();
	document.getElementById("simDistance").value = importObj.simDistance ?? 50;
	document.getElementById("simDistanceDisplay").innerHTML = importObj.simDistance ?? 50;

	presetList.push(importObj.name)
	localStorage.setItem('presetList', JSON.stringify(presetList));
	showPresetList();
}

function exportPreset(name) {
	if(localStorage.getItem("interactionMatrix-" + name) == null) {
		presetStatus.innerHTML = "Preset \"" + name + "\" doesn't exist";
	} else {
		loadPreset()
		var exportObj = {name: name, matrix: interactionMatrix, fricition: frictionHalfLife, starting: startingSpace, simDistance: simDistance};
		var exportStrPlain = JSON.stringify(exportObj);
		presetStatus.innerHTML = "Export: " + btoa(exportStrPlain)
	}
}


function random() {
	for(var i = 2; i < attractionTable.childNodes.length; i += 2) {
		for(var k = 3; k < attractionTable.childNodes.length; k += 2) {
			interactionMatrix[topLevelKeys[i/2 - 1]][subLevelKeys[(k - 1) / 2 - 1]] = Math.floor(Math.random() * 40 - 20)
		}
	}
	setTableDefaults();
}


var particles = [];
var running = false;
var startingSpace = 35;
var particleSize = 2;
var colorMapping = {
	red: "#ff0000",
	green: "#00ff00",
	blue: "#0000ff",
	purple: "#ff00ff",
}
var zoomOutLevel = 1;
var xOffset = 0;
var yOffset = 0;

var simDistance = 50;

var frictionHalfLife = 0.02
var dt = 0.02	
var frictionFactor = Math.pow(0.5, dt / frictionHalfLife)

var canvas = document.getElementById("canvas");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");

var fpsCounter = document.getElementById("fps");

class Particle {
	constructor(position, color) {
		this.position = position;
		this.color = color;
		this.velocity = { x: 0, y: 0 }
	}
	calculatePhysics() {
		for(var i = 0; i < particles.length; i++) {
			if(particles[i] === this) continue
			var xDiff = this.position.x - particles[i].position.x
			var yDiff = this.position.y - particles[i].position.y

			var distance = (xDiff**2 + yDiff**2)**(1/2)
			if(distance > simDistance || distance < 0) continue
			var f = force(distance / simDistance)
			if(isNaN( xDiff / distance * f * interactionMatrix[this.color][particles[i].color] * 10 * deltaTime)) {
				continue;
			}

			this.velocity.x -= xDiff / distance * f * interactionMatrix[this.color][particles[i].color] * 10 * deltaTime
			this.velocity.y -= yDiff / distance * f * interactionMatrix[this.color][particles[i].color] * 10 * deltaTime
		}
		var xDiff = this.position.x - xCoord;
		var yDiff = this.position.y - yCoord;
		var distance = (xDiff**2 + yDiff**2)**(1/2)
		if(distance / zoomOutLevel < effectRadius.value && distance > 0 && dragging) {
			var f = force(distance / zoomOutLevel / effectRadius.value)
			if(!isNaN( xDiff / distance * f * effectMultiplier * 100 * deltaTime)) {
				this.velocity.x -= xDiff / distance * f * effectMultiplier * 100 * deltaTime
				this.velocity.y -= yDiff / distance * f * effectMultiplier * 100 * deltaTime
			}
		}
		frictionFactor = Math.pow(0.5, dt / frictionHalfLife)
		this.velocity.x *= frictionFactor;
		this.velocity.y *= frictionFactor;
		this.position.x += this.velocity.x * deltaTime;
		this.position.y += this.velocity.y * deltaTime;
	}
	draw() {
		if(!paused) this.calculatePhysics()
		ctx.beginPath();
		ctx.fillStyle = colorMapping[this.color];
		ctx.strokeStyle = colorMapping[this.color];
		ctx.arc(this.position.x / zoomOutLevel + xOffset, this.position.y / zoomOutLevel + yOffset, particleSize / zoomOutLevel, 0, 2 * Math.PI)
		ctx.fill();
		ctx.stroke();
	}
	move(x, y) {
		this.position = { x: this.position.x + x, y: this.position.y + y}
	}
}


var zoomSlider = document.getElementById("zoom");
zoomSlider.oninput = () => {
  zoomOutLevel = zoomSlider.value

}

var sizeSlider = document.getElementById("size");
sizeSlider.oninput = () => {
  particleSize = sizeSlider.value
}

var simDistanceSlider = document.getElementById("simDistance");
var simDistanceDisplay = document.getElementById("simDistanceDisplay");
simDistanceSlider.oninput = () => {
	simDistance = parseInt(simDistanceSlider.value)
	simDistanceDisplay.innerHTML = simDistanceSlider.value
}

var startingSlider = document.getElementById("startingDist");
var particlePrediction = document.getElementById("particlePrediction");
startingSlider.oninput = () => {
	startingSpace = parseInt(startingSlider.value)
	particlePrediction.innerHTML = "Particles: " + Math.floor((width / startingSpace) * (height / startingSpace))
}

//particles.forEach((a)=>{a.velocity = { x: (Math.random() - 0.5) * 50 , y: (Math.random() - 0.5) * 50 }})

var lastLoop;
var paused = false;
var fps, deltaTime
var reseting = false;
var xCoord, yCoord;
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, width, height)
fpsCounter.innerHTML = "fps: " + 60 + "  particles: " + particles.length
function gameloop(timestamp) {
	
	lastLoop = lastLoop ?? timestamp
	deltaTime = Math.min((timestamp - lastLoop) / 1000, 0.2)

	fps = 1000 / (deltaTime * 1000);
	lastLoop = timestamp;

	fpsCounter.innerHTML = "fps: " + Math.floor(fps) + "  particles: " + particles.length

	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, width, height)
	for(var i = 0; i < particles.length; i++) {
		particles[i].draw()
	}
	if(cursorMode.value != "spawn" && dragging) {
		ctx.beginPath();
		ctx.strokeStyle = "#FF0000";
		ctx.arc(xCoord / zoomOutLevel, yCoord / zoomOutLevel, effectRadius.value, 0, 2 * Math.PI)
		ctx.stroke();
	}
	if(!reseting) {
		window.requestAnimationFrame(gameloop)
	} else {
		reseting = false
	}
}
var dragging = false;
var previousX, previousY
var cursorMode = document.getElementById('cursorMode');
document.getElementById('colorSelectContainer').hidden = false;
document.getElementById('radiusContainer').hidden = true;
cursorMode.oninput = () => {
  	if(cursorMode.value == "spawn") {
		document.getElementById('colorSelectContainer').hidden = false;
		document.getElementById('radiusContainer').hidden = true;
  	} else {
		document.getElementById('colorSelectContainer').hidden = true;
		document.getElementById('radiusContainer').hidden = false;
	}
}
canvas.addEventListener("mousedown",(e)=>{ 
	if(!started) return;
	switch(e.which) {
		case 1:
			switch(cursorMode.value) {
				case "spawn":	
					spawnParticleAtMouse(e)
					break;
				case "delete":	
					deleteParticleAtMouse(e)
					break;
				case "push":	
					pushParticleAtMouse(e)
					break;
				case "pull":	
					pullParticleAtMouse(e)
					break;
			}
			break
	}
	dragging = true 
})
canvas.addEventListener("mousemove",(e)=>{
	if(!started) return;
	if (dragging) { 
		switch(e.which) {
			case 2:
				var deltaX = (e.clientX - previousX);
				var deltaY = (e.clientY - previousY);
				xOffset += isNaN(deltaX) ? 0 : deltaX;
				yOffset += isNaN(deltaY) ? 0 : deltaY;
				previousX = e.clientX;
				previousY = e.clientY;
				break;
			case 1:
				switch(cursorMode.value) {
					case "spawn":	
						spawnParticleAtMouse(e)
						break;
					case "delete":	
						deleteParticleAtMouse(e)
						break;
					case "push":	
						pushParticleAtMouse(e)
						break;
					case "pull":	
						pullParticleAtMouse(e)
						break;
				}
				break
		}
	}
})
canvas.addEventListener("mouseup",()=>{ dragging = false;  previousX = NaN; previousY = NaN})

canvas.addEventListener('wheel', (e)=>{
	if(!started) return;
	var zoom = e.deltaY < 0 ? -0.5 : 0.5;
	zoom = Math.max(Math.min(zoomOutLevel + zoom, 10), 0.5) 
	zoomSlider.value = zoom
	zoomOutLevel = zoom
});

function force(distance) {
	var threshold = 0.3;
	if(distance < threshold) {
		return distance / threshold - 1;
	} else if (distance < 1) {
		return 1 - Math.abs(2 * distance - 1 - threshold) / (1 - threshold)
	} else {
		return 0;
	}
}

function resetView() {
	xOffset = 0;
	yOffset = 0;
	zoomOutLevel = 1;
	zoomSlider.value = 1;
}
function start() {
	for(var i = startingSpace; i < width; i += startingSpace) {
		for(var j = startingSpace; j < height; j += startingSpace) {
			var rand = Math.random();
			particles.push(new Particle({ x: i, y: j }, rand < 0.25 ? "red" : rand < 0.5 ? "blue" : rand < 0.75 ? "green" : "purple"))
			
		}
	}
	window.requestAnimationFrame(gameloop)
	generateInteractionMatrix()
	frictionHalfLife = document.getElementById("frictionHalfLife").value
	document.getElementById("start").disabled = true
	document.getElementById("reset").disabled = false;
	document.getElementById("stop").disabled = false;
	started = true;
}
document.getElementById("reset").disabled = true;
document.getElementById("stop").disabled = true;
function stop() {
	document.getElementById("start").disabled = false;
	started = false;
	document.getElementById("reset").disabled = true;
	document.getElementById("stop").disabled = true;
	reseting = true;
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, width, height)
	particles = [];
}
function reset() {
	stop();
	start();
}
document.addEventListener("keyup", (e)=>{
  if (e.keyCode == 32 && started) {
   paused = !paused;
	document.getElementById('pauseIndicator').innerHTML = paused ? "Paused" : ""
  }
})
var placeColor = "red"
var colorSelect = document.getElementById('spawnColor');

var effectRadiusLabel = document.getElementById('effectRadiusLabel');
var effectRadius = document.getElementById('effectRadius');
var effectStrength = document.getElementById('effectStrength');
var effectMultiplier = 0;
function spawnParticleAtMouse(e) {
	placeColor = colorSelect.value
	var rect = canvas.getBoundingClientRect();
	xCoord = (e.clientX  - xOffset - rect.left)  * zoomOutLevel
	yCoord = (e.clientY  - yOffset  - rect.top)  * zoomOutLevel
	var rand = Math.random();
	particles.push(new Particle({ x: xCoord, y: yCoord}, placeColor))
	
}
function deleteParticleAtMouse(e) {
	var rect = canvas.getBoundingClientRect();
	xCoord = (e.clientX  - xOffset - rect.left)  * zoomOutLevel 
	yCoord = (e.clientY  - yOffset  - rect.top)  * zoomOutLevel
	for(var i = 0; i < particles.length; i++) {
		var xDiff = xCoord - particles[i].position.x
		var yDiff = yCoord - particles[i].position.y
		var distance = (xDiff**2 + yDiff**2)**(1/2)
		
		if(distance / zoomOutLevel  < effectRadius.value) {

			particles.splice(i, 1)
			
		}
	}
}
function pushParticleAtMouse(e) {
	var rect = canvas.getBoundingClientRect();
	xCoord = (e.clientX  - xOffset - rect.left)  * zoomOutLevel 
	yCoord = (e.clientY  - yOffset  - rect.top)  * zoomOutLevel
	effectMultiplier = -1 * effectStrength.value;
}

function pullParticleAtMouse(e) {
	var rect = canvas.getBoundingClientRect();
	xCoord = (e.clientX  - xOffset - rect.left)  * zoomOutLevel 
	yCoord = (e.clientY  - yOffset  - rect.top)  * zoomOutLevel
	effectMultiplier = 1 * effectStrength.value;
}