// Joe McCourt
// Jan 5th, 2014
// Project Euler problem 108
// Diophantine reciprocals I

// In the following equation x, y, and n are positive integers.
// 1/x	+ 1/y = 1/n
// For n = 4 there are exactly three distinct solutions:
// 1/5 + 1/20 = 1/4
// 1/6 + 1/12 = 1/4
// 1/8 + 1/8 = 1/4

// What is the least value of n for which the number of
// distinct solutions exceeds one-thousand?

// 1/x + 1/y = 1/n
// y + x = x*y/n  => (x*y)%n = 0
// n = x*y/(x+y) => (x*y)%(x+y) = 0
// y*n+x*n=x*y
// y*(n-x) = -x*n
// y = x*n/(x-n)

//Note these numbers all have many primefactors
//Search in order of prime factors instead of numerical value

var primes = [2,3,5,7,11,13,17,19,23,29];
var pVector = [1,0,0,0,0,0,0,0,0,0];

var evalVector = function(v) {
	return Math.pow(2,v[0])*Math.pow(3,v[1])*Math.pow(5,v[2])*Math.pow(7,v[3])*Math.pow(11,v[4])*Math.pow(13,v[5])*Math.pow(17,v[6])*Math.pow(19,v[7])*Math.pow(23,v[8])*Math.pow(29,v[9]);
};

// n, num solutions, factorization
// 2 2 [1]
// 4 3 [2]
// 6 5 [1,1]
// 12 8 [2,1]
// 24 11 [3,1]
// 30 14 [1,1,1]
// 60 23 [2,1,1]
// 120 32 [3,1,1]
// 180 38 [2,2,1]
// 210 41 [1,1,1,1]
// 360 53 [3,2,1]
// 420 68 [2,1,1,1]
// 840 95
// 1260 113
// 1680 122
// 2520 158
// 4620 203
// 7560 221
// 9240 284
// 13860 338
// 18480 365
// 27720 473
// 55440 608 [4,2,1,1,1]
// 83160 662 [3,3,1,1,1]
// 110880 743 [5,2,1,1,1]
// 120120 851 [3,1,1,1,1,1]
// 180180 1013 [2,2,1,1,1,1]

//Looking at this I see that next highest
//prime factor is never larger

//Gen numbers to search
var primesL = primes.length;
var maxPower = 10;
var maxValue = 20000000;

var nArray = [];

var genArray = function(index,v) {
	var n = evalVector(v);
	if(n < maxValue) {
		nArray.push(n);

		for(var i = index; i < primesL; i++) {
			if(v[i] < maxPower) {
				var vPass = v.slice(0);
				vPass[i]++;
				if(i == 0 || vPass[i-1] >= vPass[i]) {
					genArray(i,vPass);
				}
			}
		}
	}
};

genArray(0,pVector);
console.log(nArray.length)

// Sort array of numbers to check
nArray.sort(function(a, b) {
	return a - b;
});

//This function could be speed up
//Just not sure how yet hmmmm....
var numSolutions = function(n) {
	var solutions = 0;
	for(var x = n+1; x <= 2*n; x++) {
		// var y = x*n/(x-n);
		if((x*n)%(x-n)==0) {
			solutions++;
			// console.log(n,x,x*n/(x-n))
		}
	}
	return solutions;
};

// numSolutions(18378360);
var mostSolutions = 0;
for(var nIndex = 0; nIndex < nArray.length; nIndex++) {
	var n = nArray[nIndex];
	var solutions = numSolutions(n);
	if(solutions > mostSolutions) {
		mostSolutions = solutions;
		console.log(n,solutions);

		if(mostSolutions > 1000) {
			break;
		}
	}
}

console.log(solutions);


