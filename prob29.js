//Joe McCourt
//5/28/12

// Project Euler Problem 29
// How many distinct terms are in the sequence generated 
// by a^b for 2 <= a <= 100 and 2 <= b <= 100?

//bigNumber *= mul
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

function bigPow(base,exp){
	var bigNumber = [1];
	while(exp){
		bigMultiply(bigNumber,base);
		exp--;
	}
	return bigNumber;
}

//100^100 is greater than the integer precsion limit of JS vars
//So need to use my custom big number operations
var max = 100;
var num = 0;
var seen = [];
for(var a = 2; a <= max; a++){
	for(var b = 2; b <= max; b++){
		if(!seen[bigPow(a,b).toString()]){
			seen[bigPow(a,b).toString()] = 1;
			num++;
		}else{
			//console.log("Seen this one before: ",Math.pow(a,b));
		}
	}
}

console.log(num);
//console.log(bigPow(5,5).toString(),Math.pow(5,5));