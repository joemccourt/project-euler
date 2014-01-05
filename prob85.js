// Joe McCourt
// Jan 4th, 2014
// Project Euler problem 85

//By counting carefully it can be seen that a rectangular grid
// measuring 3 by 2 contains eighteen rectangles
// Although there exists no rectangular grid
// that contains exactly two million rectangles,
// find the area of the grid with the nearest solution.

// Think about this first in 1D
// R(n,1) = n+max(0,n-1)+max(0,n-k)+...+max(0,1)
// R(n,1) = n(n+1)/2

// Expanding this to two rows, We can take the sum
// of two rows plus both combined acting like one row
// R(n,2) = 2*R(n,1) + R(n,1)

// Thinking about this, going down by rows each can be grouped
// like how they are summed horizontally, so it's:
// R(n,m) = R(n,1)*R(m,1) = n(n+1)/2*m(m+1)/2
// = nm(n+1)*(m+1)/4
// Example, R(3,2) = 3*2*4*3/4 = 18 (checks)

// want to find dimensions, to reach goal value
// R(n,m) = g = n(n+1)/2 * m(m+1)/2
// 4*g = (n*n+n)(m*m+m)
// 4g = nm(n+1)(m+1)

// Goal is only 2 million, so this is small enough to brute force
// Much more efficient ways much exist, but this should work
var g = 2000000;
var bestR = g;
var bestPair = [0,0];

for(var n = 0; n < 100; n++){
	for(var m = n; m < 100; m++){
		var r = n*m*(n+1)*(m+1)/4;
		if(Math.abs(r-g) < bestR){
			bestR = Math.abs(r-g);
			bestPair = [n,m];
		}
	}
}

console.log(bestR,bestPair)
console.log(bestPair[0]*bestPair[1]);