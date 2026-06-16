import { listaEmpleados, Empleado } from "@/data/Empleado";

export function obtenerEmpleados() {
  return listaEmpleados;
}

export function editarEmpleado(
  id: string,
  nombre: string,
  cargo: string,
  sueldo: number
) {
  const index = listaEmpleados.findIndex(
    (e) => e.id_empleado === id
  );

  if (index === -1) {
    return { success: false, message: "Empleado no encontrado" };
  }

  const cargoNorm = cargo.toLowerCase();
  const sueldoNum = Number(sueldo);

  if (cargoNorm === "administrativo") {
    listaEmpleados[index].nombre = nombre;
    listaEmpleados[index].cargo = cargo;
    listaEmpleados[index].sueldo = 482;

    return { success: true, message: "Administrativo = 482 USD" };
  }

  if (cargoNorm === "gerente") {
    if (sueldoNum < 1000 || sueldoNum > 5000) {
      return {
        success: false,
        message: "Gerente debe ganar entre 1000 y 5000",
      };
    }
  }

  if (cargoNorm === "tecnico" || cargoNorm === "técnico") {
    if (sueldoNum < 600 || sueldoNum > 1000) {
      return {
        success: false,
        message: "Técnico debe ganar entre 600 y 1000",
      };
    }
  }

  listaEmpleados[index] = {
    ...listaEmpleados[index],
    nombre,
    cargo,
    sueldo: sueldoNum,
  };

  return { success: true, message: "Empleado actualizado" };
}