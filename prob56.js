// Joe McCourt
// 8/13/12

// A googol (10^100) is a massive number: one followed by one-hundred zeros;
// 100^100 is almost unimaginably large: one followed by two-hundred zeros.
// Despite their size, the sum of the digits in each number is only 1.
// Considering natural numbers of the form, ab, where a, b < 100, what is the maximum digital sum?

function bigMultiply(bigNumber,mul){
	//console.log("Starting number: ", bigNumber.toString());
	
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

	//console.log("Before Carry: ", bigNumber.toString());
	//console.log("Carry: ", carry.toString());

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

//This can be greatly optomized, but good enough for now
function bigPow(base,exp){
	var bigNumber = [1];
	while(exp){
		bigMultiply(bigNumber,base);
		exp--;
	}
	return bigNumber;
}

function sumDigits(bigNumber){
	sum = 0;
	for(var i = 0; i < bigNumber.length; i++){
		sum += bigNumber[i];
	}
	return sum;
}

var maxSum = 0;
for(var base = 0; base <= 100; base++){
	for(var exp = 0; exp <= 100; exp++){
		var sum = sumDigits(bigPow(base,exp))
		if(sum > maxSum){
			maxSum = sum;
		}
	}
}

console.log(maxSum);
