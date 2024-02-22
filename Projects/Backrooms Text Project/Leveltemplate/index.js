var noClipLocation = "Levelfun"; // set equal to the noclip level folder
var noClipAbility = 0; // set 0-100 for chance to noclip
var noClipVoidChance = 0;
var noClipDeathChance = 0;
var noClipInARowDeath = 5;
var noClipAtempts = 0;
var consecutiveNoClipAtempts = 0;

var inspectButton = document.querySelector("#inspect")
var interactButton = document.querySelector("#interact")
/* Syntax for adding actions:
 *	index: 1,
 *	indexInteract: 0,
 *	inspect: new Function("alert('INSPECT')"),
 *	interact: new Function("alert('INTERACT')"),
 *	inspectMessage: "Look closer",
 *	interactMessage: "Open"
 */
var actions = [
	{
		index: 0,
		indexInteract: 0
	}
]
var actionsLoop = [
	{
		//buffer, do not use
		index: 0,
		indexInteract: 0
	},
	{
		//starts here
		index: 0,
		indexInteract: 0
	}
]

var chanceToWanderToEnemy = 0; // set 0-100 for chance to wander and find an enemy
var wanderTimes = 0;
var wanderResponses = [""]
var wanderResLoop = [""]
var arrayLength = wanderResponses.length;
var wanderEnabled = true;
var wanderIsLoop = false;
var wanderIndex = 0;

var isFriendly;
var enemyName;
var enemyHealth;
var enemyTime;
var youDiedMessage = "";
var enemyFindMessage = "";
var enemyEscapeMessage = "";
var enemyFriendlyMessage = "";
var hasBeenFriendly = false;
var hasBeenFriendlyMessage = "";
var chanceToBeFriendly;

var canInteract = false;
var canInspect = false;

var fightTime = 0;
var fightClicks = 0;
var fightKill = false;

var canSleep =  false;
var sleepLast = 0;
var wanderBetweenSleep = 5;

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

function die(message) {
	document.querySelector("#alive").style.display = "none";
	document.querySelector("#encounter").style.display = "none";
	document.querySelector("#dead").style.display = "block";
   document.querySelector("#deathMessage").innerHTML = message;
	setTimeout(()=>{window.location.reload(false)}, 7000);
}

function noClip() {
	if(consecutiveNoClipAtempts < noClipInARowDeath) {
		noClipAtempts++;
		consecutiveNoClipAtempts++;
	  if(noClipAbility <= getRandomInt(0,100)) {
			if(noClipVoidChance >= getRandomInt(0,100)) {
				document.querySelector("#nextLink").href = "../Void/index.html";
				document.querySelector("#nextLink").click();
			} else {
				if(noClipDeathChance >= getRandomInt(0,100))
				{
					die("You no-cliped alright...you just did it into a wall...")
				} else {
					say("Nothing Happens")
				}
			}
	  } else {
			document.querySelector("#nextLink").href = "../"+ noClipLocation +"/index.html";
			document.querySelector("#nextLink").click();
	  }
	} else {
		die("You slammed yourself in the wall so many times you got a concussion and brain damage, causing your death")
		setTimeout(()=>{window.location.reload(false)}, 7000);
	}
}
function sleep() {
	if(wanderTimes >= sleepLast + wanderBetweenSleep)
	{
		canSleep = true;
		sleepLast = wanderTimes;
	}
   if(canSleep) {
		say("You wake up refreshed")
		consecutiveNoClipAtempts = 0;
		canSleep = false;
	}else {
		say("You aren't tired")
		
	}
}
function wander() {	
	if(wanderEnabled) {
		if(chanceToWanderToEnemy > getRandomInt(0, 100)) {
			//bad things
			consecutiveNoClipAtempts = 0;
			startEntity(isFriendly, enemyName, enemyHealth, enemyTime, youDiedMessage, enemyFindMessage, enemyFriendlyMessage, enemyEscapeMessage, hasBeenFriendlyMessage, chanceToBeFriendly);
		} else {
			consecutiveNoClipAtempts = 0
			//other things
			if(wanderTimes >= wanderResponses.length) {
				wanderIsLoop = true;
				actions = actionsLoop;
			}
			if(wanderIsLoop != true) {
				say(wanderResponses[wanderIndex])
			} else {
				say(wanderResLoop[wanderIndex])
				arrayLength = wanderResLoop.length;
			}
			if(wanderIndex >= arrayLength - 1)
			{
				wanderIndex = 0;
			} else {
				wanderIndex++;
			}

		}
		
		wanderTimes++;
	}
}
function inspect() {
	actions[wanderIndex].inspect();
}
function interact() {
	actions[wanderIndex].interact();
}
setInterval(()=>{
	if(actions[wanderIndex].index == 1) {
		inspectButton.innerHTML = "Inspect <br>" + actions[wanderIndex].inspectMessage;
		canInspect = true;
		
	} else {
		inspectButton.innerHTML = "Inspect";
		canInspect = false;
	}
	if(actions[wanderIndex].indexInteract == 1) {
		interactButton.innerHTML = "Interact <br>" + actions[wanderIndex].interactMessage;
		canInteract = true;
	} else {
		interactButton.innerHTML = "Interact";
		canInteract = false;
	}
	if(canInspect){
		document.querySelector("#inspect").disabled = false;
	}else
	{
		document.querySelector("#inspect").disabled = true;
	}
	if(canInteract){
		document.querySelector("#interact").disabled = false;
	}else
	{
		document.querySelector("#interact").disabled = true;
	}
},100)

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