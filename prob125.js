// Joe McCourt
// Jan 4th, 2014
// Project Euler problem 125
// Palindromic sums

// The palindromic number 595 is interesting because
// it can be written as the sum of consecutive squares:
// 6^2 + 7^2 + 8^2 + 9^2 + 10^2 + 11^2 + 12^2.

// There are exactly eleven palindromes below one-thousand
// that can be written as consecutive square sums,
// and the sum of these palindromes is 4164.
// Note that 1 = 0^2 + 1^2 has not been included
// as this problem is concerned with the squares of positive integers.

// Find the sum of all the numbers less than 10^8 that are both palindromic
// and can be written as the sum of consecutive squares.

//Gen palindroms less than 10^8
var genPalindroms = function(n) {
	var halfStr = "1";

	var pals = [1,2,3,4,5,6,7,8,9];

	for(var digits = 2; digits < 9; digits++) {
		for(var i = Math.pow(10,-1+Math.floor(digits/2)); i < Math.pow(10,Math.floor(digits/2)); i++) {
			if(digits%2) {
				for(var center = 0; center < 10; center++) {
					var centerStr = center.toString();
					var pal = parseInt(i.toString() + centerStr + i.toString().split("").reverse().join("") ,10);
					pals.push(pal);
				}
			}else{
				var pal = parseInt(i.toString() + i.toString().split("").reverse().join("") ,10);
				pals.push(pal);
			}
		}
	}
	return pals;
}

// This could def be optimized
var isConsSqSum = function(n) {
	var max = 1+Math.ceil(Math.sqrt(n));
	for(var start = 1; start < max; start++) {
		var sum = 0;
		for(var j = start; j < max; j++) {
			sum += j*j;
			if(sum == n && j > start) {
				return true;
			}

			if(sum > n) {
				break;
			}
		}	
	}

	return false;
};

var pals = genPalindroms();
// console.log(pals);

var sum = 0;
for(var i = 0; i < pals.length; i++) {
	var n = pals[i];

	if(isConsSqSum(n)) {
		sum += n;
		console.log(n);
	}
}

console.log(sum);
