//Joe McCourt
//4/15/12

// Project Euler problem 21
// Let d(n) be defined as the sum of proper divisors of n 
// (numbers less than n which divide evenly into n).
// If d(a) = b and d(b) = a, where a != b, then a and b are 
// an amicable pair and each of a and b are called amicable numbers.
// For example, the proper divisors of 220 are 
// 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110;
// therefore d(220) = 284. The proper divisors of 284 are
// 1, 2, 4, 71 and 142; so d(284) = 220.
// Evaluate the sum of all the amicable numbers under 10000.
function Prob21(){
	//sum of proper divisors
	this.d = function(n){
		var sum = 1;
		var d = 2;
		while(d*d <= n){
			if(!(n%d)){
				//console.log(d,n/d);
				if(d*d==n){
					//Complement is itself so add only once
					sum += d;
				}else{
					sum += d;
					sum += n/d;
				}
				
			}
			d++;
		}
		return sum;
	};

	this.eval = function(){
		var sum = 0;
		var max = 10000;
		var b;
		for(var a=1;a<max;a++){
			b = this.d(a);
			if(b != a && this.d(b) == a){
				sum+=a;
				console.log(a,b);
			}
		}
		return sum;
	};
}