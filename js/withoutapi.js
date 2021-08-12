const form = document.querySelector('form');
const result = document.querySelector('.result');
const main = document.querySelector('main');
const loader = document.querySelector('.loading');

const valuewas = document.querySelector('#valuewas');
const valueis = document.querySelector('#valueis');
const qty = document.querySelector('#qty');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    loader.style.display = "inline-block";
    result.style.display = "none";

    setTimeout(() => {
        calculate(Number(valuewas.value), Number(qty.value), Number(valueis.value))
    }, 3 * 1000)
})

function calculate(valueWas, qty, valueIs) {

    const totalInitialValue = valueWas * qty;
    const totalCurrentValue = valueIs * qty;

    if (valueIs < valueWas) {

        const loss = (totalInitialValue - totalCurrentValue).toFixed(2);

        const lossperc = ((loss * 100) / totalInitialValue).toFixed(2);

        result.innerHTML = `<img class="result-img" src="images/icons8-decrease-48.png">you lost ${lossperc}% your total loss is Rs ${loss}`;

        result.style.color = "red";
        result.style.display = "block";
        main.style.border = "1px solid red"

        loader.style.display = "none";

    }
    else {
        const profit = (totalCurrentValue - totalInitialValue).toFixed(2);

        const profitperc = ((profit * 100) / totalInitialValue).toFixed(2);

        result.innerHTML = `<img class="result-img" src="images/icons8-increase-48.png">you gained ${profitperc}% your total profit is Rs ${profit}`;

        result.style.color = "green";
        result.style.display = "block";
        main.style.border = "1px solid green"
        loader.style.display = "none";

    }
}
