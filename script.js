//Operations
function sum(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, operator, b) {
  if (operator === '+') return sum(a, b);
  else if (operator === '-') return substract(a, b);
  else if (operator === '*') return multiply(a, b);
  else return divide(a, b);
}
