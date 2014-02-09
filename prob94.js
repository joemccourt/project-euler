// Joe McCourt
// Feb 8th, 2014
// Project Euler problem 88
// Product-sum numbers

// Almost equilateral triangles
// Problem 94

// It is easily proved that no equilateral triangle exists
// with integral length sides and integral area.
// However, the almost equilateral triangle 5-5-6
// has an area of 12 square units.

// We shall define an almost equilateral triangle to be
// a triangle for which two sides are equal
// and the third differs by no more than one unit.

// Find the sum of the perimeters of all
// almost equilateral triangles with integral side lengths
// and area and whose perimeters
// do not exceed one billion (1,000,000,000).


// Use Heron's formula to calc area of known triangle sides

// A = (1/4) * sqrt((a+b+c)*(-a+b+c)*(a-b+c)*(a+b-c))

// for almost equilateral, a = b and c = a +/- 1

// A = (1/4) * sqrt((2a+c)*c*c*(2a-c))
// A = (1/4) * c * sqrt((2a+c)*(2a-c))
// A = (1/4) * c * sqrt(4a^2-c^2)
// A = (1/4) * c * a * sqrt(4-c/a)^2)

// For c = a + 1
// A = (1/4) * c * sqrt((3a+1)*(a-1))
// A = (1/4) * c * sqrt(3a^2 - 2a - 1)

// For c = a - 1
// A = (1/4) * c * sqrt((3a-1)*(a+1))
// A = (1/4) * c * sqrt(3a^2 + 2a - 1)

// For c = a + 1
// let k*k = 3a^2 + 4a + 1
// 3a^2 + 4a + 1 - k*k = 0
// a = (-4 +- sqrt(16 - 4*3*(1-k*k)) ) / 6

// for(var k = 1; k < 100; k++) {
// 	var a = (-4 + Math.sqrt(16 - 4*3*(1-k*k))) / 6;
// 	var area = (1/4) * (a + 1) * k;

// 	if(area == Math.floor(area)) {
// 		console.log(a,a+1,area);
// 	}
// }

//16731624725
//11303296667
//4511037031
//11054272282
//77714875685
//138907096
var maxPercision = Math.pow(2,53);
//Given a is known to be integer
var isInt = function(a,b) {
	if(a > maxPercision || b > maxPercision) {
		console.log("Warning, exceded precision limit");
		return false;
	}

	var bFrac = b - Math.floor(b);
	return a*bFrac == Math.floor(a*bFrac);
}

// var sqrts = {};
// for(var i = 1; i < 1000000; i++) {
// 	sqrts[i*i] = i;
// }

var sumP = 0;
var maxA = Math.ceil(1000000000 / 3 + 10);
for(var a = 2; a <= maxA; a++) {
	// c = a + 1

	// var area =  (1/4) * c * Math.sqrt(4*a*a-c*c);
	// Math.sqrt(4*a*a-c*c)
	// (1/4) * c * a *

	// a * sqrt(4 - (c/a)*(c/a))
	// a * sqrt(4 - (a+1)^2/a^2)
	// a * sqrt(4 - 1 + 2/a + 1/a/a)
	// a * sqrt(3 + 2/a + 1/a/a)
	// var areaSqrt = Math.sqrt(3*a*a + 4*a + 1)/4;

	var c = a + 1;
	var sqrt = Math.sqrt(3*a*a-2*a-1);
	if(Math.floor(sqrt) == sqrt && sqrt*sqrt == 3*a*a-2*a-1) {
		var areaSqrt = sqrt/4;

		if(sqrt*sqrt > Math.pow(2,53)) {
			console.log("Warning");
		} else {
			if(isInt(c,areaSqrt)) {
				var p = a + a + c;
				sumP += p;
				console.log(a,a,c,areaSqrt,p);
			}
		}
	}

	var c = a - 1;
	var sqrt = Math.sqrt(3*a*a+2*a-1);
	if(Math.floor(sqrt) == sqrt && sqrt*sqrt == 3*a*a+2*a-1) {
		var areaSqrt = sqrt/4;

		if(sqrt*sqrt > Math.pow(2,53)) {
			console.log("Warning");
		} else {
			if(isInt(c,areaSqrt)) {
				var p = a + a + c;
				sumP += p;
				console.log(a,a,c,areaSqrt,p);
			}
		}
	}
}

console.log(sumP);

