// INTENTO DE UTILIZAR LO APRENDIDO DE CLASSES
export class Empleado {

    constructor(id_empleado,nombre,cargo,sueldo){
        this.id_empleado = id_empleado;
        this.nombre = nombre;
        this.cargo = cargo;
        this.sueldo = sueldo;
    }

    
}

export const listaEmpleados = [
    new Empleado("EMP-001", "Marvin Loor", "Gerente", 3000),
    new Empleado("EMP-002", "Ana Gómez", "Técnico", 980),
    new Empleado("EMP-003", "Carlos Andrade", "Administrativo", 482),
    new Empleado("EMP-069", "Pedro Picapiedra", "Administrativo", 482)
];