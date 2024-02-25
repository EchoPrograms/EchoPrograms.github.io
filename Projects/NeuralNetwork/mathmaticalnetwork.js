class Layer {
  constructor(index, activationFunction, network) {
    this.biasMatrix = [];
    this.outputMatrix;
    this.layerArray = [];
    this.layerIndex = index;
    this.activationFunction = activationFunction;
    this.network = network;
  }
  calculateOutputMatrix(returnFunction, weightMatrix = null, inputLayerInputsMatrix = null) {
    if(this.layerIndex == 0) {
      
      this.outputMatrix = inputLayerInputsMatrix;
      returnFunction(this.layerIndex + 1, this.layerArray, this);
      return;
    }
    var inputMatrix = this.layerArray[this.layerIndex - 1].outputMatrix;
	  var multipliedMatrix = math.multiply(inputMatrix,weightMatrix);
    var z = math.add(multipliedMatrix, this.biasMatrix)
    var a = math.map(z, this.layerIndex == this.layerArray.length - 1 ? (x)=>{return x} : this.activationFunction)
    this.outputMatrix = a;
    returnFunction(this.layerIndex + 1, this.layerArray, a);
  }
}
class Network {
  constructor() {
    this.layerArray = [];
    this.weights = [];
  }
  createNetwork(inputCount, layerArray, outputCount, activationFunction, weightRange, biasRange) {
    var tempLayers = [];
    var tempWeights = [];
    var tempWeightArray = [];
    for(var i = 0; i < inputCount; i++) {
      tempWeightArray.push([]);
      for(var k = 0; k < layerArray[0]; k++) {
        tempWeightArray[i].push(getRandomRange(weightRange.min, weightRange.max));
      }
    }
    tempWeights.push(math.matrix(tempWeightArray))
    for(var i = 1; i < layerArray.length; i++) {
      tempWeightArray = [];
      for(var k = 0; k < layerArray[i - 1]; k++) {
        tempWeightArray.push([]);
        for(var j = 0; j < layerArray[i]; j++) {
          tempWeightArray[k].push(getRandomRange(weightRange.min, weightRange.max))
        }
      }
      tempWeights.push(math.matrix(tempWeightArray))
    }
    
    tempWeightArray = [];
    for(var i = 0; i < layerArray[layerArray.length - 1]; i++) {
      tempWeightArray.push([]);
      for(var k = 0; k < outputCount; k++) {
        tempWeightArray[i].push(getRandomRange(weightRange.min, weightRange.max));
      }
    }
    tempWeights.push(math.matrix(tempWeightArray))
    
    this.weights = tempWeights;
    
    for(var i = 0; i < layerArray.length + 2  ; i++) {
      tempLayers.push(new Layer(i, activationFunction, this));
      var temp = [[]]
      for(var k = 0; k < (i == layerArray.length + 1 ? outputCount : layerArray[i - 1]); k++) {
        temp[0].push(getRandomRange(biasRange.min, biasRange.max))
      }
      tempLayers[i].biasMatrix = math.matrix(temp);
    }
    for(var i = 0; i < tempLayers.length; i++) {
      tempLayers[i].layerArray = tempLayers;
    }
    this.layerArray = tempLayers;
    
  }
  
  importNetwork(networkSave) {
    var importObject = networkSave;
    this.weights = [];
    for(var i = 0; i < importObject.weights.length; i++) {
      this.weights.push(math.matrix(importObject.weights[i]));
    }
    
    this.layerArray = [];
    for(var i = 0; i < importObject.layers.length; i++) {
      this.layerArray.push(new Layer(i, window[importObject.layers[i].activationFunction], this))
      this.layerArray[i].biasMatrix = math.matrix(importObject.layers[i].biasMatrix);
    }
    for(var i = 0; i < this.layerArray.length; i++) {
      this.layerArray[i].layerArray = this.layerArray;
    }
  }
  
  exportNetwork() {
    var tempObject = {layers:[], weights:[]};
    for(var i = 0; i < this.layerArray.length; i++) {
      tempObject.layers.push(
        {
          biasMatrix: JSON.parse(this.layerArray[i].biasMatrix.format()),
          activationFunction: this.layerArray[i].activationFunction.name
        }
      );
    }
    for(var i = 0; i < this.weights.length; i++) {
      tempObject.weights.push(JSON.parse(this.weights[i].format()))
    }
    return tempObject;
  }
  
  clearNetworkOutput() {
    for(var i = 0; i < this.layerArray.length; i++) {
      this.layerArray[i].outputMatrix = undefined;
    }
  }
  
  runNetwork(inputArray) {
    this.clearNetworkOutput();
    var result = 0;
    function runOnCompleted(index, layerArray) {
      var weights = layerArray[0].network.weights;
      if(index == 0) {
        
        layerArray[index].calculateOutputMatrix(runOnCompleted, null, math.matrix(inputArray))
      }
      else if(index != layerArray.length - 1) {
        layerArray[index].calculateOutputMatrix(runOnCompleted, weights[index - 1])
      } else {
        layerArray[index].calculateOutputMatrix((index, array, output)=>{result = output}, weights[index - 1])
      }
    }
    runOnCompleted(0, this.layerArray)
    return result;
  }
  
}

