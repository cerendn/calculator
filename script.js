const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateValue();

function updateValue() {
    display.value = displayValue;
}

keys.addEventListener('click', function (e) {
    const element = e.target;

    if (!element.matches('button')) return;

    if (element.classList.contains('operator')) {
        //console.log('operator', element.value);
        handleOperator(element.value);
        updateValue();
        return;
    }

    if (element.classList.contains('decimal')) {

        inputDecimal(element.value);
        updateValue();
        return;
    }

    if (element.classList.contains('clear')) {
        //console.log('clear', element.value);
        clear();
        updateValue();
        return;
    }

    //console.log('number', element.value);
    inputNumber(element.value);
    updateValue();
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if(operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);

        displayValue = String(result);
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;

    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function calculate(first, second, operator) {
    if (operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second;
    } else if (operator === '/') {
        return first / second;
    }
    return second;
}

function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
    console.log(displayValue, firstValue, operator, waitingForSecondValue);

}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

function clear() {
    displayValue = '0';
}
