// Joe McCourt
// Jan 31th, 2014
// Project Euler problem 68
// Magic 5-gon ring

// Consider the following "magic" 3-gon ring, filled with the numbers 1 to 6,
// and each line adding to nine.

// Working clockwise, and starting from the group of three with the numerically
// lowest external node (4,3,2 in this example), each solution can be described uniquely.
// For example, the above solution can be described by the set: 4,3,2; 6,2,1; 5,1,3.

// It is possible to complete the ring with four different totals:
// 9, 10, 11, and 12. There are eight solutions in total.

// Total	Solution Set
// 9	4,2,3; 5,3,1; 6,1,2
// 9	4,3,2; 6,2,1; 5,1,3
// 10	2,3,5; 4,5,1; 6,1,3
// 10	2,5,3; 6,3,1; 4,1,5
// 11	1,4,6; 3,6,2; 5,2,4
// 11	1,6,4; 5,4,2; 3,2,6
// 12	1,5,6; 2,6,4; 3,4,5
// 12	1,6,5; 3,5,4; 2,4,6

// By concatenating each group it is possible to form 9-digit strings;
// the maximum string for a 3-gon ring is 432621513.

// Using the numbers 1 to 10, and depending on arrangements,
// it is possible to form 16- and 17-digit strings.
// What is the maximum 16-digit string for a "magic" 5-gon ring?

// 16 digit implies 10 must be on outside
// To get the largest, first try to find solution with 6-10 on outside

var r = [[],[],[],[],[]];

// r00 + r01 + r02 = c
// r10 + r11 + r12 = c
// r20 + r21 + r22 = c
// r30 + r31 + r32 = c
// r40 + r41 + r42 = c

// r01 = r42
// r02 = r11
// r12 = r21
// r22 = r31
// r32 = r41

// Assuming solution where outside only higest...


//Gross way of doing permutations, but it works... :(
//Wonder what's a better way (other than recursion)
var nums = [7,8,9,10];
for(var i = 0; i < 24; i++) {
	
	var i1 = (i/6)|0;
	// var i2 = (i1+1+(((i/2)|0)%4))%4;
	var i2 = (i1+1+((((i-6*i1)/2)|0)%4))%4;

	var i3 = (i&1);
	var i4 = 0;

	if(i1 == 0 && i2 == 1 || i1 == 1 && i2 == 0) {
		if(i3) {
			i3 = 2;
			i4 = 3;
		} else {
			i3 = 3;
			i4 = 2;
		}
	}

	if(i1 == 0 && i2 == 2 || i1 == 2 && i2 == 0) {
		if(i3) {
			i3 = 1;
			i4 = 3;
		} else {
			i3 = 3;
			i4 = 1;
		}
	}

	if(i1 == 0 && i2 == 3 || i1 == 3 && i2 == 0) {
		if(i3) {
			i3 = 1;
			i4 = 2;
		} else {
			i3 = 2;
			i4 = 1;
		}
	}

	if(i1 == 1 && i2 == 2 || i1 == 2 && i2 == 1) {
		if(i3) {
			i3 = 0;
			i4 = 3;
		} else {
			i3 = 3;
			i4 = 0;
		}
	}

	if(i1 == 1 && i2 == 3 || i1 == 3 && i2 == 1) {
		if(i3) {
			i3 = 0;
			i4 = 2;
		} else {
			i3 = 2;
			i4 = 0;
		}
	}

	if(i1 == 2 && i2 == 3 || i1 == 3 && i2 == 2) {
		if(i3) {
			i3 = 0;
			i4 = 1;
		} else {
			i3 = 1;
			i4 = 0;
		}
	}

	var r00 = 6;
	var r10 = nums[i1];
	var r20 = nums[i2];
	var r30 = nums[i3];
	var r40 = nums[i4];

	// console.log(i1,i2,i3,i4)
	// console.log((i&8)/8,(i&4)/4,(i&2)/2,(i&1))
	// console.log(r10,r20,r30,r40)
	// Now just 2d problem
	for(var r01 = 1; r01 < 6; r01++) {
		var r42 = r01;

		for(var r02 = 1; r02 < 6; r02++) {
			var r11 = r02;

			if(r01 == r02) {continue;}
			var c = r00 + r01 + r02;

			var r12 = c - (r10 + r11);
			var r21 = r12;
			if(r12 >= 10 || r12 <= 0 || r12 == r02 || r12 == r01) {continue;}
			if(r12 == r00 || r12 == r10 || r12 == r20) {continue;}

			var r22 = c - (r20 + r21);
			var r31 = r22;
			if(r22 >= 10 || r22 <= 0  || r22 == r12 || r22 == r02 || r22 == r01) {continue;}
			if(r22 == r00 || r22 == r10 || r22 == r20) {continue;}

			var r32 = c - (r30 + r31);
			var r41 = r32;
			if(r32 >= 10 || r32 <= 0  || r32 == r22 || r32 == r12 || r32 == r02 || r32 == r01) {continue;}
			if(r32 == r00 || r32 == r10 || r32 == r20) {continue;}

			if(r40 + r41 + r42 != c) {continue;}

			// console.log(r00,r01,r02);
			// console.log(r10,r11,r12);
			// console.log(r20,r21,r22);
			// console.log(r30,r31,r32);
			// console.log(r40,r41,r42);

			console.log(""+r00+r01+r02+r10+r11+r12+r20+r21+r22+r30+r31+r32+r40+r41+r42)
		}
	}
}



