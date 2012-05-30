//Joe McCourt
//5/28/12

// Project Euler Problem 31
// In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation:
// 1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).
// It is possible to make £2 in the following way:
// 1x£1 + 1x50p + 2x20p + 1x5p + 1x2p + 3x1p
// How many different ways can £2 be made using any number of coins?

// var values  = [1,2,5,10,20,50,100,200];
var values  = [200,100,50,20,10,5,2,1];
var length = values.length;

function valueOf(amounts){
	var value = 0;
	for(var i = 0; i < length; i++){
		value += values[i]*amounts[i];
	}
	return value;
}

function sumWays(amountsIn,index){
	var ways = 0;
	var amounts = amountsIn.slice(0); //copy array

	while(valueOf(amounts)<=target){
		if(index+1 < length){
			ways += sumWays(amounts,index+1);
		}else{
			if(valueOf(amounts)==target){
				ways++;
				//console.log(amounts);
			}
		}
		amounts[index]++;
	}
	return ways;
}

var target = 200;
var amounts = [0,0,0,0,0,0,0,0];
	
console.log(sumWays(amounts,0));
// console.log(valueOf([3,1,1,0,2,1,1,0])); //Check should be 200
// console.log(valueOf([0,0,0,0,0,0,0,0])); //Check should be 200