// Joe McCourt
// Jan 21th, 2014
// Project Euler problem 155
// Counting Capacitor Circuits.

// An electric circuit uses exclusively identical capacitors of the same value C.
// The capacitors can be connected in series or in parallel to form sub-units,
// which can then be connected in series or in parallel with other capacitors
// or other sub-units to form larger sub-units, and so on up to a final circuit.

// Using this simple procedure and up to n identical capacitors,
// we can make circuits having a range of different total capacitances.
// For example, using up to n=3 capacitors of 60 F each, we can obtain
// the following 7 distinct total capacitance values:

// If we denote by D(n) the number of distinct total capacitance values
// we can obtain when using up to n equal-valued capacitors
// and the simple procedure described above, we have: D(1)=1, D(2)=3, D(3)=7 ...

// Find D(18).

// Reminder : When connecting capacitors C1, C2 etc in parallel,
// the total capacitance is CT = C1 + C2 +...,
// whereas when connecting them in series, the overall capacitance is given by:
// 1/CT = 1/C1 + 1/C2 + ...,


// For every additional capacitor, try every combination
// with one in serial and one in parallel

// ,
// 	2: [120,30],
// 	3: [180,90,40,20]

var uniques = [];

var combos = {
	1: [60]
};

var addCapacitor = function(n) {
	var newCombos = [];
	for(var i = 1; i <= Math.ceil(n/2); i++) {
		var j = n-i;

		for(var group1I = 0; group1I < combos[i].length; group1I++) {
			for(var group2I = 0; group2I < combos[j].length; group2I++) {

				var group1 = combos[i][group1I];
				var group2 = combos[j][group2I];
			
				var pVal = group1+group2;		
				var sVal = group1*group2/(group1+group2);		
				// console.log(i,j,group1,group2,pVal,sVal);

				newCombos.push(pVal);
				newCombos.push(sVal);
			}
		}
	}

	newCombos.sort(function(a, b) {
		return a - b;
	});

	combos[n] = [];
	for(var i = 0; i < newCombos.length; i++) {
		if(i == 0 || newCombos[i] - newCombos[i-1] > 0.000001) {
			combos[n].push(newCombos[i]);
		}
	}

	var newUniques = uniques.concat(combos[n]);
	uniques = [];

	newUniques.sort(function(a, b) {
		return a - b;
	});

	for(var i = 0; i < newUniques.length; i++) {
		if(i == 0 || newUniques[i] - newUniques[i-1] > 0.000001) {
			uniques.push(newUniques[i]);
		}
	}

};

for(var i = 2; i <= 18; i++) {
	addCapacitor(i);
	console.log(i,combos[i].length)
	console.log(uniques.length);
}

// console.log(combos)

// // This is really a type of graph, how can I represent it?

// // var circuit = {
// // 	'children': []
// // };


// // circuit.children.push({
// // 	'children': []
// // });

// // circuit.children.push({
// // 	'children': []
// // });

// // circuit.children[0].children

// var circuit1 = {
// 	'caps': [
// 		{
// 			'parents': [-1],
// 			'children': [-1]
// 		}
// 	],
// 	'children': [0]
// };

// var addCapacitor = function(circuit) {
// 	var newCircuits = [];

// 	// //Version in serial
// 	// for(var i = 0; i < circuit.caps.length; i++) {

// 	// 	newCircuits[i] = {};
// 	// 	newCircuits[i].caps = circuit.caps.slice(0); //TODO, not a deep copy :/
// 	// 	newCircuits[i].children = circuit.children.slice(0);
// 	// 	var cap = newCircuits[i].caps[i];

// 	// 	var newCap = {
// 	// 		'parents': [i],
// 	// 		'children': cap.children.slice(0)
// 	// 	};

// 	// 	cap.children = [circuit.caps.length];
// 	// 	newCircuits[i].caps.push(newCap);
// 	// }

// 	// Version in parallel
// 	for(var i = 0; i < circuit.caps.length; i++) {
// 		newCircuits[circuit.caps.length+i] = {};
// 		var newC = newCircuits[circuit.caps.length+i];
// 		newC.caps = circuit.caps.slice(0);
// 		newC.children = circuit.children.slice(0);
// 		var cap = newC.caps[i];

// 		var newCap = {
// 			'parents': cap.parents.slice(0),
// 			'children': cap.children.slice(0)
// 		};

// 		for(var j = 0; j < cap.parents.length; j++) {
// 			if(cap.parents[j] >= 0) {
// 				newC.caps[cap.parents[j]].children.push(circuit.caps.length);
// 			}
// 		}

// 		for(var j = 0; j < cap.children.length; j++) {
// 			if(cap.children[j] >= 0) {
// 				newC.caps[cap.children[j]].children.push(circuit.caps.length);
// 			}
// 		}

// 		newC.caps.push(newCap);
// 	}

// 	console.log(newCircuits[1].caps)
// 	return newCircuits;
// };

// console.log(addCapacitor(circuit1));