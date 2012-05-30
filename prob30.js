//Joe McCourt
//5/28/12

// Project Euler Problem 30
//Find the sum of all the numbers that can be written as the sum of fifth powers of their digits.


//The maximum sum is a number with all 9
// 9^5 = 59049
// 99     => 118098
// 999    => 177147
// 9999   => 236196
// 99999  => 295245
// 999999 => 354294

// Thus can place upper bound at 354294
var upper = 354294;
var total = 0;
for(var i = 2; i < upper; i++){
	var n = 0;
	var sum = 0;
	while(Math.pow(10,n) <= i && sum <= i){
		var digit = parseInt((i.toString()).substr(n,1));
		sum += Math.pow(digit,5);
		n++;
	}
	if(sum == i){
		total += i;
		// console.log(i);
	}
}

console.log(total);