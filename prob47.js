// Joe McCourt
// 7/22/12

// The first two consecutive numbers to have two distinct prime factors are:
// 14 = 2 * 7
// 15 = 3 * 5
// The first three consecutive numbers to have three distinct prime factors are:
// 644 = 2² * 7 * 23
// 645 = 3 * 5 * 43
// 646 = 2 * 17 * 19.
// Find the first four consecutive integers to have four distinct primes factors.
// What is the first of these numbers?

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

function numDistinct(factors){
	var num = 0;
	for(f in factors){
		num++;
	}
	return num;
}


for(var i = 1;;i++){
	if(numDistinct(getPrimeFactors(i))==4&&numDistinct(getPrimeFactors(i+1))==4&&numDistinct(getPrimeFactors(i+2))==4&&numDistinct(getPrimeFactors(i+3))==4){
		console.log(i);
		return;
	}
}
