//Joe McCourt
//4/15/12

// Project Euler problem 14
function Prob14(){

	//brute force
	//My first version, recursion looks cool, 
	//but is slower than iteration here
	this.numSteps = function(n){
		if(n==1){return 0;}
		if(n%2){return 1+this.numSteps(3*n+1);}
		return 1+this.numSteps(n/2);
	}

	var stepsArray = [0,0];
	//memoized
	//seems to be a bit faster for me
	this.numStepsMemo = function(n){
		if(typeof stepsArray[n] !== "undefined"){
			return stepsArray[n];
		}

		//Not already known, go down chain
		var steps;
		if(n%2){
			steps = 1+this.numSteps(3*n+1);
		}else{
			steps = 1+this.numSteps(n/2);
		}

		stepsArray[n] = steps;
		return steps;
	}

	//After looking at forums
	//Iterative aproach looks more straightforward
	this.numSteps2 = function(n){
		var steps = 0;
		while(n>1){
			if(n%2){n=3*n+1;}else{n/=2;}
			steps++;
		}
		return steps;
	};

	this.evalTo = function(max){
		var maxSteps = 0;
		var steps;
		var start = 1;
		for(var i = 1; i <= max; i++){
			steps = this.numSteps2(i);
			if(steps>maxSteps){
				maxSteps = steps;
				start = i;
				//console.log(start,steps);
			}
		}
		return start;
	};

	this.eval = function(){
		return this.evalTo(1000000);
	};
}