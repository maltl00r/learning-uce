import { Empleado } from '../logic/Empleado.js';
import { obtenerEmpleados, obtenerRolDePago, eliminarEmpleado, 
         crearEmpleado, editarEmpleado, generarRolDePago } from '../logic/main.js';
const container = document.getElementById("container");
const listaEmpleadosActualesDiv = document.getElementById("lista-empleados-actuales");

function mostrarVista(modulo) {
    document.querySelectorAll('.modulo-vista').forEach(v => v.style.display = 'none');
    
    document.getElementById(modulo).style.display = 'block';
    
}

listaEmpleadosActualesDiv.innerHTML = "";
obtenerEmpleados().forEach((emp)=>{
    let empleadoRow = document.createElement("div");
    empleadoRow.classList.add("empleado-row");
    listaEmpleadosActualesDiv.appendChild(empleadoRow);

    let idEmpleadoDiv = document.createElement("div");
    idEmpleadoDiv.classList.add("empleado-id");

    let nombreEmpleadoDiv = document.createElement("div");
    nombreEmpleadoDiv.classList.add("empleado-nombre");

    let cargoEmpleadoDiv = document.createElement("div");
    cargoEmpleadoDiv.classList.add("empleado-cargo");

    let sueldoEmpleadoDiv = document.createElement("div");
    sueldoEmpleadoDiv.classList.add("empleado-sueldo");

    let botonEmpleadoDiv = document.createElement("div");
    sueldoEmpleadoDiv.classList.add("empleado-boton");

    idEmpleadoDiv.textContent = emp.id_empleado;
    nombreEmpleadoDiv.textContent = emp.nombre;
    cargoEmpleadoDiv.textContent = emp.cargo;
    sueldoEmpleadoDiv.textContent = emp.sueldo;
    sueldoEmpleadoDiv.innerHTML = `<button id="${emp.id}">Editar</button>`;

    empleadoRow.appendChild(idEmpleadoDiv);
    empleadoRow.appendChild(nombreEmpleadoDiv);
    empleadoRow.appendChild(cargoEmpleadoDiv);
    empleadoRow.appendChild(sueldoEmpleadoDiv);

    
});



