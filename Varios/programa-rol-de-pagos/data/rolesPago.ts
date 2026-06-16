import rolesPagoInicial from "./rolesPago.json";

export interface EmpleadoRol {
  id_empleado: string;
  nombre: string;
  cargo: string;
  sueldo: number;
  aumentos: number;
  descuentos: number;
  total_neto: number;
}

export interface RolPago {
  id_mes: string;
  mes_nombre: string;
  empleados: EmpleadoRol[];
}

export let rolesPago: RolPago[] = [...rolesPagoInicial];