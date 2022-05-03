      // Ejercicio 1: Compara entre 3 numero y determina cual es mayor y cual es menor
      const compararEjercicio1 = () => {
        const num1 = document.getElementById('ej1-numero1').value * 1;
        const num2 = document.getElementById('ej1-numero2').value * 1;
        const num3 = document.getElementById('ej1-numero3').value * 1;
        const resultadoMayor = document.getElementById("resultadoMayor");

        const resultadoMenor = document.getElementById("resultadoMenor")

        if (num1 > num2 && num1 > num3) {
            resultadoMayor.textContent = num1
            console.log(typeof num1)
        }
        if (num2 > num1 && num2 > num3) {
            resultadoMayor.textContent = num2
            console.log(typeof num2)
        }
        if (num3 > num1 && num3 > num2) {
            resultadoMayor.textContent = num3
            console.log(typeof num3)
        }

        if (num1 < num2 && num1 < num3) {
            resultadoMenor.textContent = num1
            console.log(typeof num1)
        }
        if (num2 < num1 && num2 < num3) {
            resultadoMenor.textContent = num2
            console.log(typeof num2)
        }
        if (num3 < num1 && num3 < num2) {
            resultadoMenor.textContent = num3
            console.log(typeof num3)
        }
    }

    // Ejercicio 2: Suma los 2 numeros
    const sumarEjercio2 = () => {
        const num1 = document.getElementById("ej2_num1").value * 1;
        const num2 = document.getElementById("ej2_num2").value * 1;

        const resultadoEjer2 = document.getElementById("resultado_ejer2");

        resultadoEjer2.value = num1 + num2;
    }

    // Ejercicio 3: repite "x" veces la palabra q se le indique
    const repetirEjer3 = () => {
        const palabra = document.getElementById('ej3_palabra').value;
        const num1 = document.getElementById('ej3_num1').value;
        const resultadoEjer3 = document.getElementById('resultado_ejer3');

        for (let i = 0; i < num1; i++) {
            resultadoEjer3.textContent = resultadoEjer3.innerHTML + `${i + 1}- ${palabra} `
        }
    }

    // Ejercicio 4: Convierte grados o otra unidad de grado
    const convertirEjer4 = () => {
        const cel = document.getElementById('ej4_celsius').value;
        const fah = document.getElementById('ej4_fahrenheit').value;
        const resultadoHTML = document.getElementById('resultado_ej4');
        let res = 0;
        if (cel != 0 && cel != '' && fah === 0 || fah === '') {
            //Fomula para convertir celsius a fahrenheit
            res = (cel * (9 / 5) + 32);
            resultadoHTML.textContent = `Los grados celsius (${cel}°C) a fahrenheit son: ${res}`
        }

        if (fah != 0 && fah != '' && cel === 0 || cel === '') {
            //Fomula para convertir  fahrenheit a celsius
            res = (fah - 32) / 1.8;
            resultadoHTML.textContent = `Los grados fahrenheit (${fah}°F) a celsius son: ${res}`
        }
    }

    //Ejercicio 5: cuenta cuantas letras tiene la palabra
    const calcularEjercio5 = () => {
        const resultado = document.getElementById('resultado_ej5');
        const palabra = document.getElementById('ej5_palabra').value;
        resultado.textContent = `${palabra} tiene ${palabra.length} letras`
    }

    //Ejercicio 6: verificar si el numero ingresado es par o impar
    const verificarEjercicio6 = () => {
        const resultado = document.getElementById('resultado_ej6');
        const num1 = document.getElementById('ej6_num1').value * 1;
        const dato = num1 % 2;

        if (dato === 0) {
            resultado.textContent = `El numero ${num1} es PAR`
        } else {
            resultado.textContent = `El numero ${num1} es IMPAR`
        }
    }
    //Ejercicio 7: Ingresar dos números y mostrar los múltiplos de 3 comprendidos entre ambos.
    const multiplosEjercicio7 = () => {
        const num1 = document.getElementById('ej7_num1').value * 1;
        const num2 = document.getElementById('ej7_num2').value * 1;
        const resultado = document.getElementById('resultado_ej7');
        resultado.textContent = '';
        
        // if (num1 > num2) {
        //     mayor = num1;
        //     menor = num2;
        // } else {
        //     mayor = num2;
        //     menor = num1;
        // }

        let menor =  Math.min(num1, num2);
        let mayor = Math.max(num1, num2);
        
        while (menor <= mayor) {
            let calculo = menor % 3;
            if (calculo === 0) {
                resultado.textContent = resultado.innerHTML + ' | ' + menor;
            }
            menor++;
        }
    }

    //Ejercicio 8: Mostrar los números primos hasta un número ingresado por el usuario.
    const primosEjercicio8 = () => {
        const num1 = document.getElementById('ej8_num1').value * 1;
        const resultado = document.getElementById('resultado_ej8');
        resultado.textContent = '';

        const esPrimo = (num) => {
            for (let i = 2; i < num; i++) {
                if (num % i === 0) {
                    return false
                }
                return true
            }
        }
        for (let x = 0; x <= num1; x++) {
            esPrimo(x) && (resultado.textContent = resultado.innerHTML + ' | ' + x);
        }

    }

    const fraseEjercicio9 = () => {
        const nombre = document.getElementById('ej9_nombre').value,
            apellido = document.getElementById('ej9_apellido').value,
            ciudad = document.getElementById('ej9_ciudad').value,
            edad = document.getElementById('ej9_edad').value,
            resultado = document.getElementById('resultado_ej9');

        resultado.textContent = `Mi nombre es ${nombre} ${apellido}, tengo ${edad} años. Nací en la ciudad de ${ciudad}.`;
    }

    const mostrarEjercicio10 = () => {
        const num1 = document.getElementById('ej10_num1').value * 1,
            num2 = document.getElementById('ej10_num2').value * 1,
            resultado = document.getElementById('resultado_ej10');
            resultado.textContent = '';

        let mayor, menor;

        if (num1 > num2) {
            mayor = num1;
            menor = num2;
        } else {
            mayor = num2;
            menor = num1;
        }

        for (let x = 0; x <= mayor; x++) {
            if (x > menor && x < mayor) {
                resultado.textContent = resultado.innerHTML + ' | ' + x;
            }
        }
    }