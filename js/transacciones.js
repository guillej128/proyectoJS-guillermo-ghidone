document.addEventListener("DOMContentLoaded", function () {
  const depositoForm = document.getElementById("depositoForm");
  const depositoAmount = document.getElementById("depositoAmount");
  const saldoInfo = document.getElementById("saldoInfo");
  const message = document.getElementById("messaged");

  const saldoKey = "saldo";
  const transaccionesKey = "transacciones";

  let saldo = parseFloat(localStorage.getItem(saldoKey)) || 6000;
  let transacciones = JSON.parse(localStorage.getItem(transaccionesKey)) || [];

  saldoInfo.textContent = `Saldo actual: $${saldo.toFixed(2)}`;

  depositoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const deposito = parseFloat(depositoAmount.value);

    if (isNaN(deposito) || deposito <= 0) {
      message.textContent = "Ingrese un monto válido.";
      return;
    }

    saldo += deposito;
    transacciones.push({ tipo: "depósito", monto: deposito });
    localStorage.setItem(saldoKey, saldo);
    localStorage.setItem(transaccionesKey, JSON.stringify(transacciones));
    saldoInfo.textContent = `Saldo actual: $${saldo.toFixed(2)}`;
    message.textContent = `Has depositado $${deposito.toFixed(2)}.`;

    depositoAmount.value = "";
  });
});
document.getElementById('depositoForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const depositoAmount = document.getElementById('depositoAmount').value;

  // Muestra una notificación Toastify y demusestro uso de librerias
  Toastify({
    text: `Has depositado ${depositoAmount} Pesos.`,
    duration: 13000,
    close: true,
    gravity: 'top',
    position: 'right',
  }).showToast();
});
document.addEventListener("DOMContentLoaded", function () {
  const saldoInfo = document.getElementById("saldoInfo");

  const saldoKey = "saldo";

  let saldo = parseFloat(localStorage.getItem(saldoKey)) || 6000;

  saldoInfo.textContent = `Saldo actual: $${saldo.toFixed(2)}`;
});
document.addEventListener("DOMContentLoaded", function () {
  const retiroForm = document.getElementById("retiroForm");
  const retiroAmount = document.getElementById("retiroAmount");
  const saldoInfo = document.getElementById("saldoInfo");
  const message = document.getElementById("message");

  const saldoKey = "saldo";
  const transaccionesKey = "transacciones";

  let saldo = parseFloat(localStorage.getItem(saldoKey)) || 6000;
  let transacciones = JSON.parse(localStorage.getItem(transaccionesKey)) || [];

  saldoInfo.textContent = `Saldo actual: $${saldo.toFixed(2)}`;

  retiroForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const retiro = parseFloat(retiroAmount.value);

    if (isNaN(retiro) || retiro <= 0) {
      message.textContent = "Ingrese un monto válido.";
      return;
    }

    if (saldo >= retiro) {
      saldo -= retiro;
      transacciones.push({ tipo: "retiro", monto: retiro });
      localStorage.setItem(saldoKey, saldo);
      localStorage.setItem(transaccionesKey, JSON.stringify(transacciones));
      saldoInfo.textContent = `Saldo actual: $${saldo.toFixed(2)}`;
      message.textContent = `Has retirado $${retiro.toFixed(2)}.`;
    } else {
      message.textContent = "Fondos insuficientes.";
    }

    retiroAmount.value = "";
  });
});

document.getElementById('retiroForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const retiroAmount = document.getElementById('retiroAmount').value;

  // Muestra una notificación Toastify y muestro el uso de las librerias
  Toastify({
    text: `Has retirado ${retiroAmount} Pesos.`,
    duration: 13000,
    close: true,
    gravity: 'top',
    position: 'right',
  }).showToast();
});

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
