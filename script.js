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
const signs = ['+', '-', '*', '/']
let total = 0;
let a = 0;
let b = 0;
let number = '';
let sign;
let signExists = false;
let totalCheck = false;


function addToDisplay(clickedSign) {
  const lastChar = display.textContent.slice(-1);
  console.log(a, b, sign, lastChar);
  if (lastChar === clickedSign) return false;
  if (signs.includes(lastChar)) {
    display.textContent = display.textContent.slice(0, -1);
    display.textContent += clickedSign;
    return false;
  }
  else {
    display.textContent += clickedSign;
    if (totalCheck) signExists = false;
    totalCheck = false;
    return true;
  }
}

function signFlow(clickedSign) {
  if (!signExists) {
    if (number === '') number = '0';
    a = Math.round((parseFloat(number) + Number.EPSILON) * 100) / 100;
    signExists = true;
  } else {
    ;
    b = Math.round((parseFloat(number) + Number.EPSILON) * 100) / 100;
    total = Math.round((operate(a, sign, b) + Number.EPSILON) * 100) / 100;
    if (isNaN(total) || !isFinite(total)) {
      display.textContent = `You can't divide by 0!`;
      a = 0;
    }
    else {
      display.textContent = `${total}${clickedSign}`;
      a = total;
    }
    b = 0;
    total = 0;
  }
  number = '';
}

function signManage(buttonElement) {
  const clickedSign = buttonElement.innerText;
  if (!totalCheck && clickedSign === '=' && typeof (sign) !== 'undefined' && !signs.includes(display.textContent.slice(-1))) {
    b = Math.round((parseFloat(number) + Number.EPSILON) * 100) / 100;
    if (number === '') number = '0';
    total = Math.round((operate(a, sign, b) + Number.EPSILON) * 100) / 100;
    if (isNaN(total) || !isFinite(total)) {
      display.textContent = `You can't divide by 0!`;
      a = 0;
    }
    else {
      display.textContent = `${total}`;
      console.log(total)
      number = `${total}`;
      a = total;
    }
    total = 0;
    b = 0;
    totalCheck = true;
  }
  if (signs.includes(clickedSign)) {
    if (addToDisplay(clickedSign)) signFlow(clickedSign);
    sign = clickedSign;
  }
}

function numberManage(buttonElement) {
  const clickedNumber = buttonElement.innerText;
  if (display.textContent === '0') display.textContent = '';
  if (number !== '0') number += clickedNumber;
  display.textContent += buttonElement.innerText;
}

function clearProgram() {
  total = 0;
  a = 0;
  b = 0;
  number = '';
  let sign;
  signExists = false;
  totalCheck = false;
  display.textContent = '0';
}

function buttonChoice(e) {
  buttonElement = e.target;
  if (buttonElement.id === 'CL' || display.textContent === `You can't divide by 0!`) clearProgram();
  if (buttonElement.className === 'sign') signManage(buttonElement);
  if (buttonElement.className === 'number') numberManage(buttonElement);

}

btn.forEach(button => {
  button.addEventListener('click', buttonChoice);
});