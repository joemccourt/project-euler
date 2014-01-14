// Joe McCourt
// Jan 12th, 2014
// Project Euler problem 58
// Spiral primes

// Starting with 1 and spiralling anticlockwise in the following way,
// a square spiral with side length 7 is formed.

// 37 36 35 34 33 32 31
// 38 17 16 15 14 13 30
// 39 18  5  4  3 12 29
// 40 19  6  1  2 11 28
// 41 20  7  8  9 10 27
// 42 21 22 23 24 25 26
// 43 44 45 46 47 48 49

// It is interesting to note that the odd squares
// lie along the bottom right diagonal, but what is more interesting
// is that 8 out of the 13 numbers lying along both diagonals are prime;
// that is, a ratio of 8/13 ≈ 62%.

// If one complete new layer is wrapped around the spiral above,
// a square spiral with side length 9 will be formed.
// If this process is continued, what is the side length
// of the square spiral for which the ratio of primes
// along both diagonals first falls below 10%?

function isPrime(number){
	if(number <= 1){return false;}
	if(number == 2){return true;}
	if(!(number%2)){return false;}
	var maxCheck = Math.floor(Math.sqrt(number));
	for(var i = 3; i <= maxCheck; i+=2){
		if(!(number%i)){return false;}
	}
	return true;
}

var numPrimes = 0;
var numDiag = 1;

var ratio = 1;

var w = 1;
while(ratio > 0.1) {	
	numDiag += 4;
	w += 2;

	var ur = (w-2)*(w-2) + w-1; 
	var ul = (w-2)*(w-2) + 2*(w-1);
	var bl = (w-2)*(w-2) + 3*(w-1);

	// console.log(ur,ul,bl);
	if(isPrime(ur)) {
		numPrimes++;
	}
	if(isPrime(ul)) {
		numPrimes++;
	}
	if(isPrime(bl)) {
		numPrimes++;
	}
	ratio = numPrimes / numDiag;
}

console.log(w,numPrimes,numDiag,ratio)