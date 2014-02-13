// Joe McCourt
// Feb 12th, 2014
// Project Euler problem 75
// Singular integer right triangles

// It turns out that 12 cm is the smallest length of wire
// that can be bent to form an integer sided right angle triangle
// in exactly one way, but there are many more examples.

// 12 cm: (3,4,5)
// 24 cm: (6,8,10)
// 30 cm: (5,12,13)
// 36 cm: (9,12,15)
// 40 cm: (8,15,17)
// 48 cm: (12,16,20)

// In contrast, some lengths of wire, like 20 cm,
// cannot be bent to form an integer sided right angle triangle,
// and other lengths allow more than one solution to be found;
// for example, using 120 cm it is possible to form
// exactly three different integer sided right angle triangles.

// 120 cm: (30,40,50), (20,48,52), (24,45,51)

// Given that L is the length of the wire,
// for how many values of L ≤ 1,500,000 can exactly one integer
// sided right angle triangle be formed?

var lMax = 100000;
var waysL = {};
for(var x = 1; x < lMax; x++) {
	for(var y = x; y < lMax; y++) {
		var c = Math.sqrt(x*x+y*y);
		if(c == Math.floor(c)) {
			var length = c + x + y;
			if(length < lMax) {
				if(!waysL[length]) {waysL[length] = 0;}
				waysL[length]++;
			}
		}
	}
}

var count = 0;
for(var k in waysL) {
	if(waysL[k] == 1) {
		count++;
	}
}

console.log(count)