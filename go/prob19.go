
// You are given the following information, but you may prefer to do some research for yourself.

// 1 Jan 1900 was a Monday.
// Thirty days has September,
// April, June and November.
// All the rest have thirty-one,
// Saving February alone,
// Which has twenty-eight, rain or shine.
// And on leap years, twenty-nine.
// A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
// How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?
package main

import (
	"fmt"
)

func isLeapYear(y int) bool{
	if y % 4 != 0 {
		return false
	}

	if y % 100 == 0 && y % 400 != 0 {
		return false
	}

	return true
}

func prob19() {
	dim := []int{31,31,31,31,31,31,31,31,31,31,31,31}
	dim[8] = 30
	dim[3] = 30
	dim[5] = 30
	dim[10] = 30
	dim[1] = 29

	suns := 0
	d := 1
	dow := 1
	y := 1900
	m := 0

	for y < 2001 {
		// fmt.Println(d,dow,m,y)
		if y > 1900 && d == 1 && dow == 0 {
			suns++
		}

		d++
		if d > dim[m] || d > 28 && m == 1 && !isLeapYear(y) {
			d = 1
			m++
			if m > 11 {
				m = 0
				y++
			}
		}

		dow++
		dow %= 7
	}

	fmt.Println(suns)
}
