// Joe McCourt
// Jun 9th 2014
// Project Euler Problem 303
// Multiples with small digits


// For a positive integer n, define f(n) as the least positive multiple of n that,
// written in base 10, uses only digits ≤ 2.

// Thus f(2)=2, f(3)=12, f(7)=21, f(42)=210, f(89)=1121222.

// Also, sum of f(n) / n from 1 to 100 = 11363107.

// Find sum of f(n) / n from 1 to 10000.


var isValid = function(n) {
	while(n >= 1) {
		if(n % 10 > 2) { return false }
		n = Math.floor(n/10);
	}

	return true;
}

var f = function(n) {

	var k = 1;
	while(!isValid(k*n)) {

		k++;
	}

	return k*n;
}

var validNumbersMap = [];

var numArrayToNumber = function(array) {
	var pow = 1;
	var num = 0;
	var i = array.length-1;
	while(i >= 0) {
		num+=array[i]*pow;
		pow*=10;
		i--;
	}
	return num;
};

var genValid = function(numArray, index) {
	// if(index >= numArray.length) {return;}

	var num = numArrayToNumber(numArray);

	if(validNumbersMap[num] && num != 0) {
		return;
	}

	validNumbersMap[num] = true;

	for(var k = numArray[index]+1; k <= 2; k++) {
		var numArrayCopy = numArray.slice(0);
		numArrayCopy[index] = k;
		for(var i = index; i < numArray.length; i++) {
			genValid(numArrayCopy, index+1);
		}
	}
};

var start = [0,0,0];
genValid(start, 0);

var validNumbers = [];
for(var n in validNumbersMap) {
	if(parseInt(n) > 0) {
		validNumbers.push(parseInt(n));
	}
}

validNumbers.sort(function(a,b){return a > b ? 1 : -1;})

console.log(validNumbers);

var sum = 0;
// for(var i = 1; i <= 300; i++) {
// 	sum += f(i)/i;
// }

// 300 -> 20937570
console.log(sum);