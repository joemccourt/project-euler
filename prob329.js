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
}


var copyState = function() {
	var newState = [];
	for(var i = 1; i <= 500; i++) {
		newState[i] = {p:state[i].p,q:state[i].q};
	}
	return newState;
}

var primeMap = genPrimes(500);



var takeStep = function() {
	var newState = copyState();

	newState[500].p = 9009;

};

genStates();
takeStep();
console.log(state);

// console.log(primeMap);
