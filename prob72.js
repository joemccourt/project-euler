// Joe McCourt
// Jan 25th, 2014
// Project Euler problem 72
// Counting fractions

// Consider the fraction, n/d, where n and d are positive integers.
// If n<d and HCF(n,d)=1, it is called a reduced proper fraction.

// If we list the set of reduced proper fractions for d ≤ 8
// in ascending order of size, we get:

// 1/8, 1/7, 1/6, 1/5, 1/4, 2/7, 1/3, 3/8, 2/5, 3/7, 1/2, 4/7, 3/5,
// 5/8, 2/3, 5/7, 3/4, 4/5, 5/6, 6/7, 7/8

// It can be seen that there are 21 elements in this set.

// How many elements would be contained in the set of
// reduced proper fractions for d ≤ 1,000,000?

// Note symmetry about 1/2

// if a/b < c/d < e/f are consecutive neighbors,
// Then c/d = (a+e) / (b+f)

// Using farey sequence algo:
// a/b < c/d  :  0/1 < 1/1

var lastCount = 0;
for(var N = 2; N < 221; N++) {
var count = 0;
var a = 0;
var b = 1;
var c0 = 1;
var d0 = 2;
var k = Math.floor((N-d0)/b);
var c = c0 + k * a;
var d = d0 + k * b;

var e,f;
while(!(c == 1 && d == 1)) {
	count++;
	k = ((N + b) / d)|0;
	e = k*c - a;
	f = k*d - b;
	a = c;
	b = d;
	c = e;
	d = f;
}

console.log(N,count,count - lastCount);
lastCount = count;
}

//Note pattern of:
//Increase by n-1 for prime numbers
// For not squarefree numbers
// 4: 2 (4-2)
// 8: 4 
// 9: 6 (9-3)
// 12: 4 ((3-1)*(4-2))
// 16: 8
// 18: 6 (2-1)*(9-3)
// 20: 8 (5-1)*(4-2)
// 24: 8
// 25: 20 (25-5)
// 27: 18
// 32: 16
// 36: 12 (4-2)*(9-3)
// 49: 42 (49-7)
// 50: 20 (2-1)*(25-5)
// 121: 110 (121-11)

// Distinct primes
// 6 (2*3): 2 (1*2)
// 10 (2*5): 4 (1*4)
// 14 (2*7): 6 (1*6)
// 15 (3*5): 8 (2*4)
// 21 (3*7): 12 (2*6)
// 22 (2*11): 10 (1*10)
// 26 (2*13): 12 (1*12)
// 30 (2*3*5): 8 (1*2*4)
// 33 (3*11): 20 (2*10)
// 35 (5*7): 24 (4*6)
// 42 (2*3*7): 12 (1*2*6)
// 70 (2*5*7): 24 (1*4*6)
// 210 (2*3*5*7): 48 (1*2*4*6)

function isPrime(number){
	if(number <= 1){return false;}
	if(number == 2){return true;}
	if(!(number%2)){return false;}
	var maxCheck = Math.floor(Math.sqrt(number));
	for(var i = 3; i <= maxCheck; i+=2){
		if(!(number%i)){return false;}
	}
	return true;
}


var count = 0;
for(var i = 2; i < 32; i++) {
	if(isPrime(i)) {
		count += i-1;
	} else {
		count += 4;
	}
}

console.log(count);