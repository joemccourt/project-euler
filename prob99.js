// Joe McCourt
// Jan 3rd 2014
// Project Euler Problem 99

// Comparing two numbers written in index form like 2^11 and 3^7 is not difficult,
// as any calculator would confirm that 2^11 = 2048 < 3^7 = 2187.

// However, confirming that 632382^518061 > 519432^525806 would be much more difficult,
// as both numbers contain over three million digits.

// Using base_exp.txt, a 22K text file containing one thousand lines with
// a base/exponent pair on each line,
// determine which line number has the greatest numerical value.
// NOTE: The first two lines in the file represent the numbers in the example given above.


// Observations:
// Goal is to find which is largest, NOT to evaluate the number
// Over three million digits is too much to compute, so how can
// numbers be compared without evaluation?

// Given n1=b1^e1 and n2=b2^e2
// if b2 >= b1 AND e2 >= b1 THEN n2 >= n1
// This fact doesn't solve the problem, but can help us narrow down list
// However after sorting the pairs I see this has already been done

// Comparing:  b^(e+de) to (b+db)^e

// Expanding:  b^e*b^de to b^e + (1,e) * b^(e-1)*db + ... + db^e 
// b^de to 1 + (e,1) * b^-1*db + ... db^e/(b^e)
// b^de to 1 + (e,k) * (db/b)^k + ... (db/b)^e
// ... no luck down this road

// b^de to ((b+db)/b)^e
// b^de to (1+db/b)^e
// b^(de/e) to 1+db/b
// Use these as metrics to compare numbers, can be done with floating point
// While not strictly correct because not inf percision, good approx

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

var FILEIN  = 'base_exp.txt';
fs.readFile(FILEIN, 'utf8', function (err,data) {
  if (err) {
  	console.log(err);
  }

  solveProblem(textToArray(data));
});


function orderByExp(pairs) {
	pairs.sort(function(a, b) {
		return a.e - b.e;
	});
};

function orderByBase(pairs) {
	pairs.sort(function(a, b) {
		return a.b - b.b;
	});
};

//Compare pairs of number, and retun new array
//that has pairs with winning metric
function reducePairs(pairs) {
	var newPairs = [];
	var j = 0;
	for(var i = 0; i < pairs.length-1; i+=2) {
		var p1 = pairs[i];
		var p2 = pairs[i+1];

		var db = p2.b-p1.b;
		var de = p1.e-p2.e;

		var b = p1.b;
		var e = p2.e;

		// console.log(b,e,db,de);
		var metric1 = Math.pow(b,de/e);
		var metric2 = 1+db/b;
		// console.log(metric1,metric2);
		if(metric1 > metric2) {
			newPairs[i/2] = {b:p1.b,e:p1.e,index:p1.index};
		}else{
			newPairs[i/2] = {b:p2.b,e:p2.e,index:p2.index};
		}
	}

	if(pairs.length%2 == 1) {
		newPairs[Math.floor(pairs.length/2)] = {b:pairs[pairs.length-1].b,e:pairs[pairs.length-1].e,index:pairs[pairs.length-1].index};
	}

	return newPairs;
}
function solveProblem(data) {
	var pairs = [];
	for(var i = 0; i < data.length; i++) {
		var b = parseInt(data[i].split(",")[0],10);
		var e = parseInt(data[i].split(",")[1],10);
		pairs[i] = {b:b,e:e,index:i+1};
	}

	// console.log(pairs)
	// orderByBase(pairs);

	while(pairs.length >= 2){
		pairs = reducePairs(pairs);
	}

	console.log(pairs);
}