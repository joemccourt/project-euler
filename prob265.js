// Joe McCourt
// Feb 28th, 2014
// Project Euler problem 265
// Binary Circles

// 2N^ binary digits can be placed in a circle so that
// all the N-digit clockwise subsequences are distinct.

// For N=3, two such circular arrangements are possible, ignoring rotations:

// For the first arrangement, the 3-digit subsequences, in clockwise order, are:
// 000, 001, 010, 101, 011, 111, 110 and 100.

// Each circular arrangement can be encoded as a number by
// concatenating the binary digits starting with the subsequence
// of all zeros as the most significant bits and proceeding clockwise.
// The two arrangements for N=3 are thus represented as 23 and 29:
// 00010111 = 23
// 00011101 = 29

// Calling S(N) the sum of the unique numeric representations,
// we can see that S(3) = 23 + 29 = 52.

// Find S(5).

//For 2^5 digits, there are 2^32 possible answers ~4*10^9

//Binary rotation is the same as *2 + topmost bit
//

var num0 = 1;
var num = num0;

for(var rot = 0; rot < 8; rot++) {
	num = (num << 1);
	if(num > 255) {
		num -= 255;
	}
	console.log(num);
}

