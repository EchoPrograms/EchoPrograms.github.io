class Level {
	constructor(settings) {
		this.name = settings.name;
	}
	wander() { console.log("wandering") }
	sleep() { console.log("sleeping")}
	noClip() { console.log("no clipping") }
	inspect() { console.log("inspecting") }
	interact() { console.log("interacting") }
}

var levelOne = {
	name: "Level One",
}
var levels = [
	new Level(levelOne)
]	

var currentLevel = levels[0];

function die(message) {
	document.querySelector("#alive").style.display = "none";
	document.querySelector("#encounter").style.display = "none";
	document.querySelector("#dead").style.display = "block";
   document.querySelector("#deathMessage").innerHTML = message;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

