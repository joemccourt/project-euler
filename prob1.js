//Joe McCourt
//4/14/12

// Project Euler problem 1
// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9.
// The sum of these multiples is 23.
// Find the sum of all the multiples of 3 or 5 below 1000.
function Prob1(){

	this.isMultiple = function(number,base){
		return !(number%base);
	};

	var answer = 0;
	for(var i = 1; i < 1000; i++){
		if(isMultiple(i,3) || isMultiple(i,5)){
			answer += i;
		}
	}
	
	return answer;
}