// Joe McCourt
// Jan 28th, 2014
// Project Euler problem 95
// Amicable chains

// The proper divisors of a number are all the divisors excluding the number itself.
// For example, the proper divisors of 28 are 1, 2, 4, 7, and 14.
// As the sum of these divisors is equal to 28, we call it a perfect number.

// Interestingly the sum of the proper divisors of 220 is 284
// and the sum of the proper divisors of 284 is 220, forming a chain of two numbers.
// For this reason, 220 and 284 are called an amicable pair.

// Perhaps less well known are longer chains. For example, starting with 12496,
// we form a chain of five numbers:

// 12496 → 14288 → 15472 → 14536 → 14264 (→ 12496 → ...)

// Since this chain returns to its starting point, it is called an amicable chain.

// Find the smallest member of the longest amicable chain
// with no element exceeding one million.


//This could be faster by using factors I think...
function getSumDivisors(number){
	if(number == 1) {return 1;}
	if(number == 2) {return 1;}

	var d = 2;
	var limit = Math.ceil(Math.sqrt(number));
	var num0 = number;
	var sum = 1;

	for(d = 2; d <= limit; d++){
		if(number%d==0){
			sum+=d;

			if(d != num0/d){
				sum+=num0/d;
			}
			// console.log(d,num0/d)
		}
	}

	return sum;
};

// function find(x) {
// 	if (x.parent != x) {
// 		x.parent = find(x.parent);
// 	}
// 	return x.parent;
// }

// function union(x, y) {
// 	xRoot = find(x);
// 	yRoot = find(y);

// 	// xRoot.parent = yRoot;
// 	// return;
// 	if (xRoot == yRoot) {
// 		return;
// 	}

// 	var newLength = xRoot.length + yRoot.length;
// 	xRoot.length = newLength;
// 	yRoot.length = newLength;

// 	// x and y are not already in same set. Merge them.
// 	if (xRoot.rank < yRoot.rank) {
// 		xRoot.parent = yRoot;
// 	} else if (xRoot.rank > yRoot.rank) {
// 		yRoot.parent = xRoot;
// 	} else {
// 		yRoot.parent = xRoot;
// 		xRoot.rank = xRoot.rank + 1;
// 	}
// }

var map = {};
var maxN = 1000000;

for(var i = 1; i <= maxN; i++) {
	var sumDivisors = getSumDivisors(i);
	
	if(sumDivisors > maxN) {continue;}

	map[i] = sumDivisors;

	// if(!map[i]) {
	// 	map[i] = {rank:0,length:1,x:i};
	// 	map[i].parent = map[i];
	// }

	// if(!map[sumDivisors]) {
	// 	map[sumDivisors] = {rank:0,length:1,x:sumDivisors};

	// 	map[sumDivisors].parent = map[sumDivisors];
	// }
	
	// union(map[i],map[sumDivisors]);
};


// Now search for longest chain
var chainLength = [];
var maxLength = 0;
var maxI = 0;
for(var i = 1; i <= maxN; i++) {
	if(chainLength[i]) {continue;}

	var length = 1;
	// chains[i] = 1;
	var num = i;

	var numsSeen = [i];
	while(numsSeen.indexOf(map[num]) < 0) {
		length++;
		num = map[num];
		if(!num) {
			length = 0;
			break;
		}
		numsSeen.push(num);
	}

	if(length > 0) {
		length = numsSeen.length - numsSeen.indexOf(map[num]);
		if(length > maxLength) {
			maxLength = length;
			// maxI = i;
			console.log("Chain Length:",length)
			for(var k = numsSeen.indexOf(map[num]); k < numsSeen.length; k++) {
				console.log(numsSeen[k]);
			}
		}
	}
}

//Go through longest cycle
// num = maxI;
// while(map[num] != num) {
// 	console.log(num,map[num]);
// 	num = map[num];
// }

// console.log(map);
// console.log(chainLength);
// console.log(getSumDivisors(31));