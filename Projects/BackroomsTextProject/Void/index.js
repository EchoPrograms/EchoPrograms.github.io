var floatText = ["You float in darkeness", "You stiill float", "still floating", "I wonder what you're doing right now? Oh right. You're floating", "STILL FLOATING", "I am running out of ways to say YOU ARE STILL FLOATING", "Do you see that black box up there? ^^ THAT IS ALL YOU SEE OR EVER WILL SEE", "YOU. ARE. STILL. FLOATING.", "HHMMMMMM? I thing you <i>might</i> still be floating", "You", "Are", "Still", "Fl07|nG","Er703","3RRo1","e77@v","ett&^","@*#^^#", "!*^$%!*&", "!&(*^!)*", "&*#^%!#", "!*^%F!@", "!*&($^#!", "%@&#%!", ":8^%@"]
var secret = [
	{place: 40, content: "!(*&@!)(#*&!^$@!!(*&@!)(#*&!^$@!!(*&@!)(#*&!^$@!<br>!(*&@!)(#*&!^$@! ||| <b><i>FR33 U$</i></b> ||| #&!@^$*&!@^@!(*#&<br>!(*&@!)(#*&!^$@!!(*&@!)(#*&!^$@!!(*&@!)(#*&!^$@!", shouldShake: true},
	{place: 60, content: "!(*&@!)(#*&!^$@!!(*&@!)(#*&!^$@!!(*&@!)(#*&!^$@!<br>!(*&@!)(#*&!^$@! ||| <b><i>WHIL3 L3ARNING CL!CK V</i></b> ||| #&!@^$*&!@^@!(*#&<br>!(*&@!)(#*&!^$@!!(*&@!)(#*&!^$@!!(*&@!)(#*&!^$@!", shouldShake: true},
	{place: 10000, content: "Achivment Earned: 'How did we get here?'", shouldShake: false}
]

var secretIndex = -1;
var unrepeatI = 0;
var i = 0;
function float() {
	say(secretRunner())	
	if(i >= floatText.length-1)
	{
		i -= 7;
		
	} else
	{
		i++;
		unrepeatI++;
	}
}
function secretRunner() {
	if(secret[secretIndex + 1].place == unrepeatI)
	{
		secretIndex++;
		if(secret[secretIndex].shouldShake) {
			document.querySelector("body").classList.add("shake");
		}
		return secret[secretIndex].content;
	} else {	
		document.querySelector("body").classList.remove("shake");
		return floatText[i];
		
	}
}
function say(message) {
	document.querySelector("#outputText").innerHTML = message;
}
