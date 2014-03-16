// Joe McCourt
// 3/15/2014
// Project Euler problem 293
// Pseudo-Fortunate Numbers

// An even positive integer N will be called admissible,
// if it is a power of 2 or its distinct prime factors are consecutive primes.
// The first twelve admissible numbers are 2,4,6,8,12,16,18,24,30,32,36,48.

// If N is admissible, the smallest integer M > 1 such that N+M is prime,
// will be called the pseudo-Fortunate number for N.

// For example, N=630 is admissible since it is even and
// its distinct prime factors are the consecutive primes 2,3,5 and 7.
// The next prime number after 631 is 641; hence,
// the pseudo-Fortunate number for 630 is M=11.
// It can also be seen that the pseudo-Fortunate number for 16 is 3.

// Find the sum of all distinct pseudo-Fortunate numbers
// for admissible numbers N less than 10^9.

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
	var primeMap = {};
	for(var i = 2; i < intMax; i++) {
		if(primes[i] == 1) {
			primeList.push(i);
			// primeMap[i] = true;
		}
	}
	return {
		'list': primeList,
		'map': primeMap
	};
};

var admissible = {2: true};
var getAdmissibleUpTo = function(primes, n, prod, maxIndex) {

	var initialCall = prod == 2;

	var prod0 = prod;
	for(var i = 0; i <= maxIndex; i++) {
		var prod = prod0;
		while(prod < n) {
			if(!admissible[prod]) {
				admissible[prod] = true;
				getAdmissibleUpTo(primes, n, prod, maxIndex);
			} else {
				// break;
			}
			prod *= primes[i];
		}
	}

	if(initialCall) {
		prod = 2;
		while(prod < n) {
			maxIndex++;
			prod *= primes[maxIndex];
			getAdmissibleUpTo(primes, n, prod, maxIndex);
		}
	}
};

var isPrime = function(number){
	if(number <= 1){return false;}
	if(number == 2){return true;}
	if(!(number%2)){return false;}
	var maxCheck = Math.floor(Math.sqrt(number));
	for(var i = 3; i <= maxCheck; i+=2){
		if(!(number%i)){return false;}
	}
	return true;
};

var limit = 1000000000;
var primesObj = getPrimesUpTo(100);
getAdmissibleUpTo(primesObj.list, limit, 2, 0);

var mValues = {};
var count = 0;
for(var key in admissible) {
	count++;
	var m = 2;
	var a = parseInt(key,10);
	while(!isPrime(a+m)){
		m++;
	}
	mValues[m] = true;
	// console.log(a,m);
}
console.log("Number Admissible:", count);
// console.log(mValues);

var sum = 0;
for(var key in mValues) {
	sum += parseInt(key,10);
}

console.log(sum);