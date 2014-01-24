// Joe McCourt
// Jan 23th, 2014
// Project Euler problem 166
// Criss Cross

// A 4x4 grid is filled with digits d, 0 ≤ d ≤ 9.
// It can be seen that in the grid

// 6 3 3 0
// 5 0 4 3
// 0 7 1 4
// 1 2 4 5

// the sum of each row and each column has the value 12.
// Moreover the sum of each diagonal is also 12.

// In how many ways can you fill a 4x4 grid with the digits
// d, 0 ≤ d ≤ 9 so that each row, each column, and both diagonals have the same sum?


// Pure brute force would take 10^16 tries, this is too many
// How can we reduce the checks needed?

// x11,x21,x31,x41
// x12,x22,x32,x42
// x13,x23,x33,x43
// x14,x24,x34,x44

// x11 + x21 + x31 + x41
// x12 + x22 + x32 + x42
// x13 + x23 + x33 + x43
// x14 + x24 + x34 + x43
// x11 + x22 + x33 + x44
// x14 + x23 + x32 + x41

// 6 constraints, plus constraint digits [0,9]
// Diagonals more constrained than sides


// First can I solve this for a given n?
// 1000
// 0001
// 0001
// 1000


// Let's just try brute force anyway
// Try with 2x2 first
var count = 0;
var bruteForce = function(grid,index) {
	var w = 2;
	var x = index % w;
	var y = Math.floor(index / w);
	if(index >= w*w) {

		var n = grid[0]+grid[1];
		if(grid[2]+grid[3] == n && grid[0]+grid[3] == n && grid[1]+grid[2] == n) {
			count++;
			console.log(grid,n,count);
		}

		return;
	}

	for(var d = grid[index]; d < 10; d++) {
		var newGrid = grid.slice(0);
		newGrid[index] = d;
		bruteForce(newGrid,index+1);
	}
};

bruteForce([0,0,0,0],0);