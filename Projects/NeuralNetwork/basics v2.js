var graph = document.getElementById('graph');
var z = [];
var  r  = 10
var A = 3;
var xo = 0;
var yo = 0;
for(var x = -10; x < 10; x+=0.05) {
	z.push([])
	for(var y = -10; y < 10; y+=0.05) {
		z[z.length - 1].push(A*Math.exp((x-xo)**2/(2*sigmoid(x**2))+(y-yo)**2/(2*sigmoid(y**2))));	
		
	}
}
function sigmoid() {
	return 1 / (1 + Math.exp(-x));
}

Plotly.newPlot(graph, 
		[
			{
				z: z,
				type: 'surface'
			},
		], 
		{
			margin: { l: 0} 
		}
	)