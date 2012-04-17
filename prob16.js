//Joe McCourt
//4/15/12

// Project Euler problem 16
// 2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
// What is the sum of the digits of the number 2^1000?
function Prob16(){

	this.evalTo = function(pow){
		var bigNumber = [1,0,0,0,0,0];
		var carry = [0,0,0,0,0,0];
		var length = 1;

		
		for(var i = 1; i <= pow; i++){
			//console.log("Starting number: ", bigNumber.toString());
			for(var j = 0; j < length; j++){
				var temp = 2*bigNumber[j];
				if(temp > 9){ //carry
					bigNumber[j] = temp%10;
					carry[j+1] = 1;
					if(j==length-1){length++;bigNumber[j+1]=0;}
				}else{
					bigNumber[j] *= 2;
					carry[j+1] = 0;
				}
			}

			//console.log("Before Carry: ", bigNumber.toString());
			//console.log("Carry: ", carry.toString());

			//Add carry
			for(var j = 0; j < length; j++){
				bigNumber[j] += carry[j];
			}
		}

		var sum = 0;
		for(var i = 0; i < length; i++){
			sum += bigNumber[i];
		}
		return sum;
	};

	this.eval = function(){
		return this.evalTo(1000);
	};
}