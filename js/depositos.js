document.addEventListener("DOMContentLoaded", function () {
  const depositoForm = document.getElementById("depositoForm");
  const depositoAmount = document.getElementById("depositoAmount");
  const saldoInfo = document.getElementById("saldoInfo");
  const message = document.getElementById("message");

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
