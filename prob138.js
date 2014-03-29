// Joe McCourt
// 3/28/2014
// Project Euler problem 138
// Special isosceles triangles

// Consider the isosceles triangle with base length, b = 16, and legs, L = 17.

// By using the Pythagorean theorem it can be seen that
// the height of the triangle, h = √(172 − 82) = 15,
// which is one less than the base length.

// With b = 272 and L = 305, we get h = 273,
// which is one more than the base length,
// and this is the second smallest isosceles
// triangle with the property that h = b ± 1.

// Find ∑ L for the twelve smallest isosceles triangles
// for which h = b ± 1 and b, L are positive integers.

// h*h = L*L - b*b/4
// h*h = (b±1)^2 = b*b ± 2b + 1 = L*L - b*b/4
// 5/4*b*b ± 2b + 1 - L*L = 0
// b = (± 2 ± sqrt(4 - 4*5/4(1-L*L)) ) / (5/2)
// b = (± 4 ± 2*sqrt(4 - 5(1-L*L)) ) / 5
// b = (± 4 ± 2*sqrt(4 - 5+5*L*L))) / 5

// 5/4*b*b ± 2b + 1 = L*L
// 5/4*b*b - 2b + 1 = L*L

var count = 0;
var lastL = 1;
for(var L = 10; L < 10000000; L++) {
	var b1 = (-4 + 2*Math.sqrt(4-5+5*L*L)) / 5;
	var b2 = (4 + 2*Math.sqrt(4-5+5*L*L)) / 5;

	if(b1 == Math.floor(b1)) {	
		console.log(count+1,L,b1,L/lastL);
		count++;
		lastL = L;
	}
	
	if(b2 == Math.floor(b2)) {	
		console.log(count+1,L,b2,L/lastL);
		count++;
		lastL = L;
	}
}

// Follow the pattern :/

var L = 17;
var sum = L;
for(var i = 1; i < 12; i++) {
	L *= 17.94427190998;
	L = Math.floor(L);
	console.log(L);
	sum+=L;
}
console.log(sum);
