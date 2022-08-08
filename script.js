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
  else if (operator === '/') return divide(a, b);
}

const btn = document.querySelectorAll('.buttons button');
const display = document.querySelector('.display');
let total = 0;
const signs = ['+', '-', '*', '/']
let a = 0;
let b = 0;
let number = '';
let sign;
let signExists = false;


function addToDisplay(clickedSign) {
  const lastChar = display.textContent.slice(-1);
  if (lastChar !== clickedSign && signs.includes(lastChar)) {
    display.textContent = display.textContent.slice(0, -1);
    display.textContent += clickedSign;
    return false;
  }
  else {
    display.textContent += clickedSign;
    return true;
  }
}

function signFlow(clickedSign) {
  if (!signExists) {
    if (number === '') number = '0';
    a = parseInt(number);
    signExists = true;
  } else {
    b = parseInt(number);
    total = operate(a, sign, b);
    console.log(a, b, total, sign)
    display.textContent = `${total}${clickedSign}`;
    a = total;
    total = 0;
    b = 0;
  }
  number = '';
}

function signManage(buttonElement) {
  const clickedSign = buttonElement.innerText;
  if (clickedSign === '=') {
    b = parseInt(number);
    if (number === '') number = '0';
    total = operate(a, sign, b);
    display.textContent = `${total}`;
    a = total;
    total = 0;
    b = 0;
    totalCheck = true;
  }
  else {
    if (addToDisplay(clickedSign)) signFlow(clickedSign);
    sign = clickedSign;
  }

}

function numberManage(buttonElement) {
  const clickedNumber = buttonElement.innerText;
  if (display.textContent === '0') display.textContent = '';
  if (number !== '0' && clickedNumber !== '0') number += clickedNumber;
  display.textContent += buttonElement.innerText;
}


function buttonChoice(e) {
  buttonElement = e.target;
  if (buttonElement.className === 'sign') signManage(buttonElement);
  if (buttonElement.className === 'number') numberManage(buttonElement);
}

btn.forEach(button => {
  button.addEventListener('click', buttonChoice);
});