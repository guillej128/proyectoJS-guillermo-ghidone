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
  