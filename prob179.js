// Consecutive positive divisors
// Problem 179

// Find the number of integers 1 < n < 10^7,
// for which n and n + 1 have the same number of positive divisors.
// For example, 14 has the positive divisors 1, 2, 7, 14
// while 15 has 1, 3, 5, 15.

// Primes sieve modified
var intMax = 10000000;
var primes = [];
for(var i = 0; i <= intMax; i++) { 
	primes[i] = 0;
}

for(var i = 2; i <= intMax; i++) {
	// if(primes[i] == 0) {
		for(var j = 2; i*j <= intMax; j++) {
			primes[i*j]++;
		}
	// }
}

// num divisors = primes+2
var num = 0;
for(var n = 2; n < intMax; n++) {
	// console.log(n,primes[n]);
	// if(n == 1) {continue;}
	if(primes[n] == primes[n+1]) {
		num++;
	}
}
console.log(num);