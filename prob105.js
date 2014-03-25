// Joe McCourt
// 3/24/2014
// Project Euler problem 105
// Special subset sums: testing

// Let S(A) represent the sum of elements in set A of size n. We shall call it a special sum set if for any two non-empty disjoint subsets, B and C, the following properties are true:

//     S(B) ≠ S(C); that is, sums of subsets cannot be equal.
//     If B contains more elements than C then S(B) > S(C).

// For example, {81, 88, 75, 42, 87, 84, 86, 65} is not a special sum set
// because 65 + 87 + 88 = 75 + 81 + 84,
// whereas {157, 150, 164, 119, 79, 159, 161, 139, 158}
// satisfies both rules for all possible subset
// pair combinations and S(A) = 1286.

// Using sets.txt, a 4K text file with one-hundred sets
// containing seven to twelve elements
// (the two examples given above are the first two sets in the file),
// identify all the special sum sets, A1, A2, ..., Ak,
// and find the value of S(A1) + S(A2) + ... + S(Ak).

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

var solveProblem = function(data) {
	var sum = 0;
	for(var i = 0; i < data.length; i++) {
		var setStr = data[i];
		var set = setStr.split(",");
		for(var k = 0; k < set.length; k++) {
			set[k] = parseInt(set[k],10);
		}
		
		if(isValid(set)){
			for(var k = 0; k < set.length; k++) {
				sum += set[k];
			}
		}
	}
	console.log(sum);
};

var FILEIN  = 'sets.txt';
fs.readFile(FILEIN, 'utf8', function (err,data) {
  if (err) {
  	console.log(err);
  }

  solveProblem(textToArray(data));
});

var isValid = function(k) {
	var unique = {};
	var maxNum = [];
	var minNum = [];
	var limit = Math.pow(2,k.length);
	for(var i = 1; i < limit; i++) {
		// console.log(maxNum)
		var sum = 0;
		var num = 0;
		var vec = [];
		for(var j = 0; j < k.length; j++) {
			vec[j] = 0;
			if(i & (1 << j)) {
				sum += k[j];
				num++;
				vec[j] = 1;
			}
		}

		// console.log(i,sum,vec);
		if(unique[sum]) {
			return false;
		}
		unique[sum] = true;

		// if(num > 1 && sum < maxNum[num-1]) {return false;}
		// if(num < k.length && maxNum[num+1] > 0 && sum > maxNum[num+1]) {return false;}
		if(!maxNum[num] || sum > maxNum[num]) {maxNum[num] = sum;}
		if(!minNum[num] || sum < minNum[num]) {minNum[num] = sum;}
	}

	for(var j = 1; j < k.length; j++) {
		if(maxNum[j] >= minNum[j+1]) {return false;}
	}

	// console.log(maxNum,minNum);
	return true;
}