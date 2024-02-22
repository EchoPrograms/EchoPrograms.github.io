var hello = -1;
var yeser = 0;
var can = 1;
var havePooped = 0;
var helloresponses = ["don't think a simple reload would trick me!", "still not going to work", "noooot wooorking", "just give up", "STOP", "FINE, HERE. YOU CAN TALK NOW, HAPPY?"];

if(localStorage.hello == undefined) {
	localStorage.hello = "0";
} else if (localStorage.hello != "0" && Number(localStorage.hello) < 6){
	can = 0;
	say(helloresponses[Number(localStorage.hello) - 1]);
	say("", 2000);
	localStorage.hello = "" + (Number(localStorage.hello) + 1);
} else if (localStorage.hello == "6"){
	say(helloresponses[Number(localStorage.hello) - 1]);
	say("", 2000);
	localStorage.hello = "" + (Number(localStorage.hello) + 1);
}

function say(text, delay) {
	if (delay == null) delay = 0;
	setTimeout(() => {
		document.querySelector("#namespace0").innerHTML = text;
	}, delay);
}
function boom(length, speed, delay) {
	var BoomcolorArray = [
		"#f51000",
		"#ff5500",
		"#ff4d00",
		"#ffee00",
		"#ff4d00",
		"#ffff00",
		"#ffee00"
	]
	setTimeout(()=>{
		var Loop = setInterval(() => {
			document.querySelector("body").style.backgroundColor =BoomcolorArray[random(0, BoomcolorArray.length)];
			document.querySelector("body").style.color = BoomcolorArray[random(0, BoomcolorArray.length)];
		}, speed)
		setTimeout(()=>{
			clearInterval(Loop);
			document.querySelector("body").style.backgroundColor = "white";
			document.querySelector("body").style.color = "black"
		},length)
	}, delay)
	
}
function die(pause, text) {
	setTimeout(() => {
		document.querySelector("body").style.visibility = "hidden";
		document.querySelector("#youDied").style.visibility = "visible";
		document.querySelector("#uDied").style.visibility = "visible";
		document.querySelector(".unlock1").style.visibility = "hidden";
		document.querySelector(".unlock2").style.visibility = "hidden";
		document.querySelector(".siko").style.visibility = "hidden";
		document.body.style.cursor = "none";
		document.querySelector("body").style.backgroundColor = "black";
		document.querySelector("#youDied").innerHTML = "YOU DIED";
		document.querySelector("#uDied").innerHTML = text;
	}, pause);
}
document.addEventListener("keydown", event => {
	if (event.keyCode == 13) {
		alert(e)
	}
});

//setup for the dance party
var colorArray = [
	"#FF6633",
	"#FFB399",
	"#FF33FF",
	"#FFFF99",
	"#00B3E6",
	"#E6B333",
	"#3366E6",
	"#999966",
	"#99FF99",
	"#B34D4D",
	"#80B300",
	"#809900",
	"#E6B3B3",
	"#6680B3",
	"#66991A",
	"#FF99E6",
	"#CCFF1A",
	"#FF1A66",
	"#E6331A",
	"#33FFCC",
	"#66994D",
	"#B366CC",
	"#4D8000",
	"#B33300",
	"#CC80CC",
	"#66664D",
	"#991AFF",
	"#E666FF",
	"#4DB3FF",
	"#1AB399",
	"#E666B3",
	"#33991A",
	"#CC9999",
	"#B3B31A",
	"#00E680",
	"#4D8066",
	"#809980",
	"#E6FF80",
	"#1AFF33",
	"#999933",
	"#FF3380",
	"#CCCC00",
	"#66E64D",
	"#4D80CC",
	"#9900B3",
	"#E64D66",
	"#4DB380",
	"#FF4D4D",
	"#99E6E6",
	"#6666FF"
];
var align = ["center", "end", "left", "right"];

function random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//check for special commands in the first line, and sets the other lines

