// Joe McCourt
// Jan 17th 2014
// Project Euler Problem 102
// Triangle containment

// Three distinct points are plotted at random on a Cartesian plane,
// for which -1000 ≤ x, y ≤ 1000, such that a triangle is formed.

// Consider the following two triangles:
// A(-340,495), B(-153,-910), C(835,-947)
// X(-175,41), Y(-421,-714), Z(574,-645)

// It can be verified that triangle ABC contains the origin,
// whereas triangle XYZ does not.

// Using triangles.txt (right click and 'Save Link/Target As...'),
// a 27K text file containing the co-ordinates of one thousand "random" triangles,
// find the number of triangles for which the interior contains the origin.

var fs = require('fs');

var textToArray = function(str){
	var arrayOut = [];

	arrayTmp = str.split("\n");

	var inputLength = arrayTmp.length;
	var i;
	for(i = 0; i < inputLength; i++){
		arrayOut[i] = arrayTmp[i];
	}

	return arrayOut;
};

var FILEIN  = 'triangles.txt';
fs.readFile(FILEIN, 'utf8', function (err,data) {
  if (err) {
  	console.log(err);
  }

  solveProblem(textToArray(data));
});

var containsOrigin = function(v1,v2,v3) {

	var e1 = {x:v2.x-v1.x,y:v2.y-v1.y};
	var e2 = {x:v3.x-v2.x,y:v3.y-v2.y};
	var e3 = {x:v1.x-v3.x,y:v1.y-v3.y};

	var e1Length = Math.sqrt(e1.x*e1.x+e1.y*e1.y);
	var e2Length = Math.sqrt(e2.x*e2.x+e2.y*e2.y);
	var e3Length = Math.sqrt(e3.x*e3.x+e3.y*e3.y);

	var e1Normal = {x:e1.y/e1Length,y:-e1.x/e1Length};
	var e2Normal = {x:e2.y/e2Length,y:-e2.x/e2Length};
	var e3Normal = {x:e3.y/e3Length,y:-e3.x/e3Length};

	var dist1 = v1.x*e1Normal.x+v1.y*e1Normal.y;
	var dist2 = v2.x*e2Normal.x+v2.y*e2Normal.y;
	var dist3 = v3.x*e3Normal.x+v3.y*e3Normal.y;

	if(dist1 < 0 && dist2 < 0 && dist3 < 0 || dist1 > 0 && dist2 > 0 && dist3 > 0 ) {
		return true;
	} else {
		return false;
	}
}

var solveProblem = function(data) {

	var num = 0;
	for(var i = 0; i < data.length; i++) {
		var tri = data[i];
		var points = tri.split(",");
		var v1 = {x:parseInt(points[0],10),y:parseInt(points[1],10)};
		var v2 = {x:parseInt(points[2],10),y:parseInt(points[3],10)};
		var v3 = {x:parseInt(points[4],10),y:parseInt(points[5],10)};

		if(containsOrigin(v1,v2,v3)) {
			num++;
		}
	}
	console.log(num);
};
