// Joe McCourt
// Jan 4th, 2014
// Project Euler problem 85


// The smallest number expressible as the sum of
// a prime square, prime cube, and prime fourth power
// is 28. In fact, there are exactly four numbers
// below fifty that can be expressed in such a way:

// 28 = 2^2 + 2^3 + 2^4
// 33 = 3^2 + 2^3 + 2^4
// 49 = 5^2 + 2^3 + 2^4
// 47 = 2^2 + 3^3 + 2^4

// How many numbers below fifty million
// can be expressed as the sum of a prime square,
// prime cube, and prime fourth power?

// Highest prime I'll need will be sqrt(50 million) = 7072

var limit = 50000000;
var limit2 = Math.ceil(Math.pow(limit,1/2));
var limit3 = Math.ceil(Math.pow(limit,1/3));
var limit4 = Math.ceil(Math.pow(limit,1/4));

console.log(limit,limit2,limit3,limit4)

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

var primes = genPrimes(limit2);
var dict = {};
var numSolves = 0;

for(var s = 0; primes[s] < limit2; s++) {
	for(var c = 0; primes[c] < limit3; c++) {
		for(var f = 0; primes[f] < limit4; f++) {
			var num = Math.pow(primes[s],2)+Math.pow(primes[c],3)+Math.pow(primes[f],4);
			if(num < limit && !dict[num]) {
				dict[num] = true;
				numSolves++;
			}
		}
	}
}

console.log(numSolves)