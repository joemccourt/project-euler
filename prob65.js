// Joe McCourt
// 10/26/13

// Project Euler problem 65

// What is most surprising is that the important mathematical constant,
// e = [2; 1,2,1, 1,4,1, 1,6,1 , ... , 1,2k,1, ...].

// The first ten terms in the sequence of convergents for e are:
// 2, 3, 8/3, 11/4, 19/7, 87/32, 106/39, 193/71, 1264/465, 1457/536, ...

// The sum of digits in the numerator of the 10th convergent is 1+4+5+7=17.

// Find the sum of digits in the numerator of the 100th convergent
// of the continued fraction for e.

//Add n2 to n1 (n1+=n2)
//Assume n1 > n2
var bigAdd = function(n1,n2){
        
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
                                carry[j+1] += temp/10|0;
                        }else{
                                n1[j] = temp;
                        }
                }
        }

        return n1;
};

var bigMultiply = function(bigNumber,mul){
	//console.log("Starting number: ", bigNumber.toString());
	
	//Init carry
	var length = bigNumber.length;
	var carry = [];
	while(carry.length<length){carry[carry.length]=0;}

	for(var j = 0; j < length; j++){
		var temp = mul*bigNumber[j];
		if(temp > 9){ //carry
			bigNumber[j] = temp%10;
			carry[j+1] = temp/10|0;
			if(j==length-1){
				length++;
				bigNumber[j+1]=0;
			}
		}else{
			bigNumber[j] = temp;
			carry[j+1] = 0;
		}
	}

	//console.log("Before Carry: ", bigNumber.toString());
	//console.log("Carry: ", carry.toString());

	//Add carry
	for(var j = 0; j < length; j++){
		if(carry[j]){
			var temp = bigNumber[j] + carry[j];

			if(temp > 9){ //carry again
				//Check if need to expand arrays
				if(j==length-1){
					length++;
					bigNumber[j+1]=0;
					carry[j+1]=0;
				}
				bigNumber[j] = temp%10;
				carry[j+1]  += temp/10|0;
			}else{
				bigNumber[j] = temp;
			}
		}
	}

	return bigNumber;
};

// e = [2; 1,2,1, 1,4,1, 1,6,1 , ... , 1,2k,1, ...].
// e = 2 + 1/(1+1/(2+1/(1+)))
// 2/1, 3/1, 8/3, 11/4, 19/7, 87/32, 106/39, 193/71, 1264/465, 1457/536, ...
// 2*1 + 3*2  / (1*1+2*1) = 8/3
// 3*1 + 8*1  / (1*1+3*1) = 11/4
// 8*1 +11*1  / (3*1+4*1) = 19/7
// 11*1+19*4  / (4*1+7*4) = 87 / 32

var i = 3;
var n1 = [2];
var d1 = [1];
var n0 = [3];
var d0 = [1];
var tmp;
var solution = 0;
while(i < 100+1){

	var tmpN = n0.slice();
	var tmpD = d0.slice();

	if(i%3==0){
		var factor = 2*i/3;
		bigAdd(bigMultiply(n0,factor),n1); //n0 = n0*factor + n1
		bigAdd(bigMultiply(d0,factor),d1); //d0 = d0*factor + d1
	}else{
		bigAdd(n0,n1); //n0 = n0 + n1
		bigAdd(d0,d1); //d0 = d0 + d1
	}

	n1 = tmpN;
	d1 = tmpD;

	i++
}

console.log(i-1, n0,d0);

var sum = 0;
for(i = 0; i < n0.length; i++){
	sum+=n0[i];
}
console.log(sum);