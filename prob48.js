//Joe McCourt
//6/10/12

//Project Euler problem 48
//The series, 1^1 + 2^2 + 3^3 + ... + 10^10 = 10405071317.
//Find the last ten digits of the series, 1^1 + 2^2 + 3^3 + ... + 1000^1000.


function lastTenPow(base,pow){
	var lastTen = 1;
	while(pow > 0){
		lastTen = (lastTen * base) % 10000000000;
		pow--;
	}
	return lastTen;
}

var lastTenSum = 0;
for(var n = 1; n <= 1000; n++){
	lastTenSum = (lastTenSum + lastTenPow(n,n)) % 10000000000;
}

console.log(lastTenSum);