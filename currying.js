function curry(fn) {
    const args = Array.prototype.slice.call(arguments, 1);
    return function () {
        const innerArgs = Array.prototype.slice.call(arguments);
        const allArgs = innerArgs.concat(args);
        return fn.apply(null, allArgs);
    }
}

function add(num, num1) {
    return num + num1
}


const add5 = curry(add, 5)

const sum = add5(10)

console.log(sum)