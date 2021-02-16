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

//variables to store user inputs, operator, and display value
let current = '';
let previous = '';
let currentOperator = '';
let displayValue = '';

//rounding and overflow protection
const LIMIT_5_DECIMALS = 100000;
const MAX_DIGITS = 16;

//only allow one decimal point per number input
let decimalFlag = false;

//give all number buttons an onEvent to add value to current
for (let i = 0; i < numberBtns.length; i++){
    numberBtns[i].addEventListener('click', function(){
        if (current.length < MAX_DIGITS) {
            current += numberBtns[i].textContent;
            display.textContent = current;
        }
    });
}

//Math Operation event handlers
//************************************************************** */
plusBtn.addEventListener('click', function(){
   plusEvent();
});

minusBtn.addEventListener('click', function(){
    subtractEvent();
});

timesBtn.addEventListener('click', function(){
    multiplyEvent();
});

divideBtn.addEventListener('click', function(){
    divideEvent();
});


function plusEvent(){
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
}

function subtractEvent(){
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
}

function multiplyEvent(){
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
}

function divideEvent(){
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
}
//End Math Event Operators
//************************************************************** */

//Keyboard support
//************************************************************** */
document.addEventListener('keyup', (e) => {
    if (e.key === '+'){ plusEvent(); }
    else if (e.code === 'Minus'){ subtractEvent(); }
    else if (e.code === 'Slash'){ divideEvent(); }
    else if (e.code === "KeyX" || e.key === '*'){ multiplyEvent(); }
    else if (e.code === 'Digit0')
    {
        if (current.length < MAX_DIGITS) {
            current += '0';
            display.textContent = current;
        }
    }
    else if (e.code === 'Digit1')
    {
        if (current.length < MAX_DIGITS) {
            current += '1';
            display.textContent = current;
        }
    }
    else if (e.code === 'Digit2')
    {
        if (current.length < MAX_DIGITS) {
            current += '2';
            display.textContent = current;
        }
    }
    else if (e.code === 'Digit3')
    {
        if (current.length < MAX_DIGITS) {
            current += '3';
            display.textContent = current;
        }
    }
    else if (e.code === 'Digit4')
    {
        if (current.length < MAX_DIGITS) {
            current += '4';
            display.textContent = current;
        }
    }
    else if (e.code === 'Digit5')
    {
        if (current.length < MAX_DIGITS) {
            current += '5';
            display.textContent = current;
        }
    }
    else if (e.code === 'Digit6')
    {
        if (current.length < MAX_DIGITS) {
            current += '6';
            display.textContent = current;
        }
    }
    else if (e.code === 'Digit7')
    {
        if (current.length < MAX_DIGITS) {
            current += '7';
            display.textContent = current;
        }
    }
    else if (e.code === 'Digit8')
    {
        if (current.length < MAX_DIGITS) {
            current += '8';
            display.textContent = current;
        }
    }
    else if (e.code === 'Digit9')
    {
        if (current.length < MAX_DIGITS) {
            current += '9';
            display.textContent = current;
        }
    }
    else if (e.code === 'Escape'){ clearEvent(); }
    else if (e.code === 'Period'){ decimalEvent(); }
    else if (e.code === 'Backspace'){ deleteKeyEvent(); }
    else if (e.code === 'Enter' || e.code === 'Equal'){ equalsKeyEvent(); }
});
//End keyboard support
//************************************************************** */

//Utility Operators
//************************************************************** */
clearBtn.addEventListener('click', function(){
    clearEvent();
});

equalsBtn.addEventListener('click', function(){
    equalsKeyEvent();
})

deleteBtn.addEventListener('click', function(){
    deleteKeyEvent();
});

decimalBtn.addEventListener('click', function(){
   decimalEvent();
});

function clearEvent(){
    current = '';
    previous = '';
    displayValue = '';
    currentOperator = '';
    display.textContent = displayValue;
}

function equalsKeyEvent(){
    if (currentOperator && previous && current)
    {
        displayValue = operate(currentOperator, Number(previous), Number(current));
        display.textContent = displayValue;
    }
}

function deleteKeyEvent()
{
    current = current.slice(0, current.length-1);
    display.textContent = current;
}

function decimalEvent() {
    if (decimalFlag === false){
        decimalFlag = true;
        current += '.';
        display.textContent = current;
    }
}
//End of utility Operators
//************************************************************** */

//Return result of mathemathical operation
//operator {string} - can handle '+', '-', '*', or '/'. Input from user button click
//a, b {number} - input from user button clicks
function operate(operator, a, b) {
    //reset decimal flag to accept new input
    decimalFlag = false;
    if (a.toString().length > MAX_DIGITS || b.toString().length > MAX_DIGITS)
    {
        return "Error: Overflow"; 
    }

    //round answers to limit overflow of decimals
    if (operator === '+'){
        const result = add(a,b);
        if (result.toString().length > MAX_DIGITS)
        {
            return "Error: Overflow";
        }
        
        return Math.round((add(a,b) + Number.EPSILON) * LIMIT_5_DECIMALS) / LIMIT_5_DECIMALS;
        
    }
    else  if (operator === '-'){
        const result = subtract(a,b);
        if (result.toString().length > MAX_DIGITS)
        {
            return "Error: Overflow";
        }
        return Math.round((subtract(a,b) + Number.EPSILON) * LIMIT_5_DECIMALS) / LIMIT_5_DECIMALS;
    }
    else  if (operator === '*'){
        const result = multiply(a,b);
        if (result.toString().length > MAX_DIGITS)
        {
            return "Error: Overflow";
        }
        return Math.round((multiply(a,b) + Number.EPSILON) * LIMIT_5_DECIMALS) / LIMIT_5_DECIMALS;
    }
    else  if (operator === '/'){
        const result = Math.round((divide(a,b) + Number.EPSILON) * LIMIT_5_DECIMALS) / LIMIT_5_DECIMALS;;
        if (result.toString().length > MAX_DIGITS)
        {
            return "Error: Overflow";
        }
        return result;
    }
    else {
        return "Error. Invalid operator.";
    }
    
}

//Math operation helper functions
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