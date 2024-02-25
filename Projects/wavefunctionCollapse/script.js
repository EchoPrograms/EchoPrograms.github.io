var DIMWidth = parseInt(localStorage.getItem('size') ?? 20);
var DIMHeight = parseInt(localStorage.getItem('size') ?? 20);

document.getElementById('size').value = DIMWidth;
document.getElementById('style').value = localStorage.getItem('mode') ?? "Square";


var tiles = [];
var complete = false;
var paused = false;
var mode = document.getElementById("style").value;
var randMode = 0.75;
if(mode == "Noodles") {
var dataURIs = [
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAC1JREFUWEft0EERAAAAAUH6lxbDZxU4s815PffjAAECBAgQIECAAAECBAgQIDAaPwAh6O5R/QAAAABJRU5ErkJggg==",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADpJREFUWEft0LEJAEAIBEHtv2g/+QJOMBzjRY7p2t2EeYddxeF/aAABAgQIECBAgAABAgQIECBwLvAANHsgITfOKL4AAAAASUVORK5CYII=",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAExJREFUWEft1qENACAUQ0HYf2gwDPAQBHPopmlO/DDH3VsxPmNu5OApNIAAAQIEqkC9xM9OsQEECBB4JpCLa/D2U1p7c84AAgQIfBfYsp4VFx4FMkcAAAAASUVORK5CYII=",
	//"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFRJREFUWEft1sEJACAMQ9F2/6GVggMkEBDK9xy0vkNol3eOGG8xV3LwXcgACCCAwE4B9Vdqu1q5qWIGQAABBL4LWM2VDrtLafp9eytmAAQQQCAucAFpBBUXEdtZLQAAAABJRU5ErkJggg==",
	//"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFBJREFUWEft1sEJADAIBEHtv+iEQArYewmyeR9B53HYlb0D4w1zhYP/QwdQQAEFdgrQrWi7RrlXxQ6ggAIKjAskzUWHxbcmDnqUKqCAAmsFLpsdIBckLTCEAAAAAElFTkSuQmCC",
	//"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEJJREFUWEft1rENADAIA7Dw/9Gt+gFDEYuZI4g8UUlO/k91V76gAgQIECBAgAABAgS6/+NIrv29jlxPogABAgTWBS6a8xUhnJjK5AAAAABJRU5ErkJggg==",
]

var dataEdges = [
	[0, 0, 0,  0, 0, 0,  0, 0, 0,  0, 0, 0],
	[0, 1, 0,  0, 0, 0,  0, 1, 0,  0, 0, 0],
	[0, 1, 0,  0, 1, 0,  0, 0, 0,  0, 0, 0],
	[0, 1, 0,  0, 1, 0,  0, 0, 0,  0, 1, 0],
	[0, 1, 0,  0, 1, 0,  0, 1, 0,  0, 1, 0],
	[1, 1, 0,  0, 0, 0,  0, 0, 0,  0, 1, 1],
]
var rotateMap = [
	true,
	true,
	true,
	true,
	true,
	true,
]
} else if(mode == "DiagonalNoodles") {

var dataURIs = [
 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAC1JREFUWEft0EERAAAAAUH6lxbDZxU4s815PffjAAECBAgQIECAAAECBAgQIDAaPwAh6O5R/QAAAABJRU5ErkJggg==",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAGpJREFUWEftlEEKACAIBPX/jy66SqSWlsF2FWqYBpmIGq0PK/Oj8bgcAOUNyD8ObcLSAADSDcgHtChDgWZBAeC5gatNWJZKqhEAWAykNgGALw2ENrFjAADlDBwBRTQAgHIGXEAZDQDAZaADZfcgGWzLHisAAAAASUVORK5CYII=",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAINJREFUWEftlUEKACEMA+v/H72LR0U6llZclngt1DgJsZnZY/5pMKexu78vl4DPE5g9pkzQg4Z9OxmQgOME5gtCHlIJLOZDhlaBkoDrBKoz4fYGlUoXkyUiAWkC2UxIwP8IlGZipwfov4n2BH5GdKEIEKGQJRUZSFkiAScIhCyRgOsEXv90KBFVX7iuAAAAAElFTkSuQmCC",
	//"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAH1JREFUWEftl1EKACEIRO3+h27psxDfShu5MP0KNj1Hq2Zm3eLVIE7hMP9ILgHlCaw1Jk/QgaZ8bzwgAccJrBukakhDwIlPHvIMJQHXCXztiXBu0FAZYnaJSIAIiECawG7b0fWgu6AegWzNaXyn8ulN+AsCVHPqe/0NaxN4AAJgMBHs+HtUAAAAAElFTkSuQmCC",
	//"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAGVJREFUWEftljEOACEIBJf/P9prbM7Cy3pALMaauJMBjKH6M3YRUZ8vANoNbAPXllfMAADtBqxASa+2Z8wAAO0GfgVmvAMAXG/AWm2reA7QlwHrTqsYgIrv20kLUjkAwAAGMICBB+cfFBklN4MAAAAAAElFTkSuQmCC",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADpJREFUWEft17ERADAIAkDdf+h4tg4QmmcBuO/oCqfD/WUAAQIECBAgQIAAAQIECKzAO/fsq4oBcYEBFEoEITZdoKAAAAAASUVORK5CYII=",
	]

var dataEdges = [
	[0, 0, 0,  0, 0, 0,  0, 0, 0,  0, 0, 0],
	[1, 0, 0,  0, 0, 1,  1, 0, 0,  0, 0, 1],
	[1, 0, 1,  1, 0, 1,  1, 0, 0,  0, 0, 1],
	//[1, 0, 1,  1, 0, 1,  1, 0, 1,  1, 0, 1],
	//[0, 0, 1,  1, 0, 0,  0, 0, 0,  0, 0, 0],
	[0, 0, 0,  0, 0, 0,  0, 0, 1,  1, 0, 0],
]
var rotateMap = [
	true,
	true,
	true,
	true,
	true,
	true,
]
} else if (mode == "Melt") {
var dataURIs = [
 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAC1JREFUWEft0EERAAAAAUH6lxbDZxU4s815PffjAAECBAgQIECAAAECBAgQIDAaPwAh6O5R/QAAAABJRU5ErkJggg==",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAGpJREFUWEftlEEKACAIBPX/jy66SqSWlsF2FWqYBpmIGq0PK/Oj8bgcAOUNyD8ObcLSAADSDcgHtChDgWZBAeC5gatNWJZKqhEAWAykNgGALw2ENrFjAADlDBwBRTQAgHIGXEAZDQDAZaADZfcgGWzLHisAAAAASUVORK5CYII=",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAINJREFUWEftlUEKACEMA+v/H72LR0U6llZclngt1DgJsZnZY/5pMKexu78vl4DPE5g9pkzQg4Z9OxmQgOME5gtCHlIJLOZDhlaBkoDrBKoz4fYGlUoXkyUiAWkC2UxIwP8IlGZipwfov4n2BH5GdKEIEKGQJRUZSFkiAScIhCyRgOsEXv90KBFVX7iuAAAAAElFTkSuQmCC",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAH1JREFUWEftl1EKACEIRO3+h27psxDfShu5MP0KNj1Hq2Zm3eLVIE7hMP9ILgHlCaw1Jk/QgaZ8bzwgAccJrBukakhDwIlPHvIMJQHXCXztiXBu0FAZYnaJSIAIiECawG7b0fWgu6AegWzNaXyn8ulN+AsCVHPqe/0NaxN4AAJgMBHs+HtUAAAAAElFTkSuQmCC",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAGVJREFUWEftljEOACEIBJf/P9prbM7Cy3pALMaauJMBjKH6M3YRUZ8vANoNbAPXllfMAADtBqxASa+2Z8wAAO0GfgVmvAMAXG/AWm2reA7QlwHrTqsYgIrv20kLUjkAwAAGMICBB+cfFBklN4MAAAAAAElFTkSuQmCC",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADpJREFUWEft17ERADAIAkDdf+h4tg4QmmcBuO/oCqfD/WUAAQIECBAgQIAAAQIECKzAO/fsq4oBcYEBFEoEITZdoKAAAAAASUVORK5CYII=",
	]

var dataEdges = [
	[0, 0, 0,  0, 0, 0,  0, 0, 0,  0, 0, 0],
	[1, 0, 0,  0, 0, 1,  1, 0, 0,  0, 0, 1],
	[1, 0, 1,  1, 0, 1,  1, 0, 0,  0, 0, 1],
	[1, 0, 1,  1, 0, 1,  1, 0, 1,  1, 0, 1],
	[0, 0, 1,  1, 0, 0,  0, 0, 0,  0, 0, 0],
	[0, 0, 0,  0, 0, 0,  0, 0, 1,  1, 0, 0],
]
var rotateMap = [
	true,
	true,
	true,
	true,
	true,
	true,
]
} else {
	var dataURIs = [
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAC1JREFUWEft0EERAAAAAUH6lxbDZxU4s815PffjAAECBAgQIECAAAECBAgQIDAaPwAh6O5R/QAAAABJRU5ErkJggg==",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADpJREFUWEft0LEJAEAIBEHtv2g/+QJOMBzjRY7p2t2EeYddxeF/aAABAgQIECBAgAABAgQIECBwLvAANHsgITfOKL4AAAAASUVORK5CYII=",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAExJREFUWEft1qENACAUQ0HYf2gwDPAQBHPopmlO/DDH3VsxPmNu5OApNIAAAQIEqkC9xM9OsQEECBB4JpCLa/D2U1p7c84AAgQIfBfYsp4VFx4FMkcAAAAASUVORK5CYII=",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFRJREFUWEft1sEJACAMQ9F2/6GVggMkEBDK9xy0vkNol3eOGG8xV3LwXcgACCCAwE4B9Vdqu1q5qWIGQAABBL4LWM2VDrtLafp9eytmAAQQQCAucAFpBBUXEdtZLQAAAABJRU5ErkJggg==",
	//"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFBJREFUWEft1sEJADAIBEHtv+iEQArYewmyeR9B53HYlb0D4w1zhYP/QwdQQAEFdgrQrWi7RrlXxQ6ggAIKjAskzUWHxbcmDnqUKqCAAmsFLpsdIBckLTCEAAAAAElFTkSuQmCC",
	//"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEJJREFUWEft1rENADAIA7Dw/9Gt+gFDEYuZI4g8UUlO/k91V76gAgQIECBAgAABAgS6/+NIrv29jlxPogABAgTWBS6a8xUhnJjK5AAAAABJRU5ErkJggg==",
]

var dataEdges = [
	[0, 0, 0,  0, 0, 0,  0, 0, 0,  0, 0, 0],
	[0, 1, 0,  0, 0, 0,  0, 1, 0,  0, 0, 0],
	[0, 1, 0,  0, 1, 0,  0, 0, 0,  0, 0, 0],
	[0, 1, 0,  0, 1, 0,  0, 0, 0,  0, 1, 0],
	[0, 1, 0,  0, 1, 0,  0, 1, 0,  0, 1, 0],
	[1, 1, 0,  0, 0, 0,  0, 0, 0,  0, 1, 1],
]
var rotateMap = [
	true,
	true,
	true,
	true,
	true,
	true,
]
}


