//Joe McCourt
//5/28/12

// Project Euler Problem 27
// Considering quadratics of the form:
// n² + an + b, where |a| < 1000 and |b| < 1000
// where |n| is the modulus/absolute value of n
// e.g. |11| = 11 and |-4| = 4
// Find the product of the coefficients, a and b, for the quadratic expression
// that produces the maximum number of primes for consecutive values of n, starting with n = 0.

//Simple prime number checker
function isPrime(number){
	if(number <= 1){return false;}
	if(!(number%2)){return false;}
	var maxCheck = Math.floor(Math.sqrt(number));
	for(var i = 3; i <= maxCheck; i+=2){
		if(!(number%i)){return false;}
	}
	return true;
}


//Brute force
var nMax = 0;
var ab = 0;
for(var a = -999; a < 1000; a++){
	for(var b = a; b < 1000; b++){
		var n = 1;
		while(isPrime(n*n+a*n+b)){
			n++;
		}
		if(n>nMax){
			nMax = n;
			ab = a*b;
			// console.log(n,a,b);
		}
	}
}

console.log(ab);