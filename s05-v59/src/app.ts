interface AddFn { //interface for a function, special syntax:
  (a: number, b: number): number //...it's a single member, like a method but without name
}
// type AddFn = (a: number, b: number) => number; //the same - as function type
let add: AddFn;
add = (n1: number, n2: number) => {
  return n1 + n2;
}

interface Named {
  readonly name?: string; //? - optional
  outputName?: string;
}

interface Greetable extends Named/*, AnotherInterface*/ {
  greet(phrase: string): void;
}

class Person implements Greetable/*, AnotherInterface*/ {
  name?: string; //this property is still read-only!!! (and optional - can not be set at all)
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + ' ' + this.name);
    } else {
      console.log('Hi!');
    }
  }
}

let user1: Greetable;

user1 = new Person();
// user1.name = 'Manu';

user1.greet('Hi there - I am');
console.log(user1);
