// Joe McCourt
// 7/14/12

// An irrational decimal fraction is created by concatenating the positive integers:
// 0.123456789101112131415161718192021...
// It can be seen that the 12th digit of the fractional part is 1.
// If dn represents the nth digit of the fractional part, find the value of the following expression.
// d1 * d10 * d100 * d1000 * d10000 * d100000 * d1000000

// Base 10 number of digits
function numDigits(n){
	
	return String(n).length;

	// The following works in theory but floating point error
	// creates some mistakes (returns 3 for 1000 e.g.)
	// return 1+Math.floor(Math.log(n)/Math.LN10);
}

function dofN(n){

	var i = 0;
	var digits = 0;
	while(digits < n){
		i++;
		digits += numDigits(i);
	}

	console.log(i,n-digits,String(i).substr(numDigits(i)-1+(n-digits),1));
	return parseInt(String(i).substr(numDigits(i)-1+(n-digits),1));
}


console.log(dofN(1) * dofN(10) * dofN(100) * dofN(1000) * dofN(10000) * dofN(100000) * dofN(1000000));