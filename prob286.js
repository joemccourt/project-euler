// Joe McCourt
// 3/17/2014
// Project Euler problem 286
// Scoring probabilities

// Barbara is a mathematician and a basketball player.
// She has found that the probability of scoring a point
// when shooting from a distance x is exactly (1 - x/q),
// where q is a real constant greater than 50.

// During each practice run, she takes shots from distances
// x = 1, x = 2, ..., x = 50 and, according to her records,
// she has precisely a 2 % chance to score a total of exactly 20 points.

// Find q and give your answer rounded to 10 decimal places.

// prob of 20 points = prob(20 are true)*(1-prob(30 are true))

// Assume we know q, what is prob of scoring exactly 20?

var q = 60;
var daysLimit = 50;

var map = {};
var probScore = function(pointsLeft, day) {
	if(day == 0) {map = {};}
	var state = "" + pointsLeft + ":" + day;
	if(map[state]) {
		return map[state];
	}

	var prob = 0;
	var x = day+1;
	if(day == daysLimit) {
		if(pointsLeft == 0) {
			return 1;
		} else {
			return 0;
		}
	}

	if(pointsLeft > daysLimit - day) { return 0;}
	if(pointsLeft < 0) { return 0; }

	prob += (1-x/q)*probScore(pointsLeft-1,day+1);	
	prob += x/q*probScore(pointsLeft,day+1);

	map[state] = prob;
	return prob;
};

var deltaQ = 5;
var goal = 0.02;
var bestDiff = 10;
while(deltaQ > 0.000000000001) {
	var q0 = q;
	q = q0 + deltaQ;
	var hQ = probScore(20, 0);
	q = q0 - deltaQ;
	var lQ = probScore(20, 0);
	var diffHQ = Math.abs(hQ-goal);
	var diffLQ = Math.abs(lQ-goal);

	if(bestDiff < diffHQ && bestDiff < diffLQ) {
		deltaQ /= 2;
		q = q0;
	} else if(bestDiff > diffLQ && q0 - deltaQ > 50) {
		bestDiff = diffLQ;
		q = q0 - deltaQ;
	} else {
		bestDiff = diffHQ;
		q = q0 + deltaQ;	
	}
}

console.log(q, probScore(20, 0));
