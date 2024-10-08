// Variables
var colorMapping = {
	red: "#ff0000",
	green: "#00ff00",
	blue: "#0000ff",
	purple: "#ff00ff",
	cyan: "#00ffff",
	yellow: "#ffff00",
	white: "#ffffff",
}
var interactionMatrix = {}; 
var attractionTable = document.getElementById("attractionTable")
var started = false;
var particles = [];
var running = false;
var startingSpace = 35;
var particleSize = 2;

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

var table = document.getElementById("attractionTable")
var toggleTableButton = document.getElementById("toggleTable")
var showing = false;

var presetStatus = document.getElementById('presetStatus');
var presetList = JSON.parse(localStorage.getItem('presetList') ?? "[]");
var buttonStr = (name)=>{ return ` `}
var presetListDisplay = document.getElementById('presetList');

var placeColor = "red"
var colorSelect = document.getElementById('spawnColor');

var effectRadiusLabel = document.getElementById('effectRadiusLabel');
var effectRadius = document.getElementById('effectRadius');
var effectStrength = document.getElementById('effectStrength');
var effectMultiplier = 0;

var lastLoop;
var paused = false;
var fps, deltaTime
var reseting = false;
var xCoord, yCoord;

var zoomSlider = document.getElementById("zoom");

var startingSlider = document.getElementById("startingDist");
var particlePrediction = document.getElementById("particlePrediction");
var sizeSlider = document.getElementById("size");
var simDistanceSlider = document.getElementById("simDistance");
var simDistanceDisplay = document.getElementById("simDistanceDisplay");

var dragging = false;
var previousX, previousY
var cursorMode = document.getElementById('cursorMode');
var mouseButton = 0;

var pushOrPull = false;


// Setup funcitons
createTable();
random()
showPresetList()


// UI start states
document.getElementById("reset").disabled = true;
document.getElementById("stop").disabled = true;
document.getElementById("clear").disabled = true;
document.getElementById('colorSelectContainer').hidden = false;
document.getElementById('radiusContainer').hidden = true;
table.hidden = true;
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, width, height)
fpsCounter.innerHTML = "fps: " + 60 + "  particles: " + particles.length


// Slider events
zoomSlider.oninput = () => { zoomOutLevel = zoomSlider.value }
sizeSlider.oninput = () => { particleSize = sizeSlider.value }
simDistanceSlider.oninput = () => {
simDistance = parseInt(simDistanceSlider.value)
simDistanceDisplay.innerHTML = simDistanceSlider.value
}
startingSlider.oninput = () => {
startingSpace = parseInt(startingSlider.value)
particlePrediction.innerHTML = "Particles: " + Math.floor((width / startingSpace) * (height / startingSpace))
}
cursorMode.oninput = () => {
  if(cursorMode.value == "spawn") {
	document.getElementById('colorSelectContainer').hidden = false;
	document.getElementById('radiusContainer').hidden = true;
  } else {
	document.getElementById('colorSelectContainer').hidden = true;
	document.getElementById('radiusContainer').hidden = false;
}
}


