var isNotRed = true;

function setColor(toSet, starting){
	if(isNotRed == true) 
	{	
		document.querySelector("body").style.backgroundColor = toSet;
		isNotRed = false;
	} else 
	{	
		document.querySelector("body").style.backgroundColor = starting;
		isNotRed = true;
	}
	
}