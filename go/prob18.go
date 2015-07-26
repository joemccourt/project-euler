// By starting at the top of the triangle below and moving to adjacent numbers on the row below,
// the maximum total from top to bottom is 23.

// 3
// 7 4
// 2 4 6
// 8 5 9 3

// That is, 3 + 7 + 4 + 9 = 23.

// Find the maximum total from top to bottom of the triangle below:

// 75
// 95 64
// 17 47 82
// 18 35 87 10
// 20 04 82 47 65
// 19 01 23 75 03 34
// 88 02 77 73 07 63 67
// 99 65 04 28 06 16 70 92
// 41 41 26 56 83 40 80 70 33
// 41 48 72 33 47 32 37 16 94 29
// 53 71 44 65 25 43 91 52 97 51 14
// 70 11 33 28 77 73 17 78 39 68 17 57
// 91 71 52 38 17 14 91 43 58 50 27 29 48
// 63 66 04 68 89 53 67 30 73 16 69 87 40 31
// 04 62 98 27 23 09 70 98 73 93 38 53 60 04 23

// NOTE: As there are only 16384 routes, it is possible to solve this problem
// by trying every route. However, Problem 67, is the same challenge with a triangle
// containing one-hundred rows; it cannot be solved by brute force, and requires a clever method! ;o)

package main

import (
	"fmt"
)

func tCoordsToIndex(x int, y int) int {
	return y*(y+1)/2 + x
}

func Min(a ...int) int {
	min := a[0]
	for _, i := range a {
		if i < min {
			min = i
		}
	}
	return min
}

func Max(a ...int) int {
	max := a[0]
	for _, i := range a {
		if i > max {
			max = i
		}
	}
	return max
}

func prob18() {

	triangle := []int{
		75,
		95, 64,
		17, 47, 82,
		18, 35, 87, 10,
		20, 4, 82, 47, 65,
		19, 1, 23, 75, 3, 34,
		88, 2, 77, 73, 7, 63, 67,
		99, 65, 4, 28, 6, 16, 70, 92,
		41, 41, 26, 56, 83, 40, 80, 70, 33,
		41, 48, 72, 33, 47, 32, 37, 16, 94, 29,
		53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14,
		70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57,
		91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48,
		63, 66, 04, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31,
		4, 62, 98, 27, 23, 9, 70, 98, 73, 93, 38, 53, 60, 4, 23}

	for y := 1; y < 15; y++ {
		for x := 0; x <= y; x++ {
			idx := tCoordsToIndex(x, y)
			idxA := tCoordsToIndex(Max(0, x-1), y-1)
			idxB := tCoordsToIndex(Min(x, y-1), y-1)

			tA := triangle[idxA]
			tB := triangle[idxB]

			triangle[idx] += Max(tA, tB)
		}
	}

	max := 0
	for _, i := range triangle[tCoordsToIndex(0, 14):] {
		if i > max {
			max = i
		}
	}

	fmt.Println(triangle)
	fmt.Println(max)
}
