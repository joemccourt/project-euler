// Joe McCourt
// Feb 5th, 2014
// Project Euler problem 88
// Product-sum numbers

// A natural number, N, that can be written as the sum and product
// of a given set of at least two natural numbers, {a1, a2, ... , ak}
// is called a product-sum number: N = a1 + a2 + ... + ak = a1 × a2 × ... × ak.

// For example, 6 = 1 + 2 + 3 = 1 × 2 × 3.

// For a given set of size, k, we shall call the smallest N with this property
// a minimal product-sum number. The minimal product-sum numbers for sets of size,
// k = 2, 3, 4, 5, and 6 are as follows.

// k=2: 4 = 2 × 2 = 2 + 2
// k=3: 6 = 1 × 2 × 3 = 1 + 2 + 3
// k=4: 8 = 1 × 1 × 2 × 4 = 1 + 1 + 2 + 4
// k=5: 8 = 1 × 1 × 2 × 2 × 2 = 1 + 1 + 2 + 2 + 2
// k=6: 12 = 1 × 1 × 1 × 1 × 2 × 6 = 1 + 1 + 1 + 1 + 2 + 6

// Hence for 2≤k≤6, the sum of all the minimal product-sum numbers is 4+6+8+12 = 30;
// note that 8 is only counted once in the sum.

// In fact, as the complete set of minimal product-sum numbers for 2≤k≤12 is
// {4, 6, 8, 12, 15, 16}, the sum is 61.

// What is the sum of all the minimal product-sum numbers for 2≤k≤12000?


// For given N, can we find all valid sum and product property?
// N = N
// 1*1*1...*2*N = (N-2) + 2 + N = 2N

// For given k can we find minimal N?
// Prod(xi) = Sum(xi)
// 1*....*2*k = 2k = (k-1)+2+k  (alwaays valid, but not necessarily min)
// So from this solution, how to search for smaller ones?
// Value must be greater than k because 1+1+1+... = k != 1*1*1*1
// x0 * x1 * ... * xk = N = x0 + x1 + ... + xk  N: (k,2k]
// (x0 * x1 * ... * xk) * (N-p)/N = (N-p) = x0 + x1 + ... + xk - p

// if (k-1) equals 4:
// 2(k-1) = 1*....*2*2*(k-1)/2 = (k-2)+4+(k-1)/2




// Seems to work for prime factorization Hmmmm
// k=5: 10 = 1 × 1 × 1 × 2 × 5 = 1 + 1 + 1 + 2 + 5
// k=7: 12 = 1*1*1*1*1*4*3 = 12 = 5 + 4 + 3
// k=9: 15 = 1*1*1*1*1*1*3*5 = 15 = 1+1+1+1+1+1+3+5

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
		}else{
			d++;
		}
	}

	if(d <= number) {
		factors[number] = 1;
	}
	return factors;
};

var minK = {};
var searchPS = function(vector,n,mapSearched,mapHashWidth) {
	var sum = 0;
	for(var i = 0; i < vector.length; i++) {
		sum += vector[i];
	}

	var k = vector.length + n - sum;
	// console.log(k,vector);
	if(!minK[k] || n < minK[k]) {
		minK[k] = n;
	}

	var iVisted = {};
	var ijVisted = {};
	for(var i = 0; i < vector.length-1; i++) {
		// if(iVisted[vector[i]]) {continue;} else {iVisted[vector[i]] = true;}
		for(var j = i+1; j < vector.length; j++) {
			// if(ijVisted[vector[j]+vector[i]*n]) {continue;} else {ijVisted[vector[j]+vector[i]*n] = true;}
			var newVector = vector.slice(0,i);
			newVector = newVector.concat(vector.slice(i+1));
			newVector[j-1] = vector[i]*vector[j];
			// newVector[i] = 1;

			newVector.sort(function(a, b) {return a - b;});
			var mapHash = "";
			for(var p = 0; p < newVector.length; p++) {
				mapHash += newVector[p]+",";// * Math.pow(mapHashWidth,p);
			}

			// if(mapHash > Math.pow(2,53)) {console.log("WARNING")}
			if(mapSearched[mapHash]) {continue;} else {mapSearched[mapHash] = true;}

			searchPS(newVector,n,mapSearched,mapHashWidth);
		}
	}
}

var maxKRange = 12000;
for(var n = 2; n <= 2*maxKRange; n++) {
	var factors = getPrimeFactors(n);
	var vector = [];
	var factorNums = [];
	var maxF = 0;
	for(var key in factors) {
		if(factors[key] > maxF) {maxF = factors[key];}
		for(var i = 0; i < factors[key]; i++) {
			factorNums.push(parseInt(key,10));
		}
	}

	var mapSearched = {};
	searchPS(factorNums,n,mapSearched,maxF+1);
}

// Sum unique items
var uniqueK = {};
var sum = 0;
for(var k in minK) {
	if(k >= 2 && k <= maxKRange && !uniqueK[minK[k]]) {
		uniqueK[minK[k]] = true;
		sum += minK[k];	
	}
}
//7611973
// console.log(minK);
console.log(uniqueK,sum);
// for(var k = 2; k < 10; k++) {
// 	var solved = true;
// 	for(var n = k; n < 2*k; n++) {
// 		var factors = getPrimeFactors(n);
// 		var sum = k;
// 		for(var key in factors) {
// 			sum += factors[key]*(key-1);
// 		}

// 		if(sum == n) {
// 			solved = true;
// 			break;
// 		}
// 	}

// 	console.log(k,n);
// }



