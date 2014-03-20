// Joe McCourt
// 3/19/2014
// Project Euler problem 216
// Investigating the primality of numbers of the form 2n^2-1

// Consider numbers t(n) of the form t(n) = 2n2-1 with n > 1.
// The first such numbers are 7, 17, 31, 49, 71, 97, 127 and 161.
// It turns out that only 49 = 7*7 and 161 = 7*23 are not prime.
// For n ≤ 10000 there are 2202 numbers t(n) that are prime.

// How many numbers t(n) are prime for n ≤ 50,000,000 ?

// 7, 17, 31, 49, 71, 97, 127, 161, 199, 241, 287, 337, 391, 449, 511, 577, 647, ...

// Looks like a pattern for when t(n) is composite
// When is 2*n^2 - 1 = q*p ?
// 7, 17, 23, 31, 41, 47, 71, 73, 79, 89, 97, 103, 113, 127, 137, 151, 167, 191, 193 ...
// 0, 10,  6,  8, 10,  6, 24,  2,  6, 10,  8,   6,  10,  14,  10,  14,  16,  24,   2,...

// minus t(n)
// 23, 41, 47, 73, 79, 89, 103, 113, 137, 151, 167, 191, ...


var divisors = {};
var isPrime = function(number){
	// for(var i = 3; i <= maxCheck; i+=2){
	for(var key in divisors) {
		if(!(number%key)){
			//console.log(Math.sqrt((number+1)/2),number,i,number/i);
			var q = number/key;
			if(!divisors[q]) {
				getPrimeFactors(q);
				// divisors[q] = true;
			}

			return false;
		}
	}
	if(number <= maxFactor) {
		divisors[number] = true;
	}
	return true;
};


function getPrimeFactors(number) {
	var factors = {};
	var d = 2;
	var limit = Math.ceil(Math.sqrt(number));

	while(d <= limit){
		if(!(number%d)){

			if(number <= maxFactor) {
				divisors[d] = true;
			}

			number/=d;
		}else{
			d++;
		}
	}

	if(d <= number) {
		// factors[number] = 1;

		if(number <= maxFactor) {
			divisors[number] = true;
		}
	}
	return factors;
};

var maxN = 10000;
var maxFactor = Math.ceil(Math.sqrt(2*maxN*maxN-1));
var count = 0;
for(var n = 2; n <= maxN; n++) {
	var tn = 2*n*n-1;
	// console.log(tn);
	if(isPrime(tn)){count++;}
}

console.log(count)

// divisors.sort(function(a,b){return a < b ? -1 : 1;});

// console.log(divisors);