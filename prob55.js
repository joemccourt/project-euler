// Joe McCourt
// 8/13/12

// If we take 47, reverse and add, 47 + 74 = 121, which is palindromic.
// Not all numbers produce palindromes so quickly. For example,
// 349 + 943 = 1292,
// 1292 + 2921 = 4213
// 4213 + 3124 = 7337

// That is, 349 took three iterations to arrive at a palindrome.
// Although no one has proved it yet, it is thought that some numbers, like 196, never produce a palindrome.
// A number that never forms a palindrome through the reverse and add process is called a Lychrel number.
// Due to the theoretical nature of these numbers, and for the purpose of this problem,
// we shall assume that a number is Lychrel until proven otherwise. In addition you are given
// that for every number below ten-thousand, it will either (i) become a palindrome in less than
// fifty iterations, or, (ii) no one, with all the computing power that exists,
// has managed so far to map it to a palindrome. In fact, 10677 is the first number to be shown to
// require over fifty iterations before producing a palindrome: 4668731596684224866951378664
// (53 iterations, 28-digits).

// Surprisingly, there are palindromic numbers that are themselves Lychrel numbers;
// the first example is 4994.

// How many Lychrel numbers are there below ten-thousand?

function isPalindrome(str){
	var length = str.length;
	if(length == 1){return true;}

	for(var i = 0; i < length/2; i++){
		if(str[i] != str[length-1-i]){
			return false;
		}
	}
	
	return true;
}

function bigAdd(n1,n2){
	
	//Init carry
	var length = n1.length;
	var carry = [];
	while(carry.length<length){carry[carry.length]=0;}
	while(n2.length<length){n2[n2.length]=0;}

	for(var j = 0; j < length; j++){
		var temp = n1[j]+n2[j];
		if(temp > 9){
			n1[j] = temp%10;
			carry[j+1] = temp/10|0;
			if(j==length-1){
				length++;
				n1[j+1]=0;
				n2[j+1]=0;
			}
		}else{
			n1[j] = temp;
			carry[j+1] = 0;
		}
	}

	//Add carry
	for(var j = 0; j < length; j++){
		if(carry[j]){
			var temp = n1[j] + carry[j];

			if(temp > 9){ //carry again
				//Check if need to expand arrays
				if(j==length-1){
					length++;
					n1[j+1]=0;
					carry[j+1]=0;
				}
				n1[j] = temp%10;
				carry[j+1]  += temp/10|0;
			}else{
				n1[j] = temp;
			}
		}
	}

	return n1;
};

function isLychrel(num){
	var i = 0;
	var numTmp;
	while(i < 50){
		i++;
		numTmp = num.slice();
		bigAdd(num,numTmp.reverse());
		if(isPalindrome(num)){
			return false;
		}
	}
	//console.log(num);
	return true;
}

var count = 0;
for(var i = 1; i < 10000; i++){
	
	// Convert i to array
	var iTmp = i;
	var num = [];
	while(iTmp > 0){
		num.push(iTmp % 10);
		iTmp = iTmp / 10 | 0;
	}

	if(isLychrel(num)){
		count++;
	}
}

console.log(count);