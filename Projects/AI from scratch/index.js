var debugConsole = document.querySelector("#console");
var c = document.getElementById("networkCanvas");
var ctx = c.getContext("2d");

//============================================= UTILITY FUNCTIONS ======================================
function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

// ============================================ CREATE NETWORK =========================================
var inputExt = 1;
var lengthExt = 1;
var depthExt = 1;
var outputExt = 1;
var nodeNumber = 0;
var inputFields = [];

//https://onecompiler.com/javascript/3y38u365j
class Node {
  constructor(layer, depth, weight, isInput, isOutput, value) {
    this.layer = layer;
    this.depth = depth;
    this.weight = weight;
    this.isInput = isInput;
    this.isOutput = isOutput;
    this.value = value;
  }
  changeWeight(weight) {
    this.weight = weight;
  }
  changeValue(value) {
    this.value = value;
  }
  run(network) {
    var output = 0;
    var thisNode =
      network.connections[network.input + this.layer * network.length + depth];
    for (var i = 0; i < thisNode.connections.length; i++) {
      output +=
        thisNode.connections[i].lastNodeWeight * thisNode.connections[i].value;
    }

    return sigmoid(output);
  }
}

class Connection {
  constructor(layerOne, depthOne, layerTwo, depthTwo, value, lastNodeWeight) {
    this.layerOne = layerOne;
    this.depthOne = depthOne;
    this.layerTwo = layerTwo;
    this.depthTwo = depthTwo;
    this.value = value;
    this.lastNodeWeight = lastNodeWeight;
  }
  run(network) {
    this.value = network.nodes[this.layerOne].nodes[this.depthOne].value;
    this.lastNodeWeight =
      network.nodes[this.layerOne].nodes[this.depthOne].weight;
    alert(this.value + " :||: " + this.lastNodeWeight);
  }
}

class Network {
  constructor(input, length, depth, output) {
    this.nodes = constructNodes(input, length, depth, output);
    this.connections = constructConnections(input, length, depth, output);
    this.input = input;
    this.length = length;
    this.depth = depth;
    this.output = output;
  }
  run(inputArray) {
    runNetwork(inputArray, this);
  }
}

function constructNodes(input, length, depth, output) {
  var nodeArray = [{ nodes: [] }];

  for (var i = 0; i < length + 1; i++) {
    nodeArray.push({ nodes: [] });
  }

  for (var i = 0; i < input; i++) {
    nodeArray[0].nodes.push(new Node(0, i, 1, true, false));
    nodeNumber++;
  }

  for (var i = 1; i <= length; i++) {
    for (var k = 0; k < depth; k++) {
      nodeArray[i].nodes.push(new Node(i, k, 1, false, false));
      nodeNumber++;
    }
  }

  for (var i = 0; i < output; i++) {
    nodeArray[length + 1].nodes.push(new Node(length + 1, i, 0, false, true));
    nodeNumber++;
  }
  return nodeArray;
}
function constructConnections(input, length, depth, output) {
  var connectionArray = [];

  for (var i = 0; i < input; i++) {
    connectionArray.push({ connections: [], nodeLayer: 0, nodeDepth: i });
  }
  for (var i = 1; i <= length; i++) {
    for (var k = 0; k < depth; k++) {
      connectionArray.push({ connections: [], nodeLayer: i, nodeDepth: k });
    }
  }

  for (var i = 0; i < input; i++) {
    for (var k = 0; k < depth; k++) {
      connectionArray[i].connections.push(
        new Connection(
          connectionArray[i].nodeLayer,
          connectionArray[i].nodeDepth,
          connectionArray[i].nodeLayer + 1,
          k,
          false,
          false,
          0
        )
      );
    }
  }

  if (length > 0) {
    for (var i = 0; i < length; i++) {
      for (var k = 0; k < depth; k++) {
        if (connectionArray[i + length + input] != undefined)
          connectionArray[i + input].connections.push(
            new Connection(
              connectionArray[i + input].nodeLayer,
              connectionArray[i + input].nodeDepth,
              connectionArray[i + input].nodeLayer + 1,
              k,
              false,
              false,
              0
            )
          );
      }
    }

    for (var i = 0; i < length; i++) {
      for (var k = 0; k < output; k++) {
        if (connectionArray[i + length + input] != undefined)
          connectionArray[i + length + input].connections.push(
            new Connection(
              connectionArray[i + length + input].nodeLayer,
              connectionArray[i + length + input].nodeDepth,
              connectionArray[i + length + input].nodeLayer + 1,
              k,
              false,
              false,
              0
            )
          );
      }
    }
  }

  return connectionArray;
}

// ============================================ VISUALIZE NETWORK ======================================

var tempNodeX = 0;
var tempNodeY = 0;
var multiplier = 50;
var center;
var inputSlider = document.getElementById("input");
var lengthSlider = document.getElementById("length");
var depthSlider = document.getElementById("depth");
var outputSlider = document.getElementById("output");
var sizeSlider = document.getElementById("size");
var xSlider = document.getElementById("xOff");
var ySlider = document.getElementById("yOff");
var xOffset;
var yOffset;
var size = 10;

myNetwork = new Network(
  inputSlider.value,
  lengthSlider.value,
  depthSlider.value,
  outputSlider.value
);

