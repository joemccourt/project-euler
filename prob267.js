// Joe McCourt
// Feb 20th, 2014
// Project Euler problem 267
// Billionaire

// You are given a unique investment opportunity.
// Starting with £1 of capital, you can choose
// a fixed proportion, f, of your capital to bet on a fair coin toss
// repeatedly for 1000 tosses.

// Your return is double your bet for heads and you lose your bet for tails.

// For example, if f = 1/4, for the first toss you bet £0.25,
// and if heads comes up you win £0.5 and so then have £1.5.
// You then bet £0.375 and if the second toss is tails, you have £1.125.

// Choosing f to maximize your chances of having at least £1,000,000,000
// after 1,000 flips, what is the chance that you become a billionaire?

// All computations are assumed to be exact (no rounding),
// but give your answer rounded to 12 digits behind the decimal point
// in the form 0.abcdefghijkl.


// Extreme f = 0:
// Zero chance of getting  billionaire

// Extreme f = 1:
// 2^-1000 chance.

// At what f, assets, and num flips left is it impossible to get goal?
// This limit is assuming every flip is a win
// assets(n+1) = assets(n) * (1-f) + 2*(assets(n) * f) 
// assets(n+1) = assets(n) * (1+f)
// goal = assets * (1+f)^(num flips)

// So after every flip check that goal <= assets * (1+f)^(num flips left)

// For starting out, assets = 1, num flips = 100
// 10^9 = 1 * (1+flimit)^1000
// flimit = (10^9)^(1/1000) - 1
// flimit = 10^(9/1000) - 1
// flimit = 0.020939...

// console.log(Math.pow(10,9/1000)-1)

// Let's try brute force with lower number of flips
// This is correct, but scales horribly (2^num flips)
var probHitGoal = function(state) {
	console.log(state)
	if(state.flipsLeft == 0) {
		if(state.assets >= state.goal) {
			return state.prob;
		} else {
			return 0;
		}
	}

	if(state.prob == 0) {return 0;}

	var stateWin = {
		assets: state.assets * (1+state.f),
		prob: state.prob * 0.5,
		f: state.f,
		goal: state.goal,
		flipsLeft: state.flipsLeft - 1
	};

	var stateLose = {
		assets: state.assets * (1-state.f),
		prob: state.prob * 0.5,
		f: state.f,
		goal: state.goal,
		flipsLeft: state.flipsLeft - 1
	};

	var probWin = probHitGoal(stateWin) + probHitGoal(stateLose);

	return probWin;
};

// Note that win/loses order is communitivitive,
// We can take advantage of this, only care about number of win/loses

// for w wins and l losses, an = a0 * (1+2f)^w*(1-f)^l

var buildBinomial = function(n) {
	var bin = [];
	var normalize = true;
	var sum = 0;
	for(var k = 0; k <= n; k++) {
		if(k == 0 || k == n) {
			bin[k] = 1;
		} else {
			var kTmp = k;
			var diff = n - k;
			if(k > diff) {
				kTmp = diff;
			}

			var c = 1
			for(var i = 0; i < k; i++) {
				c = c * (n - i) / (i + 1);
			}
			bin[k] = c;
		}
		sum += bin[k];
	}

	if(normalize) {
		for(var k = 0; k <= n; k++) {
			bin[k] /= sum;
		}
	}
	return bin;
};

var probHitGoalv2 = function(state) {
	var prob = 0;
	var numFlips = state.flipsLeft;
	var biniomial = buildBinomial(numFlips);
	var check = 0;
	for(var numWin = 0; numWin <= numFlips; numWin++) {
		var assets = state.assets * Math.pow(1+2*state.f,numWin) * Math.pow(1-state.f,numFlips - numWin);
		check += biniomial[numWin];
		// console.log(numWin,assets,biniomial[numWin]);
		if(assets >= state.goal) {
			prob += biniomial[numWin];
		}
	}
	// console.log(check);
	return prob;
};


var state = {
	assets: 1,
	prob: 1,
	f: 0.16,
	goal: 1000000000,
	flipsLeft: 1000
};


// console.log(buildBinomial(2))


// Solved for max f by trial and error, seems to be very smooth max
var prob = probHitGoalv2(state);
console.log(prob);


