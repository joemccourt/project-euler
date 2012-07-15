// Joe McCourt
// 7/14/12

// 145 is a curious number, as 1! + 4! + 5! = 1 + 24 + 120 = 145.
// Find the sum of all numbers which are equal to the sum of the factorial of their digits.
// Note: as 1! = 1 and 2! = 2 are not sums they are not included.

// What is the upper bound of this problem?
// All 9's create the largest result
// 9! = 362880
// 7 * 362880 < 9999999
// We can place upper limit at 10 million

//Hard code factorial lookups
var factorial = [1,1,2,6,24,120,720,5040,40320,362880];
var sum = 0;

for(var i = 3; i < 10000000; i++){
	var numStr = String(i);
	var length = numStr.length;
	var sumI = 0;
	for(var digit = 0; digit < length; digit++){
		if(sumI > i){break;} //Optimization, break loop when whent over
		sumI += factorial[parseInt(numStr[digit])];
	}

	if(sumI == i){
		console.log(i);
		sum += sumI;
	}
}

console.log(sum);