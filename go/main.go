package main

import (
	"fmt"
	"os"
)

func main() {
	problems := map[string]interface{}{
		"1": prob1,
		"2": prob2,
		"3": prob3,
		"4": prob4,
		"5": prob5,
		"6": prob6,
		"7": prob7,
		"8": prob8,
		"9": prob9,
		"10": prob10,
		"11": prob11,
		"12": prob12,
		"13": prob13,
		"14": prob14,
		"15": prob15,
		"16": prob16,
		"17": prob17,
	}

	prob := "17"
	if len(os.Args) > 1 {
		prob = os.Args[1]
	}

	fmt.Println("Running problem:", prob)

	problems[prob].(func())()
}
