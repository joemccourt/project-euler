// Joe McCourt
// Mar 3rd, 2014
// Project Euler problem 135
// Same differences

// Given the positive integers, x, y, and z, are consecutive terms
// of an arithmetic progression, the least value of the positive integer,
// n, for which the equation, x^2 − y^2 − z^2 = n,
// has exactly two solutions is n = 27:

// 34^2 − 27^2 − 20^2 = 12^2 − 9^2 − 6^2 = 27

// It turns out that n = 1155 is the least value which has exactly ten solutions.
// How many values of n less than one million have exactly ten distinct solutions?

// Note there are three variables, but only two degrees of freedom

// z = x - 2*(x - y)
// z = -x + 2y
// z = 2y - x

// x^2 - y^2 - (2y-x)^2 = n
// x^2 - y^2 - 4y^2 + 4yx - x^2 = n
// -5y^2 + 4yx = n
// x = (n/y + 5y)/4
// x = (n + 5^y2)/4y

// Can place upper limit of x for when

// if y = n
// (y+d)^2 - y^2 - (y-d)^2 = n
// (n+d)^2 - n^2 - (n-d)^2 = n
// -y^2 + 4*y*d = n

// x^2 - (x-d)^2 - (x-2d)^2 = n
// -x^2 + 2dx + 4dx -d^2 - 4d^2 = n
// -x^2 + 6dx -5d^2 = n

// -n + 4*d = 1
// d = (1+n)/4

var n = 1155;
var y = 2;

var count = 0;
for(var n = 0; n < 1000000; n++) {

	// get n factors	
	var factors = [1,n];
	var limit = Math.ceil(Math.sqrt(n));
	for(var i = 2; i <= limit; i++) {
		if(n%i == 0) {

			//if(factors.indexOf(i) != -1) {continue;}
			factors.push(i);

			if(i*i != n) {
				factors.push(n/i);
			}
		}
	}

	var numSolutions = 0;
	for(var key in factors) {
		var y = factors[key];
	// -y^2 + 4*y*d = n
		var d = n/(4*y) + y/4;
		// var x = (n/y + 5*y)/4;
		// var x = (n+5*y*y)/(4*y);
		var x = y + d;
		var z = y - d;

		if(Math.floor(d) == d && z > 0) {
			numSolutions++;
			// console.log(x,y,z,x*x-y*y-z*z-n);
			if(numSolutions > 10) {
				break;
			}
		}
		// if(y > n) {break;}
	}

	if(numSolutions == 10) {
		console.log(n);
		count++;
	}
}

console.log(count);



//4993