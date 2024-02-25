class Term {
	constructor (str) {
		var varPos = str.search("x")
		
		this.termStr = str;
		this.degree = str.search(/\^/) != -1 ? parseInt(str.substr(str.search(/\^/) + 1, str.length)) : varPos != -1 ? 1 : 0;
		this.coeffecient = varPos != 0 ? parseInt(str.substr(0, varPos  == -1 ? str.length : varPos)) : 1;
		
	}
}
class Polynomial {
	constructor(str) {
		this.build(str);
	}
	evaluate(value) {
		var total = 0;
		this.terms.forEach((term)=>{
			
			total += term.coeffecient * (Math.pow(value, term.degree)) 
		})
		return total;
	}
	build(str) {
		this.terms = [];
		str.split(" + ").forEach((term)=>{
			this.terms.push(new Term(term));
		})
		setTimeout(()=>{redrawgraph()},10);
	}
	differentiate() {
		var derivative = "";
		
		for(var i = 0; i < this.terms.length; i++) {	
			var placementTerm = (i != 0 && this.terms[i].degree != 0 ? " + " : "")
			var coeffecientTerm = (this.terms[i].coeffecient * this.terms[i].degree);
			var degreeTerm = (this.terms[i].degree > 2 ? ("x^" + (this.terms[i].degree - 1)) : (this.terms[i].degree > 1 ? "x" : ""))
			derivative +=  placementTerm + (coeffecientTerm != 0 ? coeffecientTerm : "") + degreeTerm						
		}
		
		return derivative;
	}
	toString() {
		var equation = ""
		for(var i = 0; i < this.terms.length; i++) {	
			equation +=  (i != 0 ? " + " : "") + this.terms[i].termStr;	
		}
		return equation
	}
	orderByDegree() {
		this.terms.sort((a, b)=>{return b.degree - a.degree})
		return this.terms
	}

}

var equ = new Polynomial("-1x^2 + x + -2")	
var d_equ = new Polynomial(equ.differentiate())
function redrawgraph() {
	var graph = document.getElementById('graph');
	var d_equ = new Polynomial(equ.differentiate());
	equ.orderByDegree()
	var vertexX = d_equ.terms[1]  == null ? 0 : (0 - d_equ.terms[1].coeffecient) / d_equ.terms[0].coeffecient
	var x = []
	var y = []
	var x2 = []
	var y2 = [] 
	for(var i = -10; i < 10; i += 0.05) {
		x.push(parseFloat(i.toFixed(2)))
		y.push(equ.evaluate(i));
		x2.push(parseFloat(i.toFixed(2)))
		y2.push(d_equ.evaluate(i))
	}
	Plotly.newPlot( graph, 
		[
			{
				x: x,
				y: y 
			},
			{
				x: x2,
				y: y2 
			},
			{
				x: [vertexX],
				y: [equ.evaluate(vertexX)]
			}
		], 
		{
			margin: { l: 0, r: 0, b: 0,  t: 0 } 
			
		});
}






















	
//recursive solution
/*
var step = 0.01;

var index = 0;
var maxIndex = 7500
function recurse() {
	d_Y = d_equ.evaluate(startingX)
	startingX -= math.sign(d_Y) * step 
	index++;
	if(math.abs(d_Y) > 0.01 && index < maxIndex) {
		recurse();
	} else {
		console.log("Derivative pos: " + d_Y)
		console.log("Max: (" + startingX + ", " + equ.evaluate(startingX) + ")")
	}
}
*/








