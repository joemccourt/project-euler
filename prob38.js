// Joe McCourt
// 7/14/12

// Take the number 192 and multiply it by each of 1, 2, and 3:
// 192 * 1 = 192
// 192 * 2 = 384
// 192 * 3 = 576
// By concatenating each product we get the 1 to 9 pandigital, 192384576.
// We will call 192384576 the concatenated product of 192 and (1,2,3)
// The same can be achieved by starting with 9 and multiplying by 1, 2, 3, 4, and 5,
// giving the pandigital, 918273645, which is the concatenated product of 9 and (1,2,3,4,5).
// What is the largest 1 to 9 pandigital 9-digit number that can be formed
// as the concatenated product of an integer with (1,2, ... , n) where n > 1?

//If is number as a string pandigital 1 through 9;
function isPandigital(str){
	if(str.length != 9){return false;}
	var digits = [0,0,0,0,0,0,0,0,0];

	var i;
	for(i = 0; i < 9; i++){
		digits[parseInt(str[i])-1] = 1;
	}
	return digits[0]&&digits[1]&&digits[2]&&digits[3]&&digits[4]&&digits[5]&&digits[6]&&digits[7]&&digits[8];
}

// Max pandigital number is 987654321
var max = 0;
for(var i = 1; i < 100000; i++){
	iStr = String(i);
	var n = 2;
	while(iStr.length < 9){
		iStr += n*i;
		n++
	}

	if(isPandigital(iStr)){
		if(parseInt(iStr) > max){max = parseInt(iStr);}
		console.log(i,iStr);
	}
}

console.log(max);