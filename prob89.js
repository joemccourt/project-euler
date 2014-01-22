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
	var valid = true;
	var lastD = 1;
	var maxValue = 1001;

	while(i < n) {
		var d = romanMap[roman[i]];
		// console.log(d,lastD);
		if(d > maxValue) {
			return -1;
		}

		if(i != 0 && d > lastD) {
			if(d == 5 && lastD != 1 || d == 10 && lastD != 1 || d == 50 && lastD != 10 || d == 100 && lastD != 10 || d == 500 && lastD != 100 || d == 1000 && lastD != 100) {
				return -1; // Not valid
			}

			if(i > 1 && maxValue <= lastD) {
				return -1;
			}

			maxValue = lastD;
		} else {
			lastD = d;
		}

		if(i < n-1 && d < romanMap[roman[i+1]]) {
			sum += - d;
		} else {
			sum += d;
		}

		i++;
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
	var reduced = minRoman[num];
	if(!reduced) { console.log("Missing: ",num); return "I";}
	// var reduced = decimal2roman(num)
	// console.log(roman,num,reduced);
	return reduced;
};

var minRoman = {};
var count = 0;
var genMinRomanAt = function(roman,index,max) {

	var dec = roman2decimal(roman);
	if(dec > max) {
		return;
	}

	if(!minRoman[dec] || minRoman[dec].length > roman.length) {
		minRoman[dec] = roman;
	}

	// if(roman2decimal(roman) <= 0) {return;}
	// count++;
	// console.log(roman,count,roman2decimal(roman));
	for(var i = index; i < roman.length; i++) {
		// var validateRoman = roman.substr(0,i);
		// for(var k = i; k < roman.length; k++) {
		// 	validateRoman += "I";
		// }
		if(roman2decimal(roman) <= 0) {continue;}

		var r1 = roman.substr(0,i);
		var r2 = roman.substr(i+1);

		var jArray = [6,5,4,3,2,1,0];
		if(i > 0) {
			var lastDigit = roman[i-1];
			if(lastDigit == "I") {
				jArray = [6,5,4];
				if(roman.length - i > 3) {return;}
			} else if(lastDigit == "V") {
				jArray = [6];
				if(roman.length - i > 4) {return;}
			} else if(lastDigit == "X") {
				if(roman.length - i > 7) {return;}
				jArray = [6,5,4,3,2];
			} else if(lastDigit == "L") {
				if(roman.length - i > 8) {return;}
				jArray = [6,5,4];
			} else if(lastDigit == "C") {
				if(roman.length - i > 11) {return;}
				jArray = [6,5,4,3,2,1,0];
			} else if(lastDigit == "D") {
				if(roman.length - i > 12) {return;}
				jArray = [6,5,4,3,2];
			} else if(lastDigit == "M") {
				jArray = [6,5,4,3,2,1,0];
				if(roman.length - i > 13) {
					jArray = [0];
				}
			}

			if(i > 2) {
				if(lastDigit == "I" && roman[i-2] == "I" && roman[i-3] == "I") {
					jArray = [5,4];
				} else if(lastDigit == "X" && roman[i-2] == "X" && roman[i-3] == "X") {
					jArray = [6,5,3,2];
				} else if(lastDigit == "C" && roman[i-2] == "C" && roman[i-3] == "C") {
					jArray = [6,5,4,3,1,0];
				}
			}
		}

		for(var j = 0; j < jArray.length; j++) {
			var romanPass = r1 + letMap[jArray[j]] + r2;
			genMinRomanAt(romanPass,i+1,max);
		}
	}
};

var genMinRoman = function(n) {
	//17
	for(var chars = 1; chars < 17; chars++) {
		var str = "";
		for(var i = 0; i < chars; i++) {
			str += "I";
		}
		genMinRomanAt(str,0,n);
	}

	// Check completness to n
	// for(var i = 1; i < n; i++) {
	// 	if(!minRoman[i]) {
	// 		console.log("Missing: ", i);
	// 	}
	// }
	// genMinRomanAt("MMM",0);
	// console.log(minRoman)
};

var solveProblem = function(data) {

	genMinRoman(5000);

	var n = data.length;
	var save = 0;
	for(var i = 0; i < n; i++) {
		// var reduced = reduceRoman(data[i]);
		var roman = data[i];//"MM";
		var reduced = reduceRoman(roman);

		save += roman.length - reduced.length;
		console.log(roman,roman2decimal(roman),reduced);
	}
	// console.log(minRoman[4888])
	console.log(save);
	// console.log(roman2decimal("IL"));
	//console.log(data);
};