//Joe McCourt
//4/14/12

// Project Euler problem 6
// The sum of the squares of the first ten natural numbers is,
// 1^2 + 2^2 + ... + 10^2 = 385
// The square of the sum of the first ten natural numbers is,
// (1 + 2 + ... + 10)^2 = 55^2 = 3025
// Hence the difference between the sum of the squares
// of the first ten natural numbers and the square of 
// the sum is 3025  385 = 2640.
// Find the difference between the sum of the squares of
// the first one hundred natural numbers and the square of the sum.
function Prob6(){

	//We can just brute force this
	//No cow level
	this.eval = function(){
		var sum = 0;
		var sumOfSquares = 0

		for(var i = 1; i <= 100; i++){
			sum += i;
			sumOfSquares += i*i;
		}

		return sum*sum - sumOfSquares;
	};
}