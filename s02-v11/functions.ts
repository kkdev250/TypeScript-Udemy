function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number): void {
  console.log('Result: ' + num);
}

function addAndHandle(n1: number, n2: number, callback: (num: number) => void) { //'void' here means that we won't use the result of the callback, even if function return something
  const result = n1 + n2;
  callback(result);
}

printResult(add(5, 12));

// let combinedValues: Function;
let combinedValues: (a: number, b: number) => number; // FUNCTION type

combinedValues = add;
// combinedValues = printResult;
// combinedValues = 5;

console.log(combinedValues(8, 8));

addAndHandle(10, 20, (result) => {
  console.log(result);
});