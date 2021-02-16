/*
*Author: Jason Dewese
*Initial Creation Date: 2/15/2021
*Simple four function calculator web app
*This project is part of The Odin Project curriculum
*https://www.theodinproject.com/lessons/calculator 
*/

//create variables for button selectors
const addBtn = document.querySelector('#plusBtn');
const minusBtn = document.querySelector('#minusBtn');
const timesBtn = document.querySelector('#timesBtn');
const divideBtn = document.querySelector('#divideBtn');
const clearBtn = document.querySelector('#clearBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const decimalBtn = document.querySelector('#decBtn');
const equalsBtn = document.querySelector('#equalsBtn');
const numberBtns = document.querySelectorAll('.numberBtn');
const display = document.querySelector('#display');

//variables to store user inputs
let current = '';
let previous = '';
let currentOperator = '';


//Value to show on screen
let displayValue = '';

//only allow one decimal at a time
let decimalFlag = false;

//give all number buttons an onEvent to add value to currentOperand
for (let i = 0; i < numberBtns.length; i++){
    numberBtns[i].addEventListener('click', function(){
        current += numberBtns[i].textContent;
        display.textContent = current;
    });
}

//Math Operation event handlers
//******************************************************** */
plusBtn.addEventListener('click', function(){
    if (currentOperator === ''){
        displayValue = operate('+', Number(previous), Number(current));
    }
    else {
        displayValue = operate(currentOperator, Number(previous), Number(current));
    }
    currentOperator = '+';
    previous = displayValue;
    current = '';
    display.textContent = displayValue;
});

minusBtn.addEventListener('click', function(){
    if (currentOperator === ''){
        displayValue = operate('-', Number(current), Number(previous));
    }
    else {
        displayValue = operate(currentOperator, Number(previous), Number(current));
    }
    currentOperator = '-';
    previous = displayValue;
    current = '';
    display.textContent = displayValue;
});

timesBtn.addEventListener('click', function(){
    if (currentOperator === ''){
        displayValue = operate('*', 1, Number(current));
    }
    else {
        displayValue = operate(currentOperator, Number(previous), Number(current));
    }
    currentOperator = '*';
    previous = displayValue;
    current = '';
    display.textContent = displayValue;
});

divideBtn.addEventListener('click', function(){
    if (currentOperator === ''){
        displayValue = operate('/', Number(current), Number(1));
    }
    else {
        displayValue = operate(currentOperator, Number(previous), Number(current));
    }
    currentOperator = '/';
    previous = displayValue;
    current = '';
    display.textContent = displayValue;
});
//End Math Operators
//*************************************************** */

//Utility Operators
//******************************************************* */
clearBtn.addEventListener('click', function(){
    current = '';
    previous = '';
    displayValue = '';
    currentOperator = '';
    display.textContent = displayValue;
});

equalsBtn.addEventListener('click', function(){
    if (currentOperator && previous && current)
    {
        displayValue = operate(currentOperator, Number(previous), Number(current));
        display.textContent = displayValue;
    }
})

deleteBtn.addEventListener('click', function(){
    current = current.slice(0, current.length-1);
    display.textContent = current;
});

decimalBtn.addEventListener('click', function(){
    if (decimalFlag === false){
        decimalFlag = true;
        current += '.';
        display.textContent = current;
    }
   
});
//End of utility Operators
//******************************************************* */

//Return result of mathemathical operation
//operator {string} - can handle '+', '-', '*', or '/'. Input from user button click
//a, b {number} - input from user button clicks
function operate(operator, a, b) {
    //reset decimal flag to accept new input
    decimalFlag = false;
    
    if (operator === '+'){
        return add(a,b);
    }
    else  if (operator === '-'){
        return subtract(a,b);
    }
    else  if (operator === '*'){
        return multiply(a,b);
    }
    else  if (operator === '/'){
        return divide(a,b);
    }
    else {
        return "Error. Invalid operator.";
    }
    
}

function add (a, b) {
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if (b === 0) {
        return "Error! Cannot divide by 0.";
    }
    return a / b;
}