//Joe McCourt
//4/15/12

// Project Euler problem 15
// Starting in the top left corner of a 22 grid, 
// there are 6 routes (without backtracking) to the 
// bottom right corner.
// How many routes are there through a 2020 grid?
function Prob15(){

	this.eval = function(){
		//Initialize number of paths array (21x21)
		var w = 21;
		var h = 21;
		var numPaths = [];
		for(var y = 0; y<h; y++){
			for(var x = 0; x<w; x++){
				numPaths[y*w+x] = 1;
			}
		}

		//The number of paths for each vertex
		//is the sum of the number of paths on
		//the vertex above and to the vertex left
		for(var y = 1; y<h; y++){
			for(var x = 1; x<w; x++){
				numPaths[y*w+x] = numPaths[y*w+x-1]+numPaths[(y-1)*w+x];
			}
		}

		return numPaths[w*h-1];
	};
}