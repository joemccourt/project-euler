// Joe McCourt
// 3/16/2014
// Project Euler problem 124
// Ordered radicals

// The radical of n, rad(n), is the product of distinct prime factors of n.
// For example, 504 = 2^3 × 3^2 × 7, so rad(504) = 2 × 3 × 7 = 42.

// If we calculate rad(n) for 1 ≤ n ≤ 10, then sort them on rad(n),
// and sorting on n if the radical values are equal

// Let E(k) be the kth element in the sorted n column;
// for example, E(4) = 8 and E(6) = 9.

// If rad(n) is sorted for 1 ≤ n ≤ 100000, find E(10000).

function getPrimeFactors(number) {
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

var getRad = function(n) {
	var factors = getPrimeFactors(n);
	var r = 1;
	for(var f in factors) {
		r *= f;
	}

	return r;
};

var rad = [];
for(var i = 1; i <= 100000; i++) {
	rad.push({'n': i, 'rad': getRad(i)})
}

var radSort = function(a, b) {
	if(a.rad < b.rad) {return -1;}
	if(a.rad > b.rad) {return 1;}
	if(a.n < b.n) {return -1;}
	if(a.n > b.n) {return 1;}

	return 0;
}
rad.sort(radSort)
console.log(rad[10000-1]);