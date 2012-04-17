//Joe McCourt
//4/15/12

// Project Euler problem 25
// What is the first term in the Fibonacci sequence
// to contain 1000 digits?
function Prob25(){
	
	//Add n2 to n1 (n1+=n2)
	//Assume n1 > n2
	this.bigAdd = function(n1,n2){
		
		//Init carry
		var length = n1.length;
		var carry = [];
		while(carry.length<length){carry[carry.length]=0;}
		while(n2.length<length){n2[n2.length]=0;}

		for(var j = 0; j < length; j++){
			var temp = n1[j]+n2[j];
			if(temp > 9){
				n1[j] = temp%10;
				carry[j+1] = temp/10|0;
				if(j==length-1){
					length++;
					n1[j+1]=0;
					n2[j+1]=0;
				}
			}else{
				n1[j] = temp;
				carry[j+1] = 0;
			}
		}

		//Add carry
		for(var j = 0; j < length; j++){
			if(carry[j]){
				var temp = n1[j] + carry[j];

				if(temp > 9){ //carry again
					//Check if need to expand arrays
					if(j==length-1){
						length++;
						n1[j+1]=0;
						carry[j+1]=0;
					}
					n1[j] = temp%10;
					carry[j+1]  += temp/10|0;
				}else{
					n1[j] = temp;
				}
			}
		}

		return n1;
	};

	this.eval = function(){
		var f1  = [1];
		var f2  = [2];
		var tmp = [];
		var i = 3;
		while(f2.length < 1000){
			tmp = f2.slice(0);
			this.bigAdd(f2,f1);
			f1  = tmp.slice(0);
			//console.log(f2.toString());
			i++;
		}

		// var numStr = "";
		// for(var i=0;i<f2.length;i++){
		// 	numStr += f2[f2.length-i-1];
		// }

		return i;
	};
}