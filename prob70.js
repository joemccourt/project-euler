// Joe McCourt
// Feb 12th, 2014
// Project Euler problem 70
// Totient permutation

// Euler's Totient function, φ(n) [sometimes called the phi function],
// is used to determine the number of numbers
// less than n which are relatively prime to n.
// For example, as 1, 2, 4, 5, 7, and 8,
// are all less than nine and relatively prime to nine, φ(9)=6.

// Interestingly, φ(87109)=79180, and it can be seen that 87109
// is a permutation of 79180.
// Find the value of n, 1 < n < 10^7,
// for which φ(n) is a permutation of n
// and the ratio n/φ(n) produces a minimum.


// // Primes sieve
// var intMax = 100;
// var primes = [];
// for(var i = 0; i < intMax; i++) { 
// 	primes[i] = 1;
// }

// for(var i = 2; i < intMax; i++) {
// 	if(primes[i]) {
// 		for(var j = 2; i*j < intMax; j++) {
// 			primes[i*j] = 0;
// 		}
// 	}
// }

function arePerms(n1,n2) {
	var n1Map = [0,0,0,0,0,0,0,0,0,0];
	var n2Map = [0,0,0,0,0,0,0,0,0,0];

	while(n1 >= 10) {
		n1Map[n1%10]++;
		n1 = Math.floor(n1/10);
	}
	n1Map[n1]++;

	while(n2 >= 10) {
		n2Map[n2%10]++;
		n2 = Math.floor(n2/10);
	}
	n2Map[n2]++;

	var valid = true;
	for(var i = 0; i < n1Map.length; i++) {
		if(n1Map[i] != n2Map[i]) {
			valid = false;
		}
	}
	return valid;
}
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
			limit = Math.ceil(Math.sqrt(number));
		}else{
			d++;
		}
	}

	if(d <= number) {
		factors[number] = 1;
	}

	return factors;
};

var totient = function(n) {
	var factors = getPrimeFactors(n);

	var t = 1;
	var count = 0;
	for(var k in factors) {
		var kVal = parseInt(k,10);
		t *= 1 - 1 / kVal;
		count++;
	}

	if(count == 0) {return 1;}
	return Math.round(n*t);
}

// console.log(totient(87109))

var minRatio = 1000;
var minRatioN = 1;
for(var n = 2; n < 10000000; n++) {
	var t = totient(n);
	if(n/t < minRatio && arePerms(t,n)) {
		minRatio = n/t;
		minRatioN = n;
		console.log(n,t,n/t);
	}
}