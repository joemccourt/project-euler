// Joe McCourt
// Jan 16th 2014
// Project Euler Problem 73
// Counting fractions in a range

// Consider the fraction, n/d, where n and d are positive integers.
// If n<d and HCF(n,d)=1, it is called a reduced proper fraction.

// If we list the set of reduced proper fractions for d ≤ 8
// in ascending order of size, we get:

// 1/8, 1/7, 1/6, 1/5, 1/4, 2/7, 1/3, 3/8, 2/5, 3/7,
// 1/2, 4/7, 3/5, 5/8, 2/3, 5/7, 3/4, 4/5, 5/6, 6/7, 7/8

// It can be seen that there are 3 fractions between 1/3 and 1/2.

// How many fractions lie between 1/3 and 1/2 in the sorted set
// of reduced proper fractions for d ≤ 12,000?

function getPrimeFactors(number){
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

var fractions = {};
for(var d = 1; d <= 12000; d++) {
	var dFactors = getPrimeFactors(d);
	for(var n = Math.floor(d/3); n < d/2; n++) {
		if(n <= d/3) {continue;}
		var nFactors = getPrimeFactors(n);
		var nReduced = n;
		var dReduced = d;
		for(var f in nFactors) {
			if(dFactors[f]) {
				var pow = Math.min(nFactors[f],dFactors[f]);
				nReduced /= Math.pow(f,pow);
				dReduced /= Math.pow(f,pow);
			}
		}

		fractions[""+nReduced+"/"+dReduced] = true;
	}
}

var num = 0;
for(var f in fractions) {
	num++;
}
console.log(num);
// console.log(fractions);
