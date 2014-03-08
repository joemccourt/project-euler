// Joe McCourt
// Mar 8th, 2014
// Project Euler problem 164
// Numbers for which no three consecutive digits have a sum greater than a given value

// How many 20 digit numbers n (without any leading zero)
// exist such that no three consecutive digits of n have
// a sum greater than 9?


// [d20,d19,d18,...d1]
// dn + dn+1 + dn+2 <= 9

// How does this constraint impact number of degrees of freedom?

// For 3 digit numbers, what's the solution?

//22199593 for 11
var numDigits = 20;
var numSolutions = 0;

// var searchValu
var memo = {};

var search = function(digit, lastThree) {
	var count = 0;
	if(digit == numDigits) {return 1;}

	var sum = lastThree[1] + lastThree[2];

	var mapKey = "" + digit + "-" + lastThree[1] + "-" + lastThree[2];
	if(memo[mapKey]) {return memo[mapKey];}

	for(var i = 0; i+sum <= 9; i++) {
		if(digit == 0 && i == 0) {

		} else {
			count += search(digit+1, [lastThree[1],lastThree[2],i]);
		}
	}

	var mapKey = "" + digit + "-" + lastThree[1] + "-" + lastThree[2];
	memo[mapKey] = count;

	return count;
};

console.log(search(0,[0,0,0]));



