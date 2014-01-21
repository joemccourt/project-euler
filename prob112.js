// Joe McCourt
// Jan 19th, 2014
// Project Euler problem 112
// Bouncy numbers

// Working from left-to-right if no digit is exceeded by
// the digit to its left it is called an increasing number;
// for example, 134468.

// Similarly if no digit is exceeded by the digit to its right
// it is called a decreasing number; for example, 66420.

// We shall call a positive integer that is neither increasing
// nor decreasing a "bouncy" number; for example, 155349.

// Clearly there cannot be any bouncy numbers below one-hundred,
// but just over half of the numbers below one-thousand (525) are bouncy.
// In fact, the least number for which the proportion of bouncy numbers
// first reaches 50% is 538.

// Surprisingly, bouncy numbers become more and more common
// and by the time we reach 21780 the proportion of bouncy numbers
// is equal to 90%.

// Find the least number for which the proportion of bouncy numbers
// is exactly 99%.

var isBouncy = function(num) {
	var increasing = true;
	var decreasing = true;

	var maxDigit = 0;
	var minDigit = 9;
	while(num >= 1 && (increasing || decreasing)) {
		var bottomDigit = num % 10;
		// console.log(num,bottomDigit);
		num = num/10|0;

		if(increasing) {
			if(bottomDigit <= minDigit) {
				minDigit = bottomDigit;
			} else {
				increasing = false;
			}
		}

		if(decreasing) {
			if(bottomDigit >= maxDigit) {
				maxDigit = bottomDigit;
			} else {
				decreasing = false;
			}
		}
	}

	return !(increasing || decreasing);
};

// checks
// console.log(isBouncy(134468)); //false
// console.log(isBouncy(66420)); //false
// console.log(isBouncy(155349)); //true

var i = 1;
var numBouncy = 0;
var ratio = 0;
while(ratio < 0.99) {
	if(isBouncy(i)) {
		numBouncy++;
	}

	ratio = numBouncy / i;
	i++;
}

console.log(i-1,ratio);