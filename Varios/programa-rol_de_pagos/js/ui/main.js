import { Empleado, listaEmpleados } from '../logic/Empleado.js';
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

            // Div para los aumentos del empleado
            const empleadoAumentosDiv = document.createElement("div");
            empleadoAumentosDiv.classList.add("empleado-aumentos");
            empleadoAumentosDiv.innerHTML = empleado.aumentos;

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
                empleadoAumentosDiv,
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
        
        // DESCRIPCIÓN DE LA TABLA
        const tablaTitulos = document.createElement("div");
        tablaTitulos.classList.add("tabla-titulos");
        tablaTitulos.innerHTML = "<div>Nombre </div><div>Cargo</div><div>Sueldo</div><div>Descuentos</div><div>Aumentos</div><div>Total a recibir</div>"

        // Añade el total pagado al lado derecho del nombre
        mesNombreDiv.append(totalPagadoMesSpan)

        // Añade el nombre del mes y la lista de empleados en cada DIV mensual
        mesDiv.append(mesNombreDiv, tablaTitulos,
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
        <h2>GENERAR ROL DE PAGO</h2>
        
        <div class="form-group">
            <label for="mes-input">Seleccione ID del Mes</label>
            <div id="input-container">
                <input id="mes-input" type="text" placeholder="ej: 2026-04">
                <button id="btn-cargar-empleados" class="green-button">Cargar Empleados</button>
            </div>
        </div>

        <div id="contenedor-empleados" class="oculto"></div>

        <div id="mensaje-rol" class="mensaje-alerta oculto"></div>
    `;
    container.insertBefore(generarRolDiv, mesesContainer);
    
    const mensajeRol = generarRolDiv.querySelector("#mensaje-rol");
    const contenedorEmpleados = generarRolDiv.querySelector("#contenedor-empleados");

    let mesCargadoActual = "";

    // PASO 1: Cargar la lista de empleados editables
    document.getElementById("btn-cargar-empleados").addEventListener("click", () => {
        let mesInput = document.getElementById("mes-input").value.trim();
        
        mensajeRol.classList.add("oculto");
        contenedorEmpleados.classList.add("oculto");
        contenedorEmpleados.innerHTML = "";

        if(!mesInput) {
            mensajeRol.className = "mensaje-alerta error";
            mensajeRol.innerText = "✕ Por favor, ingrese un mes válido.";
            mensajeRol.classList.remove("oculto");
            return;
        }

        mesCargadoActual = mesInput;

        // Modificamos los títulos para adaptarlos a la nueva lógica (Horas Extras en vez de Aumentos generales)
        contenedorEmpleados.innerHTML = `
            <h3>Ingreso de Novedades (Reglas por Cargo Aplicadas)</h3>
            <div class="tabla-titulos">
                <div>Empleado (Cargo)</div>
                <div>Sueldo Base</div>
                <div>Horas Extras (Sólo Técnico)</div>
                <div>Descuentos Adicionales</div>
            </div>
            <div id="lista-filas-empleados"></div>
            <button id="btn-guardar-rol" class="green-button" style="margin-top: 15px;">Confirmar y Guardar Rol</button>
        `;

        const listaFilas = contenedorEmpleados.querySelector("#lista-filas-empleados");

        listaEmpleados.forEach(emp => {
            const fila = document.createElement("div");
            fila.className = "tabla-titulos fila-empleado"; 
            fila.dataset.id = emp.id_empleado;
            fila.dataset.nombre = emp.nombre;
            
            // Homologamos el cargo a minúsculas para evitar errores de tipeo (tecnico, gerente, administrativo)
            const cargoNormalizado = emp.cargo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            fila.dataset.cargo = cargoNormalizado;

            // Si es administrativo, forzamos el sueldo básico de $482 de forma automática
            let sueldoBase = parseFloat(emp.sueldo);
            if (cargoNormalizado === "administrativo") {
                sueldoBase = 482.00;
            }
            fila.dataset.sueldo = sueldoBase;

            // Renderizado condicional de inputs según el cargo asignado
            let inputAumentoHTML = `<div><input type="number" class="input-aumento" value="0" disabled style="width: 80px; background:#f0f0f0;"> <small>N/A</small></div>`;
            let inputDescuentoHTML = `<div><input type="number" class="input-descuento" value="0" min="0" step="0.01" style="width: 80px;"></div>`;

            if (cargoNormalizado === "tecnico") {
                inputAumentoHTML = `<div><input type="number" class="input-horas-extras" value="0" min="0" step="1" style="width: 80px;"> <small>Horas</small></div>`;
            }
            
            if (cargoNormalizado === "administrativo") {
                inputDescuentoHTML = `<div><input type="number" class="input-descuento" value="0" disabled style="width: 80px; background:#f0f0f0;"> <small>Solo IESS</small></div>`;
            }

            fila.innerHTML = `
                <div><strong>${emp.nombre}</strong><br><small>${emp.cargo}</small></div>
                <div>$${sueldoBase.toFixed(2)}</div>
                ${inputAumentoHTML}
                ${inputDescuentoHTML}
            `;
            listaFilas.appendChild(fila);
        });

        contenedorEmpleados.classList.remove("oculto");
    });

    contenedorEmpleados.addEventListener("click", (e) => {
        if (e.target && e.target.id === "btn-guardar-rol") {
            
            const filas = contenedorEmpleados.querySelectorAll(".fila-empleado");
            const listaEmpleadosProcesados = [];
            
            // Constante del porcentaje del IESS (9.45%)
            const PORCENTAJE_IESS = 0.0945; 

            // Variable de control para detener el guardado si hay un error de validación
            let validacionExitosa = true;
            let mensajeErrorValidacion = "";

            // Recolectamos y validamos fila por fila
            for (let f of filas) {
                const nombre = f.dataset.nombre;
                const cargo = f.dataset.cargo;
                const sueldo = parseFloat(f.dataset.sueldo);
                
                let aumentos = 0;
                let descuentos = 0;
                
                // --- LÓGICA DE VALIDACIÓN POR CARGOS ---
                
                // 1. Reglas para GERENTE
                if (cargo === "gerente") {
                    if (sueldo < 1000 || sueldo > 5000) {
                        validacionExitosa = false;
                        mensajeErrorValidacion = `✕ Error en ${nombre}: El sueldo de Gerente debe estar entre $1000 y $5000.`;
                        break; 
                    }
                    const descuentoRetencion = sueldo * 0.02; // 2% de retención
                    const descuentoIess = sueldo * PORCENTAJE_IESS;
                    const descManuales = parseFloat(f.querySelector(".input-descuento").value) || 0;
                    
                    descuentos = descuentoIess + descuentoRetencion + descManuales;
                }
                
                // 2. Reglas para TÉCNICO
                else if (cargo === "tecnico") {
                    if (sueldo < 600 || sueldo > 1000) {
                        validacionExitosa = false;
                        mensajeErrorValidacion = `✕ Error en ${nombre}: El sueldo de Técnico debe estar entre $600 y $1000.`;
                        break;
                    }
                    const horasExtras = parseInt(f.querySelector(".input-horas-extras").value) || 0;
                    aumentos = horasExtras * 10; // $10 por hora extra
                    
                    const descuentoIess = sueldo * PORCENTAJE_IESS;
                    const descManuales = parseFloat(f.querySelector(".input-descuento").value) || 0;
                    
                    descuentos = descuentoIess + descManuales;
                }
                
                // 3. Reglas para ADMINISTRATIVO
                else if (cargo === "administrativo") {
                    // El sueldo ya se forzó a 482 en el Paso 1
                    const descuentoIess = sueldo * PORCENTAJE_IESS;
                    descuentos = descuentoIess; // Solo descuento del IESS
                }

                // Cálculo del neto final
                const total_neto = sueldo + aumentos - descuentos;

                listaEmpleadosProcesados.push({
                    id_empleado: f.dataset.id,
                    nombre: nombre,
                    cargo: cargo.toUpperCase(),
                    sueldo: sueldo,
                    aumentos: Number(aumentos.toFixed(2)),
                    descuentos: Number(descuentos.toFixed(2)),
                    total_neto: Number(total_neto.toFixed(2))
                });
            }

            // Si una validación falló, mostramos el error y detenemos el proceso
            if (!validacionExitosa) {
                mensajeRol.className = "mensaje-alerta error";
                mensajeRol.innerText = mensajeErrorValidacion;
                mensajeRol.classList.remove("oculto");
                return; 
            }

            // Si todo es correcto, procedemos a guardar en el Backend
            const resultado = generarRolDePago(mesCargadoActual, listaEmpleadosProcesados);
            mensajeRol.classList.remove("oculto", "exito", "error");

            if (resultado.success) {
                // Modificamos el mensaje de éxito para que desglose los datos requeridos
                let resumenMensajes = `✓ ${resultado.message}\n\nREPORTE DE ROLES GENERADOS:\n`;
                
                listaEmpleadosProcesados.forEach(emp => {
                    resumenMensajes += `• Emp: ${emp.nombre} | Cargo: ${emp.cargo} | Sueldo: $${emp.sueldo} | Aumentos: $${emp.aumentos} | Descuentos: $${emp.descuentos} | Neto a Recibir: $${emp.total_neto}\n`;
                });

                mensajeRol.className = "mensaje-alerta exito";
                // Usamos innerText para preservar los saltos de línea (\n)
                mensajeRol.innerText = resumenMensajes; 
                
                document.getElementById("mes-input").value = "";
                contenedorEmpleados.classList.add("oculto"); 
                renderizarPaginaPrincipal();
            } else {
                mensajeRol.className = "mensaje-alerta error";
                mensajeRol.innerText = `✕ ${resultado.message}`;
            }
        }
    });
}
generarRolBtn.addEventListener("click",rendererizarGeneralRolDePago)

