// Joe McCourt
// Jan 25th, 2014
// Project Euler problem 71
// Ordered fractions

// Consider the fraction, n/d, where n and d are positive integers.
// If n<d and HCF(n,d)=1, it is called a reduced proper fraction.

// If we list the set of reduced proper fractions for d ≤ 8
// in ascending order of size, we get:

// 1/8, 1/7, 1/6, 1/5, 1/4, 2/7, 1/3, 3/8, 2/5, 3/7, 1/2, 4/7,
// 3/5, 5/8, 2/3, 5/7, 3/4, 4/5, 5/6, 6/7, 7/8

// It can be seen that 2/5 is the fraction immediately to the left of 3/7.

// By listing the set of reduced proper fractions for d ≤ 1,000,000
// in ascending order of size, find the numerator of the fraction
// immediately to the left of 3/7.

// Property of Farey Sequence is that 0 <= a/b < c/d <= 1
// are neighbors iff b*c - a*d = 1

// so we are looking for a/b where b*3 - a*7 = 1
// Search from b 1000000 to 1 where a is whole number

for(var b = 1000000; b >= 1; b--) {
	var a = (3*b - 1)/7;

	if(a == (a|0)) {
		console.log(a,b);
		break;
	}
}