import { Empleado } from '../logic/Empleado.js';
import { obtenerEmpleados, obtenerRolDePago, eliminarEmpleado, 
         crearEmpleado, editarEmpleado, generarRolDePago } from '../logic/main.js';
const container = document.getElementById("container");
let generarRolBtn = document.getElementById("generarRolBtn")

// Función para renderizar la página de inicio
function renderizarPaginaPrincipal() {
    container.innerHTML = "<h1>Sistema de pagos centralino</h1>";

    // SE CREA EL <div> PARA PONER A LOS BOTONES
    const botonesDiv = document.createElement("div");
    botonesDiv.id = "botones-div";
    botonesDiv.classList.add("buttons");

    // Se crea un botón para generar un rol de pagos
    generarRolBtn = document.createElement("button");
    generarRolBtn.id = "generar-rol-btn";
    generarRolBtn.classList.add("yellow-button");
    generarRolBtn.innerText = "General rol de pago";

    // Se crea un botón para imprimir rol de pagos
    const imprimirRolBtn = document.createElement("button");
    imprimirRolBtn.id = "imprimir-rol-btn";
    imprimirRolBtn.classList.add("green-button");
    imprimirRolBtn.innerText = "Imprimir rol de pago";

    // Se crea un botón para editar empleados
    const editarEmpleadosBtn = document.createElement("button");
    editarEmpleadosBtn.id = "editar-empleados-btn";
    editarEmpleadosBtn.classList.add("red-button");
    editarEmpleadosBtn.innerText = "Editar Empleados";

    // Al <div> de botones se le añade los tres botones
    botonesDiv.append(
        generarRolBtn,
        imprimirRolBtn,
        editarEmpleadosBtn
    )

    // Se añade un container (<div>) para cada mes disponible en los roles de pago
    const mesesContainer = document.createElement("div");
    mesesContainer.id = "meses-container";
    mesesContainer.classList.add("contenedor-meses");

    // Por cada mes disponible en obtenerRolDePago(). Se crea una caja individual por mes
    obtenerRolDePago().forEach((mes)=>{
        let totalPagadoMes = 0;

        // Container para todos los empleados
        const empleadosContainer = document.createElement("div");
        empleadosContainer.classList.add("empleados-container");


        // Por cada caja de empleado se va a crear un div
        mes.empleados.forEach((empleado) => {
            // Caja por cada empleado
            const empleadoCaja = document.createElement("div");
            empleadoCaja.id = empleado.id_empleado;
            empleadoCaja.classList.add("empleado-caja");

            // Div para el nombre del empleado
            const empleadoNombreDiv = document.createElement("div");
            empleadoNombreDiv.classList.add("empleado-nombre")
            empleadoNombreDiv.innerText = empleado.nombre;

            // Div para el cargo del empleado
            const empleadoCargoDiv = document.createElement("div");
            empleadoCargoDiv.classList.add("empleado-cargo");
            empleadoCargoDiv.innerHTML = empleado.cargo;

            // Div para el sueldo del empleado
            const empleadoSueldoDiv = document.createElement("div");
            empleadoSueldoDiv.classList.add("empleado-sueldo");
            empleadoSueldoDiv.innerHTML = empleado.sueldo;

            // Div para los descuentos del empleado
            const empleadoDescuentosDiv = document.createElement("div");
            empleadoDescuentosDiv.classList.add("empleado-descuentos");
            empleadoDescuentosDiv.innerHTML = empleado.descuentos;
            
            // Div para el sueldo total del empleado
            const empleadoSueldoTotalDiv = document.createElement("div");
            empleadoSueldoTotalDiv.classList.add("empleado-sueldo-total");
            empleadoSueldoTotalDiv.innerHTML = empleado.total_neto;
            totalPagadoMes += empleado.total_neto;

            // Añade el nombre, cargo, sueldo, descuento y el total a la caja de cada empleado
            empleadoCaja.append(
                empleadoNombreDiv,
                empleadoCargoDiv,
                empleadoSueldoDiv,
                empleadoDescuentosDiv,
                empleadoSueldoTotalDiv
            )
            // Añade la caja del empleado anterior al container de empleados
            empleadosContainer.append(empleadoCaja);
            
        }); 

        // Caja principal del mes
        const mesDiv = document.createElement("div");
        mesDiv.id = mes.id_mes;
        mesDiv.classList.add("caja-mes");
        
        // Nombre del mes
        const mesNombreDiv = document.createElement("div");
        mesNombreDiv.classList.add("mes-nombre");
        mesNombreDiv.innerText = mes.mes_nombre;

        // Total pagado del mes
        const totalPagadoMesSpan = document.createElement("span");
        totalPagadoMesSpan.classList.add("total-pagado-mes");
        totalPagadoMesSpan.innerText = `$${totalPagadoMes.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        
        // Añade el total pagado al lado derecho del nombre
        mesNombreDiv.append(totalPagadoMesSpan)

        // Añade el nombre del mes y la lista de empleados en cada DIV mensual
        mesDiv.append(mesNombreDiv,
            empleadosContainer);

        // Añade cada DIV mensual en el container de meses
        mesesContainer.append(mesDiv);
    });

    // Se añade TODO lo anterior a la página principal
    container.append(botonesDiv, mesesContainer)
}

renderizarPaginaPrincipal()
const mesesContainer = document.getElementById("meses-container");

function rendererizarGeneralRolDePago() {
    const generarRolDiv = document.createElement("div");
    generarRolDiv.id = "generar-rol-div";
    generarRolDiv.className = "seccion-formulario";
    
    generarRolDiv.innerHTML = `
        <h2>GENERAL ROL DE PAGO</h2>
        
        <div class="form-group">
            <label for="mes-input">Seleccione ID del Mes</label>
            <div id="input-container">
                <input id="mes-input" type="text" placeholder="ej: 2026-04">
                <button id="btn-generar" class="green-button">Generar Rol</button>
            </div>
        </div>

        <div id="mensaje-rol" class="mensaje-alerta oculto"></div>
    `;
    container.insertBefore(generarRolDiv, mesesContainer);
    
    // Capturamos el contenedor del mensaje una sola vez aquí abajo
    const mensajeRol = generarRolDiv.querySelector("#mensaje-rol");

    document.getElementById("btn-generar").addEventListener("click", () => {
        let mesInput = document.getElementById("mes-input").value.trim();
        const resultado = generarRolDePago(mesInput);

        // 1. Limpiamos estilos previos para que no se mezclen colores si le da click de nuevo
        mensajeRol.classList.remove("oculto", "exito", "error");

        // 2. Evaluamos si la respuesta es de éxito o error
        if (resultado.message.includes("generado")) {
            mensajeRol.classList.add("exito");
            mensajeRol.innerText = `✓ ${resultado.message}`;
            
            document.getElementById("mes-input").value = ""; // Opcional: limpia el input al tener éxito
            renderizarPaginaPrincipal();
        } else {
            mensajeRol.classList.add("error");
            mensajeRol.innerText = `✕ ${resultado.message}`;
        }
        
    });
}
generarRolBtn.addEventListener("click",rendererizarGeneralRolDePago)

