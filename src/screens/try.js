/* eslint-disable prettier/prettier */
let a = 23465;
let last = 0;
let rem = 0;

for (let i = 0; i <= 2; i++) {
  last = a % 10;
  rem = rem * 10 + last;
  a = parseInt(a / 10, 10);
}

console.log(a + '' + rem);
