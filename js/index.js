// El ciclo while se ejecuta mientras la opcion no sea igual a 'x'.

// En la estructura switch, se realizan diferentes acciones según el valor de opcion:

// Cuando opcion es '1', se permite al usuario retirar dinero.
// Cuando opcion es '2', se muestra el saldo actual.
// Cuando opcion es '3', se permite al usuario depositar dinero.
// Cuando ninguna de las opciones anteriores se cumple, se muestra un mensaje de opción inválida.

let saldo = 2000;
let opcion = prompt('Elegi una opción: 1 - Retirar plata \n 2- Tu saldo \n 3-Déposito de dinero \n Para finalizar preciona x');

while (opcion != 'x') {
    switch (opcion) {
        case '1':
            let retiro = parseFloat(prompt('Ingrese la cantidad a retirar'));
            if (saldo >= retiro) {
                saldo = saldo - retiro;
                alert('has retirado  $' + retiro + ' de tu cuenta ' + 'tu nuevo saldo es $' + saldo);
            } else {
                alert('Sus fondos son insuficientes');
            }
            break;
        case '2':
            alert('tu saldo es $' + saldo);
            break;
        case '3':
            let deposito = parseFloat(prompt('Ingrese cuanto dinero quiere depositar'));
            saldo = saldo + deposito;
            alert('Usted a depositado $' + deposito + ' Y ahora su saldo es $' + saldo);
            break;


        default:
            alert('elegiste una opcion invalida');
            break;

    }
    opcion = prompt('Elegi una opción: 1 - Retirar plata \n 2- Tu saldo \n 3-Déposito de dinero \n Para finalizar preciona x');
}