var keys = document.querySelectorAll("td");
var textBox = document.querySelector("#textBox");
var currentLayout = 0;
var event;	
	var isFirefox = typeof InstallTrigger !== 'undefined';
if(!isFirefox) {	
var layouts = [
	{layout:[{symbols:[
					{name:"ali", colorClass:"none", clickIndex: 1}, 
					{name:"en", colorClass:"none", clickIndex: 2}, 
					{name:"ike", colorClass:"none", clickIndex: 3}]},{

				symbols:[
					{name:"jan", colorClass:"none", clickIndex: 4}, 
					{name:"kama", colorClass:"none", clickIndex: 5}, 
					{name:"la", colorClass:"none", clickIndex: 6}]},{
	
				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"nimi", colorClass:"none", clickIndex: 8}, 
					{name:"o", colorClass:"none", clickIndex: 9}, 
					{name:"pi", colorClass:"none", clickIndex: 10}]},{
						
				symbols:[
					{name:"sina", colorClass:"none", clickIndex: 11}, 
					{name:"tawa", colorClass:"none", clickIndex: 12}, 
					{name:"utala", colorClass:"none", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"ali", colorClass:"word", clickIndex: 1}, 
					{name:"ale", colorClass:"wordVolTwo", clickIndex: 2}, 
					{name:"ike", colorClass:"none", clickIndex: 3}]},{

				symbols:[
					{name:"jan", colorClass:"none", clickIndex: 4}, 
					{name:"akesi", colorClass:"word", clickIndex: 5}, 
					{name:"alasa", colorClass:"word", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"anpa", colorClass:"word", clickIndex: 8}, 
					{name:"o", colorClass:"none", clickIndex: 9}, 
					{name:"apeja", colorClass:"wordVolTwo", clickIndex: 10}]},{
						
				symbols:[
					{name:"sina", colorClass:"none", clickIndex: 11}, 
					{name:"ante", colorClass:"word", clickIndex: 12}, 
					{name:"anu", colorClass:"word", clickIndex: 13}, 
					{name:"awen", colorClass:"word", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"ali", colorClass:"none", clickIndex: 1}, 
					{name:"en", colorClass:"word", clickIndex: 2}, 
					{name:"ike", colorClass:"none", clickIndex: 3}]},{

				symbols:[
					{name:"jan", colorClass:"none", clickIndex: 4}, 
					{name:"kama", colorClass:"none", clickIndex: 5}, 
					{name:"la", colorClass:"none", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"nimi", colorClass:"none", clickIndex: 8}, 
					{name:"o", colorClass:"none", clickIndex: 9}, 
					{name:"pi", colorClass:"none", clickIndex: 10}]},{
						
				symbols:[
					{name:"esun", colorClass:"word", clickIndex: 11}, 
					{name:"tawa", colorClass:"none", clickIndex: 12}, 
					{name:"utala", colorClass:"none", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"ali", colorClass:"none", clickIndex: 1}, 
					{name:"en", colorClass:"none", clickIndex: 2}, 
					{name:"ike", colorClass:"word", clickIndex: 3}]},{

				symbols:[
					{name:"ijo", colorClass:"word", clickIndex: 4}, 
					{name:"kama", colorClass:"none", clickIndex: 5}, 
					{name:"ilo", colorClass:"word", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"insa", colorClass:"word", clickIndex: 8}, 
					{name:"o", colorClass:"none", clickIndex: 9}, 
					{name:"pi", colorClass:"none", clickIndex: 10}]},{
						
				symbols:[
					{name:"sina", colorClass:"none", clickIndex: 11}, 
					{name:"tawa", colorClass:"none", clickIndex: 12}, 
					{name:"utala", colorClass:"none", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"jaki", colorClass:"word", clickIndex: 1}, 
					{name:"jelo", colorClass:"word", clickIndex: 2}, 
					{name:"ike", colorClass:"none", clickIndex: 3}]},{

				symbols:[
					{name:"jan", colorClass:"word", clickIndex: 4}, 
					{name:"kama", colorClass:"none", clickIndex: 5}, 
					{name:"la", colorClass:"none", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"nimi", colorClass:"none", clickIndex: 8}, 
					{name:"jo", colorClass:"word", clickIndex: 9}, 
					{name:"pi", colorClass:"none", clickIndex: 10}]},{
						
				symbols:[
					{name:"sina", colorClass:"none", clickIndex: 11}, 
					{name:"tawa", colorClass:"none", clickIndex: 12}, 
					{name:"utala", colorClass:"none", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"kala", colorClass:"word", clickIndex: 1}, 
					{name:"ken", colorClass:"word", clickIndex: 2}, 
					{name:"kili", colorClass:"wordTwo", clickIndex: 15}]},{

				symbols:[
					{name:"kijetesantakalu", colorClass:"wordVolTwo", clickIndex: 4}, 
					{name:"kama", colorClass:"word", clickIndex: 5}, 
					{name:"kulupu", colorClass:"word", clickIndex: 6}]},{

				symbols:[
					{name:"kalama", colorClass:"word", clickIndex: 7}, 
					{name:"kon", colorClass:"word", clickIndex: 8}, 
					{name:"ko", colorClass:"word", clickIndex: 9}, 
					{name:"kepeken", colorClass:"word", clickIndex: 10}]},{
						
				symbols:[
					{name:"kasi", colorClass:"word", clickIndex: 11}, 
					{name:"kute", colorClass:"word", clickIndex: 12}, 
					{name:"kule", colorClass:"word", clickIndex: 13}, 
					{name:"kiwen", colorClass:"word", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"lape", colorClass:"word", clickIndex: 1}, 
					{name:"len", colorClass:"wordTwo", clickIndex: 16}, 
					{name:"lili", colorClass:"wordTwo", clickIndex: 17}]},{

				symbols:[
					{name:"loje", colorClass:"word", clickIndex: 4}, 
					{name:"luka", colorClass:"word", clickIndex: 5}, 
					{name:"la", colorClass:"word", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"lukin", colorClass:"word", clickIndex: 8}, 
					{name:"lon", colorClass:"word", clickIndex: 9}, 
					{name:"lupa", colorClass:"word", clickIndex: 10}]},{
						
				symbols:[
					{name:"laso", colorClass:"word", clickIndex: 11}, 
					{name:"lete", colorClass:"word", clickIndex: 12}, 
					{name:"lipu", colorClass:"word", clickIndex: 13}, 
					{name:"lawa", colorClass:"word", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"mama", colorClass:"word", clickIndex: 1}, 
					{name:"meli", colorClass:"word", clickIndex: 2}, 
					{name:"mani", colorClass:"word", clickIndex: 3}]},{

				symbols:[
					{name:"mije", colorClass:"word", clickIndex: 4}, 
					{name:"moku", colorClass:"word", clickIndex: 5}, 
					{name:"moli", colorClass:"word", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"word", clickIndex: 7}, 
					{name:"mun", colorClass:"word", clickIndex: 8}, 
					{name:"monsi", colorClass:"wordTwo", clickIndex: 18}, 
					{name:"pi", colorClass:"none", clickIndex: 10}]},{
						
				symbols:[
					{name:"musi", colorClass:"word", clickIndex: 11}, 
					{name:"mute", colorClass:"word", clickIndex: 12}, 
					{name:"mu", colorClass:"word", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"nanpa", colorClass:"word", clickIndex: 1}, 
					{name:"nena", colorClass:"word", clickIndex: 2}, 
					{name:"nasin", colorClass:"word", clickIndex: 3}]},{

				symbols:[
					{name:"jan", colorClass:"none", clickIndex: 4}, 
					{name:"kama", colorClass:"none", clickIndex: 5}, 
					{name:"la", colorClass:"none", clickIndex: 6}]},{

				symbols:[
					{name:"namako", colorClass:"wordVolTwo", clickIndex: 7}, 
					{name:"nimi", colorClass:"word", clickIndex: 8}, 
					{name:"noka", colorClass:"word", clickIndex: 9}, 
					{name:"pi", colorClass:"none", clickIndex: 10}]},{
						
				symbols:[
					{name:"nasa", colorClass:"word", clickIndex: 11}, 
					{name:"tawa", colorClass:"none", clickIndex: 12}, 
					{name:"utala", colorClass:"none", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"ali", colorClass:"none", clickIndex: 1}, 
					{name:"en", colorClass:"none", clickIndex: 2}, 
					{name:"ike", colorClass:"none", clickIndex: 3}]},{

				symbols:[
					{name:"jan", colorClass:"none", clickIndex: 4}, 
					{name:"oko", colorClass:"wordVolTwo", clickIndex: 5}, 
					{name:"olin", colorClass:"word", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"ona", colorClass:"word", clickIndex: 8}, 
					{name:"o", colorClass:"word", clickIndex: 9}, 
					{name:"open", colorClass:"word", clickIndex: 10}]},{
						
				symbols:[
					{name:"sina", colorClass:"none", clickIndex: 11}, 
					{name:"tawa", colorClass:"none", clickIndex: 12}, 
					{name:"utala", colorClass:"none", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	},
	{

		layout:[{symbols:[
					{name:"pan", colorClass:"word", clickIndex: 1}, 
					{name:"pake", colorClass:"wordVolTwo", clickIndex: 2}, 
					{name:"pini", colorClass:"wordTwo", clickIndex: 19}]},{

				symbols:[
					{name:"jan", colorClass:"none", clickIndex: 4}, 
					{name:"pakala", colorClass:"word", clickIndex: 5}, 
					{name:"pali", colorClass:"word", clickIndex: 6}]},{

				symbols:[
					{name:"pimeja", colorClass:"word", clickIndex: 7}, 
					{name:"pana", colorClass:"word", clickIndex: 8}, 
					{name:"poka", colorClass:"wordTwo", clickIndex: 20}, 
					{name:"pi", colorClass:"word", clickIndex: 10}]},{
						
				symbols:[
					{name:"palisa", colorClass:"word", clickIndex: 11}, 
					{name:"tawa", colorClass:"none", clickIndex: 12}, 
					{name:"pu", colorClass:"word", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	},
	{
//===================================================================================================

		layout:[{symbols:[
					{name:"sama", colorClass:"word", clickIndex: 1}, 
					{name:"sewi", colorClass:"wordTwo", clickIndex: 21}, 
					{name:"sin", colorClass:"word", clickIndex: 3}]},{

				symbols:[
					{name:"sijelo", colorClass:"word", clickIndex: 4}, 
					{name:"sike", colorClass:"word", clickIndex: 5}, 
					{name:"suli", colorClass:"word", clickIndex: 6}]},{

				symbols:[
					{name:"seme", colorClass:"word", clickIndex: 7}, 
					{name:"sona", colorClass:"word", clickIndex: 8}, 
					{name:"suno", colorClass:"word", clickIndex: 9}, 
					{name:"sinpin", colorClass:"word", clickIndex: 10}]},{
						
				symbols:[
					{name:"sina", colorClass:"word", clickIndex: 11}, 
					{name:"sitelen", colorClass:"word", clickIndex: 12}, 
					{name:"suwi", colorClass:"wordTwo", clickIndex: 22}, 
					{name:"soweli", colorClass:"word", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"tan", colorClass:"word", clickIndex: 1}, 
					{name:"telo", colorClass:"word", clickIndex: 2}, 
					{name:"tonsi", colorClass:"wordVolTwo", clickIndex: 3}]},{

				symbols:[
					{name:"jan", colorClass:"none", clickIndex: 4}, 
					{name:"kama", colorClass:"none", clickIndex: 5}, 
					{name:"la", colorClass:"none", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"tenpo", colorClass:"word", clickIndex: 8}, 
					{name:"tomo", colorClass:"word", clickIndex: 9}, 
					{name:"pi", colorClass:"none", clickIndex: 10}]},{
						
				symbols:[
					{name:"taso", colorClass:"word", clickIndex: 11}, 
					{name:"tawa", colorClass:"word", clickIndex: 12}, 
					{name:"tu", colorClass:"word", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"ali", colorClass:"none", clickIndex: 1}, 
					{name:"en", colorClass:"none", clickIndex: 2}, 
					{name:"ike", colorClass:"none", clickIndex: 3}]},{

				symbols:[
					{name:"jan", colorClass:"none", clickIndex: 4}, 
					{name:"kama", colorClass:"none", clickIndex: 5}, 
					{name:"la", colorClass:"none", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"unpa", colorClass:"word", clickIndex: 8}, 
					{name:"o", colorClass:"none", clickIndex: 9}, 
					{name:"pi", colorClass:"none", clickIndex: 10}]},{
						
				symbols:[
					{name:"sina", colorClass:"none", clickIndex: 11}, 
					{name:"uta", colorClass:"word", clickIndex: 12}, 
					{name:"utala", colorClass:"word", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"wawa", colorClass:"word", clickIndex: 1}, 
					{name:"weka", colorClass:"word", clickIndex: 2}, 
					{name:"ike", colorClass:"none", clickIndex: 3}]},{

				symbols:[
					{name:"jan", colorClass:"none", clickIndex: 4}, 
					{name:"kama", colorClass:"none", clickIndex: 5}, 
					{name:"walo", colorClass:"word", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"wan", colorClass:"word", clickIndex: 8}, 
					{name:"o", colorClass:"none", clickIndex: 9}, 
					{name:"pi", colorClass:"none", clickIndex: 10}]},{
						
				symbols:[
					{name:"waso", colorClass:"word", clickIndex: 11}, 
					{name:"tawa", colorClass:"none", clickIndex: 12}, 
					{name:"utala", colorClass:"none", clickIndex: 13}, 
					{name:"wile", colorClass:"word", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"ali", colorClass:"none", clickIndex: 1}, 
					{name:"en", colorClass:"none", clickIndex: 2}, 
					{name:"kili", colorClass:"word", clickIndex: 3}]},{

				symbols:[
					{name:"jan", colorClass:"none", clickIndex: 4}, 
					{name:"kama", colorClass:"none", clickIndex: 5}, 
					{name:"la", colorClass:"none", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"kin", colorClass:"wordVolTwo", clickIndex: 8}, 
					{name:"o", colorClass:"none", clickIndex: 9}, 
					{name:"kipisi", colorClass:"wordVolTwo", clickIndex: 10}]},{
						
				symbols:[
					{name:"sina", colorClass:"none", clickIndex: 11}, 
					{name:"tawa", colorClass:"none", clickIndex: 12}, 
					{name:"utala", colorClass:"none", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"ali", colorClass:"none", clickIndex: 1}, 
					{name:"len", colorClass:"word", clickIndex: 2}, 
					{name:"ike", colorClass:"none", clickIndex: 3}]},{

				symbols:[
					{name:"jan", colorClass:"none", clickIndex: 4}, 
					{name:"leko", colorClass:"word", clickIndex: 5}, 
					{name:"la", colorClass:"none", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"nimi", colorClass:"none", clickIndex: 8}, 
					{name:"o", colorClass:"none", clickIndex: 9}, 
					{name:"pi", colorClass:"none", clickIndex: 10}]},{
						
				symbols:[
					{name:"sina", colorClass:"none", clickIndex: 11}, 
					{name:"tawa", colorClass:"none", clickIndex: 12}, 
					{name:"utala", colorClass:"none", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"ali", colorClass:"none", clickIndex: 1}, 
					{name:"en", colorClass:"none", clickIndex: 2}, 
					{name:"lili", colorClass:"word", clickIndex: 3}]},{

				symbols:[
					{name:"jan", colorClass:"none", clickIndex: 4}, 
					{name:"kama", colorClass:"none", clickIndex: 5}, 
					{name:"la", colorClass:"none", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"linja", colorClass:"word", clickIndex: 8}, 
					{name:"o", colorClass:"none", clickIndex: 9}, 
					{name:"pi", colorClass:"none", clickIndex: 10}]},{
						
				symbols:[
					{name:"sina", colorClass:"none", clickIndex: 11}, 
					{name:"tawa", colorClass:"none", clickIndex: 12}, 
					{name:"utala", colorClass:"none", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"ali", colorClass:"none", clickIndex: 1}, 
					{name:"en", colorClass:"none", clickIndex: 2}, 
					{name:"ike", colorClass:"none", clickIndex: 3}]},{

				symbols:[
					{name:"jan", colorClass:"none", clickIndex: 4}, 
					{name:"kama", colorClass:"none", clickIndex: 5}, 
					{name:"la", colorClass:"none", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"monsuta", colorClass:"wordVolTwo", clickIndex: 8}, 
					{name:"monsi", colorClass:"word", clickIndex: 9}, 
					{name:"pi", colorClass:"none", clickIndex: 10}]},{
						
				symbols:[
					{name:"sina", colorClass:"none", clickIndex: 11}, 
					{name:"tawa", colorClass:"none", clickIndex: 12}, 
					{name:"utala", colorClass:"none", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	},
	{
//=======================================================================

		layout:[{symbols:[
					{name:"ali", colorClass:"none", clickIndex: 1}, 
					{name:"en", colorClass:"none", clickIndex: 2}, 
					{name:"pini", colorClass:"word", clickIndex: 3}]},{

				symbols:[
					{name:"jan", colorClass:"none", clickIndex: 4}, 
					{name:"kama", colorClass:"none", clickIndex: 5}, 
					{name:"pilin", colorClass:"word", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"nimi", colorClass:"none", clickIndex: 8}, 
					{name:"o", colorClass:"none", clickIndex: 9}, 
					{name:"pipi", colorClass:"word", clickIndex: 10}]},{
						
				symbols:[
					{name:"sina", colorClass:"none", clickIndex: 11}, 
					{name:"tawa", colorClass:"none", clickIndex: 12}, 
					{name:"utala", colorClass:"none", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"ali", colorClass:"none", clickIndex: 1}, 
					{name:"en", colorClass:"none", clickIndex: 2}, 
					{name:"ike", colorClass:"none", clickIndex: 3}]},{

				symbols:[
					{name:"jan", colorClass:"none", clickIndex: 4}, 
					{name:"poki", colorClass:"word", clickIndex: 5}, 
					{name:"la", colorClass:"none", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"nimi", colorClass:"none", clickIndex: 8}, 
					{name:"poka", colorClass:"word", clickIndex: 9}, 
					{name:"pi", colorClass:"none", clickIndex: 10}]},{
						
				symbols:[
					{name:"sina", colorClass:"none", clickIndex: 11}, 
					{name:"tawa", colorClass:"none", clickIndex: 12}, 
					{name:"utala", colorClass:"none", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"ali", colorClass:"none", clickIndex: 1}, 
					{name:"sewi", colorClass:"word", clickIndex: 2}, 
					{name:"seli", colorClass:"word", clickIndex: 3}]},{

				symbols:[
					{name:"jan", colorClass:"none", clickIndex: 4}, 
					{name:"kama", colorClass:"none", clickIndex: 5}, 
					{name:"la", colorClass:"none", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"nimi", colorClass:"none", clickIndex: 8}, 
					{name:"selo", colorClass:"word", clickIndex: 9}, 
					{name:"pi", colorClass:"none", clickIndex: 10}]},{
						
				symbols:[
					{name:"sina", colorClass:"none", clickIndex: 11}, 
					{name:"tawa", colorClass:"none", clickIndex: 12}, 
					{name:"utala", colorClass:"none", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	},
	{
		layout:[{symbols:[
					{name:"ali", colorClass:"none", clickIndex: 1}, 
					{name:"en", colorClass:"none", clickIndex: 2}, 
					{name:"ike", colorClass:"none", clickIndex: 3}]},{

				symbols:[
					{name:"jan", colorClass:"none", clickIndex: 4}, 
					{name:"kama", colorClass:"none", clickIndex: 5}, 
					{name:"la", colorClass:"none", clickIndex: 6}]},{

				symbols:[
					{name:"ma", colorClass:"none", clickIndex: 7}, 
					{name:"nimi", colorClass:"none", clickIndex: 8}, 
					{name:"o", colorClass:"none", clickIndex: 9}, 
					{name:"supa", colorClass:"word", clickIndex: 10}]},{
						
				symbols:[
					{name:"sina", colorClass:"none", clickIndex: 11}, 
					{name:"tawa", colorClass:"none", clickIndex: 12}, 
					{name:"suwi", colorClass:"word", clickIndex: 13}, 
					{name:"wile", colorClass:"none", clickIndex: 14}]}]
	}
];
function changeLayout(layout) {
	var changingBoxes = document.querySelectorAll(".blank");
	var startSymbols = [];
	var colorClasses = [];
	
	for(var i = 0; i < layouts[layout].layout.length; i++) {
		for(var k = 0; k < layouts[layout].layout[i].symbols.length; k++) {
			startSymbols.push(layouts[layout].layout[i].symbols[k].name) 
			colorClasses.push(layouts[layout].layout[i].symbols[k].colorClass) 
		}	
	}
	for(var i = 0; i < changingBoxes.length; i++) {
		changingBoxes[i].innerHTML = startSymbols[i];
		if(colorClasses[i] != "none") {
			changingBoxes[i].classList.remove(changingBoxes[i].classList[1]);
			changingBoxes[i].classList.add(colorClasses[i]);
		} else {
			changingBoxes[i].classList.remove(changingBoxes[i].classList[1]);
		}
	}
	currentLayout = layout;
}
function getSymbolObject(td, layout) {
	for(var j = 0; j < 4; j++) {
		for(var m = 0; m < layouts[layout].layout[j].symbols.length; m++) {
			if(layouts[layout].layout[j].symbols[m].name == td.innerHTML) {
				return layouts[layout].layout[j].symbols[m];
			}
		}
	}	
}
changeLayout(0)
var compound = false;
for(var i = 0; i < keys.length; i++) {
	keys[i].addEventListener("click",(e)=>{
		event = e;
		if(e.srcElement.classList[0] == "frequent" || (e.srcElement.classList[0] == "blank" && (e.srcElement.classList[1] == "word" || e.srcElement.classList[1] == "wordVolTwo"))) {
			textBox.value += (compound && textBox.value.length > 1 ? "-" : " ") + e.srcElement.innerHTML;
			
			if(currentLayout != 0) {
				changeLayout(0)
			}
		} else if(e.srcElement.classList[1] == "backspace") {
			changeLayout(0);
			textBox.value = textBox.value.slice(0, textBox.value.length)
			for(var k = textBox.value.length; k >= 0; k--) {
				if(textBox.value.length <= 0){
					break;
				}
				if(textBox.value[k] == " ") {
					textBox.value = textBox.value.slice(0, k);
					break;
				}
			}
		} else if(e.srcElement.classList[1] == undefined) {
		//	if(currentLayout != 0) {	
			//	changeLayout(0);
		//	} else {
	
				changeLayout(getSymbolObject(e.srcElement, currentLayout).clickIndex);
	//		}
		} else if(e.srcElement.classList[1] == "wordTwo") {
			changeLayout(getSymbolObject(e.srcElement, currentLayout).clickIndex);
		} else if(e.srcElement.classList[1] == "compound") {
			if(compound) {
				e.srcElement.classList.remove("utilSelected")
				compound = false;
			} else {
				e.srcElement.classList.add("utilSelected")
				compound = true;
			}
		}
	})
}
} else {
	document.querySelector("#fireFoxWarning").style.display = "block";
	document.querySelector("#keyboard").style.display = "none";
	document.querySelector("#keyboardWordLable").style.display = "none";
	document.querySelector("#keyboardWord").style.display = "none";
	document.querySelector("#textBox").style.display = "none";
	document.querySelector("#boxToki").style.display = "none";
	document.querySelector("#boxTokiLabel").style.display = "none";
}
var words;

	var words = 'a: [ah 94, oh 93, ha 83, ooh 80, uh 73, gosh 73, whoa 69, wow 61, um 47, huh 44] akesi: [reptile 96, frog 56] akesi kiwen: [turtle 42] akesi linja: [snake 75] akesi seli: [dragon 50] ala: [none 100, not 100, zero 100, no 94, nothing 81, neither 60] alasa: [hunt 100, hunting 87, search 75, pursuit 75, pursue 74, gather 61, finding 58, seek 56, explore 44] alasa kala: [fishing 53] ale: [every 80, everything 77, all 68, entire 64, universal 60, completely 58, total 53, entirely 50, universe 50, altogether 44, comprehensive 42] ale la: [overall 80] anpa: [down 96, bottom 79, lower 70, defeat 58, below 58, beneath 57] ante: [changing 100, other 100, different 100, alter 94, modify 90, alternative 76, change 75, convert 75, edit 73, difference 71, transformation 70, distinct 69, differently 69, vary 67, transform 60, variation 60, contrast 55, distinction 55, replace 50, switch 50, another 47, else 47, conversion 46, adjustment 42] ante la: [otherwise 70] anu: [or 100, whether 60, choice 47] awen: [wait 100, await 100, stay 100, preserve 90, remain 84, sustain 83, retain 79, defend 76, endure 75, continued 74, continue 73, secure 72, continuing 71, save 70, protect 67, keep 61, still 60, reserve 58, protection 56, remaining 56, continuous 55, stability 55, maintain 54, safe 53, security 50, stable 50, protective 45, constant 45, defence 44, left (remaining) 42] awen sona: [remember 45] en: [and 50, plus 50] epiku: [epic 50] esun: [trading 91, trade 88, shopping 88, deal 75, commerce 69, sales 67, purchase 67, buy 65, transaction 64, market 62, sale 60, exchange 58, sell 57, retail 56, business 48, shop 46] ijo: [item 100, something 100, object 100, stuff 100, thing 100, entity 82, phenomenon 67, material 63, matter (n) 62, substance 53, anything 50] ijo esun: [commodity 44] ijo pana: [gift 43] ike: [bad 100, harsh 82, badly 81, mean (adj) 77, evil 75, negative 73, problem 70, horrible 67, terrible 61, unfortunate 60, poorly 59, offensive 57, awful 55, trouble 53, tragic 50, cruel 46, wrong 43, complexity 42, issue 42, inappropriate 42] ike la: [unfortunately 58, sadly 47] ike lukin: [ugly 58] ilo: [tool 100, device 95, equipment 85, machine 84, app 73, hardware 64, robot 59, technological 53, mechanical 52, gear 50, tech 47, mechanism 46, technical 43, software 43] ilo kalama: [radio 64, bell 42] ilo kipisi: [knife 63] ilo moku: [fork 87] ilo musi: [toy 80] ilo open: [key 80] ilo pi sitelen tawa: [television 47] ilo sitelen: [pen 62, camera 59] ilo sona: [computer 58] ilo suno: [lamp 64] ilo tawa: [motor 53] ilo tenpo: [clock 92] ilo tenpo suno: [sundial 72] ilo toki: [telephone 100, phone 90] ilo utala: [weapon 68] insa: [internal 100, inner 100, interior 93, centre 91, guts 71, core 67, central 60, inside 58, middle 56, belly 54, stomach 41] insa pi ma tomo: [downtown 47] jaki: [dirty 93, trash 89, gross 87, garbage 86, mess 82, disgusting 79, junk 75, bacteria 67, nasty 62, crap 47, waste 47, toxic 47, infection 44] jaki ala: [clean 80] jan: [person 100, human 93, people 82, anybody 62, dude 61, anyone 56, somebody 50, character 50, guy 43, being 42] jan ala: [nobody 90] jan alasa: [hunter 94] jan ale: [everybody 100, everyone 79, humanity 50] jan awen: [defender 57, guard 50, defendant 41] jan esun: [vendor 73, businessperson 69, retailer 55, customer 53, consumer 41] jan ike: [offender 62, asshole 60, enemy 57] jan jo: [owner 53] jan kama: [visitor 63] jan kepeken: [user 83] jan kulupu: [member 50] jan kute: [listener 95, audience 41] jan lawa: [boss 94, administrator 92, leader 91, supervisor 87, chief 86, commander 86, manager 86, captain 82, master 80, chairman 80, director 71, president 70, governor 70, minister 67, officer 60, emperor 57, congressman 56, senator 55, king 54, employer 50, sheriff 48, coordinator 44, mayor 43, lawmaker 42, politician 42] jan lili: [child 60, baby 45] jan lukin: [viewer 85, observer 81, witness 64, inspector 56, reader 44] jan ma: [citizen 50] jan mani: [banker 75] jan moku: [eater 73, chef 43] jan moli: [dead person 100, killer 60] jan musi: [player 81, performer 50, actor 43] jan olin: [lover 83, spouse 70, sweetheart 58, beloved 55, wife 50] jan pali: [worker 93, maker 86, employee 85, producer 73, developer 69, participant 52, practitioner 50, manufacturer 47, personnel 43, creator 41, contractor 41] jan pana: [provider 90, donor 89, dealer 45] jan pi alasa sona: [researcher 60, detective 42] jan pi kalama musi: [musician 42] jan pi kama jo: [receiver 80, recipient 79] jan pi kama sona: [learner 92, student 83] jan pi kama suli: [teenager 45] jan pi mute lili: [few (a few people) 46] jan pi pana sona: [educator 68, instructor 60, teacher 58, mentor 41] jan pi sona esun: [economist 56] jan pi tawa musi: [dancer 67] jan pi toki pona: [Toki Pona speaker 57] jan poka: [companion 80, neighbour 53, partner 42] jan pona: [pal 100, friend 96, buddy 86, ally 43, mate 42] jan sama: [peer 75, sibling 64, brother 54, twin 43] jan seme: [who 91, whom 70] jan sewi: [saint 60] jan sin: [newcomer 100, freshman 71, rookie 70] jan sitelen: [painter 69, author 57, writer 56] jan sona: [scholar 83, scientist 59, expert 50, specialist 50, intellectual 50] jan sona pi tenpo pini: [historian 42] jan suli: [adult 91] jan tawa: [traveller 92] jan toki: [spokesperson 86, speaker 82, narrator 77, caller 63, correspondent 50, reporter 44] jan utala: [warrior 95, fighter 92, soldier 92, competitor 69, opponent 50, rival 47] jasima: [reflect 59] jelo: [yellow 94] jo: [have 100, possess 95, carry 90, contain 75, own 73, hold 71, possession 68, ownership 67, consist 42, include 42, comprise 41] jo ala: [lack 45] jo e ilo utala: [armed 46] kala: [fish 100, sea creature 82, salmon 62] kala suli: [whale 71] kalama: [sound 100, noise 79, tone 50] kalama ala: [silence 87, silent 85, quiet 64] kalama musi: [music 64, song 55] kama: [coming 93, come 91, arrival 90, arrive 88, become 78, upcoming 71, emerging 69, emerge 67, happen 62, occur 54] kama ante: [evolve 50] kama jo: [receive 82, acquire 79, obtain 75, acquisition 75, get 74, take 73, gain 52, download 50, pickup 47, collect 44] kama lili: [decrease 47] kama lon: [enroll 47] kama pona: [recovery 57, welcome (interj) 56, recover 50] kama sona: [learning 100, realize 100, learn 94, study (v) 59, discover 45] kama suli: [increasing 80, growing 80, grow 73, growth 64, expansion 53, increased 50, increase 45, inflation 42] kama telo: [melt 56] kasi: [plant 95, bush 61] kasi kule: [flower 42] kasi nasa: [marijuana 75] kasi suli: [tree 47] kasi telo: [seaweed 75] ken: [able 100, potential 94, ability 93, capability 92, capable 90, may 88, possible 86, could 81, eligible 80, can 79, possibility 75, permission 69, likelihood 60, chance 57, probability 56, maybe 53, opportunity 53, available 53, possibly 50, odds 45] ken ala: [unable 100, impossible 80, disabled 54] ken ike: [risk 50] ken la: [patentially 50, perhaps 50, maybe 47, possibly 42] ken lukin: [visible 47] ken moli: [mortality 47] ken tawa: [mobile 50] kepeken: [use 93, utilize 75, via 60, employ 50] kepeken tenpo lili: [quick 50] kijetesantakalu: [procyonid 53, racoon] kili: [fruit 95, vegetable 94, apple 82, kumquat 42] kin: [also 79, too 73] kin la: [moreover 60] kipisi: [split 69, division 65, slice 62, cut 56, divide 55, chop 50, segment 50, section 42] kiwen: [solid 100, rock 93, stone 84, hard object 79, concrete 60, metal 57, steel 56, iron 50, stiff 44, firm 44] kiwen kasi: [wood 53, wooden 43] kiwen uta: [tooth 88] ko: [goo 88, semisolid 86, powder 73, paste 73, clay 60] ko pan: [flour 73] kokosila: [speak another language in a Toki Pona only environment 50] kon: [air 100, soul 100, spirit 86, gas 83, essence 65, atmosphere 64, oxygen 60, breathe 60, breath 57, meaning 55, intangible 53, invisible entity 45, breathing 45] kon tawa: [wind 73] kule: [colour 100] kulupu: [organization 100, group 100, community 95, collective 91, tribe 83, squad 80, bunch 75, tribal 75, cluster 71, league 70, society 67, collection 67, association 65, crew 64, team 60, club 57, coalition 54, set 54, socially 53, gathering 53, institution 50, category 50, gang 46, meeting 45, assembly 45, network 44, pile 44, crowd 41] kulupu ilo: [kit 42] kulupu lawa: [council 65, senate 55, congress 43, administration 42] kulupu mama: [family 57] kulupu pi kalama musi: [band 47] kulupu utala: [army 76, military 55] kulupu utala telo: [navy 44] kute: [hear 100, listen 93, ear 90, hearing 89] la: [if 88, while 48, depending 43] lanpan: [steal 48, seize 42] lape: [sleep 100, asleep 80, rest 58] lape ala: [awake 64] laso: [blue 81, teal 71, green 47] laso kasi: [green 47] laso loje: [purple (2020) 41] lawa: [govern 100, head 100, authority 79, control 77, ruling 75, regulatory 70, leading 70, manage 65, administrative 64, leadership 63, rule 60, law 60, lead 57, management 54, legal 50, mind 50, enforce 50, judicial 50, oversee 50, conduct 47, official 47, regulate 45, brain 45, policy 44, administer 44] leko: [square 64, cube 50, block 43] len: [clothing 100, cloth 100, clothes 93, fabric 92, outfit 74, privacy 67, cover 64, dress 58, jacket 47, wear 45, shirt 42] len ala: [naked 43] len jaki: [laundry 70] len lawa: [hat 100, headscarf 81, cap 64] len luka: [glove 88] len noka: [boot 75, shoe 71, sock 67, pants 56] len pi weka telo: [towel 47] len sinpin: [mask 42] lete: [cold 100, raw 58, frozen 45] lili: [small 100, little 100, short 91, slight 91, reduce 83, junior 83, slightly 80, minimize 75, narrow 71, bit 69, minor 69, partly 67, reduction 64, brief 63, young 62, fewer 60, less 59, diminish 57, tiny 56, barely 54, decrease 53, minimal 53, somewhat 50, partially 50, thin 45, inch 45, shallow 45, subtle 44, lightly 42, kinda 41] linja: [line 100, cord 100, string 100, rope 92, thread 65, fibre 54, cable 43, link 43] linja kiwen: [chain 55] linja lawa: [hair 60] linja monsi: [tail 54] linja uta: [moustache 43] lipu: [paper 93, book 92, ticket 90, document 88, article 86, card 85, page 82, magazine 70, sheet 69, file 64, website 60, essay 57, novel 50, letter (in mail) 47, sign 43, publication 41] lipu kasi: [leaf 50] lipu lawa: [constitution 42] lipu moku: [menu 50] lipu nimi: [dictionary 50] lipu tenpo: [calendar 45] loje: [red 95] loje laso: [purple (2021) 55] loje walo: [pink 71] lon: [at 100, existing 100, real 100, exist 100, located 93, presence 89, yep 87, existence 87, actual 86, on 83, true 81, living 73, yes 71, truth 67, reality 64, physical 62, yeah 62, upon 60, genuine 60, truly 60, in 57, alive 56, position 55, accurate 52, exactly 50, occupy 50, live 47, attendance 46, certainly 45, indeed 42, attend 42, right (not wrong) 41] lon ala: [fake 57, false 50] lon ale: [everywhere 45] lon anpa: [under 47] lon insa: [within 53] lon la: [actually 55] lon ma ante: [elsewhere 60, abroad 56] lon monsi: [behind 52] lon ni: [there 67, here 58] lon poka: [around 69, near 65, alongside 58, nearby 56, close (adj) 53, accompany 43, beside 43] lon seme: [where 70] lon sewi: [above 45, over 41] lon sinpin: [ahead 59] luka: [hand 100, arm 68, five 64, wrist 50] luka luka tu: [dozen 47, twelve 43] luka tu: [seven 53] luka waso: [wing 77] lukin: [see 100, observe 92, look at 86, sight 85, gaze 83, observation 83, check 77, view 74, scan 67, watch 65, visual 64, inspection 60, examine 60, vision 60, notice 53, surveillance 50, attention 50, appearance 50, examination 47, detect 46] lukin ala: [overlook 45, blind 44] lukin lili: [glance 56] lupa: [hole 94, door 87, orifice 79, pit 77, window 57, gate 45] lupa ma: [cave 46] ma: [territory 100, country 100, land 93, realm 91, area 81, region 80, field 80, soil 73, place 73, earth 71, province 70, zone 69, ground 64, nation 62, environmental 57, environment 54, location 50, site 50, world 45, domain 45, national 45, nature 43] ma Elena: [Greece 58] ma Mewika: [United States 75] ma Nijon: [Japan 61] ma ala: [nowhere 45] ma ale: [worldwide 42] ma kasi: [garden 73] ma mama: [homeland 60] ma sewi: [heaven 61] ma suli: [continent 50] ma tomo: [city 83, town 60] ma utala: [arena 50] mama: [parent 100, parental 90, mama 88, mommy 80, mom 75, creator 53, mother 50, foster 44, originator 43] mama mama: [grandma 67, grandmother 50] mama meli: [mother 50] mama mije: [dad 67, father 50, daddy 50] mani: [money 100, cash 93, monetary 83, currency 82, treasure 73, wealth 71, worth 70, cattle 68, dollar 67, financial 64, funding 57, fiscal 54, wage 50, fee 50, cost 47, valuable 43] mani kama: [income 46] mani lili: [cent 54] mani mute: [expensive 55] mani tomo: [rent 43] meli: [female 100, lady 79, woman 77, girl 50] meli olin: [girlfriend 47] meso: [average 53, moderate 50, medium 47] mi: [me 100, I 100, my 100, mine 63, our 63, myself 47, us 43] mi la: [personally 80] mi mute: [we 56, us 48, ourselves 48] mi pakala: [Iâ€™m sorry 73] mi tawa: [bye (said by person leaving) 75] mije: [male 94, man 90, husband 55, cisgender man 50] misikeke: [medication 46, medicine 42] moku: [eating 100, eat 100, food 100, consume 97, dining 88, consumption 83, meal 83, swallow 68, nutrition 50, dinner 50, drinking 47, chew 44, groceries 43] moku lili: [snack 64] moku suwi: [dessert 47] moku telo: [soup 42] moli: [death 100, killing 100, dead 94, die 75, dying 69, kill 64] moli telo: [drown 60] monsi: [butt 93, back (anatomy) 73, ass 67] monsuta: [scary 60, fear 59, monster 58, horror 42] mu: [woof 100, meow 100, animal vocalization 93, ribbit 93, purr 92, neigh 88, cock-a-doodle-doo 58] mun: [moon 95, celestial body 80] musi: [entertainment 100, fun 100, funny 91, play 87, game 86, comedy 83, art 58, artistic 50] musi ala: [boring 53, seriously 44] musi supa: [board game 88] mute: [plenty 100, many 100, much 100, multiple 100, very 93, lots 92, several 86, numerous 80, various 75, most 70, quantity 64, twenty 59, fifty 55, thousand 50, nine 50, majority 48, incredibly 45, million 44] mute ike: [too much 69] mute pona: [sufficient 42] n: [um 47] namako: [spice 82, extra 65, additional 50, adornment 50] nanpa: [number 100, count 80, score 57, rating 46, rank 44, measurement 43, ranking 43, statistical 42] nanpa luka: [fifth 50] nanpa luka tu: [seventh 60] nanpa luka wan: [sixth 42] nanpa pini: [last 70, final 44] nanpa tu: [second (2nd) 83, secondary 50] nanpa tu tu: [fourth 71] nanpa tu wan: [third 71] nanpa wan: [first 63, original 60, primary 55] nasa: [weird 100, strange 88, unusual 88, odd 83, drunk 64, silly 58, wild 50] nasin: [road 100, way 100, doctrine 92, method 91, path 83, manner 80, avenue 80, route 75, direction 73, street 71, orientation 70, trail 70, mode 69, technique 67, layout 56, system 56, course 55, passage 54, process 54, track 53, format 52, ideology 50, tactic 48, custom 45, aisle 44, journey 44, lane 43] nasin len: [fashion 70] nasin mani: [capitalism 56] nasin moku: [diet 60] nasin pona: [solution 42] nasin sewi: [religion 69] nasin toki: [accent 44] nena: [hill 67, nose 50] nena suli: [mountain 50] ni: [this 100, that 86, these 83, those 77] ni la: [thus 75] nimi: [word 100, name 100, term 55, title 50] nimi ijo: [noun 100] nimi kon: [content word 50] nimi pali: [verb 92] noka: [leg 93, foot 67, lap 55, ankle 50, kick 43] o kama pona: [welcome (interj) 41] oko: [eye 68] olin: [loving 100, love 96, romance 69, romantic 60, compassion 50] ona: [its 100, her 95, them 90, their 83, he 80, she 80, him 80, they 79, it 73, his 73, themselves 53, itself 47] ona sama: [herself 57, himself 57, itself 42] open: [open 100, begin 100, start 91, beginning 82, initiate 73, starting 69, opening 60] pakala: [destruction 100, broken 100, mistake 82, damage 81, damn 79, goddamn 75, ruin 75, burst 75, accident 73, destroy 71, heck 67, error 67, hurt 67, crash 65, injure 65, harm 64, fail 64, break 63, failure 57, fault 57, injury 55, flaw 53, crack 52, collapse 50, snap 48, fuck 47, fucking 42] pali: [do 100, work 100, construct 94, produce 93, make 93, activity 93, job 92, build 92, production 91, working 90, labour 90, action 87, task 86, create 84, function 83, occupation 81, operating 69, project 67, execute 67, manufacturing 64, craft 64, develop 60, generate 60, compose 58, assemble 58, act 57, profession 55, assignment 53, creation 50, enact 50, commit 50, perform 50, operation 50, service 48, effort 48, implement 47, operate 47, accomplish 47, implementation 45, processing 43, behaviour 43, behave 43, career 41] pali ala: [unemployment 67] pali ike: [sin 58, crime 55] pali kulupu: [collaboration 56, cooperate 53] pali musi: [performance 42] pali nanpa: [calculation 67] pali pi kama sona: [experiment 47] pali sijelo: [workout 55, exercise 41] pali sin: [rebuild 64] palisa: [stick 100, rod 94, stake 80, pole 67, branch 60, staff 41] palisa luka: [finger 41] pan: [bread 100, grain 81, wheat 67, rice 53] pan linja: [noodles 55] pan suwi: [cake 69] pana: [give 100, put 93, deliver 90, grant 85, delivery 82, send 80, submit 78, provide 73, transfer 71, distribute 65, distribution 58, donate 57, appoint 55, contribute 53, output 52, yield 50, publishing 50, given 50, share 50, deploy 47, offering 47, assign 47, deposit 45, convey 44] pana e sona: [educate 42] pana e telo loje: [bleed 41] pana mani: [payment 43, donation 42] pana pona: [assistance 50] pana sona: [teach 68, teaching 54, educate 50, instruct 42] pi ma ante: [foreign 44] pi ma mute: [international 44] pi tenpo pini: [historical 50] pilin: [emotion 100, feeling 100, feel 92, sentiment 83, mood 80, emotionally 76, heart 70, sense 69, attitude 64, emotional 62, opinion 55, notion 55, impression 50, perceive 50, assume 50, hypothesis 50, deem 47] pilin ante: [disagree 50] pilin ike: [upset 85, sad 80, guilt 58, uncomfortable 57, suffer 55, stress 50, frustration 48, disappointed 47, disappointment 46, grief 44] pilin nasa: [confusion 45] pilin pona: [glad 93, happy 92, pleased 83, joy 76, satisfaction 73, happiness 71, comfortable 70, pleasure 70, grateful 56, happily 44, well-being 42] pilin sama: [sympathy 50] pilin uta: [flavour 57, taste 54] pilin utala: [angry 60, rage 53, anger 50, mad 43] pilin wawa: [confident 45, excitement 43] pimeja: [black 100, dark 100, darkness 100, shadow 50, shade 47] pini: [end 100, finish 94, shut 87, ending 80, conclude 70, outcome 70, cease 70, close (v) 65, closed 64, latter 55, quit 55, final 50, stop 47, complete 47, off 44, cancel 43] pini ala: [endless 58] pini la: [finally 80, ultimately 47] pini pali: [retire 43] pipi: [bug 100, insect 92, spider 48] poka: [side 100, hip 67, beside 57, aside 45] poki: [container 100, jar 92, box 90, package 89, bag 87, basket 71, bucket 67, bottle 65, pot 64, cabinet 61, classify 55, drawer 50, storage 50, locker 50, case 45, bowl 42] poki len: [sack 60] poki lipu: [envelope 77] poki seli: [oven 50] poki sike: [barrel 55] poki tawa: [cart 60] poki telo: [cup 45] poki wawa: [battery 67] pona: [good 100, appropriate 90, nice 88, acceptable 81, proper 80, simply 80, OK 80, fine 80, quality 79, valid 75, pleasant 73, friendly 72, positive 70, well 70, benefit 69, simple 69, virtue 67, alright 64, correct 60, repair 57, fix 57, right (not wrong) 55, advantage 55, cool 55, okay 54, fixed 54, helpful 53, validity 53, kind 53, ethical 50, merit 50, peaceful 50, ideal 50, improve 50, successfully 50, improvement 47, correction 46, grace 45, fair 45, successful 43, ease 43, heal 43, supportive 42, approval 41] pona a: [fantastic 47] pona la: [fortunately 77] pona lukin: [pretty 80, attractive 58, beauty 42] pona mute: [excellent 42] pona sijelo: [health 60] pona tawa: [suit (v) 62] pu: ["interact with Toki Pona: The Language of Good 82"] sama: [equal 100, alike 100, similar 90, equivalent 87, as 80, similarly 62, equality 55, equally 54, like 47, identical 45] sama ala: [unlike 56] sama lukin: [look like 50] seli: [heat 100, fire 100, hot 92, burning 85, flame 83, burn 70, warm 65, warming 58] selo: [skin 83, boundary 65, surface 60, peel 50, outer 50, shape 44, layer 42] selo kiwen: [shell 55] selo soweli: [leather 56] seme: [what 100, which 69, huh 44] sewi: [upper 100, divine 100, sacred 80, top 76, holy 73, sky 71, elevated 69, high 60, spiritual 50, raise 50, supreme 50, highly 47, peak 43] sijelo: [body 100, torso 64, flesh 50] sijelo pona: [healthy 54] sike: [circle 100, round 100, sphere 82, ball 77, loop 71, cycle 70, wheel 64, disc 59, globe 55, circuit 46] sike kon: [balloon 56] sike lili: [dot 43] sike mama: [egg 67] sin: [new 100, newly 92, fresh 87] sina: [you 94, your 88, yours 83, yourself 67] sinpin: [front 92, face (n) 62, wall 50] sitelen: [picture 100, image 97, graphic 93, symbol 89, drawing 88, illustration 86, photo 85, illustrate 75, writing 75, painting 75, write 75, written 73, depict 68, draw 67, photograph 64, portrait 55, icon 53, representation 50, mark 47, portray 45] sitelen esun: [advertisement 55, ad 50] sitelen lape: [dream 70] sitelen musi: [comics 63, meme 44] sitelen selo: [tattoo 41] sitelen sona: [chart 46] sitelen tawa: [video 89, film 70, footage 70, movie 56] sitelen tawa sona: [documentary 42] soko: [mushroom 53, fungus 42] sona: [know 100, knowledge 100, information 100, understand 94, understanding 93, aware 83, info 79, wisdom 73, awareness 68, known 62, data 60, wise 58, recognition 55, recognize 50, expertise 42] sona ala: [ignorance 91, ignorant 87, unknown 57, uncertainty 47] sona nanpa: [mathematics 62] sona toki: [linguistics 71] soweli: [animal 95, deer 87, creature 71, dog 67, cat 61, llama 58, goat 56, Musteloidea 50, beast 43, lion 42] soweli len: [sheep 50] soweli lili: [Glires or Eulipotyphla (2021) 64, mouse (2020) 50] soweli suli: [elephant 60] soweli tawa: [horse 44] suli: [importance 100, big 100, large 100, important 92, significant 87, matter (v) 86, significantly 80, grand 80, huge 79, vast 77, weight 77, tall 77, crucial 75, prominent 73, extensive 73, fat 70, broad 70, long 69, substantial 69, significance 67, size 67, giant 65, heavy 65, wide 64, extended 64, considerable 63, thick 62, major 60, tremendous 56, extent 55, magnitude 54, great 53, length 50, vital 50, height 50, importantly 47, greatly 47, severe 44, dramatically 42, mass 42] suli la: [especially 42] suno: [sun 94, solar 93, light 77, sunlight 75, bright 64, shine 60] supa: [platform 86, table 83, shelf 80, board 67, furniture 50, flat 47, lie (be in flat position) 47, level 44, desk 43] supa lape: [bed 86] supa moku: [plate 46] supa monsi: [seat 44] suwi: [sweet 100, cute 92, candy 65, sugar 58] tan: [from 93, reason 86, because of 80, by 70, source 64] tan seme: [why 80] taso: [but 100, only 100, solely 82, however 82, exclusively 80, although 80, though 79, just 71, exclusive 70, despite 69, nonetheless 67, mere 64, merely 58, except 53, nevertheless 50, yet 50, sole 50, whereas 45] tawa: [motion 100, go 100, toward 100, move 100, movement 94, towards 93, to 93, for 81, transit 80, travel 69, trip 60, transportation 60, walk 58, advance 56, onto 55, transport 50, pass 50, walking 47, migration 46, departure 45, from the perspective of 44, push 43] tawa anpa: [descend 60] tawa insa: [into 50] tawa musi: [dance 83, dancing 58] tawa pona: [bye (said by person staying) 75, goodbye 54] tawa sewi: [jump 50, leap 43] tawa sike: [roll 53, spin 43] tawa sinpin: [forward 47] tawa telo: [swim 60] tawa waso: [flight 50] tawa wawa: [run 53, running 48] telo: [fluid 100, water 94, wet 73, wash 52, pond 45, pool 42] telo ala: [dry 62] telo jelo: [piss 46] telo kasi: [tea 44] telo kili: [juice 86] telo loje: [blood 43] telo nasa: [alcohol 75, beer 69] telo selo: [sweat 43] telo sewi: [rain 41] telo suli: [ocean 82, sea 65] telo uta: [spit 64] telo wawa: [gasoline 47] tenpo: [time 100, timing 72, session 71, occasion 65, phase 64, moment 56, date 50, circumstance 50, hour 47, appointment 44, scenario 42] tenpo ala: [never 50] tenpo ale: [forever 50, constantly 42] tenpo esun: [week 80] tenpo kama: [future 93, later 41] tenpo lete: [winter 100] tenpo lili: [minute 60, second (unit of time) 50] tenpo mun: [month 75] tenpo musi: [festival 46] tenpo mute la: [typically 64, usually 55, tend 43, commonly 41] tenpo ni: [now 60, current 43] tenpo ni la: [currently 83] tenpo pi jan lili: [childhood 53] tenpo pi pali ala: [vacation 62] tenpo pimeja: [night 70] tenpo pimeja ni: [tonight 60] tenpo pini: [past 92, deadline 44, history 43] tenpo pini la: [previously 53] tenpo sama: [meantime 45] tenpo sama la: [meanwhile 50] tenpo seli: [summer 73] tenpo seme: [when 45] tenpo sike: [year 56] tenpo suli: [era 59, longtime 57, century 50] tenpo suno: [day 80] tenpo suno kama: [tomorrow 65] tenpo suno ni: [today 64] tenpo suno olin: [Valentineâ€™s Day 44] tenpo suno pini: [yesterday 47] toki: [speech 100, talk 100, conversation 100, say 100, communicate 100, speak 100, communication 100, hello 100, language 94, tell 93, statement 92, hi 88, discuss 83, discussion 82, discourse 75, mention 73, comment 67, refer 62, message 61, express 60, remark 60, dialogue 60, reporting 56, call 56, narrative 53, commentary 50, disclose 50, respond 50, contact 50, verbal 47, admit 47, proposal 47, tale 46, story 44, declare 44, interview 44, answer 43, testify 43, report 42, expression 42, phrase 41] toki Inli: [English 88] toki Lasina: [Latin 60] toki ike: [complain 50, criticize 43] toki insa: [thinking 50] toki lawa: [command 50] toki musi: [poetry 58, joke 50] toki open: [introduction 44] toki sona: [lecture 43] toki suli: [announcement 73] toki tawa sewi: [pray 44] toki utala: [argument 53] toki wile: [plea 46] tomo: [building 100, house 94, housing 86, chamber 85, home 82, room 81, shelter 80, residence 68, suite 59, domestic 58, structural 54, structure 53, residential 50, facility 50, establishment 45, household 43, cabin 42, apartment 42] tomo anpa: [basement 85] tomo esun: [shop 54, store 43] tomo lape: [bedroom 79] tomo lawa: [headquarters 71, courtroom 69] tomo len: [tent 62] tomo lipu: [library 91] tomo mani: [bank 67] tomo moku: [restaurant 75, kitchen 50] tomo musi: [theatre 44] tomo pali: [studio 67, factory 59, workshop 56, office 56] tomo pi pali sona: [lab 43] tomo pi pona sijelo: [clinic 53, hospital 41] tomo pi sitelen tawa: [cinema 58] tomo pi tomo tawa: [garage 59] tomo sewi: [temple 70, church 67] tomo sona: [academy 67, classroom 57, school 56] tomo suli: [tower 53] tomo tawa: [car 81, vehicle 64, wagon 50, van 50, shuttle 41] tomo tawa kon: [plane 50, aircraft 45] tomo tawa telo: [boat 76, ship 56] tomo telo: [bathroom 64] tomo waso: [nest 46] tonsi: [non-binary person 59, transgender person 56, gender non-conforming person 53] tu: [two 100, pair 88, double 80, both 64, twice 50, couple 50] tu tu: [four 57] tu wan: [three 57] npa: [sex 100, sexual 95, sexually 92, fucking 42] uta: [mouth 100, lip 47, kiss 44, jaw 42] utala: [fight 100, fighting 100, battle 100, combat 94, conflict 93, contend 90, assault 88, attack 82, versus 69, violent 67, compete 67, challenge 64, violence 63, hit 63, struggle 60, war 58, contest 56, oppose 50, dispute 50] utala ala: [peace 45] walo: [white 100, pale 74] wan: [one 93, united 92, unity 90, combined 70, unite 67, single 64, unit 60, blend 50, combine 44, union 43] waso: [bird 100, chicken 44] waso telo: [duck 60] wawa: [strength 100, power 100, powerful 92, strong 88, energy 88, strongly 82, force 73, intense 71, bold 68, intensity 65, reinforce 63, strengthen 62, firmly 62, charge 53, brave 47, rapid 42, electrical 42] wawa ala: [weak 80, weakness 50] weka: [rid 100, removal 100, remove 93, eliminate 80, apart 80, omit 80, missing 73, away 73, absence 71, loss 69, delete 67, dismiss 67, distant 64, leave 64, abandon 63, far 60, vanish 60, disappear 47, avoid 47, out 45, exclude 45, escape 42, distance 42] weka sona: [forget 60] wile: [want 100, wish 94, intend 93, require 90, need 88, desire 87, intention 84, willing 83, will 81, intent 80, preference 79, motivation 75, necessity 73, yearn 71, ought 71, necessary 70, hope 67, willingness 67, ambition 67, prefer 67, requirement 64, required 61, must 59, obligation 56, decision 54, should 53, demand 50, eager 50, request 47, agenda 41] wile ala: [reluctant 50] wile moku: [hunger 91, hungry 77] wile sona: [curiosity 90, inquiry 53, question 50, curious 47] yupekosi: [change a creative work and unintentionally make it worse 50] a: [ah 94, oh 93, ha 83, ooh 80, uh 73, gosh 73, whoa 69, wow 61, um 47, huh 44, uh-huh 39, quite 29, gasp 28, really 27, mm-hmm 27, hmm 27, sigh 27] akesi: [reptile 96, frog 56] ala: [not 100, none 100, zero 100, no 94, nothing 81, neither 60, nor 30, hardly 28] alasa: [hunt 100, hunting 87, search 75, pursuit 75, pursue 74, gather 61, finding 58, seek 56, explore 44, chase 39, locate 38, try 36, collect 33, quest 33, catch 26] ale: [every 80, everything 77, all 68, entire 64, universal 60, completely 58, total 53, entirely 50, universe 50, altogether 44, comprehensive 42, full 36, totally 35, each 33, fully 32, any 30, thoroughly 30, absolute 29, general 27, countless 27, complete 26, whole 25, hundred 21] ali: [all 32, entire 27, universe 21] anpa: [down 96, bottom 79, lower 70, defeat 58, below 58, beneath 57, under 35, bow 30, underlying 25] ante: [other 100, changing 100, different 100, alter 94, modify 90, alternative 76, change 75, convert 75, edit 73, difference 71, transformation 70, distinct 69, differently 69, vary 67, transform 60, variation 60, contrast 55, distinction 55, replace 50, switch 50, else 47, another 47, conversion 46, adjustment 42, adapt 40, affect 40, distinguish 37, adjust 37, amendment 36, transition 33, opposed 33, unlike 33, separate 30, counterpart 29, diversity 26, shift 25, adaptation 25] anu: [or 100, whether 60, choice 47, selection 36, decide 31, either 31, select 31] awen: [stay 100, await 100, wait 100, preserve 90, remain 84, sustain 83, retain 79, defend 76, endure 75, continued 74, continue 73, secure 72, continuing 71, save 70, protect 67, keep 61, still 60, reserve 58, protection 56, remaining 56, continuous 55, stability 55, maintain 54, safe 53, security 50, stable 50, constant 45, protective 45, defence 44, left (remaining) 42, defensive 40, maintenance 40, rescue 40, stand 37, standing 36, steady 35, pause 33, custody 33, safely 31, saving 30, guard 30, reservation 30, suspend 29, hang 27, ongoing 27, hesitate 27, safety 27, delay 25, conservation 25] en: [and 50, plus 50] esun: [trading 91, trade 88, shopping 88, deal 75, commerce 69, purchase 67, sales 67, buy 65, transaction 64, market 62, sale 60, exchange 58, sell 57, retail 56, business 48, shop 46, store 36, commercial 36, financial 29, enterprise 27, economy 25, franchise 25] ijo: [thing 100, stuff 100, item 100, something 100, object 100, entity 82, phenomenon 67, material 63, matter (n) 62, substance 53, anything 50, element 38, asset 33, being 33, chemical 32, subject 30, product 29, stock 27, example 25] ike: [bad 100, harsh 82, badly 81, mean (adj) 77, evil 75, negative 73, problem 70, horrible 67, terrible 61, unfortunate 60, poorly 59, offensive 57, awful 55, trouble 53, tragic 50, cruel 46, wrong 43, inappropriate 42, issue 42, complexity 42, unfair 40, awkward 40, complicated 39, vice 36, hostile 33, difficulty 31, nasty 31, corruption 30, corrupt 30, hard (difficult) 29, harm 29, complex 29, danger 29, cursed 29, challenging 29, toxic 27, chaos 27, difficult 27, disorder 26] ilo: [tool 100, device 95, equipment 85, machine 84, app 73, hardware 64, robot 59, technological 53, mechanical 52, gear 50, tech 47, mechanism 46, technical 43, software 43, utility 40, instrument 31, application 30, technology 29, computer 26] insa: [internal 100, inner 100, interior 93, centre 91, guts 71, core 67, central 60, inside 58, middle 56, belly 54, stomach 41, internal organ 38, within 35, insert 31, content 27, amid 27, between 27] jaki: [dirty 93, trash 89, gross 87, garbage 86, mess 82, disgusting 79, junk 75, bacteria 67, nasty 62, crap 47, toxic 47, waste 47, infection 44, disease 37, shit 33, virus 30, pollution 27, bullshit 27, illness 20] jan: [person 100, human 93, people 82, anybody 62, dude 61, anyone 56, character 50, somebody 50, guy 43, being 42, individual 31, civilian 30, whoever 30, citizen 30, participant 29, Hominidae 27, personal 27] jelo: [yellow 94, golden 25] jo: [have 100, possess 95, carry 90, contain 75, own 73, hold 71, possession 68, ownership 67, include 42, consist 42, comprise 41, grasp 33, equip 31, bring 29, grip 27] kala: [fish 100, sea creature 82, salmon 62] kalama: [sound 100, noise 79, tone 50, bang 27] kama: [coming 93, come 91, arrival 90, arrive 88, become 78, upcoming 71, emerging 69, emerge 67, happen 62, occur 54, next 36, developmental 33, arise 33, visit 31, induce 31, trigger 29, phenomenon 27, event 27] kasi: [plant 95, bush 61, herb 40, tree 32] ken: [able 100, potential 94, ability 93, capability 92, capable 90, may 88, possible 86, could 81, eligible 80, can 79, possibility 75, permission 69, likelihood 60, chance 57, probability 56, available 53, opportunity 53, maybe 53, possibly 50, odds 45, patentially 40, perhaps 40, liberty 36, might 33, option 33, viable 33, enable 33, privilege 31, allow 30, likely 30, prospect 27, freedom 27] kepeken: [use 93, utilize 75, via 60, employ 50, used 40, operate 27, interact 26, equip 25] kili: [fruit 95, vegetable 94, apple 82, kumquat 42, fungus 33, nut 29, bean 29, onion 28, tomato 27] kin: [also 79, too 73, indeed 25, especially 25] kiwen: [solid 100, rock 93, stone 84, hard object 79, concrete 60, metal 57, steel 56, iron 50, firm 44, stiff 44, silver 31, plastic 25] ko: [goo 88, semisolid 86, paste 73, powder 73, clay 60, sand 38, dust 36, substance 33, cream 33, dough 30, mud 28] kon: [soul 100, air 100, spirit 86, gas 83, essence 65, atmosphere 64, oxygen 60, breathe 60, breath 57, meaning 55, intangible 53, breathing 45, invisible entity 45, definition 34, abstract 33, breeze 33, smell 29] kule: [colour 100, diverse 36, LGBTQ+ 35, paint 33, lesbian 30, gay 30, spectrum 27] kulupu: [group 100, organization 100, community 95, collective 91, tribe 83, squad 80, tribal 75, bunch 75, cluster 71, league 70, collection 67, society 67, association 65, crew 64, team 60, club 57, coalition 54, set 54, socially 53, gathering 53, category 50, institution 50, gang 46, assembly 45, meeting 45, pile 44, network 44, crowd 41, ethnic 40, bureau 38, partnership 38, social 38, class 38, array 36, stack 35, committee 33, public 33, affiliation 33, combination 31, sequence 29, pack 27, establishment 27, conference 25, franchise 25, demographic 25, company 25, rally 25] kute: [hear 100, listen 93, ear 90, hearing 89] la: [if 88, while 48, depending 43, regarding 38, than 33] lape: [sleep 100, asleep 80, rest 58, lay 31, lie (be in flat position) 26] laso: [blue 81, teal 71, green 47] lawa: [govern 100, head 100, authority 79, control 77, ruling 75, regulatory 70, leading 70, manage 65, administrative 64, leadership 63, rule 60, law 60, lead 57, management 54, legal 50, enforce 50, oversee 50, judicial 50, mind 50, conduct 47, official 47, regulate 45, brain 45, policy 44, administer 44, regulation 36, executive 36, cognitive 36, guide 36, drive 36, mandate 36, ownership 33, administration 33, government 30, command 30, dominate 29, psychological 29, institutional 27, legislation 27, jurisdiction 25, main 25, regime 25] len: [clothing 100, cloth 100, clothes 93, fabric 92, outfit 74, privacy 67, cover 64, dress 58, jacket 47, wear 45, shirt 42, t-shirt 40, hide 37, blanket 36, cotton 33, private 32, wrap 31, costume 30, silk 27, suit (n) 26, hidden 25, underwear 25, canvas 25, coverage 25, flag 25] lete: [cold 100, raw 58, frozen 45, freeze 27, cool 25] lili: [small 100, little 100, slight 91, short 91, reduce 83, junior 83, slightly 80, minimize 75, narrow 71, bit 69, minor 69, partly 67, reduction 64, brief 63, young 62, fewer 60, less 59, diminish 57, tiny 56, barely 54, decrease 53, minimal 53, partially 50, somewhat 50, thin 45, inch 45, shallow 45, subtle 44, lightly 42, kinda 41, hardly 39, partial 36, tight 33, particle 31, mere 29, mild 27, ounce 27, quarter 27, gram 26, shortage 25] linja: [line 100, string 100, cord 100, rope 92, thread 65, fibre 54, cable 43, link 43, connection 38, ray 36, streak 36, row 36, wire 33, hair 30, sequence 29, chain 27, connect 27, straight 25] lipu: [paper 93, book 92, ticket 90, document 88, article 86, card 85, page 82, magazine 70, sheet 69, file 64, website 60, essay 57, novel 50, letter (in mail) 47, sign 43, publication 41, doc 39, certificate 39, literature 38, journal 38, flat 37, blog 36, list 36, pad 30, poster 27, newspaper 27, form 26, tag 25] loje: [red 95] lon: [at 100, existing 100, real 100, exist 100, located 93, presence 89, yep 87, existence 87, actual 86, on 83, true 81, living 73, yes 71, truth 67, reality 64, physical 62, yeah 62, genuine 60, upon 60, truly 60, in 57, alive 56, position 55, accurate 52, exactly 50, occupy 50, live 47, attendance 46, certainly 45, attend 42, indeed 42, right (not wrong) 41, life 40, definitely 40, legitimate 36, honestly 36, onto 36, location 35, correct 33, validity 33, correctly 33, occur 31, precisely 30, certain 30, status 30, physically 30, placement 29, sure 27, mm-hmm 27, fact 27, amid 27, availability 27, frankly 25, of course 25, regarding 25] luka: [hand 100, arm 68, five 64, wrist 50, touch 33, palm 32, handful 29, gesture 27, tap 26, reach 25, elbow 25] lukin: [see 100, observe 92, look at 86, sight 85, gaze 83, observation 83, check 77, view 74, scan 67, watch 65, visual 64, examine 60, inspection 60, vision 60, notice 53, surveillance 50, attention 50, appearance 50, examination 47, detect 46, assess 40, stare 38, perception 36, perceive 36, try 36, glance 33, impression 33, reading 31, regard (v) 29, apparent 27, visible 27, read 27, seek 26, eye 26, investigation 25, monitor 25, encounter 25] lupa: [hole 94, door 87, orifice 79, pit 77, window 57, gate 45, entrance 40, opening 27, gap 27, dig 21] ma: [territory 100, country 100, land 93, realm 91, area 81, field 80, region 80, place 73, soil 73, earth 71, province 70, zone 69, ground 64, nation 62, environmental 57, environment 54, site 50, location 50, domain 45, world 45, national 45, nature 43, setting 40, landscape 40, continent 40, outdoors 38, habitat 36, dirt 33, sector 31, yard 29, kingdom 28, venue 27, outside 26, acre 25] mama: [parent 100, parental 90, mama 88, mommy 80, mom 75, creator 53, mother 50, foster 44, originator 43, father 40, daddy 38, founder 30, dad 25] mani: [money 100, cash 93, monetary 83, currency 82, treasure 73, wealth 71, worth 70, cattle 68, dollar 67, financial 64, funding 57, fiscal 54, wage 50, fee 50, cost 47, valuable 43, pension 40, expense 39, economic 39, fund 39, revenue 38, budget 38, salary 38, credit 36, compensation 33, earnings 33, price 33, value 32, income 31, subsidy 31, profit 31, cow 30, toll 30, payment 29, large domesticated animal 27, wealthy 25] meli: [female 100, lady 79, woman 77, girl 50, wife 40, cisgender woman 31, transgender woman 29, maâ€™am 27] mi: [me 100, my 100, I 100, mine 63, our 63, myself 47, us 43, we 38, self 38, ours 36, ourselves 26] mije: [male 94, man 90, husband 55, cisgender man 50, sir 35, boyfriend 29, guy 29, gentleman 24, transgender man 18] moku: [food 100, eat 100, eating 100, consume 97, dining 88, meal 83, consumption 83, swallow 68, dinner 50, nutrition 50, drinking 47, chew 44, groceries 43, absorb 35, drink 27, lunch 26] moli: [death 100, killing 100, dead 94, die 75, dying 69, kill 64, deadly 38, execution 27] monsi: [butt 93, back (anatomy) 73, ass 67, behind 35] mu: [woof 100, meow 100, animal vocalization 93, ribbit 93, purr 92, neigh 88, cock-a-doodle-doo 58] mun: [moon 95, celestial body 80, star 25, planet 19] musi: [entertainment 100, fun 100, funny 91, play 87, game 86, comedy 83, art 58, artistic 50, fascinating 38, humour 36, interesting 31, irony 28, sport 27, enjoy 27, creative 27, playoffs 25] mute: [plenty 100, multiple 100, many 100, much 100, very 93, lots 92, several 86, numerous 80, various 75, most 70, quantity 64, twenty 59, fifty 55, thousand 50, nine 50, majority 48, incredibly 45, million 44, fifteen 40, dozen 40, amount 40, twelve 39, eight 38, countless 36, hundred 36, billion 35, greatly 33, frequent 33, mostly 32, highly 32, excessive 31, exceed 30, six 30, trillion 29, quite 29, deeply 29, thirty 29, dose 27, particularly 27, increasingly 26, ten 26, extremely 25] namako: [spice 82, extra 65, adornment 50, additional 50, extension 38, bonus 37, salt 32, fancy 31, special 27] nanpa: [number 100, count 80, score 57, rating 46, rank 44, measurement 43, ranking 43, statistical 42, quantity 36, calculate 35, grade 33, percentage 33, edition 31, percent 30, statistics 30, version 27] nasa: [weird 100, unusual 88, strange 88, odd 83, drunk 64, silly 58, wild 50, ridiculous 36, psychoactive 31, nonsense 27, confuse 27, suspicious 25] nasin: [road 100, way 100, doctrine 92, method 91, path 83, avenue 80, manner 80, route 75, direction 73, street 71, trail 70, orientation 70, mode 69, technique 67, system 56, layout 56, course 55, passage 54, process 54, track 53, format 52, ideology 50, tactic 48, custom 45, aisle 44, journey 44, lane 43, norm 40, guideline 39, style 39, regular 38, procedure 35, protocol 33, order 33, plan 33, channel 32, routine 31, strategy 30, pattern 28, theme 27, composition 25, policy 25, angle 25, tendency 25] nena: [hill 67, nose 50, ridge 33, button 33, peak 29, mountain 25, pile 22, breast 19, mount 18, fold 13] ni: [this 100, that 86, these 83, those 77, particular 31, specifically 27, there 25] nimi: [word 100, name 100, term 55, title 50, lyrics 40, label 33, brand 29, so-called 29] noka: [leg 93, foot 67, lap 55, ankle 50, kick 43, heel 38, knee 33, base 31] o: [hey 50, shall 42, should 37, ought 29, must 24, please 16, let 10, dare 9, mandate 9, dear 6] oko: [eye 68, vision 30] olin: [loving 100, love 96, romance 69, romantic 60, compassion 50, attraction 40, intimate 33, passion 29, beloved 27, loyalty 23, loyal 20, faithful 20, dear 17, mercy 16, darling 16, passionate 16, care 14, appreciation 13, crush 13, respect 13] ona: [its 100, her 95, them 90, their 83, him 80, he 80, she 80, they 79, his 73, it 73, themselves 53, itself 47, himself 36, herself 36] open: [open 100, begin 100, start 91, beginning 82, initiate 73, starting 69, opening 60, initial 40, access 36, entry 36, engage 33, launch 33, starter 32, introduction 25, origin 25] pakala: [broken 100, destruction 100, mistake 82, damage 81, damn 79, goddamn 75, ruin 75, burst 75, accident 73, destroy 71, heck 67, error 67, hurt 67, injure 65, crash 65, fail 64, harm 64, break 63, failure 57, fault 57, injury 55, flaw 53, crack 52, collapse 50, snap 48, fuck 47, fucking 42, trouble 40, rip 38, explode 33, crush 33, wound 33, violate 30, offense 29, strike 29, boom 27, crap 27] pali: [work 100, do 100, construct 94, make 93, produce 93, activity 93, job 92, build 92, production 91, labour 90, working 90, action 87, task 86, create 84, function 83, occupation 81, operating 69, project 67, execute 67, craft 64, manufacturing 64, develop 60, generate 60, compose 58, assemble 58, act 57, profession 55, assignment 53, commit 50, perform 50, enact 50, operation 50, creation 50, effort 48, service 48, accomplish 47, implement 47, operate 47, implementation 45, behaviour 43, processing 43, behave 43, career 41, actively 40, employment 40, practice 38, development 38, execution 36, invent 36, industry 36, role 35, procedure 35, functional 35, construction 33, achieve 33, prepare 33, interact 32, undergo 31, accomplishment 31, undertake 29, busy 29, behavioural 28, productive 27, industrial 27, plan 25, participation 25, manipulate 25] palisa: [stick 100, rod 94, stake 80, pole 67, branch 60, staff 41, straight 25, bar 25, stem 18, beam 18] pan: [bread 100, grain 81, wheat 67, rice 53, corn 30, carbohydrate 25] pana: [give 100, put 93, deliver 90, grant 85, delivery 82, send 80, submit 78, provide 73, transfer 71, distribute 65, distribution 58, donate 57, appoint 55, contribute 53, output 52, given 50, publishing 50, yield 50, share 50, offering 47, assign 47, deploy 47, deposit 45, convey 44, offer 40, input 40, emission 40, lend 40, supply 40, release 37, pour 37, publish 37, provision 36, gift 36, export 36, shared 36, serve 35, spend 35, spread 33, attach 33, administer 33, devote 33, serving 33, donation 33, contribution 31, added 31, post 31, toss 30, apply 30, transmission 30, present 29, bring 29, add 29, install 28, show 26, introduce 26, dedicate 25, exhibit 25, insert 25] pi: [concerning 20, about 9, of (seperates descriptors)] pilin: [feeling 100, emotion 100, feel 92, sentiment 83, mood 80, emotionally 76, heart 70, sense 69, attitude 64, emotional 62, opinion 55, notion 55, assume 50, impression 50, hypothesis 50, perceive 50, deem 47, thinking 40, believe 40, assumption 40, thought 39, speculation 38, conscience 36, suppose 36, experience 35, stimulus 33, reaction 30, suspicion 30, belief 29, perception 27, touch 27, idea 27, estimated 25, consider 25, outlook 25, think 24, mentally 24] pimeja: [dark 100, black 100, darkness 100, shadow 50, shade 47] pini: [end 100, finish 94, shut 87, ending 80, cease 70, outcome 70, conclude 70, close (v) 65, closed 64, quit 55, latter 55, final 50, complete 47, stop 47, off 44, cancel 43, conclusion 40, result 40, previous 36, pause 33, interrupt 32, lock 30, over 29] pipi: [bug 100, insect 92, spider 48] poka: [side 100, hip 67, beside 57, aside 45, closely 40, left (not right) 25, sidebar 25, alongside 25] poki: [container 100, jar 92, box 90, package 89, bag 87, basket 71, bucket 67, bottle 65, pot 64, cabinet 61, classify 55, drawer 50, locker 50, storage 50, case 45, bowl 42, sack 40, cup 36, pack 33, cage 33, purse 31, trunk 29, pitcher 27, cell 26] pona: [good 100, appropriate 90, nice 88, acceptable 81, simply 80, OK 80, fine 80, proper 80, quality 79, valid 75, pleasant 73, friendly 72, positive 70, well 70, simple 69, benefit 69, virtue 67, alright 64, correct 60, fix 57, repair 57, cool 55, advantage 55, right (not wrong) 55, okay 54, fixed 54, validity 53, helpful 53, kind 53, merit 50, successfully 50, ethical 50, peaceful 50, ideal 50, improve 50, improvement 47, correction 46, fair 45, grace 45, heal 43, ease 43, successful 43, supportive 42, awesome 41, approval 41, correctly 40, adequate 40, effectiveness 40, reasonable 38, decent 38, thanks 36, welfare 36, peace 36, wonderful 36, plain 36, properly 36, fairly 36, civil 36, terrific 36, improved 33, worthy 33, well-being 33, lovely 33, natural 33, resolve 33, easy 33, elementary 33, enhance 33, efficiency 32, mercy 32, useful 31, justice 31, elegant 31, beautiful 31, courtesy 31, effective 31, comfortable 30, reliability 29, perfect 29, please 28, relieve 28, basic 27, better 27, honest 27, solve 27, free 27, success 26, fascinating 25, qualify 25, morality 25, easily 25, excellent 25, sufficient 25] pu: ["interact with Toki Pona: The Language of Good 82", officially 27] sama: [alike 100, equal 100, similar 90, equivalent 87, as 80, similarly 62, equality 55, equally 54, like 47, identical 45, likewise 40, related 40, relation 36, constant 36, associated 36, relate 35, seem 33, even 33, copy 31, mutual 29, equity 29, resemble 27, fellow 25] seli: [fire 100, heat 100, hot 92, burning 85, flame 83, burn 70, warm 65, warming 58, bake 36, temperature 36, cook 31, boil 30, cooking 27, tropical 17] selo: [skin 83, boundary 65, surface 60, peel 50, outer 50, shape 44, layer 42, outline 40, edge 40, external 36, border 32, frame 30, margin 29, shell 27, barrier 22, cover 21, appearance 17] seme: [what 100, which 69, huh 44] sewi: [divine 100, upper 100, sacred 80, top 76, holy 73, sky 71, elevated 69, high 60, spiritual 50, raise 50, supreme 50, highly 47, peak 43, God 39, rise 37, above 36, superior 36, magical 30, summit 27, weather 25, upstairs 25, religious 25, arise 25] sijelo: [body 100, torso 64, flesh 50, physically 40, form 35, figure 32, self 23, physical 23] sike: [round 100, circle 100, sphere 82, ball 77, loop 71, cycle 70, wheel 64, disc 59, globe 55, circuit 46, spin 36, ring 33, surround 31, curve 25, rolling 25, spot 25, orbit 23, twist 21, roll 20] sin: [new 100, newly 92, fresh 87, back (i.e. as before or returned) 40, again 40, unprecedented 33, innovative 32, modern 30, another 27, additionally 27, recent 27, repeat 26, innovation 25, young 23] sina: [you 94, your 88, yours 83, yourself 67] sinpin: [front 92, face (n) 62, wall 50, chest (anatomy) 27, ahead 24, barrier 22] sitelen: [picture 100, image 97, graphic 93, symbol 89, drawing 88, illustration 86, photo 85, write 75, painting 75, illustrate 75, writing 75, written 73, depict 68, draw 67, photograph 64, portrait 55, icon 53, representation 50, mark 47, portray 45, record 40, render 36, text 33, note 30, sign 29, pattern 28, graph 27, poster 27, compose 25, letter (of alphabet) 24] sona: [information 100, know 100, knowledge 100, understand 94, understanding 93, aware 83, info 79, wisdom 73, awareness 68, known 62, data 60, wise 58, recognition 55, recognize 50, expertise 42, intelligence 40, smart 38, sure 36, experienced 33, insight 31, educational 28, identify 28, remember 27, conscious 27, clever 27, cognitive 27, logical 27, familiar 27, logic 25, acknowledge 25, skill 25] soweli: [animal 95, deer 87, creature 71, dog 67, cat 61, llama 58, goat 56, Musteloidea 50, beast 43, lion 42, pig 40, capybara 40, wolf 36, horse 32, mouse (2020) 30, tiger 29, large domesticated animal 27, Hominidae 27, procyonid 26, monkey 26, rabbit 25] suli: [large 100, importance 100, big 100, important 92, significant 87, matter (v) 86, significantly 80, grand 80, huge 79, tall 77, weight 77, vast 77, crucial 75, extensive 73, prominent 73, broad 70, fat 70, substantial 69, long 69, size 67, significance 67, heavy 65, giant 65, extended 64, wide 64, considerable 63, thick 62, major 60, tremendous 56, extent 55, magnitude 54, great 53, vital 50, length 50, height 50, greatly 47, importantly 47, severe 44, dramatically 42, mass 42, essential 40, largely 40, relevant 40, massive 40, fundamental 38, emphasize 38, stretch 37, enormous 37, extend 37, heavily 36, critical 33, expansion 33, expand 33, depth 32, volume 31, extension 31, age 31, profound 30, deeply 29, density 29, widely 29, influential 28, dominant 27, grow 27, growth 27, dramatic 27, super 27, emphasis 27, remarkable 25, mainly 25] suno: [sun 94, solar 93, light 77, sunlight 75, bright 64, shine 60] supa: [platform 86, table 83, shelf 80, board 67, furniture 50, flat 47, lie (be in flat position) 47, level 44, desk 43, deck 40, couch 40, stage 38, seat 38, bench 38, tablet 33, surface 30, chair 29, counter 28, pad 25] suwi: [sweet 100, cute 92, candy 65, sugar 58, gentle 33, dessert 32, tender 31, soft 27, darling 26, treat 25] tan: [from 93, reason 86, because of 80, by 70, source 64, behalf of 40, basis 40, origin 40, motive 38, cause 36, purpose 33, per 33, since 32, factor 29, incentive 27] taso: [only 100, but 100, solely 82, however 82, exclusively 80, although 80, though 79, just 71, exclusive 70, despite 69, nonetheless 67, mere 64, merely 58, except 53, yet 50, sole 50, nevertheless 50, whereas 45, regardless 33, exception 27] tawa: [move 100, go 100, toward 100, motion 100, movement 94, towards 93, to 93, for 81, transit 80, travel 69, transportation 60, trip 60, walk 58, advance 56, onto 55, transport 50, pass 50, walking 47, migration 46, departure 45, from the perspective of 44, push 43, march 38, slide 36, proceed 36, forth 36, drift 35, according to 33, mobile 30, until 30, transfer 29, cross 29, till 27, approach 27, forward 26, momentum 25, attend 25, progress 25] telo: [fluid 100, water 94, wet 73, wash 52, pond 45, pool 42, drink 33, shower 30, lake 29] tenpo: [time 100, timing 72, session 71, occasion 65, phase 64, moment 56, date 50, circumstance 50, hour 47, appointment 44, scenario 42, event 40, season 39, period 38, interval 31, situation 31, instance 25] toki: [communicate 100, speak 100, say 100, conversation 100, communication 100, hello 100, speech 100, talk 100, language 94, tell 93, statement 92, hi 88, discuss 83, discussion 82, discourse 75, mention 73, comment 67, refer 62, message 61, express 60, remark 60, dialogue 60, reporting 56, call 56, narrative 53, contact 50, respond 50, commentary 50, disclose 50, proposal 47, admit 47, verbal 47, tale 46, story 44, declare 44, interview 44, testify 43, answer 43, report 42, expression 42, phrase 41, excuse 40, hey 40, response 39, reply 39, greet 36, confess 33, declaration 33, interaction 33, suggest 33, quote 32, state 31, preach 31, describe 30, negotiate 30, specify 27, claim 27, feedback 26, counsel 25, coverage 25, proposition 25, suggestion 25, accuse 25, consult 25] tomo: [building 100, house 94, housing 86, chamber 85, home 82, room 81, shelter 80, residence 68, suite 59, domestic 58, structural 54, structure 53, facility 50, residential 50, establishment 45, household 43, cabin 42, apartment 42, station 39, hall 38, venue 33, institute 33, construction 33] tu: [two 100, pair 88, double 80, both 64, twice 50, couple 50, cut 38, divide 35] unpa: [sex 100, sexual 95, sexually 92, fucking 42, fuck 40] uta: [mouth 100, lip 47, kiss 44, jaw 42, bite 31, chew 25] utala: [battle 100, fight 100, fighting 100, combat 94, conflict 93, contend 90, assault 88, attack 82, versus 69, compete 67, violent 67, challenge 64, hit 63, violence 63, struggle 60, war 58, contest 56, oppose 50, dispute 50, competitive 40, tackle 40, competition 38, aggressive 36, resist 36, beat 35, opposed 33, punch 33, hostile 33, confront 31, riot 30, opposition 30, against 29, strike 29] walo: [white 100, pale 74] wan: [one 93, united 92, unity 90, combined 70, unite 67, single 64, unit 60, blend 50, combine 44, union 43, bind 40, solo 40, whole 38, integration 37, integrate 36, component 28, alone 27, together 26, segment 25, mix 25, particular 25, independent 24, portion 24, slice 23, primary 23, combination 23, part 22] waso: [bird 100, chicken 44, duck 40, turkey 33, eagle 30, bat 23] wawa: [strength 100, power 100, powerful 92, strong 88, energy 88, strongly 82, force 73, intense 71, bold 68, intensity 65, reinforce 63, firmly 62, strengthen 62, charge 53, brave 47, rapid 42, electrical 42, might 40, tough 35, electricity 33, fast 30, rapidly 30, compelling 27, confident 27, quickly 27, glory 25, boost 25, severe 25] weka: [rid 100, removal 100, remove 93, eliminate 80, apart 80, omit 80, missing 73, away 73, absence 71, loss 69, dismiss 67, delete 67, distant 64, leave 64, abandon 63, vanish 60, far 60, disappear 47, avoid 47, exclude 45, out 45, escape 42, distance 42, drain 40, flee 38, withdraw 33, reject 33, ban 31, sweep 31, exit 31, resign 31, separation 30, skip 29, strip 29, wipe 27, fade 27, lack 27, remote 25, lose 25, separate 25] wile: [want 100, wish 94, intend 93, require 90, need 88, desire 87, intention 84, willing 83, will 81, intent 80, preference 79, motivation 75, necessity 73, ought 71, yearn 71, necessary 70, willingness 67, ambition 67, hope 67, prefer 67, requirement 64, required 61, must 59, obligation 56, decision 54, should 53, demand 50, eager 50, request 47, agenda 41, goal 40, would 38, select 38, motive 38, interested 36, criteria 36, dare 36, opt 36, choose 35, consent 35, expectation 33, shall 33, urge 33, determination 33, pick 33, objective 33, depend 32, elect 31, dependent 31, deserve 30, selection 29, incentive 27, strive 27, choice 27, supposed 25, interest 25, enthusiasm 25] namako: [spice 82, extra 65, adornment 50, additional 50, extension 38, bonus 37, salt 32, fancy 31, special 27] kin: [also 79, too 73, indeed 25, especially 25] oko: [eye 68, vision 30] kipisi: [split 69, division 65, slice 62, cut 56, divide 55, chop 50, segment 50, section 42, portion 38, piece 35, part 33, half 31, rip 31, clip 30, separation 30, chunk 28, carve 27, separate 25, sector 25, percentage 25] leko: [square 64, cube 50, block 43, stair 39, brick 31, polyhedron 30] monsuta: [scary 60, fear 59, monster 58, horror 42, scare 38, disturbing 30, terror 30, beast 29, afraid 27, demon 25] tonsi: [non-binary person 59, transgender person 56, gender non-conforming person 53, intersex person 36] jasima: [reflect 59, opposite 40, reverse 35] kijetesantakalu: [procyonid 53, Musteloidea 30] soko: [mushroom 53, fungus 42] meso: [average 53, moderate 50, medium 47, intermediate 29, ordinary 29] epiku: [epic 50, awesome 29, amazing 28] yupekosi: [change a creative work and unintentionally make it worse 50] kokosila: [speak another language in a Toki Pona only environment 50] lanpan: [steal 48, seize 42, grab 25] n: [um 47, mmm 40, hmm 33] misikeke: [medication 46, medicine 42, cure 40, pill 30, medical 30] samu: [wanting to create new words 40] apeja: [shame 40, embarrassed 27, guilt 17] mulapisu: [pizza 40] majuna: [elderly 36, old 33, senior 21, historical 20, ancient 17, elder 15] powe: [fake 36, pretend 33, trick 31, false 25, myth 21, lie (saying untruth) 21, fraud 20, trap 19, illusion 15, fantasy 14] misa suli: [capybara 30] isipin: [think 29, consciousness 18, imagination 15, theory 13] unu: [purple 27] pake: [prevent 30, stop 27, lock 20, forbid 20, wall 17, interrupt 16, intervention 14, deny 13, limitation 13, cease 13, restrict 13] linluwi: [network 25, Internet 15, virtual 13, web 9, digital 8, connection 8, net 7] kapesi: [brown 24, grey 7] wa: [whoa 23, wow 11] kiki: [spiky 21, sharp 14, angle 8, point 6] sutopatikuna: [platypus 20] misa: [Glires or Eulipotyphla 18, capybara 10] kan: [alongside 17, together 16, with 13, associated 9, involved 8, amid 7] waleja: [context 15, circumstance 14, attention 10, theme 9, situation 8, background 8, emphasize 8, emphasis 7, topic 6, case 5, subject 4, premise 4] kuntu: [laughter 14, chuckle 13, laugh 8, comedy 8] ete: [exceed 20, beyond 14] loka: [limb 13] po: [four 10] taki: [bond 10, attract 8, attach 8, clip 4] oke: [OK 10, alright 9, fine 7] ke: [alright 9] teje: [right (not left) 9] soto: [left (not right) 8] pata: [sibling 7, cousin 6] kamalawala: [revolution 7] likujo: [seven 7, gathering 7, collection 3] peto: [cry 7] pomotolo: [tomato 7] te: [(opening quotation particle) 7] to: [(closing quotation particle) 7] usawi: [magic 7] Pingo: [car 6] kese: [LGBTQ+ 6] san: [three 4] ewe: [stone 3] li: [Seperates the Subject from the Predicate]'
	var finalArray = [];
	var words = words.split("] ")
	for(var i = 0 ; i < words.length; i++) {
		 var result = words[i].split(":")[0];
		 var def = words[i].split(":")[1];
		 def = def.replace(/ [0-9]/g, "");
		 def = def.replace(/[0-9]/g, "");
		 def = def.replace(/ \[/, "");
		 def = def.replace(/\]/, "");
		 finalArray[i] = result + "|" + def 
	}
	words = finalArray;

function findDef(word) {
	for(var i = 0; i < words.length; i++) {
		if(words[i].split("|")[0] == word.toLowerCase()) {
		 return words[i].split("|")[1];
		}
	}
}
var translateInput = document.querySelector("#translateField");
var translateSubmit = document.querySelector("#submitTranslate");
var translateResult = document.querySelector("#translateResult");
translateSubmit.addEventListener("click",()=>{
	translateResult.innerHTML = "";
	var input = translateInput.value.split(" ");
	for(var i = 0; i < input.length; i++) {
		translateResult.innerHTML += "<b>"+input[i] + "</b> - " + (findDef(input[i]) ?? "Word does not exist, did you make a typo?") + "<br>"
	}
})

function findWord(word) {
	for(var i = 0; i < words.length; i++) {
		for(var k = 0; k < words[i].split("|")[1].split(" ").length; k++) {

			if(words[i].split("|")[1].split(" ")[k].toLowerCase() == word.toLowerCase() ||words[i].split("|")[1].split(" ")[k].toLowerCase() == word.toLowerCase() + ",") {
				return words[i].split("|")[0];
			}
		}
	}
}
var findInput = document.querySelector("#findField");
var findSubmit = document.querySelector("#submitFind");
var findResult = document.querySelector("#findResult");
findSubmit.addEventListener("click",()=>{
	findResult.innerHTML = "";
	var input = findInput.value.split(" ");
	for(var i = 0; i < input.length; i++) {
		input[i] = input[i].replace(/\./g, "")
		input[i] = input[i].replace(/\,/g, "")
		input[i] = input[i].replace(/\?/g, "")
		input[i] = input[i].replace(/\!/g, "")
		input[i] = input[i].replace(/\:/g, "")
		findResult.innerHTML += "<b>"+input[i] + "</b>: " + (findWord(input[i]) ?? "No match exists, try being broader or simpler.") + "<br>";
		for(var k = 0; k < findWord(input[i]).split(" ").length; k++) {
			findResult.innerHTML += findWord(input[i]).split(" ")[k] ?? "No match exists, try being broader, use a synonym, or be more simple.";
			findResult.innerHTML += " - "
			findWord(input[i]) != undefined ? findResult.innerHTML += (findWord(input[i]) != null ? findDef(findWord(input[i]).split(" ")[k]) : null) + "<br>": null;
		}
		findResult.innerHTML += "<br>"
	}
})
