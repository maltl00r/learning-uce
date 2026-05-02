import { buscarUsuarioPorCedula, validarFondos, validarUsuarioExistente, validarMonto, 
    realizarDeposito, realizarRetiro, crearNuevoUsuario, crearCuentaNueva, mostrarVista, validarPin, 
    darNumCuenta} from './logica.js';

const btnRetiro = document.getElementById('btn-retiro');
const btnDeposito = document.getElementById('btn-deposito');
const btnCrear = document.getElementById('btn-crear');
const cedulaInput = `<input type="text" id="cedulaInput" placeholder="Ingrese su número de cédula">`;
const btnBuscar = `<button id=btnBuscar>Buscar</button>`;

// console.log(buscarUsuarioPorCedula("1207499999"));  [Object, object] Arroja el usuario {} completo

// console.log(validarFondos("1207499999", "19112005", 150));  true, false Si tiene más de lo que intenta retirar

// console.log(validarUsuarioExistente("1207499999"));  true, false Si el usuario existe o no

// console.log(validarMonto(10));  true, false Permite ingresar valores válidos

// console.log(realizarDeposito("1207499999", "19112005", 10)) [Object, Object] Determina si tuvo éxito o no

// console.log(realizarRetiro("1207499999", "19112005", 161))  [Object, Object] Determina si tuvo éxito o no

// console.log(crearNuevoUsuario("MARVINLATA", "10", "10"))  [Object, Object] Determina si tuvo éxito o no

// console.log(crearCuentaNueva("1207499999", "AHORROS"))  [Object, Object] Determina si tuvo éxito o no
const contenedor = document.getElementById('campos-dinamicos');
const mensaje = document.getElementById('mensaje');

document.getElementById('btn-cancelar').addEventListener('click', () => {
        mostrarVista('menu-principal');
        mensaje.innerHTML = "";
    });

document.getElementById('btn-crear').addEventListener('click', () => {
    document.getElementById('titulo-form').innerText = "Nuevo Usuario";
    
    // Inyectamos el HTML de los inputs
    contenedor.innerHTML = `
        <input type="text" id="reg-nombre" placeholder="Nombre completo">
        <input type="text" id="reg-cedula" placeholder="Cédula">
        <input type="text" id="reg-pin" placeholder="PIN de 4 dígitos">
    `;

    mostrarVista('pantalla-formulario');

    // Cambiamos lo que hace el botón confirmar para esta pantalla
    document.getElementById('btn-confirmar').onclick = () => {
        const n = document.getElementById('reg-nombre').value;
        const c = document.getElementById('reg-cedula').value;
        const p = document.getElementById('reg-pin').value;
        
        const res = crearNuevoUsuario(n, c, p);
        mensaje.innerHTML = res.mensaje;
        if(res.ok) {
            mensaje.innerHTML += " Redirigiendo...";
            setTimeout(() => {
                mostrarVista('menu-principal');
                mensaje.innerHTML = "";
            }, 3000);
        }
    };
});

document.getElementById('btn-retiro').addEventListener('click', () => {
    document.getElementById('titulo-form').innerText = "Retiro";
    contenedor.innerHTML = `
        <p>Por favor, ingrese su número de cédula: </p>
        <input type="text" id="reg-cedula" placeholder="Cédula">
    `;
    
    mostrarVista('pantalla-formulario');

    document.getElementById('btn-confirmar').onclick = () => {
        const cedula = document.getElementById('reg-cedula').value;
        let respuesta = buscarUsuarioPorCedula(cedula);
        if (!respuesta) {
            mensaje.innerHTML = "El usuario no existe. ";
            return;
        }

        document.getElementById('titulo-form').innerText = "Retiro - Pin";
        contenedor.innerHTML = `<input type="password" id="reg-pin" placeholder="Ingrese su PIN">`;
        mensaje.innerHTML = "";

        document.getElementById('btn-confirmar').onclick = () => {
            const pin = document.getElementById('reg-pin').value;
            const validacion = validarPin(cedula, pin);
            if (!validacion.ok) {
                mensaje.innerHTML = validacion.mensaje;
            } else {
                mensaje.innerHTML = "";
                document.getElementById('titulo-form').innerText = "Retiro - Cantidad";
                contenedor.innerHTML = `<input type="number" id="reg-cantidad" placeholder="Ingrese la cantidad a retirar">`;

                document.getElementById('btn-confirmar').onclick = () => {
                    const monto = document.getElementById('reg-cantidad').value;
                    const retiro = realizarRetiro(cedula, darNumCuenta(cedula), monto)
                    if(!retiro.ok) {
                        mensaje.innerHTML = retiro.mensaje;
                    } else {
                        mensaje.innerHTML = retiro.mensaje;
                        mensaje.innerHTML += " Redirigiendo...";
                        mensaje.innerHTML += `<br>Ahora posee un saldo de <strong>$${retiro.nuevoSaldo}</strong>`;
                        setTimeout(() => {
                            mostrarVista('menu-principal');
                            mensaje.innerHTML = "";
                        }, 3000);
                    }
                 }
            }
        }
    }
});

document.getElementById('btn-deposito').addEventListener('click', () => {
    document.getElementById('titulo-form').innerText = "Depósito";
    contenedor.innerHTML = `
        <p>Por favor, ingrese su número de cuenta: </p>
        <input type="text" id="reg-cedula" placeholder="Número de cédula">
    `;

    mostrarVista('pantalla-formulario');

    document.getElementById('btn-confirmar').onclick = () => {

        const cedula = document.getElementById('reg-cedula').value;
        const respuesta = buscarUsuarioPorCedula(cedula);
        if (!respuesta) {
            mensaje.innerHTML = "No existe este usuario. ";
        } else {
            mensaje.innerHTML = "";
            document.getElementById('titulo-form').innerText = "Deposito - Cantidad";
            contenedor.innerHTML = `<input type="number" id="reg-cantidad" placeholder="Ingrese la cantidad a depositar">`;

            document.getElementById('btn-confirmar').onclick = () => {
                const monto = document.getElementById('reg-cantidad').value;
                const deposito = realizarDeposito(cedula, darNumCuenta(cedula), monto);
                if(!deposito.ok) {
                    mensaje.innerHTML = deposito.mensaje;
                }  else {
                        mensaje.innerHTML = deposito.mensaje;
                        mensaje.innerHTML += " Redirigiendo...";
                        mensaje.innerHTML += `<br>Ahora posee un saldo de <strong>$${deposito.nuevoSaldo}</strong>`;
                        setTimeout(() => {
                            mostrarVista('menu-principal');
                            mensaje.innerHTML = "";
                        }, 3000);
                    }

            }
        }
    }
});