package main

import (
	"fmt"
	"os"
	"time"
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
		"18": prob18,
		"19": prob19,
		"20": prob20,
		"21": prob21,
	}

	prob := "21"
	if len(os.Args) > 1 {
		prob = os.Args[1]
	}

	fmt.Println("Running problem:", prob)
	start := time.Now()

	problems[prob].(func())()

	delta := time.Since(start)
	fmt.Println("Duration:", delta.Nanoseconds() / 1e6, "ms")
}
