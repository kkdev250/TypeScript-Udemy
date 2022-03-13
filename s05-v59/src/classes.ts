abstract class Department { // ABSTRACT class - it cannot be instantiated
  static fiscalYear = 2020;
  //name: string = 'DEFAULT';
  // private readonly  id: string;
  // private name: string;
  //private employees: string[] = []; // PRIVATE fields DO NOT INHERIT!
  protected employees: string[] = []; // PROTECTED fileds DO INHERIT, and still are unaccessible from outside

  constructor(protected readonly id: string, public name: string) { //SHORTHAND: NIE POTRZEBA deklaracji pól (l.4,5) a potem ich inicjalizacji (l.10,11)...
    // this.id = id;                                    //...wystarczy taki 'pusty' konstruktor...
    // this.name = name;                                //...UWAGA: koniecznie trzeba dodać 'private', 'protected' lub 'public' przed parametrami aby zostały automatycznie zdefinowane i zainicjowane pola
    // console.log(Department.fiscalYear);   
  }

  static createEmployee(name: string) {
    return {name: name};
  }

  // describe(this: Department) { //'this' here is NOT an argument - it's a TS hint that 'this' inside this method should always refer to an object of Department class
  //   console.log(`Department: (${this.id}): ${this.name}`);
  // }
  abstract describe(this: Department):void // ABSTRACT method - to be implemented in child class, it forces the whole class to be abstract too

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[]
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }
  // constructor(id: string, public admins: string[]) { // wystarczyłby taki shortcut

  describe() {
    console.log('IT Department - ID: ' + this.id);
  }
}


class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment; // for SINGLETON

  get mostRecentReport() { // getter
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }
  set mostRecentReport(value: string) { //setter
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) { // shortcut and PRIVATE CONSTRUCTOR (you can't instantiate the class by 'new AccountingDepartment')...
    super(id, 'Accounting');                                   // ...it's used to make a SINGLETON class 
    this.lastReport = this.reports[0];
  }

  static getInstance() { // for SINGLETON
    if (this.instance) { // 'THIS' inside a STATIC method refers to the class itself, not to the object created based on that class (this.instance === AccountingDepartment.instance)
      return this.instance
    }
    this.instance = new AccountingDepartment('d2', []);
    return this.instance;
  }

  describe() {
    console.log('Accounting Department - ID: ' + this.id);
  }

  addEmployee(name: string): void { // overriding method
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment('d1', ['Max']);

it.addEmployee('Max');
it.addEmployee('Manu');

// it.employees[2] = 'Anna';

it.describe();
it.name = 'NEW NAME';
it.printEmployeeInformation();

console.log(it);

//const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance(); // SIGLETON
const accounting2 = AccountingDepartment.getInstance(); // SINGLETON - this will be THE SAME instance!

console.log(accounting, accounting2, accounting === accounting2);

accounting.mostRecentReport = 'Year End Report';
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport);

accounting.addEmployee('Max');
accounting.addEmployee('Manu');

// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe }
// accountingCopy.describe();