import 'reflect-metadata';
import { plainToClass } from 'class-transformer';

import _ from 'lodash';
import { Product } from './product.model';

import { validate } from 'class-validator';

console.log(_.shuffle([1, 2, 3]));

declare var GLOBAL: any;
console.log(GLOBAL);

const p1 = new Product('A Book', 12.99);
console.log(p1.getInformation());


const products = [
  { title: 'A Carpet', price: 29.99 },
  { title: 'A Book', price: 10.99 },
];

const loadedProducts = products.map(prod => {
  return new Product(prod.title, prod.price)
});

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}


const loadedProducts2 = plainToClass(Product, products);

for (const prod of loadedProducts2) {
  console.log(prod.getInformation());
}


const newProd = new Product('', -5.99);
validate(newProd).then(errors => {
  if (errors.length > 0) {
    console.log('VALIDATION ERRORS!');
    console.log(errors);
  } else {
    console.log(newProd.getInformation());
  }
});
