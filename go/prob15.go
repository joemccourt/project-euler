// Starting in the top left corner of a 2×2 grid,
// and only being able to move to the right and down,
// there are exactly 6 routes to the bottom right corner.

// How many such routes are there through a 20×20 grid?


// 2x2
// 6 3 1
// 3 2 1
// 1 1 1

// 3x3
// 20 10 4  1
// 10 6  3  1
// 4  3  2  1
// 1  1  1  1


package main

import (
	"fmt"
)

func prob15() {

	n := 20
	grid := make([][]uint64, n+1)
	for i := range grid {
		grid[i] = make([]uint64, n+1)
	}

	for i := n; i >= 0; i-- {
		for j := n; j >= 0; j-- {
			if j == n || i == n {
				grid[i][j] = 1
			} else {
				grid[i][j] = grid[i+1][j] + grid[i][j+1]
			}
		}
	}

	fmt.Println(grid)
	fmt.Println(grid[0][0])
}
