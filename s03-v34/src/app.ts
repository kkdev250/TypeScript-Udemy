// let age: number;
// age = 30;
// const userName = 'Maximilian';
// console.log(userName);
let appId = 'abc';

const button = document.querySelector('button')!;

function add(n1: number, n2: number) {
  if (n1 + n2 > 0) {
    return n1 + n2;
  }
  return;
}

function clickHandler(message: string) {
  // let userName = 'Max';
  console.log('Clicked! ' + message);
}

button.addEventListener('click', clickHandler.bind(null, 'You\'re welcome!'));
