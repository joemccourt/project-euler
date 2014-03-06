// Joe McCourt
// Jan 8th, 2014
// Project Euler problem 145
// How many reversible numbers are there below one-billion?

// Some positive integers n have the property that the sum [ n + reverse(n) ]
// consists entirely of odd (decimal) digits. For instance, 36 + 63 = 99 and 409 + 904 = 1313.
// We will call such numbers reversible; so 36, 63, 409, and 904 are reversible.
// Leading zeroes are not allowed in either n or reverse(n).

// There are 120 reversible numbers below one-thousand.

// How many reversible numbers are there below one-billion (10^9)?

//Note that there are 5 odd digits, 1,3,5,7,9
//below 10^9 there are 5^8 completely odd digit numbers
// = 390625 posible values
// is there a way to search these instead of all numbers < 10^9 ?

var isReversable = function(n) {
	var sum = n;
	var maxPlace = 1;
	while(n > 10*maxPlace) {
		maxPlace *= 10;
	}

	if(n%10 == 0) {return false;}
	while(n >= 10) {
		sum += (n%10) * maxPlace;
		// console.log((n%10) * maxPlace);
		n = Math.floor(n/10);
		maxPlace /= 10;
	}
	sum += n;
	// console.log(sum);
	if(n == 0) {return false;}

	while(sum > 10) {
		if((sum%10)%2 == 0) {return false;}
		sum = Math.floor(sum/10);
	}

	if(sum%2 == 0) {return false;}

	return true;
}

var count = 0;

for(var i = 1; i < 1000000000; i++) {
	if(isReversable(i)) {
		// console.log(i);
		count++;
	}
}

console.log(count);
// console.log(isReversable(102))