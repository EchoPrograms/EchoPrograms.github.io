var seed = 102;
var values = [];
var steps = 0;
var graph = document.getElementById('graph');
var seedInput = document.getElementById("seed");
var regenerateButton = document.getElementById("regenerate");
var dataContainer = document.getElementById("data");
var progressBarFiller = document.getElementById("progressBarFiller")
var progressBarData = document.getElementById("progressBarData")
var numHistory = [];
var unsortedNumHistory = [];
function evaluate(input) {
    values.push(input);
    steps++;
    if(input == 1) return;
    evaluate(input % 2 ? input * 3 + 1 : input / 2);
}
function graphNewSeed(input, draw = true) {
    
    values = []
    steps = 0;
    evaluate(input);
    

    

    numHistory.push({seed: input, steps: steps});
    unsortedNumHistory.push({seed: input, steps: steps});

    if(!draw) return;
    dataContainer.innerHTML = ""

    var seedNode = document.createElement("p");
    seedNode.innerHTML = "Seed: " + input;
    dataContainer.appendChild(seedNode)

    var stepNode = document.createElement("p");
    stepNode.innerHTML = "Steps: " + steps;
    dataContainer.appendChild(stepNode)

    var maxValue = document.createElement("p");
    maxValue.innerHTML = "Max Value: " + Math.max(...values);
    dataContainer.appendChild(maxValue)
    console.log("Seed: " + input + "\n" + "Steps: " + steps + "\n" + "Max Value: " + Math.max(...values))
    Plotly.newPlot(graph, 
        [
            {
                y: values,
                type: 'line'
            },
        ], 
        {
            margin: { l: 0} 
        }
    )
}
graphNewSeed(seed)



regenerateButton.addEventListener("click", ()=>{
    graphNewSeed(parseInt(seedInput.value.replaceAll(",","")))
})
var interval
var i = 0;

function searchRange(min, max) {
    i = min;
    progressBarFiller.style.width = "0%";
    loadingInterval = setInterval(()=>{
        progressBarFiller.style.width = (i - min) / (max - min) * 100 + "%";
        progressBarData.innerHTML = i + "/" + max;
    }, 250)
    interval = setInterval(() => { 
        i++; 
        graphNewSeed(i, false); 
        if(i == max) {  
            clearInterval(interval); 
            clearInterval(0); 
            clearInterval(loadingInterval);
            progressBarFiller.style.width = "100%";
            progressBarData.innerHTML = max + "/" + max;
            finished()
        }
    }, 0)
    
}
function finished() {
    numHistory.sort((a, b)=>{return b.steps - a.steps})
    graphNewSeed(numHistory[0].seed)
    
}

function plotHistory() {

    var values = [];
    for(var i = 0; i < numHistory.length; i++) {
            values.push(unsortedNumHistory[i].steps)
    }

    Plotly.newPlot(graph, 
            [
                {
                    y: values,
                    type: 'line'
                },
            ], 
            {
                margin: { l: 0} 
            }
        )

}
function plotStepMaxHistory() {

    var values = [];
    for(var i = 0; i < numHistory.length; i++) {
            values.push(numHistory[i].steps)
    }

    Plotly.newPlot(graph, 
            [
                {
                    y: values,
                    type: 'line'
                },
            ], 
            {
                margin: { l: 0} 
            }
        )

}