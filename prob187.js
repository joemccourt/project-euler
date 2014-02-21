// Joe McCourt
// Feb 20th, 2014
// Project Euler problem 187
// Semiprimes

// A composite is a number containing at least two prime factors.
// For example, 15 = 3 × 5; 9 = 3 × 3; 12 = 2 × 2 × 3.

// There are ten composites below thirty containing precisely two,
// not necessarily distinct, prime factors: 4, 6, 9, 10, 14, 15, 21, 22, 25, 26.

// How many composite integers, n < 10^8, have precisely two,
// not necessarily distinct, prime factors?

function isCompsite(number) {
	var d = 2;
	var limitSqrt = (Math.sqrt(number));
	var limit = Math.ceil(limitSqrt);
	var numFactors = 0;
	while(d <= limit){
		if(!(number%d)){
			numFactors++;
			number/=d;
			if(numFactors >= 2 && number != 1) {return false;}
			limit = Math.ceil(Math.sqrt(number));
		}else{
			d++;
		}
	}

	if(d <= number) {
		numFactors++;
	}
	return numFactors == 2;
};

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

function genPrimes(limit) {
	var primes = [];
	for(var i = 2; i <= limit; i++) {
		if(isPrime(i)) {
			primes.push(i);
		}
	}

	return primes;
}

var limit = 100000000;
var primes = genPrimes(limit/2);

// console.log(primes);
var count = 0;
for(var i = 0; i < primes.length; i++) {
	var maxJ = limit / primes[i];
	var j = i;
	while(primes[j] <= maxJ) {
		if(primes[i]*primes[j] < limit) {
			count++;
		}
		j++;
	}
}
// 210035
// var count = 0;
// for(var i = 1; i < 100000000; i++) {
// 	if(isCompsite(i)) {count++;}
// 	// console.log(i,isCompsite(i));
// }



console.log(count);