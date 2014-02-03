// Digit factorial chains
// Problem 74

// The number 145 is well known for the property that the sum of
// the factorial of its digits is equal to 145:

// 1! + 4! + 5! = 1 + 24 + 120 = 145

// Perhaps less well known is 169, in that it produces the longest chain
// of numbers that link back to 169;
// it turns out that there are only three such loops that exist:

// 169 → 363601 → 1454 → 169
// 871 → 45361 → 871
// 872 → 45362 → 872

// It is not difficult to prove that EVERY starting number
// will eventually get stuck in a loop. For example,

// 69 → 363600 → 1454 → 169 → 363601 (→ 1454)
// 78 → 45360 → 871 → 45361 (→ 871)
// 540 → 145 (→ 145)

// Starting with 69 produces a chain of five non-repeating terms,
// but the longest non-repeating chain with a starting number
// below one million is sixty terms.

// How many chains, with a starting number below one million,
// contain exactly sixty non-repeating terms?

var f = [1,1,2,6,24,120,720,5040,40320,362880];
var fDigits = function(n) {
	var fSum = 0;
	while(n >= 10) {
		fSum += f[n % 10];
		n = n/10|0;
	}

	fSum += f[n];
	return fSum;
};

var checked = {};
var maxLength = 0;
var numChains = 0;
for(var i = 0; i < 1000000; i++) {

	if(checked[i]) {continue;}
	checked[i] = true;

	var chain = {};
	chain[i] = 1;

	var n = i;
	var length = 1;
	while(true) {
		n = fDigits(n);
		if(chain[n]) {
			// length = length - chain[n];
			if(length == 60) {
				numChains++;
			}

			if(length > maxLength) {
				console.log(i,length);
				// console.log(chain);
				maxLength = length;
			}
			break;
		}
		checked[n] = true;
		length++;
		chain[n] = length;
	}

}

console.log(numChains);