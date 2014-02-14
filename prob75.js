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

// c*c = x*x + y*y
// p = c + x + y
// if c,x,y not unique:
// (c+kc)*(c+kc) = (x+kx)*(x+kx) + (y+ky)*(y+ky)
// where kc + kx + ky = 0 and at least two are non zero

// => 2kc*c + kc^2 = 2*kx*x + kx^2 + 2*ky*y + ky^2
// 2*kc*c + (-kx-ky)^2 = 2*kx*x + kx*kx + 2*ky*y + ky*ky
// 2*kc*c + kx*kx+2*kx*ky+ky*ky = 2*kx*x + kx*kx + 2*ky*y + ky*ky
// 2*kc*c + 2*kx*ky = 2*kx*x + 2*ky*y
// kc*c + kx*ky = kx*x + ky*y
// kx*ky = (kx+ky)*c + kx*x + ky*y
// kx*ky = kx*(c+x) + ky*(c+y)
// 1 = (c+x)/ky + (c+y)/kx

// What are the conditions for no non-zero solutions?

// if c+x rel prime to c+y, solution has to be
// kx = c+y, ky = c+x, which is not true

//60 10 24 26
//60 15 20 25

//494 133 156 205

var lMax = 500;
var waysL = {};
for(var x = 1; x < lMax; x++) {
	var cStart = Math.floor(Math.sqrt(2)*x)+1;
	for(var c = cStart; c < lMax; c++) {
		var y = Math.sqrt(c*c-x*x);
		if(y == Math.floor(y)) {
			var length = c + x + y;
			if(length < lMax) {
				if(!waysL[length]) {waysL[length] = 0;}
				waysL[length]++;
			}
			console.log(length,x,y,c,waysL[length])
		}
	}
}

var count = 0;
for(var k in waysL) {
	if(waysL[k] == 1) {
		count++;
		// console.log(k);
	}
}

console.log(waysL);
console.log(count)