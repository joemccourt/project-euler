// Joe McCourt
// Jan 11th, 2014
// Project Euler problem 92
// Square digit chains

// A number chain is created by continuously adding the
// square of the digits in a number to form a new number
// until it has been seen before.

// For example,

// 44 → 32 → 13 → 10 → 1 → 1
// 85 → 89 → 145 → 42 → 20 → 4 → 16 → 37 → 58 → 89

// Therefore any chain that arrives at 1 or 89
// will become stuck in an endless loop.
// What is most amazing is that EVERY starting number
// will eventually arrive at 1 or 89.

// How many starting numbers below ten million will arrive at 89?

var memo = {
	89: 89,
	1: 1
};

var nextValue = function(n) {
	var sum = 0;
	while(n >= 10) {
		var r = n % 10;
		sum += r*r;
		n = n/10 | 0;
	}
	sum += n*n;
	return sum;
};

var isNumChain89 = function(n) {
	if(memo[n] == 89) {return true;}
	if(memo[n] == 1) {return false;}

	var chain = [n];
	while(true) {
		// console.log(n);
		if(memo[n] == 89) {
			for(var j = 0; j < chain.length; j++) {
				memo[chain[j]] = 89;
			}
			return true;
		} else if(memo[n] == 1) {
			for(var j = 0; j < chain.length; j++) {
				memo[chain[j]] = 1;
			}
			return false;
		} else {
			n = nextValue(n);
			chain.push(n);
		}
	}
}

var num89 = 0;
for(var i = 1; i < 10000000; i++) {
	if(isNumChain89(i)) {
		num89++;
	}
}

// console.log(numChain(145))
// console.log(numChain(44))
// console.log(memo)
console.log(num89);