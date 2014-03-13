// Joe McCourt
// 3/12/2014
// Project Euler problem 204
// Generalised Hamming Numbers

// A Hamming number is a positive number which has no prime factor larger than 5.
// So the first few Hamming numbers are 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15.
// There are 1105 Hamming numbers not exceeding 10^8.

// We will call a positive number a generalised Hamming number of type n,
// if it has no prime factor larger than n.
// Hence the Hamming numbers are the generalised Hamming numbers of type 5.

// How many generalised Hamming numbers
// of type 100 are there which don't exceed 10^9?

// First get first 100 primes


// Primes sieve
var getPrimesUpTo = function(n) {
	var intMax = n+1;
	var primes = [];
	for(var i = 0; i < intMax; i++) { 
		primes[i] = 1;
	}

	for(var i = 2; i < intMax; i++) {
		if(primes[i]) {
			for(var j = 2; i*j < intMax; j++) {
				primes[i*j] = 0;
			}
		}
	}

	var primeList = [];
	for(var i = 2; i < intMax; i++) {
		if(primes[i] == 1) {
			primeList.push(i);
		}
	}
	return primeList;
}

var type = 100;
var primes = getPrimesUpTo(type);
var searchCombosUnder = function(product, index, max) {
	if(product > max) {return 0;}
	if(index >= primes.length) {return 1;}

	var count = 0;
	while(product <= max) {
		count += searchCombosUnder(product, index+1, max);
		product *= primes[index];
	}
	return count;
};


console.log(searchCombosUnder(1, 0, 1000000000));