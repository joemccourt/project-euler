//Joe McCourt
//4/15/12

// Project Euler problem 23
// A perfect number is a number for which the sum of its
// proper divisors is exactly equal to the number. For example,
// the sum of the proper divisors of 28 would be
// 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.
// A number n is called deficient if the sum of its proper
// divisors is less than n and it is called
// abundant if this sum exceeds n.
// As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16,
// the smallest number that can be written as the sum of two
// abundant numbers is 24. By mathematical analysis, it can be shown
// that all integers greater than 28123 can be written as the sum of
// two abundant numbers. However, this upper limit cannot be reduced
// any further by analysis even though it is known that the greatest
// number that cannot be expressed as the sum of two abundant numbers
// is less than this limit.
// Find the sum of all the positive integers which cannot be written
// as the sum of two abundant numbers.

function Prob23(){
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
		var max = 28123;
		var toSum;
		var isA = [false];

		//memoize
		for(var i=1; i<=max; i++){
			if(i < this.d(i)){
				isA[i] = true;
			}else{
				isA[i] = false;
			}
		}

		for(var i=1;i<=max;i++){
			toSum = true;
			for(var a=1;a<i;a++){
				if(isA[a]){
					if(isA[i-a]){
						toSum = false;
						break;
					}
				}
			}

			if(toSum){
				//console.log(i);
				sum += i;
			}
		}
		return sum;
	};
}