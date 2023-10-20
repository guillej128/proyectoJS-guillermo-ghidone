const apiKey = "38b876ff74fa475da3f955216f1224cf";
const baseCurrency = 'USD'; 
const targetCurrencies = ['EUR', 'GBP', 'AUD',"UYU","ARS"]; 
const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

// Función para obtener la cotización de una moneda específica
function fetchExchangeRate(targetCurrency) {
  const currencyUrl = `${url}&symbols=${targetCurrency}`;
  fetch(currencyUrl)
    .then(response => response.json())
    .then(data => {
      const exchangeRate = data.rates[targetCurrency];
      document.getElementById(`exchangeRate-${targetCurrency}`).textContent = exchangeRate;
    })
    .catch(error => {
      console.error(`Error al obtener la cotización de ${targetCurrency}:`, error);
    });
}

// Realiza solicitudes para cada moneda de destino
targetCurrencies.forEach(currency => {
  fetchExchangeRate(currency);
});
