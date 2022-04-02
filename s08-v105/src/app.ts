// function Logger(constructor: Function) { //decorator function - if added to class it receives 1 argument - the class's constructor
//   console.log('Logging...');
//   console.log(constructor);
// }

function Logger(logString: string) { //decorator factory - it returns a decorator function
  console.log('LOGGER FACTORY');
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
}

function WithTemplate(template: string, hookId: string) { // class decorator
  console.log('TEMPLATE FACTORY');
  //return function(_: Function) { // '_' as argument turns off warning that this argument is not used
  return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {
    //code written here will be executed when class is defined
    /*console.log('Rendering template');
    const hookEl = document.getElementById(hookId);
    const p = new originalConstructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }*/
    return class extends originalConstructor { //class decorator can return new class based on the original
      constructor(..._: any[]) { //code written here will be executed when object based on class is instantiated
        super(); //to call this originalConstructor
        console.log('Rendering template');
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    }
  };
}

@Logger('LOGGING') //DECORATOR - it's a function that run when class is defined (not instantiated with 'new')
@WithTemplate('<h1>My Person Object</h1>', 'app') //runs as a first, above as second
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers);



function Log(target: any, propertyName: string | Symbol) { //property decorator - it receives 2 arguments: target (prototype of the object or constructor of static class) and property name
  console.log('Property decorator!');
  console.log(target, propertyName);
}

function Log2(target: any, name: string | Symbol, descriptor: PropertyDescriptor) { //accessor decorator - it receives 3 arguments: target, accessor name and accessor descriptor
  console.log('Accessor decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
  //accessor decorator can return a new descriptor
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) { //method decorator - it receives 3 arguments: target, method name and method descriptor
  console.log('Method decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
  //method decorator can return a new descriptor
}

function Log4(target: any, name: string | Symbol, position: number) { //parameter decorator - it receives 3 arguments: target, method name (not parameter name!) and position of the parameter
  console.log('Parameter decorator!');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product('Book', 19);
const p2 = new Product('Book 2', 29);

function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescritptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFunction = originalMethod.bind(this);
      return boundFunction;
    }
  }
  return adjustedDescritptor;
}

class Printer {
  message = 'This works!';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;
//button.addEventListener('click', p.showMessage); //doesn't work - in event listener 'this' is the click target
//button.addEventListener('click', p.showMessage.bind(p)); //works
button.addEventListener('click', p.showMessage); //now works thanks to binding in 'Autobind' method decorator


interface ValidatorConfig {
  [property: string]: {
    [vaildatableProp: string]: string[]; // ['required', 'positive']
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
  }
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
  }
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name]; // obj.constructor.name === class name
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch(validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('Invalid input, please try again!');
    return;
  }
  console.log(createdCourse);
})