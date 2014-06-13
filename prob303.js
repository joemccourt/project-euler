// Joe McCourt
// Jun 9th 2014
// Project Euler Problem 303
// Multiples with small digits


// For a positive integer n, define f(n) as the least positive multiple of n that,
// written in base 10, uses only digits ≤ 2.

// Thus f(2)=2, f(3)=12, f(7)=21, f(42)=210, f(89)=1121222.

// Also, sum of f(n) / n from 1 to 100 = 11363107.

// Find sum of f(n) / n from 1 to 10000.

var digits = 3;

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

var fFast = function(n) {

	for(var k = 1; k <= digits; k++) {
		for(var i = 0; i < validNumbersMap[k].length; i++) {
			var m = validNumbersMap[k][i];
			if(m % n == 0) {
				return m;
			}
		}
	}

	console.log("oooops",n);
	return 0;
};

var validNumbersMap = {};
var validNumbersIndexMap = {};

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

// var foo = 0;
// var genValid = function(numArray, index, first) {
// 	foo++;
// 	// if(index >= numArray.length) {return;}
// 	// console.log(numArray);
// 	var num = numArrayToNumber(numArray);
// 	validNumbersMap[num] = true;

// 	if(!validNumbersIndexMap[num]) {
// 		validNumbersIndexMap[num] = -1;
// 	}

// 	if(validNumbersMap[num] && validNumbersIndexMap[num] >= index && num != 0) {
// 		return;
// 	}

// 	if(index > validNumbersMap[num]) {
// 		validNumbersIndexMap[num] = index;
// 	}

// 	for(var k = numArray[index]; k <= 2; k++) {
// 		var numArrayCopy = numArray.slice(0);
// 		numArrayCopy[index] = k;
// 		genValid(numArrayCopy, index+1);
// 	}
// };

// var start = [0,0,0,0,0,0,0,0,0,0,0];
// var start = [0,0,0,0,0,0,0,0,0,0,0];
// genValid(start, 0, true);

var genValid = function(n) {
	var pow = 10;
	var i = 1;

	while(i < n) {
		if(!validNumbersMap[i+1]) {
			validNumbersMap[i+1] = [];
		}

		for(var k = 1; k <= 2; k++) {

			//For zeros
			for(var p = 0; p < i; p++) {
				for(var vI = 0; vI < validNumbersMap[p].length; vI++) {
					var num = k*pow + validNumbersMap[p][vI];
					validNumbersMap[i+1].push(num);
				}
			}

			for(var vI = 0; vI < validNumbersMap[i].length; vI++) {
				var num = k*pow + validNumbersMap[i][vI];
				validNumbersMap[i+1].push(num);
			}
		}

		pow *= 10;
		i++;
	}

};

var validNumbersMap = {
	0:[0],
	1:[1,2]
};

var n = digits;
genValid(n);
// console.log(validNumbersMap);

for(var i = 1; i <= n; i++) {
	validNumbersMap[i].sort(function(a,b){return a > b ? 1 : -1;})
	
	// for(var j = 0; j < validNumbersMap[i].length; j++) {
	// 	validNumbers.push(validNumbersMap[i][j]);
	// }
}


// console.log(validNumbers.length, foo);
// console.log(validNumbers)

// var sum = 0;
// for(var i = 1; i <= 10000; i++) {

// 	// if(fFast(i) != f(i)) {
// 	// 	console.log("error",fFast(i), f(i));
// 	// }
// 	sum += fFast(i)/i;
// }

// // 300 -> 20937570
// // 10000 -> 314548450057 + f(4995)/4995 + f(9990)/9990 + f(9999)/9999
// console.log(sum);

// console.log(fFast(9)/9)
// console.log(fFast(99)/99)
// console.log(fFast(999)/999)
// console.log(fFast(9999)/9999) // :(


//Pattern for repeating 9's
// 12222
// 1122222222
// 111222222222222
// 11112222222222222222

// 1358
// 11335578
// 111333555778
// 1111333355557778

// console.log(11112222222222222222/9999)

console.log(314548450057 + 222667111556 + 111333555778 + 1111333355557778)

// console.log(fFast(9990)/9990) // 111333555778
// console.log(fFast(4995)/4995) // 222667111556