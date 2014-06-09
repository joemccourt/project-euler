// Joe McCourt
// Jun 6th 2014
// Project Euler Problem 329
// Prime Frog

// Susan has a prime frog.
// Her frog is jumping around over 500 squares numbered 1 to 500.
// He can only jump one square to the left or to the right,
// with equal probability, and he cannot jump outside the range [1;500].
// (if it lands at either end, it automatically jumps to the
// only available square on the next move.)

// When he is on a square with a prime number on it, he croaks 'P' (PRIME)
// with probability 2/3 or 'N' (NOT PRIME) with probability 1/3 just before
// jumping to the next square.
// When he is on a square with a number on it that
// is not a prime he croaks 'P' with probability 1/3 or
// 'N' with probability 2/3 just before jumping to the next square.

// Given that the frog's starting position is random
// with the same probability for every square,
// and given that she listens to his first 15 croaks,
// what is the probability that she hears the sequence PPPPNNPPPNPPNPN?
// Give your answer as a fraction p/q in reduced form. 


// On each square, 1/2 chance going left, 1/2 go right
// Except on 1 2/2 chance of going right and
// Excpet on 500 2/2 chance of going left
// If Prime, 2/3 "P", 1/3 "N"
// If not Prime, 1/3 "P", 2/3 "N"


function isPrime(number){
	if(number <= 1){return false;}
	if(number == 2){return true;}
	if(!(number%2)){return false;}
	var maxCheck = Math.floor(Math.sqrt(number));
	for(var i = 3; i <= maxCheck; i+=2){
		if(!(number%i)){return false;}
	}
	return true;
}

function genPrimes(limit) {
	var primes = {};
	for(var i = 2; i <= limit; i++) {
		if(isPrime(i)) {
			primes[i] = true;
		}
	}

	return primes;
}

var state = [];

var genStates = function() {
	for(var i = 1; i <= 500; i++) {
		state[i] = {p:1,q:500};
	}
};

var newBlankState = function() {
	var newState = []
	for(var i = 1; i <= 500; i++) {
		newState[i] = {p:0,q:500};
	}
	return newState;
};

var copyState = function() {
	var newState = [];
	for(var i = 1; i <= 500; i++) {
		newState[i] = {p:state[i].p,q:state[i].q};
	}
	return newState;
}

var primeMap = genPrimes(500);



var takeStep = function(k) {
	var newState = newBlankState();

	for(var i = 1; i <= 500; i++) {
		var p = state[i].p;
		var q = state[i].q;

		var onPrime = primeMap[i] == true;

		var pMul = onPrime ? 2 : 1;
		if(sequence[k] == 'N') {
			pMul = onPrime ? 1 : 2;
		}

		pMul *= state[i].p;

		if(i == 1) {
			newState[2].p += 1 * pMul;
		} else {
			newState[i-1].p += 1 * pMul;
		}

		if(i == 500) {
			newState[499].p += 1 * pMul;
		} else {
			newState[i+1].p += 1 * pMul;
		}
	}

	state = newState;
};

var sequence = ["P","P","P","P","N","N","P","P","P","N","P","P","N","P","N"]
// var sequence = ["P"];
genStates();

for(var i = 0; i < sequence.length; i++) {
	takeStep(i);
}

var count = 0;
for(var i = 1; i < state.length; i++) {
	count += state[i].p;
}

var qExp = [2,3,5];
var qCount = [2 + sequence.length, sequence.length, 3];

for(var i = 0; i < qExp.length; i++) {
	while(count % qExp[i] == 0 && qCount[i] > 0) {
		count /= qExp[i];
		qCount[i]--;
	}
}

var q = Math.pow(qExp[0], qCount[0]) * Math.pow(qExp[1], qCount[1]) * Math.pow(qExp[2], qCount[2]);

// console.log(state);
console.log(count,q,qCount, count/q);

// console.log(primeMap);
