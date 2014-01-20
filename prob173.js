// Joe McCourt
// Jan 19th, 2014
// Project Euler problem 173
// Using up to one million tiles how many different "hollow"
// square laminae can be formed?

// We shall define a square lamina to be a square outline
// with a square "hole" so that the shape possesses vertical
// and horizontal symmetry. For example, using exactly thirty-two
// square tiles we can form two different square laminae:

// With one-hundred tiles, and not necessarily using all
// of the tiles at one time, it is possible to form forty-one
// different square laminae.

// Using up to one million tiles
// how many different square laminae can be formed?


// nMax >= i*i - j*j

// nMax >= iMax*iMax - (iMax-2)*(iMax-2)
// nMax >= 4*iMax-4
// nMax/4 + 1 >= iMax

// nMax >= i*i - j*j
// nMax - i*i >= -j*j
// i*i - nMax <= j*j
// Math.sqrt(i*i-nMax) <= j

var nMax = 1000000;
var count = 0;
for(var i = 1; i <= nMax/4+1; i++) {
	var jStart = Math.sqrt(i*i - nMax);
	if(i%2) {
		jStart = ((jStart/2)|0)*2-1;
		if(jStart <= 0) {jStart = 1;}
	} else {
		jStart = ((jStart/2)|0)*2;
		if(jStart <= 0) {jStart = 2;}
	}


	for(var j = jStart; j <= i-2; j+=2) {
		var n = i*i - j*j;

		if(n <= nMax) {
			count++;
		}
	}
}

console.log(count);