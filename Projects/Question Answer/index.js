let root = document.documentElement;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


document.addEventListener("click", ()=>{
	var originX = getRandomInt(0, 1000);
	var originY = getRandomInt(0, 1000);
	root.style.setProperty('--top-one',  originY + "px");
	root.style.setProperty('--left-one',  originX + "px");
	root.style.setProperty('--top-five',  originY + "px");
	root.style.setProperty('--left-five',  originX + "px");

	root.style.setProperty('--top-two',  getRandomInt(0, 1000)+ "px");

	root.style.setProperty('--top-three',  getRandomInt(0, 1000)+ "px");

	root.style.setProperty('--top-four',  getRandomInt(0, 1000)+ "px");

	root.style.setProperty('--left-two',  getRandomInt(0, 1000)+ "px");

	root.style.setProperty('--left-three',  getRandomInt(0, 1000)+ "px");

	root.style.setProperty('--left-four',  getRandomInt(0, 1000)+ "px");

	root.style.setProperty('--speed',  getRandomInt(1, 10)+ "s");
})