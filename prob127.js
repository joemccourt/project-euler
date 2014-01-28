// Joe McCourt
// Jan 25th, 2014
// Project Euler problem 72
// Counting fractions

// abc-hits
// Problem 127

// The radical of n, rad(n), is the product of distinct prime factors of n.
// For example, 504 = 23 × 32 × 7, so rad(504) = 2 × 3 × 7 = 42.

// We shall define the triplet of positive integers (a, b, c) to be an abc-hit if:

//     GCD(a, b) = GCD(a, c) = GCD(b, c) = 1
//     a < b
//     a + b = c
//     rad(a*b*c) < c

// For example, (5, 27, 32) is an abc-hit, because:

//     GCD(5, 27) = GCD(5, 32) = GCD(27, 32) = 1
//     5 < 27
//     5 + 27 = 32
//     rad(4320) = 30 < 32

// It turns out that abc-hits are quite rare and there are
// only thirty-one abc-hits for c < 1000, with ∑c = 12523.

// Find ∑c for c < 120000.

// a,b,c must all have distinct primes, and multiplication be less than c
function getPrimeFactors(number){
	var factors = {};
	var d = 2;
	var limit = Math.ceil(Math.sqrt(number));

	while(d <= limit){
		if(!(number%d)){
			if(!factors[d]){
				factors[d] = 1;
			}else{
				factors[d]++; 
			}
			number/=d;
		}else{
			d++;
		}
	}

	if(d <= number) {
		factors[number] = 1;
	}
	return factors;
};

var getRad = function(n) {
	var factors = getPrimeFactors(n);
	var r = 1;
	for(var f in factors) {
		r *= f;
	}

	return r;
}

// var max = 1;
// for(var i = 2; i < 10000; i++) {
// 	var r = getRad(i);
// 	if(r > max) {
// 		max = r;
// 		console.log(i,getPrimeFactors(i),r);
// 	}
// }

var memoRad = {}
var maxC = 120000;
var sumValidC = 0;
for(var c = 1; c < maxC; c++) {
	var factorsC = getPrimeFactors(c);

	var rC = 1;
	var cSieve = {};

	for(var f in factorsC) {
		var fInt = parseInt(f,10);
		rC *= f;
	}

	memoRad[c] = rC;

	//If only distinct primes it can't be valid
	if(rC >= c) {continue;}
	
	var rLeft = c/rC;

	// Optimize for even factors
	var bStart = Math.floor(c/2);
	var inc = 1;

	if(factorsC[2]) {
		inc = 2;
		bStart = ((bStart/inc)|0)*inc - 1;
	}

	for(var b = bStart; b < c; b+=inc) {
		var a = c - b;
		if(a >= b) {continue;}
		var r = rC * memoRad[a] * memoRad[b];	

		if(r < c) {
			var factorsA = getPrimeFactors(a);
			var factorsB = getPrimeFactors(b);

			var valid = true;
			for(f in factorsC) {
				if(factorsA[f] || factorsB[f]) {
					valid = false;
					break;
				}
			}

			if(!valid) {continue;}

			// if(cSieve[b] || cSieve[a]) {continue;}
			sumValidC += c;
			// console.log(a,b,c,r);
		}

	}
}

console.log(sumValidC);