var pixelDIM = 32;

var entropyMap = []

function preload() {
	tiles = [];
	entropyMap = []
	for(var i = 0; i < dataURIs.length; i++) {
		tiles.push(new Tile(loadImage(dataURIs[i]), dataEdges[i], i, rotateMap[i]));
	}
}
function reset() {
	preload();
	setup();
}

function setup() {
	createCanvas(pixelDIM * DIMWidth, pixelDIM * DIMHeight);
	for(var i = 0; i < dataURIs.length; i++) {
		if(!tiles[i].shouldRotate) continue
		tiles.push(tiles[i].rotate(1))
		tiles.push(tiles[i].rotate(2))
		tiles.push(tiles[i].rotate(3))
	}
	fill(color(0,0,0))
	for(var i = 0; i < DIMWidth; i++) {
		for(var k = 0; k < DIMHeight; k++) {
			rect(i * pixelDIM, k * pixelDIM, pixelDIM, pixelDIM)
			entropyMap.push(new Cell(tiles, entropyMap, entropyMap.length));
		}
	}
	collapseRandom()
	
}
function collapseRandom() {
	var randTile = Math.floor(random() * tiles.length)
	var randLoc = Math.floor(random() * entropyMap.length)
	entropyMap[randLoc].collapse(tiles[randTile])
}
var leastEntropy = 11111
function draw() {
	
	setInterval(()=>{genLoop()},0)

}
function genLoop() {
	if(complete) return;
	leastEntropy = tiles.length
	sortedEntropyMap = entropyMap.toSorted((a, b) => {
		if(a.collapsed) return 1
		if(b.collapsed) return -1
		if(a.entropy < leastEntropy || b.entropy < leastEntropy) {
			leastEntropy = a.entropy < b.entropy ? a.entropy : b.entropy
		}
		return a.entropy < b.entropy ? -1 : 1
	});
	if(sortedEntropyMap.length == 0) noLoop();
	sortedEntropyMap = sortedEntropyMap.filter((a)=> {
		return (a.entropy == leastEntropy && !a.collapsed) || sortedEntropyMap.length == 1;
	})
	var randCell = sortedEntropyMap[Math.floor(random() * sortedEntropyMap.length)]
	if(randCell == undefined) {
		sortedEntropyMap = entropyMap.filter((a) => {
			return !(a.collapsed)
		})
		
		randCell = sortedEntropyMap[Math.floor(random() * sortedEntropyMap.length)]
		try { randCell.randomCollapse(); } catch(err) {complete = true; stop()}

		complete = true;
		stop();
		
	} else {
		randCell.randomCollapse();
	}
}

