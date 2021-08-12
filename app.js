const selectedOption = document.querySelector('select');
const date = document.querySelector('.date');
const form = document.querySelector('form');
const result = document.querySelector('.result');
const main = document.querySelector('main');
const loader = document.querySelector('.loading');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    result.style.display = "none";

    loader.style.display = "inline-block";
    getStockData(selectedOption)

})

async function getStockData(selectedOption) {
    await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${selectedOption.value}&outputsize=full&apikey=10S3XNVLWZCRRB22`)
        .then(response => response.json())
        .then(data => {

            if (data["Time Series (Daily)"].hasOwnProperty(date.value)) {

                const priceWas = data["Time Series (Daily)"][`${date.value}`]["4. close"];

                // getting array of all dates in response 
                const allDates = Object.keys(data["Time Series (Daily)"]);

                // latest price in response json
                const priceIs = data["Time Series (Daily)"][allDates[0]]["4. close"];

                const qty = document.querySelector('.qty').value;

                calculate(Number(priceWas), Number(qty), Number(priceIs));

                loader.style.display = "none";

            } else {
                loader.style.display = "none";
                alert("no data found for this date");
            }
        })
}

function calculate(priceWas, qty, priceIs) {

    const totalInitialValue = priceWas * qty;
    const totalCurrentValue = priceIs * qty;

    if (priceIs < priceWas) {

        const loss = (totalInitialValue - totalCurrentValue).toFixed(2);

        const lossperc = ((loss * 100) / totalInitialValue).toFixed(2);

        result.innerHTML = `<img class="result-img" src="images/icons8-decrease-48.png" alt="">you lost ${lossperc}% your total loss is Rs ${loss}`;

        result.style.color = "red";
        result.style.display = "block";
        main.style.border = "1px solid red"

    }
    else {
        const profit = (totalCurrentValue - totalInitialValue).toFixed(2);

        const profitperc = ((profit * 100) / totalInitialValue).toFixed(2);

        result.innerHTML = `<img class="result-img" src="images/icons8-increase-48.png" alt="">you gained ${profitperc}% your total profit is Rs ${profit}`;

        result.style.color = "green";
        result.style.display = "block";
        main.style.border = "1px solid green"

    }
}