// Event Listeners
canvas.addEventListener("mousedown",(e)=>{ 
if(!started) return;
mouseButton = e.which
switch(mouseButton) {
	case 1:
		switch(cursorMode.value) {
			case "spawn":	
				spawnParticleAtMouse(e)
				break;
			case "delete":	
				deleteParticleAtMouse(e)
				break;
			case "push":	
				pushOrPull = true;
				pushParticleAtMouse(e)
				break;
			case "pull":	
				pushOrPull = true;
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
canvas.addEventListener("mouseup",()=>{ dragging = false;  previousX = NaN; previousY = NaN; pushOrPull = false; })

canvas.addEventListener('wheel', (e)=>{
if(!started) return;
var zoom = e.deltaY < 0 ? -0.5 : 0.5;
zoom = Math.max(Math.min(zoomOutLevel + zoom, 10), 0.5) 
zoomSlider.value = zoom
zoomOutLevel = zoom
});
document.addEventListener("keyup", (e)=>{
if (e.keyCode == 32 && started) {
paused = !paused;
document.getElementById('pauseIndicator').innerHTML = paused ? "Paused" : ""
}
})


// Tool functions
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


// Button functions
function resetView() {
xOffset = 0;
yOffset = 0;
zoomOutLevel = 1;
zoomSlider.value = 1;
}

function start() {
for(var i = startingSpace; i < width; i += startingSpace) {
	for(var j = startingSpace; j < height; j += startingSpace) {
		var colors = Object.keys(colorMapping)
		var rand = Math.floor(Math.random() * colors.length);
		particles.push(new Particle({ x: i, y: j }, colors[rand]))
		
	}
}
window.requestAnimationFrame(gameloop)
generateInteractionMatrix()
frictionHalfLife = document.getElementById("frictionHalfLife").value
document.getElementById("start").disabled = true
document.getElementById("reset").disabled = false;
document.getElementById("stop").disabled = false;
document.getElementById("clear").disabled = false;
started = true;
}

function stop() {
document.getElementById("start").disabled = false;
started = false;
document.getElementById("reset").disabled = true;
document.getElementById("stop").disabled = true;
document.getElementById("clear").disabled = true;

reseting = true;
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, width, height)
particles = [];
}

function reset() {
stop();
start();
}


// Table Functions
function setTableDefaults() {
for(var i = 1; i < attractionTable.childNodes[0].childNodes.length; i ++) {
	for(var k = 1; k < attractionTable.childNodes[0].childNodes.length; k ++) {
		attractionTable.childNodes[0].childNodes[i].childNodes[k].childNodes[0].value = 
		interactionMatrix[Object.keys(colorMapping)[i - 1]][Object.keys(colorMapping)[k - 1]]
	}
}
}

function createTable(){
generateInteractionMatixBase();
var colors = Object.keys(colorMapping);
var elementString = "";
var spawnElementString = "";
elementString += "<tr>";
elementString += "<th></th>";
for(var i = 0; i < colors.length; i++) {
	elementString += `<th>${colors[i]}</th>`
	spawnElementString += `<option value="${colors[i]}">${colors[i]}</option>`
}
elementString += "</tr>";

for(var i = 0; i < colors.length; i++) {
	elementString += "<tr>";
	elementString += `<th>${colors[i]}</th>`
	for(var k = 0; k < colors.length; k++) {
		elementString += '<th><input type="number" min="-100" max="100" width="25"></th>'
	}
	elementString += "</tr>";
}
document.getElementById("attractionTable").innerHTML = elementString;
document.getElementById("spawnColor").innerHTML = spawnElementString
}

function toggleTable() {
showing = !showing;
toggleTableButton.innerHTML = showing ? "Hide" : "Show";
table.hidden = !showing;
}

function zeroOut() {
for(var i = 1; i < attractionTable.childNodes[0].childNodes.length; i ++) {
	for(var k = 1; k < attractionTable.childNodes[0].childNodes.length; k ++) {
		interactionMatrix[Object.keys(colorMapping)[i - 1]][Object.keys(colorMapping)[k - 1]] = 0;
	}
}
setTableDefaults();
}

function random() {
for(var i = 1; i < attractionTable.childNodes[0].childNodes.length; i ++) {
	for(var k = 1; k < attractionTable.childNodes[0].childNodes.length; k ++) {
		interactionMatrix[Object.keys(colorMapping)[i - 1]][Object.keys(colorMapping)[k - 1]] = Math.floor(Math.random() * 40 - 20)
	}
}
setTableDefaults();
}


// InteractionMatix functions
function generateInteractionMatixBase() {
interactionMatrix = {};
var colors = Object.keys(colorMapping);
for(var i = 0; i < colors.length; i++) {
	interactionMatrix[colors[i]] = {};
	for(var k = 0; k < colors.length; k++) {
		interactionMatrix[colors[i]][colors[k]] = 0;
	}
}
}

function generateInteractionMatrix() {
for(var i = 1; i < attractionTable.childNodes[0].childNodes.length; i ++) {
	for(var k = 1; k < attractionTable.childNodes[0].childNodes.length; k ++) {
		interactionMatrix[Object.keys(colorMapping)[i - 1]][Object.keys(colorMapping)[k - 1]] = parseInt(attractionTable.childNodes[0].childNodes[i].childNodes[k].childNodes[0].value) 
	}
}
}


// Preset functions
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

var tempString = "";
for(var i = 0; i < presetList.length; i++) {
	tempString += `<option value="${presetList[i]}">${presetList[i]}</option>`
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


// Physics functions
function applyFriction() {
frictionHalfLife = parseFloat(document.getElementById("frictionHalfLife").value)
}

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


// Game loop
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
if(cursorMode.value != "spawn" && dragging && mouseButton == 1) {
	ctx.beginPath();
	ctx.strokeStyle = "#FF0000";
	ctx.arc(xCoord / zoomOutLevel + xOffset, yCoord / zoomOutLevel + yOffset, effectRadius.value, 0, 2 * Math.PI)
	ctx.stroke();
}
if(!reseting) {
	window.requestAnimationFrame(gameloop)
} else {
	reseting = false
}
}


// Particle class
class Particle {
constructor(position, color) {
	this.position = position;
	this.color = color;
	this.velocity = { x: 0, y: 0 }
	this.colorMapping = colorMapping[this.color];
}
calculatePhysics() {
	for(var i = 0; i < particles.length; i++) {
		if(particles[i] === this) continue
		var xDiff = this.position.x - particles[i].position.x
		var yDiff = this.position.y - particles[i].position.y

		var distance = (xDiff**2 + yDiff**2)**(1/2)
		if(distance > simDistance) continue
		var colorForce = force(distance / simDistance) * interactionMatrix[this.color][particles[i].color] * 10 * deltaTime;
		var xV = xDiff / distance * colorForce
		if(isNaN(xV)) continue
		this.velocity.x -= xV
		this.velocity.y -= yDiff / distance * colorForce
	}
	var xDiff = this.position.x - xCoord;
	var yDiff = this.position.y - yCoord;
	var distance = (xDiff**2 + yDiff**2)**(1/2)
	if(distance / zoomOutLevel < effectRadius.value && pushOrPull) {
		var colorForce = force(distance / zoomOutLevel / effectRadius.value) * effectMultiplier * 100 * deltaTime
		var xV = xDiff / distance * colorForce
		if(!isNaN(xV)) {
			this.velocity.x -= xV
			this.velocity.y -= yDiff / distance * colorForce
		}
	}
	frictionFactor = 0.5**(dt / frictionHalfLife)
	this.velocity.x *= frictionFactor;
	this.velocity.y *= frictionFactor;
	this.position.x += this.velocity.x * deltaTime;
	this.position.y += this.velocity.y * deltaTime;
}
draw() {
	if(!paused) this.calculatePhysics()
	ctx.beginPath();
	
	ctx.fillStyle = this.colorMapping;
	ctx.strokeStyle = this.colorMapping;
	ctx.arc(this.position.x / zoomOutLevel + xOffset, this.position.y / zoomOutLevel + yOffset, particleSize / zoomOutLevel, 0, 2 * Math.PI)
	ctx.fill();
	ctx.stroke();
}
move(x, y) {
	this.position = { x: this.position.x + x, y: this.position.y + y}
}
}