function stop() {

	complete = true;
	const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);
	noLoop();
	for (let i = 1; i < interval_id; i++) {
		window.clearInterval(i);
		
	}
}
function toggleLoop() {
	if(complete) return;
	if(paused) {
		loop();
	} else {
		const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);
		noLoop();
		for (let i = 1; i < interval_id; i++) {
			window.clearInterval(i);
		}
	}
	paused = !paused;
}
function keyPressed() {
	if(keyCode == 32) {
		toggleLoop();
	}
}

class Cell {
	constructor(tileMap, entropyMap, entropyMapLoc) {
		this.entropy = tileMap.length;
		this.tileMap = tileMap;
		this.allowedStates = tileMap;
		
		this.mapLoc = entropyMapLoc;
		this.entropyMap = entropyMap;
		
		this.collapsed = false;
		this.collapsedTile = null;
		this.neighbors = [];
	}
	calculateEntropy(override) {
		if(this.collapsed && !override) return;
		
		this.allowedStates = this.tileMap;
		this.findNeighbors();
		for(var i = 0; i < this.neighbors.length; i++) {
			if(this.neighbors[i].cell.collapsed == true) {
				var comparisonEdge = this.neighbors[i].cell.collapsedTile.edges.slice((this.neighbors[i].index + 2) % 4 * 3, (this.neighbors[i].index + 2) % 4 * 3 + 3)
				comparisonEdge.reverse()
				this.allowedStates = this.allowedStates.filter((elm) => { 
					
					return elm.edges.slice(this.neighbors[i].index * 3, this.neighbors[i].index * 3 + 3).toString() == comparisonEdge.toString()
				})
			} 
		}
		
		this.entropy = this.allowedStates.length;
		if(paused) return
		if(this.entropy == 1) {
			
			this.collapse(this.allowedStates[0], origin)

		} else if (this.entropy == 0){
			this.collapse(this.tileMap[0], origin)
		} else {
			fill(Math.floor(150/this.entropy))
			rect((this.mapLoc % DIMWidth) * pixelDIM, Math.floor(this.mapLoc / DIMHeight) * pixelDIM, pixelDIM, pixelDIM)
			
		}
	}
	findNeighbors() {
		this.neighbors = [ 
			{index: 0, cell: this.entropyMap[this.mapLoc - DIMWidth]}, 
			{index: 1, cell: this.entropyMap[this.mapLoc + 1]}, 
			{index: 2, cell: this.entropyMap[this.mapLoc + DIMWidth]}, 
			{index: 3, cell: this.entropyMap[this.mapLoc - 1]} 
		]
		this.neighbors = this.neighbors.filter((elm) => { 
			return (
				elm.cell !== undefined && 
				!(this.mapLoc % DIMWidth == 0 && elm.cell.mapLoc == this.mapLoc - 1) && 
				!(this.mapLoc % DIMWidth == DIMHeight - 1 && elm.cell.mapLoc == this.mapLoc + 1)
			) 
		})
	}
	collapse(tile) {
		if(paused) return
		this.findNeighbors()
		this.collapsed = true;
		this.collapsedTile = tile;
		fill(150, 150, 150)
		rect((this.mapLoc % DIMWidth) * pixelDIM, Math.floor(this.mapLoc / DIMHeight) * pixelDIM, pixelDIM, pixelDIM)
		image(this.collapsedTile.img, (this.mapLoc % DIMWidth) * pixelDIM, Math.floor(this.mapLoc / DIMHeight) * pixelDIM)
		for(var i = 0; i < this.neighbors.length; i++) {
			this.neighbors[i].cell.calculateEntropy();
		}
	}
	randomCollapse() {
		if(paused) return
		this.calculateEntropy();
		var randomTile = Math.floor(random() * this.allowedStates.length)
		this.collapse(this.allowedStates[randomTile])
	}
}

class Tile {
	constructor(img, edges, id, shouldRotate) {
		this.id = id;
		this.img = img;
		this.shouldRotate = shouldRotate;
		this.edges = edges;
	}
	rotate(num) {
		var img = createGraphics(pixelDIM, pixelDIM);
		img.imageMode(CENTER);
		img.translate(pixelDIM / 2, pixelDIM / 2)
		img.rotate(HALF_PI * num);
		img.image(this.img, 0, 0);
		
		var newEdges = [];
		for(var i = 0; i < this.edges.length; i++) {
			newEdges[i] = this.edges[(i - 3 * num + this.edges.length) % this.edges.length]
		}

		return new Tile(img, newEdges, tiles.length);
	}
}

function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  return arr1.every((element, index) => element === arr2[index]);
}
function generate() {
	localStorage.setItem('mode', document.getElementById('style').value);
	localStorage.setItem('size', document.getElementById('size').value);
	location.reload()
}