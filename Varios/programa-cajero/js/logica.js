export const usuarios=[{cedula:"1207499999", nombres:"LOOR MARVIN", telefono:"0982799999", pin:"4321", cuentas:[
    {
        tipo:"AHORROS", 
        numero:"19112005",
        saldo:150.00
    }]},{cedula:"1550199999", nombres:"FIALLOS BRYANA", telefono:"0991699999", pin:"8765", cuentas:[
    {
        tipo:"AHORROS", 
        numero:"19052006",
        saldo:1000.00
    }]}];

export function buscarUsuarioPorCedula(cedula) {
    const usuario = usuarios.find(u => u.cedula === cedula);

    if (!usuario) {
        return null;
    }

    return {
        nombres: usuario.nombres,
        pin: usuario.pin,
        cuentas: usuario.cuentas
    };
}

export function validarFondos(cedula, numCuenta, monto) {
    const usuario = buscarUsuarioPorCedula(cedula);
    if (!usuario) return false;

    const cuenta = usuario.cuentas.find(c => c.numero === numCuenta);

    if (!cuenta) return false;
    
    return cuenta.saldo >= monto;

}

export function validarUsuarioExistente(cedula) {
    return usuarios.some(u => u.cedula === cedula);
}

export function validarMonto(monto) {
    const valor = Number(monto);

    return !isNaN(valor) && valor > 0;
}

export function realizarDeposito(cedula, numCuenta, monto) {
    const usuario = buscarUsuarioPorCedula(cedula);
    if (!usuario) {
        return { ok: false, mensaje: "Usuario no encontrado" };
    }

    const cuenta = usuario.cuentas.find(c => c.numero === numCuenta);
    if (!cuenta) {
        return { ok: false, mensaje: "Cuenta no encontrada" };
    }

    if(!validarMonto(monto)) {
        return { ok: false, mensaje: "Monto inválido" };
    }

    cuenta.saldo += Number(monto);

    return {
        ok: true,
        nuevoSaldo: cuenta.saldo,
        mensaje: `Depósito de $${monto} realizado con éxito.`
    };
}

export function realizarRetiro(cedula, numCuenta, monto) {
    const usuario = buscarUsuarioPorCedula(cedula);
    if (!usuario) {
        return { ok: false, mensaje: "Usuario no encontrado" };
    }

    const cuenta = usuario.cuentas.find(c => c.numero === numCuenta);
    if (!cuenta) {
        return { ok: false, mensaje: "Cuenta no encontrada" };
    }

    if(!validarMonto(monto)) {
        return { ok: false, mensaje: "Monto inválido" };
    }

    const saldo = validarFondos(cedula, numCuenta, monto)
    if (!saldo) {
        return { ok: false, mensaje: "Fondos insuficientes"}
    } 

    cuenta.saldo -= Number(monto);

    return {
        ok: true,
        nuevoSaldo: cuenta.saldo,
        mensaje: `Retiro de $${monto} realizado con éxito.`
    } 
}

export function crearNuevoUsuario(nombre, cedula, pin) {
    if (validarUsuarioExistente(cedula)) {
        return { ok: false, mensaje: "El cliente ya existe" }
    }
    if (!nombre) {
        return { ok: false, mensaje: "Se debe proporionar el nombre de la persona." }
    }

    if (!cedula) {
        return { ok: false, mensaje: "Se debe proporcionar una cédula."}
    }

    if (!pin) {
        return { ok: false, mensaje: "Se debe proporcionar un pin."}
    }
    
    const nuevoUsuario = {
        cedula,
        nombres: nombre.toUpperCase().trim(),
        pin, 
        cuentas:[]
    };

    usuarios.push(nuevoUsuario)
    crearCuentaNueva(cedula, "AHORROS")

    return { ok: true, mensaje: "Usuario creado con éxito.", usuario: nuevoUsuario };
    
}

export function generarNumeroCuenta() {
    const numero = Math.floor(10000000 + Math.random() * 90000000);
    return numero.toString();
}

export function crearCuentaNueva(cedula, tipoCuenta) {
    if (!validarUsuarioExistente(cedula)) {
        return { ok: false, mensaje: "El cliente no existe" }
    }

    const nuevaCuenta = {
        tipo: tipoCuenta,
        numero: generarNumeroCuenta(),
        saldo: 0
    }   

    let usuario = buscarUsuarioPorCedula(cedula);
    if(!usuario) {
        return { ok: false, mensaje: "Usuario no encontrado" }
    }

    if(!tipoCuenta) {
        return { ok: false, mensaje: "Se debe proporcionar el tipo de cuenta"}
    }

    if (usuario.cuentas.length >= 3) {
    return { ok: false, mensaje: "El cliente ya alcanzó el límite máximo de cuentas." };
    }

    usuario.cuentas.push(nuevaCuenta)

    return { 
        ok: true, 
        mensaje: `Cuenta de ${tipoCuenta} creada con éxito.`,
        cuenta: nuevaCuenta 
    };
}

export function mostrarVista(idVista) {
    // Escondemos todas las capas con la clase 'vista'
    document.querySelectorAll('.vista').forEach(v => v.style.display = 'none');
    
    // Mostramos la que pedimos
    document.getElementById(idVista).style.display = 'block';
}

export function validarPin(cedula, pin) {
    if(!cedula) {
        return { ok: false, mensaje: "Se debe proporcionar una cédula. "};
    }

    if (!pin) {
        return { ok: false, mensaje: "Se debe proporcionar un pin. "};
    }

    if(validarUsuarioExistente(cedula)) {
        const valor = buscarUsuarioPorCedula(cedula).pin;
        if (valor != pin) {
            return { ok: false, mensaje: "El pin no es correcto. "};
        }

        return { ok: true, mensaje: "El pin es correcto" }
    }
}

export function darNumCuenta(cedula) {
    const usuario = buscarUsuarioPorCedula(cedula);

    if (!usuario || !usuario.cuentas || usuario.cuentas.length === 0) {
        return null;
    }

    return usuario.cuentas[0].numero;
}