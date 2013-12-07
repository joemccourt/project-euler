// Joe McCourt
// 12/6/13

// Project Euler problem 80

// It is well known that if the square root of a natural number is not an integer,
// then it is irrational. The decimal expansion of such square roots is infinite
// without any repeating pattern at all.
// The square root of two is 1.41421356237309504880..., 
//and the digital sum of the first one hundred decimal digits is 475.
// For the first one hundred natural numbers, find the total of the digital sums
// of the first one hundred decimal digits for all the irrational square roots.


var square = 2;


// Using http://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Digit-by-digit_calculation
function isqrt(num) {
    var res = 0;
    var bit = 1 << 30; // The second-to-top bit is set: 1L<<30 for long
 
    // "bit" starts at the highest power of four <= the argument.
    while (bit > num)
        bit >>= 2;
 
    while (bit != 0) {
        if (num >= res + bit) {
            num -= res + bit;
            res = (res >> 1) + bit;
        }else{
            res >>= 1;
        }
        bit >>= 2;
    }
    return res;
}

//Adapt prev algo to be any length using arrays
var arrayLength = 6;
function sqrt(num) {
    var res = createBitArray();
    var bit = createBitArray();
    bit[1] = 1;
 
    // "bit" starts at the highest power of four <= the argument.
    while (bitArrayGT(bit,num)) {
		bit.pop();
		bit.pop();
		bit.unshift(0,0);
    }
    
    while (!bitArrayIsZero(bit)) {
        if (bitArrayGTE(num,bitArrayAdd(res,bit))) {
            num = bitArrayMinus(num,bitArrayAdd(res,bit));
            res.pop();
            res.unshift(0);
            res = bitArrayAdd(res,bit);
        }else{
            res.pop();
            res.unshift(0);
        }
        bit.pop();
        bit.pop();
		bit.unshift(0,0);
    }
    return res;
}

var createBitArray = function() {
	var array = [];
	for(var i = 0; i < arrayLength; i++){array[i] = 0;} 
	return array;
};

var bitArrayIsZero = function(array) {
	for(var i = 0; i < arrayLength; i++){
		if(array[i] != 0){
			return false;
		}
	}
	return true;
};

var bitArrayGTE = function(array1,array2) {
	for(var i = 0; i < arrayLength; i++){
		if(array1[i] < array2[i]){return false;}
		if(array1[i] > array2[i]){return true;}
	}
	return true;
};

var bitArrayGT = function(array1,array2) {
	for(var i = 0; i < arrayLength; i++){
		if(array1[i] < array2[i]){return false;}
		if(array1[i] > array2[i]){return true;}
	}
	return false;
};

var bitArrayMinus = function(array1,array2) {
	var newArray = [];
	var c = 0;
	for(var i = 0; i < arrayLength; i++) {
		var sum = c + array1[arrayLength-i-1] - array2[arrayLength-i-1];
		if(sum < 0){c = -1; sum+=2;}else{c = 0;}
		newArray[arrayLength-i-1] = sum;
	}
	return newArray;
};

var bitArrayAdd = function(array1,array2) {
	var newArray = [];
	var c = 0;
	for(var i = 0; i < arrayLength; i++) {
		var sum = c + array1[arrayLength-i-1] + array2[arrayLength-i-1];
		if(sum >= 2){c = 1; sum-=2;}else{c = 0;}
		newArray[arrayLength-i-1] = sum;
	}
	return newArray;
};

var bitArrayTimesTen = function(array) {
	var ten = createBitArray();
	ten[arrayLength-1-1] = 1;
	ten[arrayLength-1-3] = 1;
};

// console.log(bitArrayMinus([0,0,0,1,1,0],[0,1,0,0,1,0]));
var bitNum = createBitArray();
var num = 2;

var factor = 100;
num *= factor;



console.log(sqrt(bitNum));
