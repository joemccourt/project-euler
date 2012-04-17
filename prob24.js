//Joe McCourt
//4/15/12

// Project Euler problem 24
// A permutation is an ordered arrangement of objects.
// For example, 3124 is one possible permutation of the digits
// 1, 2, 3 and 4. If all of the permutations are listed numerically
// or alphabetically, we call it lexicographic order.
// The lexicographic permutations of 0, 1 and 2 are:
// 012   021   102   120   201   210
// What is the millionth lexicographic permutation of the digits
// 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?
function Prob24(){

	this.eval = function(){
		//Factorial lookup
		var factorials = [1,1,1,1,1,1,1,1,1,1];
		for(var i = 1; i<10; i++){
			factorials[i] = i*factorials[i-1];
		}

		var permutation = [0,1,2,3,4,5,6,7,8,9];
		var nth = 1;
		var max = 1000000;
		var level = 9;
		var higher,current;
		while(nth < max && level){
			if(max - nth >= factorials[level]){
				//Increasing nth by level!
				nth += factorials[level];

				//Get next highest digit
				higher = 9-level+1;
				current = 9-level;
				while(permutation[higher] < permutation[current]){higher++;}

				//Swap current and next highest
				var tmp = permutation[current];
				permutation[current]  = permutation[higher];
				permutation[higher] = tmp;
			}else{	
				level--;
			}
		}

		return permutation;
	};
}