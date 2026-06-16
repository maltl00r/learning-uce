// PLANTILLA DE EMPLEADO




// INTENTO DE UTILIZAR LO APRENDIDO DE CLASSES
export class Empleado {
  constructor(
    public id_empleado: string,
    public nombre: string,
    public cargo: string,
    public sueldo: number
  ) {}
}

export const listaEmpleados = [
    new Empleado("EMP-001", "Marvin Loor", "Gerente", 3000),
    new Empleado("EMP-002", "Ana Gómez", "Técnico", 980),
    new Empleado("EMP-003", "Carlos Andrade", "Administrativo", 482),
    new Empleado("EMP-069", "Pedro Picapiedra", "Administrativo", 482)
];