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

var maxDivisor = 0;
var divisors = {};
var divisorsSorted = [];

function insertDivisor(value) {
	var location = locationOf(value,0,divisorsSorted.length);
	if(location < 0) {return;}
	divisorsSorted.splice(location + 1, 0, value);
};

function locationOf(element, startI, endI) {
	// for(var i = startI; i < endI; i++) {
	// 	var d = divisorsSorted[i];
	// 	if(element > d) {return Math.max(0,i-1);}
	// 	if(element == d) {return -1;}
	// }
	// return Math.max(0,endI-1);
	var array = divisorsSorted;
	var pivotI = startI + (endI - startI) / 2 | 0;
	if(array[pivotI] === element) {
		return -1;
	}

	if(endI-startI <= 1) {
		return pivotI;
	}

	if(array[pivotI] < element) {
		// console.log(element,array,startI,endI,pivotI)
		return locationOf(element, pivotI, endI);
	}else{
		return locationOf(element, startI, pivotI);
	}
}


var isPrime = function(number){
	// for(var i = 3; i <= maxCheck; i+=2){
	var limit = Math.sqrt((number+1)/2);
	for(var i = 0; i < divisorsSorted.length; i++) {
		var d = divisorsSorted[i];
		if( d > 2*limit) {break;}
		if(!(number%d)){
			//console.log(Math.sqrt((number+1)/2),number,i,number/i);
			var q = number/d;
			if(!divisors[q]) {
				// if(key > maxDivisor) {
				// 	maxDivisor = parseInt(key,10);
				// }
				insertDivisor(q);
				getPrimeFactors(q);
				// console.log(number,key,f);
				// divisors[q] = true;
			}

			return false;
		}
	}
	if(number <= maxFactor) {
		insertDivisor(number);
	}
	return true;
};


function getPrimeFactors(number) {
	var factors = "";
	var d = 2;
	var limit = Math.ceil(Math.sqrt(number));

	while(d <= limit){
		if(!(number%d)){

			// factors = factors + d + ",";
			insertDivisor(d);
			// if(number <= maxFactor) {
			// 	divisors[d] = true;
			// }

			number/=d;
		}else{
			d++;
		}
	}

	if(d <= number) {
		// factors[number] = 1;

		// if(number <= maxFactor) {
			// factors = factors + number + ",";

			insertDivisor(number);
			// divisors[number] = true;
		// }
	}
	return factors;
};

// var maxFactor = 100000;//Math.ceil(Math.sqrt(2*maxN*maxN-1));
// var count = 0;
// var tn = [];
// for(var n = 2; n <= maxN; n++) {
// 	var tn[n-2] = 2*n*n-1;
// 	// console.log(tn);
// 	// if(isPrime(tn)){count++;}
// }

// console.log(count)
// console.log(divisorsSorted.length);
// divisors.sort(function(a,b){return a < b ? -1 : 1;});

// console.log(divisorsSorted);

var maxN = 1000;
var count = 0;
var tn = [];
var isComposite = [];
var checked = {};
for(var n = 2; n <= maxN; n++) {
	tn[n-2] = 2*n*n-1;
	isComposite[n-2] = 0;
}

var seiveN = function(i,n) {
	if(n < 7) {return;}
	checked[n] = true;
	for(var j = i+1; j < tn.length; j++) {
		var n2 = tn[j];
		if(n2 % n == 0) {
			isComposite[j] = 1;
			if(!checked[n2/n]){
				seiveN(j,n2/n);
			}
		}
	}
};

for(var i = 0; i < tn.length; i++) {
	if(!isComposite[i]) {
		var n1 = tn[i];
		seiveN(i,n1);
	}
}

for(var i = 0; i < isComposite.length; i++) {
	if(!isComposite[i]) {
		count++;
	}
}

console.log(count)
// console.log(tn);
// console.log(isComposite)

