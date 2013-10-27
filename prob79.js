// Joe McCourt
// 10/26/13
// Project Euler problem 

// A common security method used for online banking is to ask the user
// for three random characters from a passcode.
// For example, if the passcode was 531278, they may ask for the 2nd, 3rd, and 5th characters;
// the expected reply would be: 317.
// The text file, keylog.txt, contains fifty successful login attempts.
// Given that the three characters are always asked for in order,
// analyse the file so as to determine the shortest possible secret passcode of unknown length.


// Graph
// A < B < C
// Assume no repeated numbers!

var keylog = [319,680,180,690,129,620,762,689,762,318,368,710,720,710,629,168,160,689,716,731,736,729,316,729,729,710,769,290,719,680,318,389,162,289,162,718,729,319,790,680,890,362,319,760,316,729,380,319,728,716];
var keylogTrimmed = [319,680,180,690,129,620,762,689,318,368,710,720,629,168,160,716,731,736,729,316,769,290,719,389,162,289,718,790,890,362,760,380,728];

// Remove redundent entries
var trim = function(log){
	var trimmed = [];

	for(var i = 0; i < log.length; i++){
		if(trimmed.indexOf(log[i]) == -1){
			trimmed.push(log[i]);
		}
	}
	return trimmed;
}

var digits = {};
var i;
for(i = 0; i <= 9; i++){
	digits[i] = {};
}

for(i = 0; i < keylogTrimmed.length; i++){
	var log = keylogTrimmed[i];
	var logDigits = log.toString();

	// 0 less than 1 and 2
	digits[logDigits[0]][logDigits[1]] = 1;
	digits[logDigits[0]][logDigits[2]] = 1;

	// 1 less than 2
	digits[logDigits[1]][logDigits[2]] = 1;
}

//Hackish, assumes all relations are found
//Solves just by looking at number of less than relations
//Manually saying there is no 4 or 5
var code = "";

var candidates = [0,1,2,3,6,7,8,9];
for(i = 0; i < candidates.length; i++){

	var max = 0;
	var maxSize = 0;

	for(var k = 0; k < candidates.length; k++){
		var size = 0;
		var num = candidates[k];
		for(var p in digits[num]){
			size++;
		}
		if(size > maxSize){
			max = num;
			maxSize = size;
		}
	}
	digits[max] = {};
	code += max;
}

console.log(code);