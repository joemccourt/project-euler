// We can easily verify that none of the entries in the first seven rows of Pascal's triangle are divisible by 7:

//  	 	 	 	 	 	 1
//  	 	 	 	 	 1	 	 1
//  	 	 	 	 1	 	 2	 	 1
//  	 	 	 1	 	 3	 	 3	 	 1
//  	 	 1	 	 4	 	 6	 	 4	 	 1
//  	 1	 	 5	 	10	 	10	 	 5	 	 1
// 1	 	 6	 	15	 	20	 	15	 	 6	 	 1
// 1 7 21 35 35
// 1 8 28 56 70
// 1 9 36 84 126
// However, if we check the first one hundred rows, we will find that only 2361 of the 5050 entries are not divisible by 7.

// Find the number of entries which are not divisible by 7 in the first one billion (10^9) rows of Pascal's triangle.


//Construct pascal triangle simply
// function buildPascal(n){
// 	pascal = [];
// 	pascalPrevious = [1];

// 	for(var row = 1; row <= n; row++){
// 		pascal = [];

// 		for(var col = 0; col <= row; col++){
// 			if(col == 0){
// 				pascal[col] = pascalPrevious[col];	
// 			}else if(col == row){
// 				pascal[col] = pascalPrevious[col-1];
// 			}else{
// 				pascal[col] = pascalPrevious[col-1]+pascalPrevious[col];
// 			}
// 		}
// 		pascalPrevious = pascal;
// 	}
// 	return pascal;
// }

function buildPascal(n) {
	var row = [];
	var numSeven = 0;
	var t = 0;
	for (var i = 0; i < n; i++) {
		var numSevenRow = chooseSevenRow(i);
		numSeven += numSevenRow;
		t+= i+1;
		console.log(i, i - numSevenRow);
	}
	return t - numSeven;
}

// n choose k = (n-1) choose (k-1) + (n-1) choose k
// function choose(n, k) {
// 	if (n === k || k === 0) { return 1; } // ones on the end
// 	if (k === 1 || k === n - 1) { return n; } // Linear in by one
// 	return choose(n-1, k-1) + choose(n-1, k);
// }

function choose(n, k) {
	var prod = 1;
	for (var i = 1; i <= k; i++) {
		prod *= (n+1-i) / i;
	}
	return prod;
}

function chooseSeven(n, k) {
	var seven = 0;
	var prod = 1;
	var numSevenNum = 0;
	var numSevenDen = 0;
	for (var i = 1; i <= k; i++) {
		var num = n+1-i;
		var den = i;
		prod *= num / den;
		while (num % 7 === 0) {
			numSevenNum++;
			num /= 7;
		}
		while (den % 7 === 0) {
			numSevenDen++;
			den /= 7;
		}
	}

	if (prod >= 7 && numSevenNum > numSevenDen) {
		return 1;
	}
	return 0;
}

function chooseSevenRow(n) {
	var seven = 0;

	var n_2 = Math.floor(n/2);
	var numSevenNum = 0;
	var numSevenDen = 0;
	for (var j = 1; j <= n_2; j++) {
		var num = n+1-j;
		var den = j;
		while (num % 7 === 0) {
			numSevenNum++;
			num /= 7;
		}
		while (den % 7 === 0) {
			numSevenDen++;
			den /= 7;
		}

		if (numSevenNum > numSevenDen) {
			seven += 2;
			if (j == n_2 && n % 2 == 0) {
				seven--;
			}
		}
	}

	return seven;
}

//  	 	 	 	 	 	 1
//  	 	 	 	 	 1	 	 1
//  	 	 	 	 1	 	 2	 	 1
//  	 	 	 1	 	 3	 	 3	 	 1
//  	 	 1	 	 4	 	 6	 	 4	 	 1
//  	 1	 	 5	 	3	 	3	 	 5	 	 1
//  1	 	 6	 	1	 	6	 	1	 	 6	 	 1
// 1    0        0        0     0       0       0       1
// 1 1 0 0 0 0
// 1 2 1 0 0

function buildPascalMod7(n){
	n--;
	pascal = [];
	pascalPrevious = [1];
	var count = 1;
	for(var row = 1; row <= n; row++){
		pascal = [];

		for(var col = 0; col <= row; col++){
			if(col == 0){
				pascal[col] = pascalPrevious[col];	
			}else if(col == row){
				pascal[col] = pascalPrevious[col-1];
			}else{
				pascal[col] = (pascalPrevious[col-1]+pascalPrevious[col]) % 7;
			}

			if (pascal[col] !== 0) {
				count++;
			}
		}
		pascalPrevious = pascal;
		// console.log(pascal.join(""))
	}
	return count;
}


//                  Triangle   A:  28 non zero.  Height 7
//  	 	 	 	 	 	 1
//  	 	 	 	 	 1	 	 1
//  	 	 	 	 1	 	 2	 	 1
//  	 	 	 1	 	 3	 	 3	 	 1
//  	 	 1	 	 4	 	 6	 	 4	 	 1
//  	 1	 	 5	 	10	 	10	 	 5	 	 1
// 1	 	 6	 	15	 	20	 	15	 	 6	 	 1


//  A      
//  A 0 A 
//  A 0 A 0 A
//  A 0 A 0 A 0 A
//  A 0 A 0 A 0 A 0 A
//  A 0 A 0 A 0 A 0 A 0 A
//  A 0 A 0 A 0 A 0 A 0 A 0 A
//  => B

// B = 28 * A

var mem = {7: 28};
var base = 7;
while (base < 1e9) {
	var newBase = base*7;
	mem[newBase] = mem[base] * 28;
	base = newBase;
}
console.log(mem);

var f = function(rows) {
	if (rows <= 7) {
		return rows * (rows+1) / 2;
	}

	var sizeSmaller = 7;
	while (sizeSmaller * 7 <= rows) {
		sizeSmaller *= 7;
	}

	var countSmaller = mem[sizeSmaller];
	var i = 1;
	var count = 0;
	while (rows >= sizeSmaller) {
		rows -= sizeSmaller;
		count += countSmaller * i;
		i++;
	}

	return count + i * f(rows);
}

// console.log(100, buildPascal(100));
var v = 10;
while (v <= 1e9) {
	console.log(v, f(v));
	v *= 10;
}

