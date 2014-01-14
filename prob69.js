// Joe McCourt
// Jan 13th, 2014
// Project Euler problem 69
// Totient maximum

// Euler's Totient function, φ(n) [sometimes called the phi function],
// is used to determine the number of numbers
// less than n which are relatively prime to n.
// For example, as 1, 2, 4, 5, 7, and 8,
// are all less than nine and relatively prime to nine, φ(9)=6.

// It can be seen that n=6 produces a maximum n/φ(n) for n ≤ 10.
// Find the value of n ≤ 1,000,000 for which n/φ(n) is a maximum.



// After some brute force trials I noticed that
// new max values were always product of primes
// largest of these < 1000000 is correct, but
// want to see if I can solve this brute force anyway :)
var getPrimeFactors = function(number){
	var factors = {};
	var d = 2;
	while(d <= number){
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
	return factors;
};

var memoPrimeFactors = {};
var totient = function(n) {

	var factorsN = memoPrimeFactors[n];
	if(!factorsN) {
		factorsN = getPrimeFactors(n);
		memoPrimeFactors[n] = factorsN;
	}

	var num = 1;
	var factors = [];
	for(var i = 2; i < n; i++) {
		var isPrimeFactor = true;
		for(var j = 0; j < factors.length; j++) {
			if(i%factors[j] == 0) {
				isPrimeFactor = false;
				break;
			}
		}

		if(!isPrimeFactor) {
			continue;
		}

		var isPrimeFactor = true;
		if(!memoPrimeFactors[i]) {
			memoPrimeFactors[i] = getPrimeFactors(i);
		}
		for(var factor in memoPrimeFactors[i]) {
			if(factorsN[factor]) {
				isPrimeFactor = false;
				// console.log("not prime",n,i);

				factors.push(i);
				break;
			}
		}

		if(isPrimeFactor) {
			num++;

			if(n / num < maxRatio) {
				return num;
			}
		}
	}
	return num;
};

var totientv2 = function(n) {
	var factorsN = memoPrimeFactors[n];
	if(!factorsN) {
		factorsN = getPrimeFactors(n);
		memoPrimeFactors[n] = factorsN;
	}

	var primes = [false];
	for(var i = 1; i < n; i++) {
		primes[i] = true;
	};

	var num = n-1;
	for(var factor in factorsN) {
		var f = parseInt(factor,10);
		for(var j = f; j < n; j += f) {
			if(primes[j]) {num--;}
			primes[j] = false;
		}
	}

	return num;
};

var maxRatio = 1;
var maxRatioN = 1;

var n = 1;
for(var i = 2; i <= 20000; i++) {
	n = i;
	var t = totientv2(n);
	if(n/t > maxRatio) {
		console.log(n,t,n/t);
		maxRatio = n/t;
		maxRatioN = n;
	}
}
