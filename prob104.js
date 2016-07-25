
var fibsFirst = [0, 1, 1];

var fib = function(n) {
    if (fibsFirst[n]) { return fibsFirst[n]; }
    fibsFirst[n] = fib(n-1) + fib(n-2);
    if (fibsFirst[n] > 1e100) {
        fibsFirst[n] /= 1e10;
        if (fibsFirst[n-1] > 1e97) {
            fibsFirst[n-1] /= 1e10;
        }
    }
    return fibsFirst[n];
};

var fibsLast = [0, 1, 1];

var fibLast = function(n) {
    if (fibsLast[n]) { return fibsLast[n]; }
    fibsLast[n] = (fibLast(n-1) + fibLast(n-2)) % 1e9;
    return fibsLast[n];
};

var isPanDigit = function(n) {
    var digits = (n + '').split('');
    if (digits.length !== 9) {
        return false;
    }

    var digitArray = {};
    for (var i = 0; i < 10; i++) {
        var d = digits[i];
        if (digitArray[d] || d === '0') { return false; }
        digitArray[d] = true;
    }
    return true;
};

fib(10000);
fibLast(10000);

// console.log(isPanDigit(123456789));
// console.log(isPanDigit(123556789));
// console.log(isPanDigit(323556789));

var firstNine = function(n) {
    var str = (n + '').replace('.', '');
    return str.substr(0, 9);
};

// console.log(isPanDigit(firstNine(2.1409356704307436e+150)));
// console.log(isPanDigit(fibLast(541)));

// console.log(isPanDigit(firstNine(fibsFirst[]));

for (var i = 100; i < 1000000; i++) {
    fib(i);
    fibLast(i);
    if (isPanDigit(firstNine(fib(i)))) {
        console.log(i, fib(i));
        if (isPanDigit(fibLast(i))) {
            console.log("Also pan last");
            break;
        }
    }
}