function remap(value, min1, max1, min2, max2) {
	return min2 + (max2 - min2) * (value - min1) / (max2 - min1)
}
function getRandomRange(min, max) {
   return remap(Math.random(), 0, 1, min, max);
}
function sigmoid(x) {
   return 1 / (1 + Math.exp(-x));
}
function wide_sigmoid(x) {
  return 1 / (1 + Math.exp(-x / 100))
}
function sigmoid_d(x) {
	return sigmoid(x)*(1-sigmoid(x))
}
function ReLu(x) {
	return Math.max(0, x)
}
function leakyReLu(x) {
	return Math.max(0.01*x , x)
}
function tanh(x) {
	return Math.tanh(x);
}
function functionToLearn (x){
	return Math.max(0,x) - Math.max(0,x+4)
}
function sin(x) {
  return Math.sin(x)
}
var multiplyOutputValue = 4;

function testAgent(network, min, max, step, testFunction, isBest = false) {
  var totalCost = 0;
  var testedValues = [];
  var targetValues = [];
  var neuralValues = [];
  for(var i = min; i < max; i += step) {
    var netOutput = network.runNetwork([[i]])._data[0][0] * multiplyOutputValue;
    var wantedOutput = testFunction(i)
    var costLocal = (netOutput - wantedOutput) * (netOutput - wantedOutput);
    if(isBest) {
    testedValues.push(i);
    targetValues.push(wantedOutput)
    neuralValues.push(netOutput)
    }
    totalCost += costLocal;
    
  }
  if(isBest) graph(testedValues, neuralValues, targetValues);
  return totalCost;
}
const ctx = document.getElementById('myChart');
var chart = new Chart(ctx);
function graph(Labels, Neural, Target){
  chart.destroy()
  
  const data = {
    labels: Labels,
    datasets: [{
      label: 'Neural Network Output',
      data: Neural,
      fill: false,
      borderColor: 'rgb(73, 73, 200)',
      tension: 0.1
    },
    {
      label: 'Learning Function',
      data: Target,
      fill: false,
      borderColor: 'rgb(0, 255, 0)',
      tension: 0.1
    }]
  };
  const config = {
    type: 'line',
    data: data,
    options: {
      animation: {
          duration: 0
      }
    }
  };
  chart = new Chart(ctx, config)
}


var testMin = -10;
var testMax = 10;
var testStep = 0.05;
var nudgeMagnitude = 1
var finalCost;


var nudgedNet = new Network();
nudgedNet.createNetwork(1, [10, 10], 1, ReLu, {min: -1, max: 1}, {min: -1, max: 1})
var i = 0;
function TestNudge(max){
  nudgedNet.importNetwork(nudgeNetworkRandomOnce(nudgedNet.exportNetwork(), nudgeMagnitude))
  document.querySelector("#index").innerHTML = "Index: " + Math.abs(i - 1);
  i--;
  if(Math.abs(i) < max) {
    testAgent(nudgedNet, testMin, testMax, testStep, functionToLearn, true)
    setTimeout(()=>{TestNudge(max)},0)
  } else {
    document.getElementById("networkOutput").innerHTML = "network training:nudgeRandom min:" + testMin + " max:" + testMax + " cost:" + finalCost + " function:linear sigmoid<br>" + JSON.stringify(nudgedNet.exportNetwork())
    canRun = true;
    i = 0;
  }
}

