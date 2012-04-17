//Joe McCourt
//4/15/12

// Project Euler problem 19
// You are given the following information, 
// but you may prefer to do some research for yourself.
// 1 Jan 1900 was a Monday.
// Thirty days has September,
// April, June and November.
// All the rest have thirty-one,
// Saving February alone,
// Which has twenty-eight, rain or shine.
// And on leap years, twenty-nine.
// A leap year occurs on any year evenly divisible by 4,
// but not on a century unless it is divisible by 400.
// How many Sundays fell on the first of the 
// month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?
function Prob19(){
	//Let 0 represent sunday, ... , 6 saturday
	var daysinmonth = [31,0,31,30,31,30,31,31,30,31,30,31]
	
	this.isleapyear = function(year){
		if(year%4 == 0 && (year%100!=0 || year%400==0)){
			return true;
		}
		return false;
	};

	//This one is more tedius than fun :(
	this.eval = function(){
		var year = 1900;
		var startyear = 1901;
		var day = 1;
		var sum = 0;
		while(year <= 2000){
			for(var month = 0; month < 12; month++){
				if(day == 0 && year >= startyear){sum++;}

				if(month == 1){
					if(this.isleapyear(year)){day+=29;}else{day+=28;}
				}else{
					day += daysinmonth[month];
				}
				day %= 7;
			}
			year++;
		}
		return sum;
	};
}