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
// A = (1/4) * c * sqrt((3a+1)*(a+1))
// A = (1/4) * c * sqrt(3a^2 + 4a + 1)

// For c = a - 1
// A = (1/4) * c * sqrt((3a-1)*(a-1))
// A = (1/4) * c * sqrt(3a^2 - 4a + 1)

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

var sumP = 0;
var maxA = 300000000 / 3 + 10;
for(var a = 2; a <= maxA; a++) {
	// c = a + 1

	// var area =  (1/4) * c * Math.sqrt(4*a*a-c*c);
	// Math.sqrt(4*a*a-c*c)
	// (1/4) * c * a *

	var c = a + 1;
	var areaSqrt = Math.sqrt(3*a*a + 4*a + 1)/4;
	var areaSqrt = Math.sqrt(4*a*a-c*c)/4;

	// a * sqrt(4 - (c/a)*(c/a))
	// a * sqrt(4 - (a+1)^2/a^2)
	// a * sqrt(4 - 1 + 2/a + 1/a/a)
	// a * sqrt(3 + 2/a + 1/a/a)

	if(areaSqrt == Math.floor(areaSqrt) || areaSqrt == Math.floor(2*areaSqrt)/2 && a % 2 == 0 || areaSqrt == Math.floor(4*areaSqrt)/4 && a % 4 == 0) {
		// if(c % 4 == 0 || areaSqrt % 4 == 0 || (c % 2 == 0 && areaSqrt % 2 == 0)) {
			var p = a + a + c;
			sumP += p;
			console.log(a,a,c,areaSqrt,p);
			// console.log(Math.sqrt(4 - (c/a)*(c/a)));
		// }
	}

	var c = a - 1;
	var areaSqrt = Math.sqrt(4*a*a-c*c) / 4;

	if(areaSqrt == Math.floor(areaSqrt) || areaSqrt == Math.floor(2*areaSqrt)/2 && a % 2 == 0 || areaSqrt == Math.floor(4*areaSqrt)/4 && a % 4 == 0) {
		// if(c % 4 == 0 || areaSqrt % 4 == 0 || (c % 2 == 0 && areaSqrt % 2 == 0)) {
			var p = a + a + c;
			sumP += p;
			console.log(a,a,c,areaSqrt,p);
		// }
	}
}

console.log(sumP);

