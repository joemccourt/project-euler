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

// Note that win/loses are not communitivitive,
// win,lose will not have same result as lose,win

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
var probHitGoal = function(state) {
	if(state.flipsLeft == 0) {return state.prob;}
	if(state.prob == 0) {return 0;}


};

var state = {
	assets: 1,
	prob: 1,
	f: 0.5,
	goal: 1000000000,
	flipsLeft: 10
};

playGame(state);
