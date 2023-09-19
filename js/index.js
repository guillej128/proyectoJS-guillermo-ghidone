// El ciclo while se ejecuta mientras la opcion no sea igual a 'x'.

// En la estructura switch, se realizan diferentes acciones según el valor de opcion:

// Cuando opcion es '1', se permite al usuario retirar dinero.
// Cuando opcion es '2', se muestra el saldo actual.
// Cuando opcion es '3', se permite al usuario depositar dinero.
// Cuando ninguna de las opciones anteriores se cumple, se muestra un mensaje de opción inválida.

let saldo = 6000;
let transacciones = [];

let opcion = prompt('Elija una opción: 1 - Retirar plata \n 2 - Tu saldo \n 3 - Depósito de dinero \n Para finalizar presiona "x"');

while (opcion !== 'x') {
    switch (opcion) {
        case '1':
            let retiro = parseFloat(prompt('Ingrese la cantidad a retirar'));
            if (saldo >= retiro) {
                saldo = saldo - retiro;
                transacciones.push({ tipo: 'retiro', monto: retiro });
                alert('Has retirado $' + retiro + ' de tu cuenta. Tu nuevo saldo es $' + saldo);
            } else {
                alert('Sus fondos son insuficientes');
            }
            break;
        case '2':
            alert('Tu saldo es $' + saldo);
            break;
        case '3':
            let deposito = parseFloat(prompt('Ingrese cuanto dinero quiere depositar'));
            saldo = saldo + deposito;
            transacciones.push({ tipo: 'depósito', monto: deposito });
            alert('Usted a depositado $' + deposito + ' Y ahora su saldo es $' + saldo);
            break;
        default:
            alert('Elegiste una opción inválida');
            break;
    }
    opcion = prompt('Elija una opción: 1 - Retirar plata \n 2 - Tu saldo \n 3 - Depósito de dinero \n Para finalizar presiona "x"');
}

// Este arrays permite el historial de transacciones para luego imprimir
console.log('Historial de transacciones:');
for (let i = 0; i < transacciones.length; i++) {
    const transaccion = transacciones[i];
    console.log(`Tipo: ${transaccion.tipo}, Monto: $${transaccion.monto}`);
}

alert('Gracias por usar nuestros servicios. Tu saldo final es $' + saldo);

// Búsqueda de transacciones de retiro
const retiros = transacciones.filter(transaccion => transaccion.tipo === 'retiro');

// Búsqueda de transacciones de depósito
const depositos = transacciones.filter(transaccion => transaccion.tipo === 'depósito');

console.log('Transacciones de retiro:', retiros);
console.log('Transacciones de depósito:', depositos);

// Búsqueda de transacciones con montos mayores a 1000
const montosMayoresA1000 = transacciones.filter(transaccion => transaccion.monto > 1000);

console.log('Transacciones con montos mayores a $1000:', montosMayoresA1000);

// Cálculo del saldo final después de todas las transacciones
const saldoFinal = transacciones.reduce((saldo, transaccion) => {
    if (transaccion.tipo === 'retiro') {
        return saldo - transaccion.monto;
    } else if (transaccion.tipo === 'depósito') {
        return saldo + transaccion.monto;
    }
    return saldo;
}, saldo);

console.log('Saldo final después de todas las transacciones:', saldoFinal);

