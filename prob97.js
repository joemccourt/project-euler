// Joe McCourt
// Jan 3rd 2014
// Project Euler Problem 97

// The first known prime found to exceed one million digits was discovered in 1999, 
// and is a Mersenne prime of the form 2^6972593−1; it contains exactly 2,098,960 digits. 
// Subsequently other Mersenne primes, of the form 2^p−1, have been found which contain more digits.

// However, in 2004 there was found a massive non-Mersenne prime which contains
//  2,357,207 digits: 28433×2^7830457+1.

// Find the last ten digits of this prime number.


//From prob 56:
function bigMultiply(bigNumber,mul){
	
	//Init carry
	var length = bigNumber.length;
	var carry = [];
	while(carry.length<length){carry[carry.length]=0;}

	for(var j = 0; j < length; j++){
		var temp = mul*bigNumber[j];
		if(temp > 9){ //carry
			bigNumber[j] = temp%10;
			carry[j+1] = temp/10|0;
			if(j==length-1){
				length++;
				bigNumber[j+1]=0;
			}
		}else{
			bigNumber[j] = temp;
			carry[j+1] = 0;
		}
	}

	//Add carry
	for(var j = 0; j < length; j++){
		if(carry[j]){
			var temp = bigNumber[j] + carry[j];

			if(temp > 9){ //carry again
				//Check if need to expand arrays
				if(j==length-1){
					length++;
					bigNumber[j+1]=0;
					carry[j+1]=0;
				}
				bigNumber[j] = temp%10;
				carry[j+1]  += temp/10|0;
			}else{
				bigNumber[j] = temp;
			}
		}
	}

	return bigNumber;
}

//Taken from prob 56, but modified to only keep last 10 digits
function bigPow(base,exp){
	var bigNumber = [1];
	var maxLength = 10;
	while(exp){
		bigMultiply(bigNumber,base);
		while(bigNumber.length > maxLength) {
			bigNumber.pop();
		}
		exp--;
	}
	return bigNumber;
}

var bigNumber = bigPow(2,7830457);
bigMultiply(bigNumber,28433);
bigNumber.reverse();

console.log(bigNumber);
//And rember to add one to last digit