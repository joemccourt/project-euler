
var memo = {};
var numCombos = function(n) {
    if (memo[n]) { return memo[n]; }

    if (n < 2) {
        return 1;
    }

    var A = 0;
    var B = 0;
    var C = 0;
    var D = 0;

    if (n >= 2) {
        A = numCombos(n-2);
    }

    if (n >= 3) {
        B = numCombos(n-3);
    }

    if (n >= 4) {
        C = numCombos(n-4);
    }

    D = numCombos(n-1);

    var num = A + B + C + D;
    if (!memo[n]) {
        memo[n] = num;
    }
    return num;
};

console.log(numCombos(50), 15);

