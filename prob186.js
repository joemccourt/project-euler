// Joe McCourt
// Jan 4th, 2014
// Project Euler problem 186
// Connectedness of a network.

// Here are the records from a busy telephone system with one million users:
// RecNr	Caller	Called
// 1	200007	100053
// 2	600183	500439
// 3	600863	701497
// ...	...	...

// The telephone number of the caller and the called number
// in record n are Caller(n) = S2n-1 and Called(n) = S2n where S1,2,3,...
// come from the "Lagged Fibonacci Generator":

// For 1 ≤ k ≤ 55, Sk = [100003 - 200003k + 300007k3] (modulo 1000000)
// For 56 ≤ k, Sk = [Sk-24 + Sk-55] (modulo 1000000)

// If Caller(n) = Called(n) then the user is assumed to have misdialled
// and the call fails; otherwise the call is successful.

// From the start of the records, we say that any pair of users 
// X and Y are friends if X calls Y or vice-versa.
// Similarly, X is a friend of a friend of Z if X is a friend of Y
// and Y is a friend of Z; and so on for longer chains.

// The Prime Minister's phone number is 524287.
// After how many successful calls, not counting misdials,
// will 99% of the users (including the PM) be a friend,
// or a friend of a friend etc., of the Prime Minister?


// Used sort of a bidirectional graph search
// looking at the forum I see disjoint sets are the way to go :)
// But this works too! heh.

var graph = {
	600863: {
		connectedStart:true,
		connected:false,
		friends:[]
	}
};

var sidesConnected = false;
var numConnected = 1;
var numConnectedStart = 1;
// var connectNode = function(c) {
// 	var n = graph[c];
// 	if(!n.connected) {
// 		numConnected++;
// 		n.connected = true;

// 		while(n.friends.length) {
// 			var c = n.friends[n.friends.length-1];
// 			n.friends.pop();
// 			console.log(c);
// 			// connectNode(c);
// 			// n = graph[c];
// 		}
// 	}
// };

var connectSides = function() {
	if(!sidesConnected) {
		sidesConnected = true;
		numConnected = 0;
		for(var key in graph) {
			var n = graph[key];
			if(n.connected || n.connectedStart) {
				n.connected = true;
				numConnected++;
			}
		}
		console.log("connected!",numConnected);
	}
};

var connectNode = function(c) {
	var toSearch = [c];
	
	for(var i = 0; i < toSearch.length; i++) {
		var n = graph[toSearch[i]];

		if(n && !n.connected) {
			// console.log(i,toSearch.length,toSearch[i]);
			numConnected++;
			n.connected = true;

			for(var j = 0; j < n.friends.length; j++) {
				if(!graph[n.friends[j]].connected) {
					toSearch.push(n.friends[j]);		
				}
			}
			if(n.connectedStart) {connectSides();break;}
			n.friends = [];
		}
	}
};

var connectNodeStart = function(c) {
	var toSearch = [c];
	
	for(var i = 0; i < toSearch.length; i++) {
		var n = graph[toSearch[i]];

		if(n && !n.connectedStart) {
			numConnectedStart++;
			n.connectedStart = true;

			for(var j = 0; j < n.friendsStart.length; j++) {
				if(!graph[n.friendsStart[j]].connectedStart) {
					toSearch.push(n.friendsStart[j]);		
				}
			}
			if(n.connected) {connectSides();break;}
			n.friendsStart = [];
		}
	}
};

var S = [0];
var genS = function(n) {
	for(var k = 1; k < n; k++) {
		var Sk; 
		if(k <= 55) {
			Sk = (100003 - 200003*k+ 300007*k*k*k) % 1000000;
		} else {
			Sk = (S[k-24] + S[k-55]) % 1000000;
		}
		S[k] = Sk;
	}
};

var misdials = 0;
var calls = 0; 
var numCalls = 5000000;
genS(numCalls*2);
// console.log(S);

for(var cNum = 1; cNum < numCalls; cNum++) {
	var c1 = S[2*cNum-1];
	var c2 = S[2*cNum];
	
	if(c1 == 524287 || c2 == 524287) {
		console.log("Prime Minister");
	}

	if(c1 == c2) {
		console.log("Misdial",c1);
		misdials++;
		continue;
	}else{
		calls++;
	}

	if(typeof graph[c1] !== "object") {
		graph[c1] = {
			connected: c1 == 524287,
			friendsStart: [c2],
			friends: [c2]
		};
	} else {
		if(!graph[c1].connected) {
			graph[c1].friends.push(c2);
		}
		if(!graph[c1].connectedStart) {
			graph[c1].friendsStart.push(c2);
		}
	}

	if(typeof graph[c2] !== "object") {
		graph[c2] = {
			connected: c2 == 524287,
			friendsStart: [c1],
			friends: [c1]
		};
	} else if(!graph[c2].connected) {
		if(!graph[c2].connected) {
			graph[c2].friends.push(c1);
		}
		if(!graph[c2].connectedStart) {
			graph[c2].friendsStart.push(c1);
		}
	}

	for(var i = 1; i <= 2; i++) {
		var c = i==1 ? c1 : c2;
		var d = i==1 ? c2 : c1;

		if(!graph[c].connected && graph[d].connected) {
			connectNode(c);
		}

		if(!sidesConnected && !graph[c].connectedStart && graph[d].connectedStart) {
			connectNodeStart(c);
		}
	}

	if(numConnected >= 990000) {
		console.log("Threshold found",numConnected,calls)
		break;
	}
}

console.log(numConnected,calls)