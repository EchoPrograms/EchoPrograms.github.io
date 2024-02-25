var input = document.getElementById("latininput");
var submitButton = document.getElementById("submit");
var output = document.getElementById("output");
var latinInput;
var feminineNouns = {};
var masculineNouns = {};
var neuterNouns = {};
class noun  {
	constructor(
	word,
	gender) {
		this.nominative = { 
			"singular":  {}, 
			"plural": nominativePlural 
		};
		this.dative = { "singular": dative, "plural": dativePlural };
		this.accusitive = { "singular": accusitive, "plural": accusitivePlural };
		this.ablitive = { "singular": ablitive, "plural": ablitivePlural };
		this.genitive = { "singular": genitive, "plural": genitivePlural };
		this.gender = gender;
	}
}
function baseToWordType(word, gender, Case, plural) {
	switch(gender) {
		case "feminine":
			switch(Case) {
				case "":
					if(plural) {
					
					} else {
					
					}
					break;
				case "":
					if(plural) {
					
					} else {
					
					}
					break;
			}
			break;
		case "masculine":
		
			break;
		case "neuter":
		
			break;
		default:
			return "invaild gender";
	}
}
submitButton.addEventListener("click",()=>{
	submit();
})	
function submit() {
	latinInput = input.value;
	output.innerHTML = latinInput;
	console.log(input.value);
}
// feminine
/*
 * N a ae
 * G ae arum
 * D ae is
 * Ac am as
 * Ab a is
 */
// masculine
/*
 * N us i
 * G i orum
 * D o is
 * Ac um os
 * Ab o is
 */
// Neuter
/*
 * N um i
 * G i orum
 * D o is
 * Ac um a
 * Ab o is
 */
 
//Verbs
/*
 *
 *
 *
 */