// Joe McCourt
// 7/14/12

// If p is the perimeter of a right angle triangle with integral length sides,
// {a,b,c}, there are exactly three solutions for p = 120.
// {20,48,52}, {24,45,51}, {30,40,50}
// For which value of p <= 1000, is the number of solutions maximised?

var maxCounts = 0;
var maxP = 0;
for(var p = 5; p <= 1000; p++){
	var counts = 0;
	for(var i = 1; i < p; i++){
		for(var j = i; j < p-i; j++){
			var k = p-i-j;
			if(i*i + j*j == k*k){
				counts++;
				//console.log(i,j,k,p);
			}
		}
	}
	if(counts > maxCounts){maxCounts = counts; maxP = p;}
}

console.log(maxP,"Counts: " + maxCounts);