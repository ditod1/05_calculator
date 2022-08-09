const btn = document.querySelectorAll('.buttons button');
const display = document.querySelector('.display');

const signs = ['*', '-', '+', '/']
let firstNumber = '';
let secondNumber = '';
let currentSign = null;
let firstNuLength = 0;
let divZeroCheck = false;
let firstNuCheck = false;


function insertNumber(pressedButton) {
  if (display.textContent === '0') display.textContent = '';

  previousValue = display.textContent.charAt(display.textContent.length - 2);
  currentValue = display.textContent.charAt(display.textContent.length - 1);

  if (currentValue === '0' && signs.includes(previousValue)) {
    display.textContent = display.textContent.slice(0, -1);
  }
  display.textContent += pressedButton;
}

function evaluateResult() {
  if (currentSign === null) return
  if (currentSign === '/' && display.textContent.charAt(firstNuLength) === '0') {
    alert("You can't divide by 0!");
    divZeroCheck = true;
    return
  }
  secondNumber = display.textContent.substring(firstNuLength);
  display.textContent = roundResult(
    operate(firstNumber, currentSign, secondNumber)
  )
  currentSign = null
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function signManage(pressedButton) {
  const lastChar = signs.includes(display.textContent.slice(-1));
  if (currentSign !== null && !lastChar) evaluateResult();
  if (divZeroCheck) {
    display.textContent = firstNumber;
    divZeroCheck = false;
  } else {
    if (lastChar) {
      display.textContent = display.textContent.slice(0, -1);
    }
    firstNumber = display.textContent;
    currentSign = pressedButton;
    display.textContent = `${firstNumber}${pressedButton}`;
    firstNuLength = display.textContent.length;
  }
}


function buttonChoice(e) {
  const buttonElement = e.target;
  const pressedButton = buttonElement.textContent;
  if (buttonElement.id === 'CL') clearProgram();
  if (buttonElement.className === 'operator') signManage(pressedButton);
  if (buttonElement.className === 'number') insertNumber(pressedButton);
  if (buttonElement.id === 'dot') dotManage();
  if (buttonElement.id === 'equal') evaluateResult();
}

btn.forEach(button => {
  button.addEventListener('click', buttonChoice);
});

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
  if (b === 0) return null;
  return a / b;
}

function operate(a, operator, b) {
  a = Number(a);
  b = Number(b);
  if (operator === '+') return sum(a, b);
  else if (operator === '-') return substract(a, b);
  else if (operator === '*') return multiply(a, b);
  else if (operator === '/') return divide(a, b);
}