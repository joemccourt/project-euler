// Joe McCourt
// 3/19/2014
// Project Euler problem 103
// Special subset sums: optimum

// Let S(A) represent the sum of elements in set A of size n.
// We shall call it a special sum set if for any two non-empty
// disjoint subsets, B and C, the following properties are true:

//     S(B) ≠ S(C); that is, sums of subsets cannot be equal.
//     If B contains more elements than C then S(B) > S(C).

// If S(A) is minimised for a given n, we shall call it an optimum
// special sum set. The first five optimum special sum sets are given below.

// n = 1: {1}
// n = 2: {1, 2}
// n = 3: {2, 3, 4}
// n = 4: {3, 5, 6, 7}
// n = 5: {6, 9, 11, 12, 13}

// It seems that for a given optimum set, A = {a1, a2, ... , an},
// the next optimum set is of the form B = {b, a1+b, a2+b, ... ,an+b},
// where b is the "middle" element on the previous row.

// By applying this "rule" we would expect the optimum set
// for n = 6 to be A = {11, 17, 20, 22, 23, 24}, with S(A) = 117.
// However, this is not the optimum set, as we have merely applied
// an algorithm to provide a near optimum set.
// The optimum set for n = 6 is A = {11, 18, 19, 20, 22, 25}, with S(A) = 115
// and corresponding set string: 111819202225.

// Given that A is an optimum special sum set for n = 7, find its set string.

// NOTE: This problem is related to problems 105 and 106.

// 2^7 possible subsets, this is tractable,
// so it's reasonable to check is special set

// k0+k1 > kn
// k0+k1+k2 > kn + kn-1
// k0+k2 != k1+k3

// k0 + kn != k1 + kn-1 != k2 + kn-2 != ...

// 1
// 1 1
// 1 2 1
// 1 3 3 1
// 1 4 6 4 1
// 1 5 10 10 5 1
// 1 6 15 20 15 6 1
// 1 7 21 35 35 21 7 1

// 6 choose 3 = 20
// 7 choose 3 = 35

// subset of k numbers must have n choose k unique values

// Creates set of unique values 
// [Single values, sumpairs, sum sets of three, sum sets of 4, ...]
// 2^n - 1 unique values
// S(A) - k0 >= 2^n - 1

// S(A) >= n*k0 + n(n-1)/2
var isValid = function(k) {
	var unique = {};
	var maxNum = [];
	var minNum = [];
	var limit = Math.pow(2,k.length);
	for(var i = 1; i < limit; i++) {
		// console.log(maxNum)
		var sum = 0;
		var num = 0;
		var vec = [];
		for(var j = 0; j < k.length; j++) {
			vec[j] = 0;
			if(i & (1 << j)) {
				sum += k[j];
				num++;
				vec[j] = 1;
			}
		}

		// console.log(i,sum,vec);
		if(unique[sum]) {
			return false;
		}
		unique[sum] = true;

		// if(num > 1 && sum < maxNum[num-1]) {return false;}
		// if(num < k.length && maxNum[num+1] > 0 && sum > maxNum[num+1]) {return false;}
		if(!maxNum[num] || sum > maxNum[num]) {maxNum[num] = sum;}
		if(!minNum[num] || sum < minNum[num]) {minNum[num] = sum;}
	}

	for(var j = 1; j < k.length; j++) {
		if(maxNum[j] >= minNum[j+1]) {return false;}
	}

	// console.log(maxNum,minNum);
	return true;
}

var minSum = 10000000;
var searchSet = function(k) {
	if(k.length == 0) {
		for(var k0 = 20; k0 <= 20; k0++) {
			if(searchSet([k0])) {
				return;
			}
		}
		return;
	}

	if(k.length == 7) {
		var sum = k[0]+k[1]+k[2]+k[3]+k[4]+k[5]+k[6];
		if(sum < minSum) {
			minSum = sum;
			console.log(k,sum);
			}
		}
	if(k.length > 7) {return;}

	for(var dx = 1; dx < 15; dx++) {
		var kNew = k.slice(0);
		kNew[k.length] = k[k.length-1]+dx;
		if(isValid(kNew)) {
			if(searchSet(kNew))
			{
				return;
			}
		}
	}
	// for(var i = 1; i < k.length; i++) {

	// }
};
searchSet([]);



// n = 1: {1}
// n = 2: {1, 2}
// n = 3: {2, 3, 4}
// n = 4: {3, 5, 6, 7}
// n = 5: {6, 9, 11, 12, 13}
// n = 6: {11, 18, 19, 20, 22, 25}

// console.log(isValid([1, 6, 12, 24, 34, 48, 62])) //false
// console.log(isValid([11, 18, 19, 20, 22, 25])) //true
// console.log(isValid([8, 21, 30, 32, 34, 46, 60 ])) //false
// console.log(isValid([20, 21, 22, 30, 40, 44, 58 ])) //false

// deltas:
// 1:
// 1: 1
// 2: 1 1
// 3: 2 1 1
// 6: 3 2 1 1
//11: 7 1 1 2 3

