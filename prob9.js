//Joe McCourt
//4/14/12

// Project Euler problem 9
// A Pythagorean triplet is a set of three natural numbers, 
// a  b  c, for which, a^2 + b^2 = c^2
// For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.
// There exists exactly one Pythagorean triplet for 
// which a + b + c = 1000.
// Find the product abc.
function Prob9(){

	//Brute force search of all number combinations
	//Since we have constraint sum(i+j+k) = 1000
	//There are only two degrees of freedom to search over
	this.eval = function(){
		var sum = 1000;
		for(var i = 1; i < sum; i++){
			for(var j = i; j < sum; j++){
				var k = sum - i - j;
				if(i*i+j*j == k*k){return i*j*k;}
			}
		}
	};
}