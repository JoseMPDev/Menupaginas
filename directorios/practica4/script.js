// JavaScript para validación de cédula dominicana usando algoritmo de Luhn
function validarCedula() {
    // Obtener el valor ingresado y eliminar cualquier guión o espacio
    let cedula = document.getElementById('cedula').value.trim();
    cedula = cedula.replace(/-/g, '');
    
    // Verificar que no esté vacío
    if (cedula === '') {
        mostrarResultado(false, 'Por favor, ingrese un número de cédula.');
        return;
    }
    
    // Verificar que tenga 11 dígitos (formato estándar de cédula dominicana)
    if (cedula.length !== 11) {
        mostrarResultado(false, 'La cédula dominicana debe tener 11 dígitos.');
        return;
    }
    
    // Verificar que solo contiene números
    if (!/^\d+$/.test(cedula)) {
        mostrarResultado(false, 'La cédula debe contener solo números.');
        return;
    }
    
    // Aplicar algoritmo de Luhn para validar la cédula
    if (validarLuhn(cedula)) {
        mostrarResultado(true, 'CÉDULA ES CORRECTA');
    } else {
        mostrarResultado(false, 'CÉDULA ES INCORRECTA');
    }
}

function validarLuhn(numero) {
    // Invertir el número
    const digitos = numero.split('').reverse();
    
    let suma = 0;
    
    // Recorrer cada dígito
    for (let i = 0; i < digitos.length; i++) {
        let digito = parseInt(digitos[i]);
        
        // Para posiciones pares (recordar que empezamos desde 0)
        if (i % 2 === 1) {
            digito *= 2;
            if (digito > 9) {
                digito -= 9;
            }
        }
        
        suma += digito;
    }
    
    // El número es válido si la suma es múltiplo de 10
    return suma % 10 === 0;
}

function mostrarResultado(esValido, mensaje) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = mensaje;
    resultElement.style.display = 'block';
    
    if (esValido) {
        resultElement.className = 'result correct';
    } else {
        resultElement.className = 'result incorrect';
    }
}