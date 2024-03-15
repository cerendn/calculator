const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';

updateValue();

function updateValue() {
    display.value = displayValue;
}

keys.addEventListener('click', function (e) {
    const element = e.target;

    if (element.matches('button')) return;

    console.log(element);
});