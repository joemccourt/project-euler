// Joe McCourt
// Mar 8th, 2014
// Project Euler problem 64
// Odd period square roots

// All square roots are periodic when written as continued fractions
// and can be written in the form:

// It can be seen that the sequence is repeating.
// For conciseness, we use the notation √23 = [4;(1,3,1,8)],
// to indicate that the block (1,3,1,8) repeats indefinitely.

// The first ten continued fraction representations of (irrational)
// square roots are:

// √2=[1;(2)], period=1
// √3=[1;(1,2)], period=2
// √5=[2;(4)], period=1
// √6=[2;(2,4)], period=2
// √7=[2;(1,1,1,4)], period=4
// √8=[2;(1,4)], period=2
// √10=[3;(6)], period=1
// √11=[3;(3,6)], period=2
// √12= [3;(2,6)], period=2
// √13=[3;(1,1,1,1,6)], period=5

// Exactly four continued fractions, for N ≤ 13, have an odd period.

// How many continued fractions for N ≤ 10000 have an odd period?


var isOddPeriod = function(n) {
	var goal = Math.sqrt(n);

	var startState = "";
	for(var i = 0; i < 100000; i++) {
		var first = Math.floor(goal);
		var remainder = goal - first;

		if(remainder == 0) {return false;}
		// console.log(n,first,remainder);

		var stateHash = ""+first+"-"+Math.round(remainder*100000000);
		if(i == 1) {
			startState = stateHash;
		} else if (stateHash == startState) {
			return (i - 1) % 2 == 1;
		}

		// mapState[stateHash] = i;
 // 0.2782329983125269
		goal = 1/remainder;
	}

	console.log("Warning: ", n);
	return false;
};

var count = 0;
for(var i = 1; i <= 100; i++) {
	if(isOddPeriod(i)) {
		count++;
	}
}

// console.log(isOddPeriod(46));

console.log(count);

//4426 wrong