const names1 = ['Max', 'Manuel']; // type: string[]
const names2: Array<string> = []; // type: string[] too!  Array - GENERIC TYPE

// const promise: Promise<number> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10);
//   }, 2000);
// });

// promise.then(data => {
//   //data.split(' ');
// });

function merge<T extends object, U extends object>(objA: T, objB: U) { //GENERIC FUNCTION, extends: CONSTRAINT: T cannot be any type, it has to be an object
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj.age);

interface Lenghty  {
  length: number;
}
function countAndDescribe<T extends Lenghty>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if (element.length === 1) {
    descriptionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}

console.log(countAndDescribe('Hi there!'));
console.log(countAndDescribe(['Sports', 'Cooking']));
console.log(countAndDescribe([]));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) { //that guarantee, that 'key' must exist in 'obj'
  return 'Value: ' + obj[key];
}

//extractAndConvert({}, 'name'); //error
extractAndConvert({name: 'Max'}, 'name'); //ok - thanks to 'keyof' constraint

class DataStorage<T extends string | number | boolean> { //GENERIC CLASS
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const maxObj = {name: 'Max'};
// objStorage.addItem(maxObj);
// objStorage.addItem({name: 'Manu'});
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  //return {title, description, completeUntil: date}
  let courseGoal: Partial<CourseGoal> = {}; // 'Partial' makes all properties optional {title?: string; descr..}
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;  //conversion from Partial<CourseGoal> into a CourseGoal
}

const names: Readonly<string[]> = ['Max', 'Anna']; //readonly string array
// names.push('Manu');
// names.pop();
