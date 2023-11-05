document.addEventListener("DOMContentLoaded", function () {
  const saldoFinal = document.getElementById("saldoFinal");
  const transaccionesRetiros = document.getElementById("transaccionesRetiros");
  const transaccionesDepositos = document.getElementById("transaccionesDepositos");
  const transaccionesMayoresA1000 = document.getElementById("transaccionesMayoresA1000");

  const saldoKey = "saldo";
  const transaccionesKey = "transacciones";

  let saldo = parseFloat(localStorage.getItem(saldoKey)) || 6000;
  let transacciones = JSON.parse(localStorage.getItem(transaccionesKey)) || [];

  saldoFinal.textContent = `$${saldo.toFixed(2)}`;

  // Filtrar transacciones de retiros
  const retiros = transacciones.filter(transaccion => transaccion.tipo === "retiro");
  mostrarTransaccionesEnLista(retiros, transaccionesRetiros);

  // Filtrar transacciones de depósitos
  const depositos = transacciones.filter(transaccion => transaccion.tipo === "depósito");
  mostrarTransaccionesEnLista(depositos, transaccionesDepositos);

  // Filtrar transacciones con montos mayores a 1000
  const montosMayoresA1000 = transacciones.filter(transaccion => transaccion.monto > 1000);
  mostrarTransaccionesEnLista(montosMayoresA1000, transaccionesMayoresA1000);
});

function mostrarTransaccionesEnLista(transacciones, elemento) {
  const lista = document.createElement("ul");
  transacciones.forEach(transaccion => {
    const listItem = document.createElement("li");
    listItem.textContent = `${transaccion.tipo}: $${transaccion.monto.toFixed(2)}`;
    lista.appendChild(listItem);
  });
  elemento.appendChild(lista);
}
