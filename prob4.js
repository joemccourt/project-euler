//Joe McCourt
//4/14/12

// Project Euler problem 4
// A palindromic number reads the same both ways. 
// The largest palindrome made from the product of 
// two 2-digit numbers is 9009 = 91*99.
// Find the largest palindrome made from 
// the product of two 3-digit numbers.
function Prob4(){
	this.isPalindrome = function(strNum){
		var length = strNum.length;
		if(length === 1){return true;}
		if(strNum[0] === strNum[length-1]){
			if(length === 2){return true;}
			return this.isPalindrome(strNum.substr(1,length-2));
		}
		return false;
	};

	this.eval = function(){
		var highestPal = 1;
		//Iterate over every combination of two 3-digit numbers
		for(var number1 = 1; number1 < 1000; number1++){
			for(var number2 = number1; number2 < 1000; number2++){
				//If this number is higher than highest found
				if(number1*number2 > highestPal){
					if(this.isPalindrome((number1*number2).toString())){
						//This is a palindrome and highest found so set
						highestPal = number1*number2;
					}
				}
			}
		}
		return highestPal;
	};
}