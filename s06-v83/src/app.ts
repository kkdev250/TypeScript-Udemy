type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
}

type ElevatedEmployee = Admin & Employee; // INTERSECTION type
//interface IElevatedEmployee extends IAdmin, IEmployee {} - the same with interfacess

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date()
}

type Combinable = string | number; //union type
type Numeric = number | boolean;

type Universal = Combinable & Numeric; //intersection type -> here: number

function add(a: number, b:number): number; // FUNCTION OVERLOAD
function add(a: string, b:string): string; // FUNCTION OVERLOAD
function add(a: string, b:number): string; // FUNCTION OVERLOAD
function add(a: number, b:string): string; // FUNCTION OVERLOAD
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('Max', 'Schwarz'); //no error thanks to the function overloads
result.split(' ');

const fetchedUserData = {
  id: 'u1',
  name: 'Max',
  job: { title: 'CEO', description: 'My own company' }
};

console.log(fetchedUserData?.job?.title);

const userInput = '';

const storedData1 = userInput || 'DEFAULT' // if falsy (null, undefined, 0, '') then use 'DEFAULT'
const storedData2 = userInput ?? 'DEFAULT' // NULLISH COALESCING - ONLY if null or undefined - use 'DEFAULT'

console.log(storedData1);
console.log('X' + storedData2 + 'X');


type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);
  if ('privileges' in emp) { // workaround - 'if (emp.privileges)' is not allowed by TS
    console.log('Privileges: ' + emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('Start Date: ' + emp.startDate);
  }
}

printEmployeeInformation(e1);
printEmployeeInformation({name: 'Manu', startDate: new Date()});

class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo... ' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // if ('loadCargo' in vehicle) {
  //   vehicle.loadCargo(1000);
  // } //or....:
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: 'bird'; //literal type - 'type' must be string and must be 'bird'
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving with speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});

//const paragraph = document.querySelector('p');
//const userInputElement = <HTMLInputElement>document.getElementById('user-input')!; //type casting
const userInputElement = document.getElementById('user-input')! as HTMLInputElement; //type casting, ! === not null
userInputElement.value = 'Hi there!';
//or:
const userInputElement2 = document.getElementById('user-input')
if (userInputElement2) {
  (userInputElement2 as HTMLInputElement).value = 'Hi there!';
}

interface ErrorContainer {
  //id: string;
  [prop: string]: string; // INDEX TYPE
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email!',
  username: 'Must start with a capital character!'
}

