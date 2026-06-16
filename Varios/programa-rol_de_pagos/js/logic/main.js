import { Empleado, listaEmpleados } from './Empleado.js';

// PLANTILLA
let rolDePago = [
    {
        "id_mes": "2026-04",
        "mes_nombre": "Abril 2026",
        "empleados":[
            {
                "id_empleado": "EMP-001",
                "nombre": "Marvin Loor",
                "cargo": "Gerente",
                "sueldo": 3000,
                "aumentos": 0,
                "descuentos": 343.5,
                "total_neto": 2656.5
            },
            {
                "id_empleado": "EMP-002",
                "nombre": "Ana Gómez",
                "cargo": "Técnica",
                "sueldo": 980,
                "aumentos": 0,
                "descuentos": 92.61,
                "total_neto": 887.39
            },
            {
                "id_empleado": "EMP-069",
                "nombre": "Pedro Picapiedra",
                "cargo": "Administrativo",
                "sueldo": 482,
                "descuentos": 45.549,
                "aumentos": 0,
                "total_neto": 436.45
            }
        ]
    },
    {
        "id_mes": "2026-03",
        "mes_nombre": "Marzo 2026",
        "empleados":[
            {
                "id_empleado": "EMP-001",
                "nombre": "Marvin Loor",
                "cargo": "Gerente",
                "sueldo": 3000,
                "aumentos": 0,
                "descuentos": 343.5,
                "total_neto": 2656.5
            },
            {
                "id_empleado": "EMP-002",
                "nombre": "Ana Gómez",
                "cargo": "Técnica",
                "sueldo": 980,
                "aumentos": 15,
                "descuentos": 94.02,
                "total_neto": 900.97
            }
        ]
    }
]

function ultimoIdEmpleado() {
    let valor = listaEmpleados[listaEmpleados.length - 1];
    let partes = valor.id_empleado.split("-");
    let numero = parseInt(partes[1]);
    numero++
    let idDisponible = partes[0] + "-" + String(numero).padStart(3, "0")
    
    return idDisponible
}


export function obtenerRolDePago() {
    return rolDePago
}

export function crearEmpleado(nombre, cargo, sueldo) {
    let id_empleado = ultimoIdEmpleado();
    if (!nombre) {
        return { message: "Debe ingresar el nombre del empleado."}
    }
    else if (!cargo) {
        return { message: "Debe ingresar el cargo del empleado."}
    }
    else if (!sueldo) {
        return { message: "Debe ingresar el sueldo del empleado."}
    }
    else {
        listaEmpleados.push(new Empleado(id_empleado, nombre, cargo, sueldo));
        return { message: "¡Empleado creado exitosamente!" }
    }
    
}

export function eliminarEmpleado(id_empleado) {
    const index = listaEmpleados.findIndex(emp => emp.id_empleado === id_empleado);
    if (index === -1){
        return { message: "Empleado no encontrado."}
    }
    else if (index !== -1) {
        listaEmpleados.splice(index, 1);
        return { message: "Empleado eliminado exitosamente."}
    }
}

export function obtenerEmpleados(){
    return listaEmpleados;
}

export function editarEmpleado(id_empleado, nuevo_id, nuevo_nombre, nuevo_cargo, nuevo_sueldo) {
    const empleado = listaEmpleados.findIndex(emp => emp.id_empleado === id_empleado);
    
    if (empleado === -1){
        return { message: "Empleado no encontrado."}
    }
    else if (!nuevo_id) {
        return { message: "Debe ingresar la ID del empleado."}
    } 
    else if (!nuevo_nombre) {
        return { message: "Debe ingresar el nombre del empleado."}
    }
    else if (!nuevo_cargo) {
        return { message: "Debe ingresar el cargo del empleado."}
    }
    else if (!nuevo_sueldo) {
        return { message: "Debe ingresar el sueldo del empleado."}
    }
    else if (empleado){
        listaEmpleados[empleado].id_empleado = nuevo_id;
        listaEmpleados[empleado].nombre = nuevo_nombre;
        listaEmpleados[empleado].cargo = nuevo_cargo;
        listaEmpleados[empleado].sueldo = nuevo_sueldo;

        return { message: "¡Empleado editado exitosamente!" }
    }
    
}

function obtenerMes(id_mes) {
    let anio, mes;

    if (id_mes) {
        let partes = id_mes.split("-");
        anio = partes[0];
        mes = partes[1];

        if (anio.length !== 4 || isNaN(Number(anio)) || mes == 0 || mes > 12) return null
        if (mes.length !== 1 && mes.length !== 2) return null
    } else {
        anio = new Date().getFullYear();
        mes = new Date().getMonth()+1;
    }
    
    
    let idMes = anio + "-" + String(mes).padStart(2,"0")
    let mesNombre = mes == 1 ? "Enero" + " " + anio : 
    mes == 2 ? "Febrero" + " " + anio : 
    mes == 3 ? "Marzo" + " " + anio : 
    mes == 4 ? "Abril" + " " + anio : 
    mes == 5 ? "Mayo" + " " + anio : 
    mes == 6 ? "Junio" + " " + anio : 
    mes == 7 ? "Julio" + " " + anio : 
    mes == 8 ? "Agosto" + " " + anio : 
    mes == 9 ? "Septiembre" + " " + anio : 
    mes == 10 ? "Octubre" + " " + anio : 
    mes == 11 ? "Noviembre" + " " + anio : "Diciembre" + " " + anio;

    return { id_mes: idMes, mes_nombre: mesNombre};
}


export function generarRolDePago(id_mes, empleadosModificados) {
    let idMes = id_mes ? obtenerMes(id_mes) : obtenerMes();
    
    if (!idMes) {
        return { success: false, message: "El formato del mes no es válido. Recuerde usar el formato AAAA-MM (ej: 2026-04)." };
    }

    let existeMes = rolDePago.some(mes => mes.id_mes === idMes.id_mes);
    
    if (existeMes) {
        return { success: false, message: "Ya existe un rol de pagos del mes solicitado." };
    } else {
        rolDePago.unshift({
            "id_mes": idMes.id_mes,
            "mes_nombre": idMes.mes_nombre,
            "empleados": empleadosModificados // <-- Guardamos los datos que envió el usuario
        });
        return { success: true, message: `Se ha generado un rol de pagos para el mes de ${idMes.mes_nombre}.` };
    }
}
