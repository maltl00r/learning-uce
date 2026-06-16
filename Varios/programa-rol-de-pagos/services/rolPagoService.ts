import { Empleado } from "@/data/Empleado";
import { rolesPago } from "@/data/rolesPago";

export function obtenerRolDePago() {
    return rolesPago
}

function obtenerMes(id_mes?: string) {
    let anio, mes;

    if (id_mes) {
        let partes = id_mes.split("-");
        anio = partes[0];
        mes = partes[1];

        if (anio.length !== 4 || isNaN(Number(anio)) || mes == '0' || mes > '12') return null
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


interface EmpleadoRol extends Empleado {
  aumentos: number;
  descuentos: number;
  total_neto: number;
}


export function generarRolDePago(id_mes: string, empleadosModificados: EmpleadoRol[]) {
    let idMes = id_mes ? obtenerMes(id_mes) : obtenerMes();
    
    if (!idMes) {
        return { success: false, message: "El formato del mes no es válido. Recuerde usar el formato AAAA-MM (ej: 2026-04)." };
    }

    let existeMes = rolesPago.some(
        mes => mes.id_mes === idMes.id_mes
    );
    
    if (existeMes) {
        return { success: false, message: "Ya existe un rol de pagos del mes solicitado." };
    } else {
        rolesPago.unshift({
            "id_mes": idMes.id_mes,
            "mes_nombre": idMes.mes_nombre,
            "empleados": empleadosModificados
        });
        return { success: true, message: `Se ha generado un rol de pagos para el mes de ${idMes.mes_nombre}.` };
    }
}