inputSlider.oninput = () => {
  ctx.clearRect(0, 0, c.width, c.height);
  myNetwork = new Network(
    inputSlider.value,
    lengthSlider.value,
    depthSlider.value,
    outputSlider.value
  );
  renderNetwork();
  updateSlideText();
};
lengthSlider.oninput = () => {
  ctx.clearRect(0, 0, c.width, c.height);
  myNetwork = new Network(
    inputSlider.value,
    lengthSlider.value,
    depthSlider.value,
    outputSlider.value
  );
  renderNetwork();
  updateSlideText();
};
depthSlider.oninput = () => {
  ctx.clearRect(0, 0, c.width, c.height);
  myNetwork = new Network(
    inputSlider.value,
    lengthSlider.value,
    depthSlider.value,
    outputSlider.value
  );
  renderNetwork();
  updateSlideText();
};
outputSlider.oninput = () => {
  ctx.clearRect(0, 0, c.width, c.height);
  myNetwork = new Network(
    inputSlider.value,
    lengthSlider.value,
    depthSlider.value,
    outputSlider.value
  );
  renderNetwork();
  updateSlideText();
};


function resetButton() {
  ctx.clearRect(0, 0, c.width, c.height);
  inputSlider.value = 1;
  lengthSlider.value = 2;
  depthSlider.value = 2;
  sizeSlider.value = 10;
  outputSlider.value = 1;
  ctx.clearRect(0, 0, c.width, c.height);
  size = 10;
  myNetwork = new Network(
    inputSlider.value,
    lengthSlider.value,
    depthSlider.value,
    outputSlider.value
  );
  renderNetwork();
  updateSlideText();
}
function updateSlideText() {
  document.getElementById("inputText").innerHTML = inputSlider.value;
  document.getElementById("lengthText").innerHTML = lengthSlider.value;
  document.getElementById("depthText").innerHTML = depthSlider.value;
  document.getElementById("outputText").innerHTML = outputSlider.value;
  document.getElementById("inputContainers").innerHTML =
    "<button onclick='runNetwork(inputFields, myNetwork)'> Run </button>";

  for (var i = myNetwork.input; i > 0; i--) {
    document.getElementById("inputContainers").innerHTML =
      "<input type='text' value='' id='" +
      i +
      "'>" +
      document.getElementById("inputContainers").innerHTML;
    document.getElementById("inputContainers").innerHTML =
      "<p class='sliderText' id='text" +
      i +
      "'>" +
      " Node " +
      i +
      " input: </p>" +
      document.getElementById("inputContainers").innerHTML;
  }
}
renderNetwork();
updateSlideText();

function renderNetwork() {
  xOffset = c.width / 2 - (myNetwork.length * multiplier) / 2 - multiplier / 2;
  yOffset = c.height / 2 - (myNetwork.depth * multiplier) / 2 + multiplier / 2;

  var tempNodeX = xOffset;
  var tempNodeY = yOffset;
  var nodeLocXLast = [];
  var nodeLocYLast = [];

  for (var i = 0; i < myNetwork.input; i++) {
    var center = (myNetwork.depth * multiplier) / 2 - multiplier / 2;
    var nodeX = xOffset;
    var nodeY =
      center / myNetwork.input + ((i * center) / myNetwork.input) * 2 + yOffset;
    for (var l = 0; l < myNetwork.depth; l++) {
      ctx.beginPath();
      ctx.moveTo(nodeX, nodeY);
      ctx.lineTo(nodeX + multiplier, l * multiplier + yOffset);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(nodeX, nodeY, size, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
  }

  for (var i = 0; i < myNetwork.length; i++) {
    tempNodeX += multiplier;

    for (var k = 0; k < myNetwork.depth; k++) {
      if (i >= myNetwork.length - 1) {
        nodeLocXLast.push(tempNodeX);
        nodeLocYLast.push(tempNodeY);
      } else {
        for (var l = 0; l < myNetwork.depth; l++) {
          ctx.beginPath();
          ctx.moveTo(tempNodeX, tempNodeY);
          ctx.lineTo(tempNodeX + multiplier, l * multiplier + yOffset);
          ctx.stroke();
        }
      }
      ctx.beginPath();
      ctx.arc(tempNodeX, tempNodeY, size, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.stroke();
      tempNodeY += multiplier;
    }
    tempNodeY = yOffset;
  }
  tempNodeX += multiplier;
  for (var i = 0; i < myNetwork.output; i++) {
    var center = (myNetwork.depth * multiplier) / 2 - multiplier / 2;
    var nodeY =
      center / myNetwork.output +
      ((i * center) / myNetwork.output) * 2 +
      yOffset;
    var nodeX = tempNodeX;
    for (var k = 0; k < nodeLocXLast.length; k++) {
      ctx.beginPath();
      ctx.moveTo(nodeX, nodeY);
      ctx.lineTo(nodeLocXLast[k], nodeLocYLast[k]);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(nodeX, nodeY, size, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
  }
  tempNodeX -= multiplier;
  tempNodeY = yOffset;
  for (var i = 0; i < myNetwork.depth; i++) {
    ctx.beginPath();
    ctx.arc(tempNodeX, tempNodeY, size, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    tempNodeY += multiplier;
  }
}

// ============================================ RUN NETWORK ============================================

function runNetwork(inputValues, network) {
  inputFields = [];
  for (var i = myNetwork.input; i > 0; i--) {
    inputFields.push(document.getElementById(i).value);
  }
  inputFields.reverse();
  for (var i = 0; i < network.input; i++) {
    network.nodes[0].nodes[i].changeValue(inputFields[i]);
  }
  myNetwork.connections[0].connections[0].run(myNetwork);
}

// ============================================ TRAIN NETWORK ==========================================
