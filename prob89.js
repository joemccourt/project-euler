// Joe McCourt
// Jan 15th, 2014
// Project Euler problem 89
// Roman numerals

// The rules for writing Roman numerals allow for many ways of writing each number.
// However, there is always a "best" way of writing a particular number.

// For example, the following represent all of the legitimate ways
// of writing the number sixteen:

// IIIIIIIIIIIIIIII
// VIIIIIIIIIII
// VVIIIIII
// XIIIIII
// VVVI
// XVI

// The last example being considered the most efficient,
// as it uses the least number of numerals.

// The 11K text file, roman.txt (right click and 'Save Link/Target As...'),
// contains one thousand numbers written in valid, but not necessarily minimal,
// Roman numerals; that is, they are arranged in descending units and obey the
// subtractive pair rule (see About Roman Numerals... for the definitive rules for this problem).

// Find the number of characters saved by writing each of these in their minimal form.

// Note: You can assume that all the Roman numerals in the file contain
// no more than four consecutive identical units.

var fs = require('fs');

var textToArray = function(str){
	var arrayOut = [];

	arrayTmp = str.split("\n");

	var inputLength = arrayTmp.length;
	var i;
	for(i = 0; i < inputLength; i++){
		arrayOut[i] = arrayTmp[i];
	}

	return arrayOut;
};

var FILEIN  = 'roman.txt';
fs.readFile(FILEIN, 'utf8', function (err,data) {
  if (err) {
  	console.log(err);
  }

  solveProblem(textToArray(data));
});

// var duoMap = {
// 	'V': 'X',
// 	'L': 'C',
// 	'D': 'M'
// };

var romanMap = {
	'I': 1,
	'V': 5,
	"X": 10,
	"L": 50,
	"C": 100,
	"D": 500,
	"M": 1000
};

var decMap = [1000,500,100,50,10,5,1];
var letMap = ["M","D","C","L","X","V","I"];

var roman2decimal = function(roman) {
	var num = 0;

	var n = roman.length;
	var sum = 0;
	var i = 0;
	while(i < n) {
		var d = romanMap[roman[i]];
		if(i < n-1 && d < romanMap[roman[i+1]]) {
			sum += romanMap[roman[i+1]] - d;
			i+=2;
		} else if(i < n-2 && d == romanMap[roman[i+1]] && d < romanMap[roman[i+2]]) {
			sum += romanMap[roman[i+2]] - 2*d;
			i+=3;
		} else {
			sum += d;
			i++;
		}
	}
	return sum;
};

var decimal2roman = function(num) {
	var roman = "";
	while(num != 0) {
		for(var i = 0; i < decMap.length; i++) {
			var sub = false;
			var subI = 0;

			// console.log(roman,num,letMap[i]);
			for(subI = decMap.length-1; subI > i; subI--) {
				// console.log(letMap[subI],decMap[i] - decMap[subI],2*decMap[i+1] );
				if(num >= decMap[i] - decMap[subI]) {
					// && (2*decMap[i] > num || 2*decMap[i] < decMap[i] - decMap[subI])
					sub = true;
					break;
				}
			}

			if(sub) {
				roman += letMap[subI] + letMap[i];
				num -= decMap[i] - decMap[subI];
				i--;
				// break;
			} else if(!sub && num >= decMap[i]) {
				roman += letMap[i];
				num -= decMap[i];
				i--;
				// break;
			}
		}
	}
	return roman;
};

var reduceRoman = function(roman) {
	var num = roman2decimal(roman);
	var reduced = decimal2roman(num)
	console.log(roman,num,reduced);
	return reduced;
};

var solveProblem = function(data) {
	var n = data.length;
	var save = 0;
	for(var i = 0; i < n; i++) {
		// var reduced = reduceRoman(data[i]);
		var roman = data[i];//"MM";
		var reduced = reduceRoman(roman);

		save += roman.length - reduced.length;
		// console.log(roman,reduced);
	}
	console.log(save);
	//console.log(data);
};