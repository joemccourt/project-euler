//Joe McCourt
//4/15/12

// Project Euler problem 17
// If the numbers 1 to 5 are written out 
// in words: one, two, three, four, five, 
// then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.
// If all the numbers from 1 to 1000 (one thousand) 
// inclusive were written out in words, how many letters would be used?
// NOTE: Do not count spaces or hyphens. 
// For example, 342 (three hundred and forty-two) contains
// 23 letters and 115 (one hundred and fifteen) contains 20 letters. 
// The use of "and" when writing out numbers is in compliance with 
// British usage.
function Prob17(){

	//Gahhh english!!!
	var firstTwenty = ["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"];
	var tens = ["","ten","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety","onehundred"];
		
	//This only works for numbers up to onethousand
	//No spaces or hyphens in returned string
	this.num2English = function(number){
		var str = "";
		if(number <= 20){
			str = firstTwenty[number];
		}else if(number <= 100 && number%10 == 0){
			str = tens[number/10];
		}else if(number < 100){
			str = tens[number/10|0] + this.num2English(number%10);
		}else if(number < 1000 & number%100 == 0){
			str = firstTwenty[number/100|0] + "hundred";
		}else if(number < 1000){
			str = firstTwenty[number/100|0] + "hundredand" + this.num2English(number%100);
		}else if(number == 1000){
			str = "onethousand";
		}

		return str;
	};

	this.eval = function(){
		//Sum them up
		var sum = 0;
		for(var i = 1; i <= 1000; i++){
			sum += this.num2English(i).length;
			//console.log(i,this.num2English(i));
		}
		return sum;
	};
}