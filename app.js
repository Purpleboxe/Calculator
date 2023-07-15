let firstNumber = '';
let operator = null;
let secondNumber = '';

let reset = false;

const display = document.getElementById('display');

// Get all the buttons
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const equalBtn = document.getElementById('equal');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const decimalBtn = document.getElementById('decimal');

numberBtns.forEach((button) => {
    button.addEventListener('click', () => {
        setNumber(button.value);
    })
})

operatorBtns.forEach((button) => {
    button.addEventListener('click', () => {
        setOperation(button.value);
        operatorBtns.forEach((button) => {
            button.classList.remove('selected');
        })
        button.classList.add('selected');
    })
})

equalBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', deleteNumber);
decimalBtn.addEventListener('click', decimal);

// Keyboard functionality
window.addEventListener('keydown', keyboardInput);

function setNumber(number) {
    // If there is a 0 on the screen or reset is true then remove the number currently on the screen
    if (display.textContent === '0' || reset) {
        resetScreen();
    }
    // Make sure the display doesn't have more than 12 characters
    if (display.textContent.length < 12) {
        display.textContent += number;
    }
}

function setOperation(setOperator) {
    if (operator !== null) {
        evaluate();
    }
    // Set the first number and operator
    firstNumber = display.textContent;
    operator = setOperator;
    reset = true;
}

function evaluate() {  
    if (operator === null || reset) {
        return;
    }
    if (operator === '÷' && display.textContent === '0') {
      alert("You can't divide by 0!");
      return;
    }
    // Set the second number and then display the answer
    secondNumber = display.textContent;
    display.textContent = roundResult(operate(firstNumber, secondNumber, operator));
    operator = null;
    display.textContent = display.textContent.slice(0, 12);
    operatorBtns.forEach((button) => {
        button.classList.remove('selected');
    })
}

function roundResult(n) {
    return Math.round(n * 1000) / 1000;
}

function clear() {
    // Set everything to default
    display.textContent = '0';
    firstNumber = '';
    operator = null;
    secondNumber = '';
    operatorBtns.forEach((button) => {
        button.classList.remove('selected');
    })
}

function deleteNumber() {
    // When deleting numbers make sure that if there are no numbers 0 is always present
    if (display.textContent !== '0') {
        display.textContent = display.textContent.slice(0, -1);
        if (display.textContent === '') {
            display.textContent += '0';
        }
    }
}

function decimal() {
    if (display.textContent.includes('.')) {
        return;
    }
    display.textContent += '.';
}

function resetScreen() {
    display.textContent = '';
    reset = false;
}

function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) {
        setNumber(e.key);
    }
    if (e.key === '.') {
        decimal();
    }
    if (e.key === '=' || e.key === 'Enter') {
        evaluate();
    }
    if (e.key === 'Escape') {
        clear();
    }
    if (e.key === 'Backspace') {
        deleteNumber();
    }
    if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') {
        setOperation(convertOperator(e.key));
    } 
}

function convertOperator(n) {
    if (n === '/') {
        return '÷';
    }
    if (n === '*') {
        return '×';
    }
    if (n === '-') {
        return '−';
    }
    if (n === '+') {
        return '+';
    }
}

function operate(x, y, operator) {
    x = Number(x);
    y = Number(y);
    switch(operator) {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '×':
            return x * y;
        case '÷':
            if (y === 0) {
                return null;
            } else {
                return x / y;
            }
        default:
            return 'null';
    }
}