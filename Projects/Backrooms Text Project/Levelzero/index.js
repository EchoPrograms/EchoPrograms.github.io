var noClipLocation = "Levelone"; // set equal to the noclip level folder
var noClipAbility = 13; // set 0-100 for chance to noclip
var noClipVoidChance = 3;
var noClipDeathChance = 5;
var noClipInARowDeath = 6;
var noClipAtempts = 0;
var consecutiveNoClipAtempts = 0;

var chanceToWanderToEnemy = 10; // set 0-100 for chance to wander and find an enemy
var wanderTimes = 0;
var wanderResponses = ["You walk through the endless yellow rooms, and they begin to blend together.","As you wander, the walls begin to seem almost comforting.", "You pass by countless rooms, all the same. Soggy carpet, buzzing lights, yellow walls.", "The buzzing is engrained in your mind as you continue to wander.", "The passages just keep going, endlessly", "You stumble upon a room, larger than the rest, but you just keep walking","You think you see a human down a long hallway, and you call out to him, but he<br> disapears around a corner, you try to follow him, but all that remained of the passage was a smooth wall"]
var wanderReapeatResponses = ["The rooms keep coming and coming.", "As you treck, you wonder if there is a way out.", "There are more and more rooms, all the same.", "More yellow. And buzzing.", "Only the dimensions	 of the rooms change, never anything else.", "You wander, and wander, and wander.", "Wandering wandering, yellow yellow, buzz buzz."]
var arrayLength = wanderResponses.length;
var addToResIndex = 0;
var wanderEnabled = true;

var isFriendly = false;
var enemyName = "Hound";
var enemyHealth = 15;
var enemyTime = 2;
var youDiedMessage = "You try and run, but it is inhumanly fast, and even though it looks thin and malnourished, it easily jumps <br>onto you and bites your arm. Strangely that is all it does. <br>It hops of of you and it leaves, and you go on your way. "+ getRandomInt(20,25) +" minutes later, you begin to vomit <br>and feel light headed. The symptoms worsen for " +getRandomInt(20, 30) + " minutes, then you gradually <br>turn into one of them. You lose all sense of consciousness and become completely feral."
var enemyFindMessage = "You see a thin disfigured humnioid on all fours slowly aproching you.<br> It has long black hair covoring its face.";
var enemyEscapeMessage = "You threw your arms up and yelled, trying to intimate it, and it wimpered back and ran.";
var enemyFriendlyMessage = "You hear a growl around the next corner, so you hide. <br>The growls receed, and you quietly run in the other direction.";
var hasBeenFriendly = false;
var hasBeenFriendlyMessage = "You hear the same growl, so you know what to do. Hide then run."
var chanceToBeFriendly = 30;

var canInteract = false;
var canInspect = false;

var fightTime = 0;
var fightClicks = 0;
var fightKill = false;

var canSleep =  false;
var sleepLast = 0;
var wanderBetweenSleep = 5;

var previousMessage = "";

var rareResponseChance = 400; 
var rareResponse = "You here a song playing in the distance, but it is too quiet to make out. You head toward it, and it begins to get louder. You begin to make out the words 'never gonna give you up, never gonna let you dooown'"

var rareEntityChance = 100;

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
		die("You slammed yourself in the wall so many times you got a concussion and brain damage, causing your death.")
	
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
			if(1 < getRandomInt(0, rareEntityChance))
			{
				consecutiveNoClipAtempts = 0;
				startEntity(isFriendly, enemyName, enemyHealth, enemyTime, youDiedMessage, enemyFindMessage, enemyFriendlyMessage, enemyEscapeMessage, hasBeenFriendlyMessage, chanceToBeFriendly);
			} else {
				startEntity(false, "3RR0r", 998753254899809974968896487652296745356, 0, "!(*#5(%!hf!^#(^371gh387", "IO:87%^&456ED4#e656", "*!&IJ8&TgyuG%^#dut", "How did you escape? Cheater.", "JKHo7%^rfhfTYe6#GH^7", 0, "J(Y)(*Y!HUS*)&Q*");
				document.querySelector("#deathHead").innerHTML = "!@*&4dhJKH*(h&I!(&134";
			}
		} else {
			consecutiveNoClipAtempts = 0
			//other things
			if(wanderTimes <= wanderResponses.length) {
				say(wanderResponses[wanderTimes - addToResIndex])
			}else {
				say(wanderReapeatResponses[wanderTimes - addToResIndex])
				arrayLength = wanderReapeatResponses.length;
			}
			if(1 >= getRandomInt(1, rareResponseChance))
			{
				say(rareResponse)
				wanderEnabled = false;
				setTimeout(()=>{die("You got rickrolled lol")}, 7000)
			}
			if(wanderTimes - addToResIndex >= arrayLength - 1)
			{
				addToResIndex += arrayLength;
			}
			wanderTimes++;
			document.querySelector("#wanderCount").innerHTML = "Wanders: " + wanderTimes;

		}
	}
}
function inspect() {
	//unique for every level
}
function interact() {
	//unique for every level
}
setInterval(()=>{
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