function nudgeNetwork(network, step) {
  
  var net = new Network();
  net.importNetwork(network);
  
  var networkFinalNudges = JSON.parse(JSON.stringify(network));
  var tempNetwork = JSON.parse(JSON.stringify(network))
  var originalNetwork = JSON.parse(JSON.stringify(network))
  
  var originalCost = testAgent(net, testMin, testMax, testStep, functionToLearn);
  var finalCost = 100000;
  
  
  for(var i = 0; i < tempNetwork.weights.length; i++) {
    for(var k = 0; k < tempNetwork.weights[i].length; k++) {
      for(var j = 0; j < tempNetwork.weights[i][k].length - 1; j++)
        var originalValue = tempNetwork.weights[i][k][j];
      tempNetwork.weights[i][k][j] = Math.min(originalValue * (1 + step), 1);
      net.importNetwork(tempNetwork);
      if(testAgent(net, testMin, testMax, testStep, functionToLearn) <= originalCost) {
        networkFinalNudges.weights[i][k][j] = Math.min(originalValue * (1 + step), 1)
      } else {
        tempNetwork.weights[i][k][j] = Math.max(originalValue * (1 - step), -1);
        net.importNetwork(tempNetwork);
        if(testAgent(net, testMin, testMax, testStep, functionToLearn) <= originalCost) {
          networkFinalNudges.weights[i][k][j] = Math.max(originalValue * (1 - step), -1)
        } else {
          networkFinalNudges.weights[i][k][j] = originalValue;
        }
      }
    }
  }
  for(var i = 1; i < tempNetwork.layers.length; i++) {
    for(var k = 0; k < tempNetwork.layers[i].biasMatrix.length; k++) {
      var originalValue = tempNetwork.layers[i].biasMatrix[0][k]
      tempNetwork.layers[i].biasMatrix[0][k] = Math.min(originalValue * (1 + step), 1);
      finalCost = testAgent(net, testMin, testMax, testStep, functionToLearn)
      if(finalCost <= originalCost) {
        networkFinalNudges.layers[i].biasMatrix[0][k] = Math.min(originalValue * (1 + step), 4)
      } else {
        tempNetwork.layers[i].biasMatrix[0][k] = Math.max(originalValue * (1 - step), -1);
        net.importNetwork(tempNetwork);
        finalCost = testAgent(net, testMin, testMax, testStep, functionToLearn)
        if(finalCost < originalCost) {
          networkFinalNudges.layers[i].biasMatrix[0][k] = Math.max(originalValue * (1 - step), -4)
        } else {
          networkFinalNudges.layers[i].biasMatrix[0][k] = originalValue
        }
      }
    }
  }
  net.importNetwork(networkFinalNudges);
  document.querySelector("#cost").innerHTML = "Cost: " + (finalCost < originalCost ? finalCost : originalCost)
  console.log("Starting: " + originalCost + "  Best Training: " + finalCost)
  if(finalCost < originalCost) {
    return networkFinalNudges;
  } else {
    nudgeMagnitude *= (9 / 10);
    return originalNetwork;
  }
  
}

function nudgeNetworkRandomOnce(network, step) {
  var net = new Network();
  net.importNetwork(network);
  var networkFinalNudges = JSON.parse(JSON.stringify(network))
  var refrenceNetwork = JSON.parse(JSON.stringify(network));
  var originalCost = testAgent(net, testMin, testMax, testStep, functionToLearn)
  var nudgeCost = 0;
  if(math.randomInt(0, 2)) {
    var layer = math.randomInt(0, networkFinalNudges.weights.length);
    var node = math.randomInt(0, networkFinalNudges.weights[layer].length);
    var connectedNode = math.randomInt(0, networkFinalNudges.weights[layer][node].length);
    
    networkFinalNudges.
    weights[layer][node][connectedNode] *= Math.max(1 + step, 1);
    net.importNetwork(networkFinalNudges)
    nudgeCost = testAgent(net, testMin, testMax, testStep, functionToLearn)
    if(nudgeCost >= originalCost) {
      networkFinalNudges.weights[layer][node][connectedNode] *= Math.min(1 - step, 0);
      net.importNetwork(networkFinalNudges)
      nudgeCost = testAgent(net, testMin, testMax, testStep, functionToLearn)
    }
  } else {
    var layer = math.randomInt(1, networkFinalNudges.layers.length);
    var node = math.randomInt(0, networkFinalNudges.layers[layer].biasMatrix[0].length);
    console.log(layer + ' | ' + node)
    networkFinalNudges.layers[layer].biasMatrix[0][node] *= Math.max(1 + step, 1);
    net.importNetwork(networkFinalNudges)
    nudgeCost = testAgent(net, testMin, testMax, testStep, functionToLearn)
    if(nudgeCost >= originalCost) {
      networkFinalNudges.layers[layer].biasMatrix[0][node] *= Math.min(1 - step, 0);
      net.importNetwork(networkFinalNudges)
      nudgeCost = testAgent(net, testMin, testMax, testStep, functionToLearn)
    }
  }
  finalCost = (nudgeCost < originalCost ? nudgeCost : originalCost)
  document.getElementById("cost").innerHTML = finalCost;
  
  return (nudgeCost < originalCost ? networkFinalNudges : refrenceNetwork)
}
var canRun = false;

function createNetworkButton() {
  nudgedNet.createNetwork(1, JSON.parse(document.getElementById("layerArray").value), 1, ReLu, {min: -2, max: 1}, {min: -2, max: 1})
  nudgeMagnitude = 1;
  testAgent(nudgedNet, testMin, testMax, testStep, functionToLearn, true)
  canRun = true;
}

function runNetworkTraining() {
  if(!canRun)
  return;
  TestNudge(document.getElementById("nudges").value)
  canRun = false;
  nudgeMagnitude = document.getElementById("nudgeMagnitude").value
}

function displayNetwork() {
  nudgedNet.importNetwork(JSON.parse(document.getElementById("networkObject").value))
  testAgent(nudgedNet, testMin, testMax, testStep, functionToLearn, true)
  canRun = true;
}