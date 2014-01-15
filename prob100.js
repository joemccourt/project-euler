// Joe McCourt
// Jan 14th, 2014
// Project Euler problem 100
// Arranged probability

// If a box contains twenty-one coloured discs,
// composed of fifteen blue discs and six red discs,
// and two discs were taken at random, it can be seen that the probability
// of taking two blue discs, P(BB) = (15/21)×(14/20) = 1/2.

// The next such arrangement, for which there is exactly 50% chance
// of taking two blue discs at random, is a box containing eighty-five blue discs
// and thirty-five red discs.

// By finding the first arrangement to contain over 10^12 = 1,000,000,000,000
// discs in total, determine the number of blue discs that the box would contain.

// P(BB) = blue/(red+blue) * (blue-1)/(red+blue-1)
// let r+b = n

// 1/2 = (15/21)*(14/20)
// 1/2 = (85/120)*(84/119)

// 1/2 = b*(b-1)/(n*(n-1))
// n*(n-1) = 2*b*(b-1)
// n/b = 2*(b-1)/(n-1)
// n/(b-1) = 2*b/(n-1)

// 0 = b^2-b-n(n-1)/2
// b = (1 +/-sqrt(1+4*n(n-1)/2) )/2
// b = 1/2 +/-sqrt(1/4+n(n-1)/2))
// 2*b = 1 + sqrt(1+2*n^2-2*n)
// 2*b = 1 + sqrt(2*n^2-2*n+1)

// => sqrt(2*n^2-2*n+1) = kx
// => 2n^2-2n+1 = k^2*x^2

// 1/2 = (3*5 / (3*7)) * (2*7 / (2^2*5))
// 1/2 = (5*17 / (2^3*3*5)) * (2^2*3*7 / (17*7))

// var n = 21;
// console.log(Math.sqrt(1+2*n*n-2*n))

//sqrt(2n^2-2n+1) = 2ki


// Sidenote:
// for limit n->inf,
// b = 1 + sqrt(2*n^2-2n+1)/2
// b = sqrt(2)*n/2
// n/b = sqrt(2)
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

// sqrt(k) = 0.5 + n;
// 2*sqrt(k) = 1+2*n;

// 2b-1 = sqrt(2n^2-2n+1)
// (2b-1)^2 = 2n^2-2n+1
var start = 30;//1000000000000;
for(var n = start; n < start+1000000000; n++) {
	var b = (1 + Math.sqrt(2*n*n-2*n+1))/2;
	// var b = (1 + Math.sqrt(n*n-n+1/2)*Math.sqrt(2))/2;

	if(b-(b|0) == 0) {
		console.log(n,b,n/b);
		break;
		//console.log(getPrimeFactors(n),getPrimeFactors(n-1),getPrimeFactors(b),getPrimeFactors(b-1));
	}
}
