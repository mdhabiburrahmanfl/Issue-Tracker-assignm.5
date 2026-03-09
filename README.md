1. What is the difference between var, let, and const?
   Answer:-
   var: var is old way to declare variables. You can redeclare and reassign the variable.It is function-scoped.
   example: var name= "rahim";
   var name ="sumon" okay

let: let was introduced in ES6 (2015).It is block-scoped.You can't redeclare, but you can reassign.
example: let age = 20;
age = 25; okay
let age = 35; not okay

const: Const is also block-scoped.You can't redeclare and reassign.

const name= "sumon";
name= "raja"; not okay.

2. What is the spread operator (...)?
   Answer: The spread operator (...) is used to expand or spread element of an array or object.It was introduced in ES6 (2015).
   It is commonly used for : 1. copying arrays 2. Merging arrays 3. Copying objects 4. Passing multiple values to functions.

3. What is the difference between map(), filter(), and forEach()?
   Answer:
   map() : Create a new array by transforming each element.
   example:
   const numbers = [1, 2, 3];
   const doubled = numbers.map(num => num \* 2);
   console.log(doubled);

filter() : Create a new array with elements that pass a condition.
example:
const numbers = [1, 2, 3, 4];
const even = numbers.filter(num => num % 2 === 0);
console.log(even);

forEach() : Just loop through the array (no new array returned).
example:
const numbers = [1, 2, 3];
numbers.forEach(num => {
console.log(num);
});

4. What is an arrow function?
   Answer: An arrow function is a short and modern way to write functions in JavaScript. It was introduced in ES6 (2015).
   example:
   const add = (a, b) => {
   return a + b;
   };
5. What are template literals?
   Answer: Template literals are a modern way to write strings in JavaScript. They were introduced in ES6 (2015).
   example:
   const name = "Rahim";
   const message = `Hello ${name}`;
   console.log(message);
