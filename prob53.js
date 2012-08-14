// Joe McCourt
// 8/11/12

// There are exactly ten ways of selecting three from five, 12345:
// 123, 124, 125, 134, 135, 145, 234, 235, 245, and 345
// In combinatorics, we use the notation, 5C3 = 10.
// In general,
// nCr = n! / (r!(n-r)!)	
// ,where r <= n, n! = n(n-1)...3*2*1, and 0! = 1.
// It is not until n = 23, that a value exceeds one-million: 23C10 = 1144066.
// How many, not necessarily distinct, values of  nCr, for 1  n  100, are greater than one-million?


//Construct pascal triangle
function buildPascal(n){
	pascal = [];
	pascal[0] = [1];

	for(var row = 1; row <= n; row++){
		pascal[row] = [];

		for(var col = 0; col <= row; col++){
			if(col == 0){
				pascal[row][col] = pascal[row-1][col];	
			}else if(col == row){
				pascal[row][col] = pascal[row-1][col-1];
			}else{
				pascal[row][col] = pascal[row-1][col-1]+pascal[row-1][col];
			}
		}
	}
	return pascal;
}

count = 0;
var pascal = buildPascal(100);
for(var i = 0; i < pascal.length; i++){
	for(var j = 0; j < pascal[i].length; j++){
		if(pascal[i][j] > 1000000){
			count++;
		}
	}
}
console.log(count)