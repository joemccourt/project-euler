// Joe McCourt
// 7/14/12


// Project Eueler Problem 32
// We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once; 
// for example, the 5-digit number, 15234, is 1 through 5 pandigital.
// The product 7254 is unusual, as the identity, 39 * 186 = 7254, containing multiplicand, multiplier,
// and product is 1 through 9 pandigital.
// Find the sum of all products whose multiplicand/multiplier/product identity can
// be written as a 1 through 9 pandigital.
// HINT: Some products can be obtained in more than one way so be sure to only include it once in your sum.

//If is number as a string pandigital 1 through 9;
function isPandigital(str){
	if(str.length != 9){return false;}
	var digits = [0,0,0,0,0,0,0,0,0];

	var i;
	for(i = 0; i < 9; i++){
		digits[parseInt(str[i])-1] = 1;
	}
	return digits[0]&&digits[1]&&digits[2]&&digits[3]&&digits[4]&&digits[5]&&digits[6]&&digits[7]&&digits[8];
}


//If multiplicand/multiplier/product identity exists
function isMMPIdent(num){
	var i = 2;
	var limit = Math.ceil(Math.sqrt(num));
	for(i; i <= limit; i++){
		if(num%i == 0){
			//i is factor of num
			var str = ""+i+(num/i)+num; //Construct MMP string

			if(isPandigital(str)){
				console.log(i+"*"+(num/i)+"="+num);
				return true;
			}
		}
	}
	return false;
}

//Search through all possible
//Not sure what the max value to search to is.
//But trial and error the largest I find is 4*1963=7852
var sum = 0;
for(var i = 100; i < 10000; i++){
	if(isMMPIdent(i)){
		sum+=i;
	}
}

console.log("Sum: "+sum);




