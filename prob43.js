// Joe McCourt
// 7/22/12

// The number, 1406357289, is a 0 to 9 pandigital number because
// it is made up of each of the digits 0 to 9 in some order,
// but it also has a rather interesting sub-string divisibility property.

// Let d1 be the 1st digit, d2 be the 2nd digit, and so on. In this way, we note the following:

// d2d3d4=406 is divisible by 2
// d3d4d5=063 is divisible by 3
// d4d5d6=635 is divisible by 5
// d5d6d7=357 is divisible by 7
// d6d7d8=572 is divisible by 11
// d7d8d9=728 is divisible by 13
// d8d9d10=289 is divisible by 17
// Find the sum of all 0 to 9 pandii`gtal numbers with this property.

function hasProperty(number){
	if(parseInt(""+number[1]+number[2]+number[3],10) % 2){return false;}
	if(parseInt(""+number[2]+number[3]+number[4],10) % 3){return false;}
	if(parseInt(""+number[3]+number[4]+number[5],10) % 5){return false;}
	if(parseInt(""+number[4]+number[5]+number[6],10) % 7){return false;}
	if(parseInt(""+number[5]+number[6]+number[7],10) % 11){return false;}
	if(parseInt(""+number[6]+number[7]+number[8],10) % 13){return false;}
	if(parseInt(""+number[7]+number[8]+number[9],10) % 17){return false;}
	return true;
}

function search(number){
	if(hasProperty(number)){
		addToSum(number);
	}
	searchH(number,0);
}

function searchH(number,index){
	if(index >= number.length){return;}
	searchH(number,index+1);
	
	var copy;
	var indexNumber = number[index];
	for(var i = index+1; i < number.length; i++){
		copy = number.slice();
		copy[index] = number[i];
		copy[i] = indexNumber;

		searchH(copy,index+1);
		if(hasProperty(copy)){
			addToSum(copy);
		}
	}
};

var sum = 0;
function addToSum(number){
	console.log(number);
	var num = "";
	for(var i = 0; i < number.length; i++){
		num += number[i];
	}
	sum += parseInt(num);
}

search([0,1,2,3,4,5,6,7,8,9])
console.log(sum);
//console.log(hasProperty([1,4,0,6,3,5,7,2,8,9]))