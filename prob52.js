// Joe McCourt
// 8/11/12

// It can be seen that the number, 125874, and its double, 251748,
// contain exactly the same digits, but in a different order.
// Find the smallest positive integer, x, such that 2x, 3x, 4x, 5x, and 6x, contain the same digits.

function isAnagram(str1, str2){
	if(str1.length != str2.length){return false;}

	var index;
	for(var i = 0; i < str1.length; i++){
		
		//Must contain every character somewhere
		index = str2.indexOf(str1.charAt(i));
		if(index < 0){
			return false;
		}

		//The number of each char must match up
		if(str1.split(str1.charAt(i)).length != str2.split(str1.charAt(i)).length){
			return false;
		}
	}
	return true;
}

var limit = 1000000;
for(var i = 1; i < limit; i++){
	if(	isAnagram(String(i),String(2*i)) && 
		isAnagram(String(i),String(3*i)) &&
		isAnagram(String(i),String(4*i)) &&
		isAnagram(String(i),String(5*i)) &&
		isAnagram(String(i),String(6*i)))
	{
		console.log(i);
	}
}


