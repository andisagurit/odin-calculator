'use strict';

function typeWriter(el) {
    const textArray = el.innerHTML.split('');
    el.innerHTML = '';
    textArray.forEach((letter, i) =>
        setTimeout(() => (el.innerHTML += letter), 95 * i)
    );

    setInterval(() => typeWriter(el), 8000);
}

typeWriter(elementEl);

const display1 = document.querySelector('.display-last');
const display2 = document.querySelector('.display-current');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.all-clear');
const lastClear = document.querySelector('.last-entity-clear');

let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

//display numbers and check if numbers have dot
numbers.forEach (number => {
    number.addEventListener('click', (e)=> {
        if (e.target.innerText === '.' && !haveDot) {
            haveDot = true
        } else if (e.target.innerText === '.' && haveDot) {
            return;
        }
        dis2Num += e.target.innerText;
        display2.innerText = dis2Num;
    })
})

//operations
operations.forEach (operation => {
    operation.addEventListener('click', (e)=> {
        if (!dis2Num) result;
        haveDot = false;

        const operationName = e.target.innerText;
        if (dis1Num && dis2Num && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName);
        lastOperation = operationName;
    })
})

function clearVar(name = '') {
    dis1Num += dis2Num + ' ' + name + ' ';
    display1.innerText = dis1Num;
    display2.innerText = '';
    dis2Num = '';
    display2.innerText = result;
}

function mathOperation() {
    if (lastOperation === 'x') {
        result = parseFloat(result) * parseFloat(dis2Num);
    } else if (lastOperation === '+') {
        result = parseFloat(result) + parseFloat(dis2Num);
    } else if (lastOperation === '-') {
        result = parseFloat(result) - parseFloat(dis2Num);
    } else if (lastOperation === '%') {
        result = parseFloat(result) % parseFloat(dis2Num);
    } else if (lastOperation === '/') {
        result = parseFloat(result) / parseFloat(dis2Num);
    }
}

equal.addEventListener('click', (e)=> {
    if (!dis1Num || !dis2Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2.innerText = result;
    dis2Num = result;
    dis1Num = '';
})

clear.addEventListener('click', (e)=> {
    display1.innerText = '';
    display2.innerText = '0';
    dis1Num = '';
    dis2Num = '';
    result = ''
})

lastClear.addEventListener('click', (e)=> {
    display2.innerText = '';
    dis2Num = '';
})

//keyboard support
window.addEventListener('keydown', (e)=> {
    if (
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.'
    ){
        clickNumbers(e.key);
    } else if (
        e.key === '/' ||
        e.key === '-' ||
        e.key === '+' ||
        e.key === '%'
    ){
        clickOperations(e.key);
    } else if (
        e.key === '*'
    ){
        clickOperations('x');
    } else if (
        e.key == 'Enter' || e.key === "="
    ){
        clickEqual();
    }
})

function clickNumbers(key){
    numbers.forEach(button => {
        if (button.innerText === key){
            button.click();
        }
    })
}

function clickOperations(key){
   operations.forEach(button => {
        if (button.innerText === key){
            button.click();
        }
    })
}

function clickEqual(){
    equal.click();
}