//Joe McCourt
//4/15/12

// Project Euler problem 20
// n! means n  (n  1)  ...  3  2  1
// For example, 10! = 10  9  ...  3  2  1 = 3628800,
// and the sum of the digits in the number 10! is
// 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.
// Find the sum of the digits in the number 100!

function Prob20(){

	//bigNumber *= mul
	this.bigMultiply = function(bigNumber,mul){
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
	};

	this.eval = function(){
		var factorial = [1];
		for(var i = 1; i <= 100; i++){
			this.bigMultiply(factorial,i);
		}
		
		var sum = 0;
		for(var i = 0; i<factorial.length; i++){
			sum+=factorial[i];
		}
		return sum;
	};
}