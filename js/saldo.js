document.addEventListener("DOMContentLoaded", function () {
  const saldoInfo = document.getElementById("saldoInfo");

  const saldoKey = "saldo";

  let saldo = parseFloat(localStorage.getItem(saldoKey)) || 6000;

  saldoInfo.textContent = `Saldo actual: $${saldo.toFixed(2)}`;
});
