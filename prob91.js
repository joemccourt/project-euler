// Joe McCourt
// Feb 11th, 2014
// Project Euler problem 91
// Right triangles with integer coordinates

// The points P (x1, y1) and Q (x2, y2) are plotted
// at integer co-ordinates and are joined to the origin,
// O(0,0), to form ΔOPQ.

// There are exactly fourteen triangles containing
// a right angle that can be formed when each co-ordinate
// lies between 0 and 2 inclusive; that is,
// 0 ≤ x1, y1, x2, y2 ≤ 2.

// Given that 0 ≤ x1, y1, x2, y2 ≤ 50,
// how many right triangles can be formed?


//Brute force would take 50^2*50^2 checks

var gridSize = 51;
var count = 0;

for(var x1 = 0; x1 < gridSize; x1++) {
	for(var y1 = 0; y1 < gridSize; y1++) {
		if(x1 == 0 && y1 == 0) {continue;}
		for(var x2 = 0; x2 < gridSize; x2++) {
			for(var y2 = 0; y2 < gridSize; y2++) {
				if(x2 == 0 && y2 == 0) {continue;}
				if(x1 == x2 && y1 == y2) {continue;}

				//Easy check for on axis
				if(x1 == 0 && y2 == 0 || x1 == 0 && y2 == y1 || y2 == 0 && x1 == x2
					|| x2 == 0 && y1 == 0 || x2 == 0 && y2 == y1 || y1 == 0 && x1 == x2) {
					count++;
				} else {

					//This is harder, let's use some dot products
					//Know won't occur at origin because of prev check
					var pq = {x:x2-x1,y:y2-y1};

					var dotP = pq.x*x1 + pq.y*y1;
					var dotQ	 = pq.x*x2 + pq.y*y2;

					if(dotP == 0 || dotQ == 0) {
						count++;
					}

				}

			}
		}
	}
}

console.log(count/2);
