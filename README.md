1️. Difference between var, let, and const

var, let, and const are used to declare variables in JavaScript. var is the older way of declaring variables. It has function scope and can be redeclared and updated. Because of this behavior, it can sometimes cause unexpected bugs in larger programs.
let was introduced in ES6. It is block-scoped, which means it only exists inside the block where it is created. It can be updated but cannot be redeclared in the same scope.
const was also introduced in ES6. It is block-scoped like let, but its value cannot be reassigned after it is declared. It is usually used for values that should not change.
In modern JavaScript development, developers mostly use let and const instead of var.

var name = "Alex" → the variable can be declared again and changed.

let age = 20 → the value can change to 21, but the variable cannot be declared again in the same block.

const PI = 3.14 → the value stays the same and cannot be changed later.

2️. What is the Spread Operator (...)?

The spread operator is used to expand or copy elements from arrays or properties from objects. It allows developers to easily combine arrays, copy arrays or objects, and pass multiple values without modifying the original data. It helps write cleaner and more readable code, especially when working with modern JavaScript frameworks.

3️. Difference between map(), filter(), and forEach()

These are common array methods used to work with lists of data. map() is used when we want to transform each item in an array and create a new array with the modified values. filter() is used when we want to select specific items from an array based on a condition. It returns a new array containing only the items that match the condition.
forEach() is used to run a function for every item in an array. Unlike map() and filter(), it does not return a new array. It is mainly used when we just want to perform an action for each item.

4️. What is an Arrow Function?

An arrow function is a shorter and cleaner way to write functions in JavaScript. It was introduced in ES6 and is commonly used in modern JavaScript. Arrow functions make code more concise and are widely used in callbacks and when working with array methods or frameworks like React.

5️. What are Template Literals?

Template literals are a way to create strings in JavaScript using backticks instead of quotes.They make it easier to include variables or expressions inside strings and also allow writing multi-line strings more easily. This makes string formatting simpler and more readable.
