import { Empleado } from '../logic/Empleado.js';
import { obtenerEmpleados, obtenerRolDePago, eliminarEmpleado, 
         crearEmpleado, editarEmpleado, generarRolDePago } from '../logic/main.js';
const container = document.getElementById("container");
const listaEmpleadosActualesDiv = document.getElementById("lista-empleados-actuales");
const editarEmpleadoBtn = document.getElementById("edit-employes");

function mostrarVista(modulo) {
    // 1. Ocultamos TODAS las vistas primero
    document.querySelectorAll('.modulo-vista').forEach(v => v.classList.add("oculto"));
    
    // 2. Buscamos TODOS los bloques que coincidan con el módulo solicitado
    const vistasActivas = document.querySelectorAll(`[data-vista="${modulo}"]`);
    
    // 3. Mostramos cada uno de los bloques encontrados
    if (vistasActivas.length > 0) {
        vistasActivas.forEach(v => v.classList.remove("oculto"));
    } else {
        console.warn(`No se encontró ningún bloque con data-vista="${modulo}".`);
    }
}

function renderizarEmpleados() {
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
        botonEmpleadoDiv.classList.add("empleado-boton");

        idEmpleadoDiv.textContent = emp.id_empleado;
        nombreEmpleadoDiv.textContent = emp.nombre;
        cargoEmpleadoDiv.textContent = emp.cargo;
        sueldoEmpleadoDiv.textContent = `$${emp.sueldo}`;
        botonEmpleadoDiv.innerHTML = `<button id="${emp.id_empleado}">Editar</button>`;

        empleadoRow.appendChild(idEmpleadoDiv);
        empleadoRow.appendChild(nombreEmpleadoDiv);
        empleadoRow.appendChild(cargoEmpleadoDiv);
        empleadoRow.appendChild(sueldoEmpleadoDiv);
        empleadoRow.appendChild(botonEmpleadoDiv);

        
    });}

editarEmpleadoBtn.addEventListener("click", () => {
    
    renderizarEmpleados();
    mostrarVista("empleados");
})



