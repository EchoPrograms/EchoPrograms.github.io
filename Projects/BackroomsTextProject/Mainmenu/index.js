var noClipLocation = "Levelzero"; // set equal to the noclip level folder

var fightTime = 0;
var fightClicks = 0;
var fightKill = false;

var previousMessage = "";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function say(message) {
	if(message != previousMessage) {
		document.querySelector("#outputText").innerHTML = message;
	} else {
		document.querySelector("#outputText").classList.add("runTextBold");
		setTimeout(()=>{document.querySelector("#outputText").classList.remove("runTextBold")}, 10)
	}
	previousMessage = message;
}


function noClip() {

	document.querySelector("#nextLink").href = "../"+ noClipLocation +"/index.html";
	document.querySelector("#nextLink").click();

}

function startEntity(friendly, name, clicks, time, deathMessage, foundMessage, friendlyMessage, escapeMessage, hasBeenFriendMessage, chanceToBeFriend) {
	
	if(friendly || chanceToBeFriend > getRandomInt(0, 100))
	{
		
		if(hasBeenFriendly != true) {
			say(friendlyMessage)
		} else {
			say(hasBeenFriendMessage)
		}
		hasBeenFriendly = true;	
	} else {
		document.querySelector("#entityMessage").innerHTML = foundMessage;
		document.querySelector("#entityName").innerHTML = name;
		document.querySelector("#clicks").innerHTML = "Clicks: " + fightClicks + "/" + clicks;
		fightTime = time + 1;
		if(fightTime <= 0) { 
				
				fightClicks = 0;
				fightKill = true;
				clearInterval(timeLoop);
				clearInterval(clickLoop);
				
				die(deathMessage)
			}
			fightTime--;
			document.querySelector("#time").innerHTML = "Time: " + fightTime;
		if(fightKill != true) {
			document.querySelector("#alive").style.display = "none";
		  	document.querySelector("#encounter").style.display = "block";
		}
		
		var timeLoop = setInterval(()=>{
			if(fightClicks > 0) {
				if(fightTime <= 0) { 
					fightClicks = 0;
					fightKill = true;
					clearInterval(timeLoop);
					clearInterval(clickLoop);
					die(deathMessage)
				}
				fightTime--;
				
			}
			document.querySelector("#time").innerHTML = "Time: " + fightTime;
			if(fightKill != true) {
				document.querySelector("#alive").style.display = "none";
				document.querySelector("#encounter").style.display = "block";
			}
		}, 1000)
		
		var clickLoop = setInterval(()=>{
			document.querySelector("#clicks").innerHTML = "Clicks: " + fightClicks + "/" + clicks;
			if(fightClicks > 0) {
				if(fightClicks >= clicks) {
					say(escapeMessage)
					fightClicks = 0;
					if(fightKill != true) {
						document.querySelector("#alive").style.display = "block";
						document.querySelector("#encounter").style.display = "none";
						clearInterval(timeLoop);
						clearInterval(clickLoop);
					}
				}
				
			}
		}, 50)
	}
	

}

function fight() {
	fightClicks++;
}


//======================for main menu==========================================


var tutorialExposed = false;
var tutorialDiv = document.querySelector(".tutorial");

function tutorial() {
	if(tutorialExposed == false)
	{
		tutorialDiv.style.display = "block";
		tutorialExposed = true;	 
	} else {
		tutorialDiv.style.display = "none";
		tutorialExposed = false;
	}
}

document.querySelector("#letterFive").addEventListener("click", ()=>{

	document.querySelector("#letterOne").style.color = "green"
	document.querySelector("#letterOne").style.fontSize = 50 + "px";
	setTimeout(()=>{
		document.querySelector("#letterTwo").style.color = "green"
		document.querySelector("#letterTwo").style.fontSize = 50 + "px";
	}, 700)
	setTimeout(()=>{
		document.querySelector("#letterThree").style.color = "green"
		document.querySelector("#letterThree").style.fontSize = 50 + "px";
	}, 1400)
	setTimeout(()=>{
		document.querySelector("#letterFour").style.color = "green"
		document.querySelector("#letterFour").style.fontSize = 50 + "px";
	}, 2100)
	setTimeout(()=>{
		document.querySelector("#letterFive").style.color = "green"
		document.querySelector("#letterFive").style.fontSize = 50 + "px";
	}, 2800)
	setTimeout(()=>{
		document.querySelector("#letterSix").style.color = "green"
		document.querySelector("#letterSix").style.fontSize = 50 + "px";
		setTimeout(()=>{
			document.querySelector(".tutorial").style.color = "green";
			document.querySelector(".tutorial").style.borderColor = "green";
		}, 1000)
		setTimeout(()=>{
			document.querySelector(".tutorial").classList.add("fadeToBlack");
			document.querySelector("#letters").classList.add("fadeToBlack");
		}, 2000)

	}, 3500)
	setTimeout(()=>{
		document.querySelector("#secret").style.display = "block";
		document.querySelector("#secret").style.textAlign = "center";
		document.querySelector("#secret").style.width = "5%";
		document.querySelector("#secret").classList.add("tutorial");
		document.querySelector(".tutorial").style.display = "none";
		document.querySelector("#letters").style.display = "none";
		document.querySelector(".tutorial").classList.remove("fadeToBlack")
		document.querySelector("#letters").classList.remove("fadeToBlack")
	}, 6500)



});




