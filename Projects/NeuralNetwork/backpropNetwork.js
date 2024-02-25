function remap(value, min1, max1, min2, max2) {
	return (value - min1) * (max2 - min2) / (max1 - min1) + min2
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
function multipyMatrix(matrixOne, matrixTwo) {
	var outputStorageArray = [];
	for(var matrixOneRow = 0; matrixOneRow < matrixOne.length; matrixOneRow++) {
		outputStorageArray.
		for(var matrixTwoColumn = 0; matrixTwoColumn < matrixTwo[matrixOneRow].length; matrixTwoColumn++) {
			var cellCount = 0;
			for(var multiplicationStep = 0; multiplicationStep < matrixOne[i].length; multiplicationStep++) {
				
			}
		}
	}
	return outputStorageArray;
}
class Network {
	constructor(layerArray, activationFunction, weightRange, biasRange) {
		//stores inputs
		this.x = [
			/*
				[][]
				dim1: # of inputs
				dim2: 1
			*/
		]
		//stores weight matrixes
		this.w = [
			/*
			  [][][]
			  dim1: # of layers - 1
			  dim2: depth of layer + 1
			  dim3: depth of layer - 1
			*/
		];
		//stores b
		this.b = [
			/*
				[][][]
				dim1: # of layers - 1
				dim2: 1
				dim3: depth of layer
			*/
		]
		//stores Σ w + b 
		this.z = [
			/*
				[][]
				dim1: # of layers - 1
				dim2: depth of layer
			*/
		]
		//stores a(z)
		this.a = [
			/*
				[][]
				dim1: # of layers - 1
				dim2: depth of layer
			*/
		]
		//stores outputs
		this.s = [
			/*
				[][]
				dim1: # of outputs
				dim2: 1
			*/
		]
		this.generateNetwork(layerArray, weightRange, biasRange);
	}
	/*
		LayerArray:
		[inputs 0, layerdepth 1 ... layerdepth n - 1, outputs n]
	*/
	generateNetwork(layerArray, weightRange, biasRange) {
		for(var i = 0; i < layerArray[0]; i++) {
			this.x.push([]);
		}
		for(var i = 1; i < layerArray.length; i++) {
			this.b.push([]);
			for(var k = 0; k < layerArray[i]; k++) {
				this.b[i - 1].push([getRandomRange(biasRange.min, biasRange.max)]);
				var tempArray = [];
				for(var j = 0; j < layerArray[i]; j++) {
					var tempTempArray = [];
					for(var l = 0; l < layerArray[i - 1]; l++) {
						tempTempArray.push(getRandomRange(weightRange.min, weightRange.max));
					}
					tempArray.push(tempTempArray);
				}
				this.w.push(tempArray);
			}		
		}
		for(var i = 0; i < layerArray[layerArray.length - 1]; i++) {
			this.s.push([]);
		}
	}
}