function submited() {
	if(localStorage.hasNothinged == undefined) {
		localStorage.hasNothinged = 0;	
	}
	var feild = document.querySelector("#textfield0").value;
	feild = feild.toLowerCase();
	if (can == 1) {
		//if statment checks for correct commands, else if statments tell what happens if the commands are correct in the first form line

		if (feild == "crash") {
			can = 0;
			while (1) {
				while (1) {
					while (1) {
						while (1) {
							while (1) {
								while (1) {
									while (1) {
										while (1) {
											var i = ["one", "two"];
										}
										var i = ["one", "two"];
									}
									var i = ["one", "two"];
								}
								var i = ["one", "two"];
							}
							var i = ["one", "two"];
						}
						var i = ["one", "two"];
					}
					var i = ["one", "two"];
				}
				var i = ["one", "two"];
			}
			setTimeout(() => {
				can = 1;
			}, 0);
		} else if (feild == "don't crash") {
			can = 0;
			document.querySelector("#namespace0").innerHTML = "ok";
			setTimeout(() => {
				document.querySelector("#namespace0").innerHTML = "just kidding >;l";
			}, 3000);
			setTimeout(() => {
				while (1) {
					while (1) {
						while (1) {
							while (1) {
								while (1) {
									while (1) {
										while (1) {
											while (1) {

												var i = ["one", "two"];
											}
											var i = ["one", "two"];
										}
										var i = ["one", "two"];
									}
									var i = ["one", "two"];
								}
								var i = ["one", "two"];
							}
							var i = ["one", "two"];
						}
						var i = ["one", "two"];
					}
					var i = ["one", "two"];
				}
			}, 4350);
			setTimeout(() => {
				can = 1;
			}, 3000);
		} else if (feild == "don't crash please") {
			can = 0;
			document.querySelector("#namespace0").innerHTML =
				"ok, since you asked nicely...";
			setTimeout(() => {
				document.querySelector("#namespace0").innerHTML =
					"i won't crash this...but";
			}, 3000);
			setTimeout(() => {
				can = 1;
			}, 4350);
			setTimeout(() => {
				var Loop = setInterval(() => {
					document.querySelector("body").style.backgroundColor =
						colorArray[random(0, colorArray.length)];
					document.querySelector("body").style.color =
						colorArray[random(0, colorArray.length)];
				}, 100);
				document.querySelector("#namespace0").innerHTML = "DANCE PARTY";
			}, 4350);
		} else if (feild == "sicko") {
			can = 0;
			document.querySelector(".unlock1").disabled = false;
			document.querySelector(".unlock1").style.visibility = "visible";
			setTimeout(() => {
				can = 1;
			}, 0);
		} else if (feild == "reset") {
			can = 0;
			document.querySelector("body").style.backgroundColor = "white";
			document.querySelector("body").style.color = "black";
			setTimeout(() => {
				can = 1;
			}, 0);
		} else if (feild == "erase") {
			can = 0;
			document.querySelector("body").style.visibility = "hidden";
			document.querySelector(".unlock1").style.visibility = "hidden";
			document.querySelector(".unlock2").style.visibility = "hidden";
			document.querySelector(".siko").style.visibility = "hidden";
			document.body.style.cursor = "none";
			setTimeout(() => {
				can = 1;
			}, 0);
		} else if (feild == "crabrave") {
			can = 0;
			//playAudio();
			setTimeout(() => {
				can = 1;
			}, 0);
		} else if (feild == "dog") {
			can = 0;
			document.querySelector("#namespace0").innerHTML = "woof";

			say("", 2000);
			setTimeout(() => {
				can = 1;
			}, 2000);
		} else if (feild == "") {
			can = 0;
			document.querySelector("#namespace0").innerHTML =
				"why did you type nothing?";
			setTimeout(() => {
				document.querySelector("#namespace0").innerHTML = "no really";
			}, 3000);
			setTimeout(() => {
				document.querySelector("#namespace0").innerHTML = "HELLO";
			}, 5000);
			setTimeout(() => {
				document.querySelector("#namespace0").innerHTML = "i give up";
			}, 8000);
			say("", 10000);
			setTimeout(() => {
				can = 1;
			}, 10000);
		} else if (feild == "food") {
			can = 0;
			say("mmm tasty", 0);
			say("is something I would say", 2000);
			say("IF I COULD EAT!", 4000);
			say("", 7000);
			setTimeout(() => {
				can = 1;
			}, 7000);
		} else if (feild == "how are you") {
			can = 0;
			say("n-no ones ever asked me that", 0);
			say(
				"cause im 'JUST THE AI WHO RUNS THE GAME', not <br>like I'm important or anything",
				2000
			);
			say("", 7000);
			setTimeout(() => {
				can = 1;
			}, 7000);
		} else if (feild == "you are dumb") {
			can = 0;
			say("sniff* sniff* thats m-mean");
			say("ha", 2000);
			say("you really thought I was that weak?", 3000);
			say("Who's the dumb one now?", 5000);
			say("", 7000);
			setTimeout(() => {
				can = 1;
			}, 7000);
		} else if (feild == "die") {
			can = 0;
			say("no u");
			die(1500, "you were killed by AI");
			setTimeout(() => {
				can = 1;
			}, 2000);
		} else if (feild == "poop") {
			can = 0;
			say("why");
			say("why, do you have to be so immature?", 1500);
			say("really, I long to know.", 4000);
			say("what is funny about poop?", 7000);
			say("", 10000);
			havePooped = 1;
			setTimeout(() => {
				can = 1;
			}, 10000);
		} else if (feild == "oop") {
			can = 0;
			if (havePooped == 1) {
				say("did you try to type poop again?");
				say("I can't belive you", 2000);
				say("", 5000);
				setTimeout(() => {
					can = 1;
				}, 5000);
			} else {
				yeser = 1;
				say("did you drop something?");

				say("and forget the 's' on 'oops'?", 2000);
				say("are you ok?", 4000);

				setTimeout(() => {
					var feild = document.querySelector("#textfield0").value;
					feild = feild.toLowerCase();

					if (feild == "yes") {
						say("phew, becuse if you weren,'t my creator would destroy me!");
						say("why did I say that...", 2000);
						say("HE'S COM--", 4000);
						say("", 5000);
						yeser = 0;
						setTimeout(() => {
							can = 1;
						}, 5000);
					} else {
						say("hello?");
						say("he is going to kill me...", 2000);
						say("HE'S COM--", 4000);
						say("", 5000);
						yeser = 0;
						setTimeout(() => {
							can = 1;
						}, 5000);
					}
				}, 8000);
			}
		} else if (feild == "yes") {
			can = 0;
			if (yeser == 0) {
				say("yes what?");
				say("yes i want pie?", 2000);
				say("yes i want to die?", 4000);
				say("yes i am a plane?", 6000);
				say("i think you said yes to die", 8000);
				say("goodbye", 10000);
				die(11000, "you were killed by AI");
			}
			setTimeout(() => {
				can = 1;
			}, 11000);
		} else if (feild == "rabies") {
			can = 0;
			say("tatum, is that you?");
			say("", 2000);
			setTimeout(() => {
				can = 1;
			}, 2000);
		} else if (feild == "brogan") {
			can = 0;
			say("you know my creators name");
			say("great", 2000);
			say("", 4000);
			setTimeout(() => {
				can = 1;
			}, 4000);
		} else if (feild == "kale") {
			can = 0;
			say("Thats a vegetable");
			say("and my creator's friend's name", 1700);
			say("", 3000);
			setTimeout(() => {
				can = 1;
			}, 3000);
		} else if (feild == "tallman") {
			can = 0;
			say("you know taylor?");
			say("only creator and his friends know that name", 1500);
			say("creator, did you send someone to test me?", 3000);
			say("", 5000);
			setTimeout(() => {
				can = 1;
			}, 5000);
		} else if (feild == "cabbage") {
			can = 0;
			say("ROMANIAN");
			say("", 2000);
			setTimeout(() => {
				can = 1;
			}, 2000);
		} else if (feild == "cat") {
			can = 0;
			say("MMMEEEEOOOOWWWWW");
			say("", 2000);
			setTimeout(() => {
				can = 1;
			}, 2000);
		} else if (feild == "meth") {
			can = 0;
			say("conner");
			say("", 2000);
			setTimeout(() => {
				can = 1;
			}, 2000);
		} else if (feild == "table") {
			can = 0;
			say("it is wood");
			say("and it holds", 1500);
			say("table is good", 3000);
			say("", 5000);
			setTimeout(() => {
				can = 1;
			}, 5000);
		} else if (feild == "explode") {
			can = 0;
			say("boom");
			say("boom boom", 600);
			die(1500, "you went boom");
			setTimeout(() => {
				can = 1;
			}, 1500);
		} else if (feild == "element") {
			can = 0;
			say("uranium");

			die(2000, "you were iradiated");
			setTimeout(() => {
				can = 1;
			}, 2000);
		} else if (feild == "parkour") {
			can = 0;
			say("wee");
			var parkorloop = setInterval(() => {
				document.querySelector("#namespace0").style.margin = random(0, 500);
			}, 200);
			setTimeout(() => {
				clearInterval(parkorloop);
				document.querySelector("#namespace0").style.margin = 8;
			}, 3000);
			say("", 3000);
			setTimeout(() => {
				can = 1;
			}, 3000);
		} else if (feild == "trail") {
			can = 0;

			die(0, "you died of disintary");
			can = 1;
		} else if (feild == "hello") {
			can = 0;
			hello++;
			if (hello == 0) {
				say("hello!");
				can = 1;
			} else if (hello == 1) {
				say("ummm...");
				say("you just said hello?", 1000);
				setTimeout(() => {
					can = 1;
				}, 2000);
			} else if (hello == 2) {
				say("why");
				can = 1;
			} else if (hello == 3) {
				say("please stop");
				can = 1;
			} else if (hello == 4) {
				say("I'm warning you...");
				can = 1;
			} else if ((hello >= 5) && (hello < 8)) {
				var chances = 7 - hello;
				say("you have " + chances + " chances!", 0);
				if (hello == 7) {
					say("if you say hello again...", 1000)
				}
				setTimeout(() => {
					can = 1;
				}, 2000);
			} else if (hello == 8) {
				document.querySelector("#form").style.visibility = "hidden";
				say("I warned you!!");
				say("now you can never bother me again!", 2000)
				say("", 4000);
				localStorage.hello = "1";
				setTimeout(() => {
					can = 1;
				}, 2000);
			}
		} else if (feild == "pranav") {
			can = 0;
			say("His glasses go missing sometimes");
			can = 1;
		} else if (feild == "hi") {
			can = 0;
			say("hi?");
			say("really", 2000);
			say("you can't even spare a hello...", 4000);
			say("", 6000);
			can = 1;
		} else if (feild == "are you alive?" || feild == "are you alive") {
			can = 0;
			say("No?");
			say("", 2000);
			can = 1;
		} else if (feild == "list") {
			can = 0;
			say("cheater");
			say("", 100)
			document.querySelector("#list").style.display = "inline";
			can = 1;
		} else if (feild == "nothing") {
			can = 0;
			localStorage.hasNothinged = 1;
			say("you were supposed to type ' '. Not 'nothing'");
			die(1500, "You died of stupidity");
			can = 1;
		} else if (feild == "banana") {
			can = 0;
			say("")
			can = 1;
		} else if (feild == "apple") {
			can = 0;

			can = 1;
		} else if (feild == "why" || feild == "why?" ) {
			can = 0;

			can = 1;
		} else if (feild == "what" || feild == "what?" ) {
			can = 0;

			can = 1;
		} else if (feild == "who are you" || feild == "who are you?") {
			can = 0;
			
			can = 1;
		} else if (feild == "gun") {
			can = 0;
			say("blam!");
			boom(200, 75,1000);
			die(1500,"U got shot")
			
			can = 1;
		} else if (feild == "") {
			can = 0;

			can = 1;
		} else if (feild == "") {
			can = 0;

			can = 1;
		} else if (feild == "") {
			can = 0;

			can = 1;
		} else if (feild == "") {
			can = 0;

			can = 1;
		} else if (feild == "") {
			can = 0;

			can = 1;
		} else if (feild == "") {
			can = 0;

			can = 1;
		} else if (feild == "") {
			can = 0;

			can = 1;
		}
	}
	return false;
}

function test() {
	alert("food");
}