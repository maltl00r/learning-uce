"use client";

import { useState } from "react";
import { Empleado, listaEmpleados } from "@/data/Empleado";
import { editarEmpleado } from "@/services/empleadoService";
import { generarRolDePago } from "@/services/rolPagoService";

interface RolDePagoProps {
  setMostrar: React.Dispatch<React.SetStateAction<boolean>>;
  actualizarRoles: () => void;
}

export default function RolDePago({
  setMostrar,
  actualizarRoles,
}: RolDePagoProps) {
  const [mesInput, setMesInput] = useState("");
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [mostrarEditar, setMostrarEditar] = useState(false);

  const [editId, setEditId] = useState("");
  const [editNombre, setEditNombre] = useState("");
  const [editCargo, setEditCargo] = useState("");
  const [editSueldo, setEditSueldo] = useState(0);

  const [msg, setMsg] = useState("");
  const [mensajeRol, setMensajeRol] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoCargo, setNuevoCargo] = useState("Gerente");
  const [nuevoSueldo, setNuevoSueldo] = useState(1000);

  const [extras, setExtras] = useState<
    Record<string, { horas: number; descuento: number }>
  >({});

  function cargarEmpleados() {
    if (!mesInput.trim()) return;
    setEmpleados([...listaEmpleados]);
    setMensajeRol("");
  }

  function generarNuevoId() {
    const todosLosIds = [...listaEmpleados, ...empleados].map((emp) => {
      const numero = emp.id_empleado.replace(/\D/g, "");
      return Number(numero) || 0;
    });
    const maxId = Math.max(0, ...todosLosIds);
    return `EMP-${String(maxId + 1).padStart(3, "0")}`;
  }

  function validarEmpleado(emp: Empleado) {
    const sueldo = Number(emp.sueldo);
    const cargoNorm = emp.cargo.toLowerCase();

    if (cargoNorm === "gerente") {
      if (sueldo < 1000 || sueldo > 5000) {
        return "Gerente debe ganar entre 1000 y 5000 USD.";
      }
    }

    if (cargoNorm === "técnico" || cargoNorm === "tecnico") {
      if (sueldo < 600 || sueldo > 1000) {
        return "Técnico debe ganar entre 600 y 1000 USD.";
      }
    }

    return "";
  }

  function calcularDescuentos(emp: Empleado, extrasEmpleado: { horas: number; descuento: number }) {
    const baseIess = Number((emp.sueldo * 0.0945).toFixed(2));
    const retencionGerente =
      emp.cargo.toLowerCase() === "gerente" ? Number((emp.sueldo * 0.02).toFixed(2)) : 0;
    const descuentoAdicional = Number(extrasEmpleado.descuento || 0);

    return Number((baseIess + retencionGerente + descuentoAdicional).toFixed(2));
  }

  function crearRolDePago() {
    if (!mesInput.trim()) {
      setMensajeRol("Debe ingresar un mes válido en formato AAAA-MM.");
      return;
    }

    if (empleados.length === 0) {
      setMensajeRol("Primero debes cargar empleados antes de guardar el rol de pago.");
      return;
    }

    const validacion = empleados
      .map((emp) => validarEmpleado(emp))
      .find((mensaje) => mensaje.length > 0);

    if (validacion) {
      setMensajeRol(validacion);
      return;
    }

    const empleadosModificados = empleados.map((emp) => {
      const extrasEmpleado = extras[emp.id_empleado] || { horas: 0, descuento: 0 };
      const aumentos = Number((extrasEmpleado.horas * 20).toFixed(2));
      const descuentos = calcularDescuentos(emp, extrasEmpleado);
      const total_neto = Number((emp.sueldo + aumentos - descuentos).toFixed(2));

      return {
        ...emp,
        aumentos,
        descuentos,
        total_neto,
      };
    });

    const resultado = generarRolDePago(mesInput, empleadosModificados);
    setMensajeRol(resultado.message);

    if (resultado.success) {
      actualizarRoles();
      setMostrar(false);
    }
  }

  function agregarEmpleado() {
    if (!nuevoNombre.trim()) {
      setMensajeRol("Debe ingresar nombre del empleado.");
      return;
    }

    if (nuevoSueldo <= 0) {
      setMensajeRol("El sueldo debe ser mayor a 0.");
      return;
    }

    const cargoNorm = nuevoCargo.toLowerCase();

    if (cargoNorm === "gerente") {
      if (nuevoSueldo < 1000 || nuevoSueldo > 5000) {
        setMensajeRol("Gerente debe ganar entre 1000 y 5000 USD.");
        return;
      }
    } else if (cargoNorm === "técnico" || cargoNorm === "tecnico") {
      if (nuevoSueldo < 600 || nuevoSueldo > 1000) {
        setMensajeRol("Técnico debe ganar entre 600 y 1000 USD.");
        return;
      }
    } else if (cargoNorm === "administrativo") {
      if (nuevoSueldo !== 482) {
        setMensajeRol("Administrativo debe ganar exactamente 482 USD.");
        return;
      }
    }

    const id_empleado = generarNuevoId();
    const empleado = new Empleado(id_empleado, nuevoNombre.trim(), nuevoCargo, nuevoSueldo);

    listaEmpleados.push(empleado);
    setEmpleados((prev) => [...prev, empleado]);
    setNuevoNombre("");
    setNuevoCargo("Gerente");
    setNuevoSueldo(1000);
    setMensajeRol(`Empleado ${empleado.nombre} agregado correctamente.`);
  }

  function abrirEditar(emp: Empleado) {
    setEditId(emp.id_empleado);
    setEditNombre(emp.nombre);
    setEditCargo(emp.cargo);
    setEditSueldo(emp.sueldo);
    setMostrarEditar(true);
    setMsg("");
  }

  function guardarEdicion() {
    const res = editarEmpleado(editId, editNombre, editCargo, editSueldo);
    setMsg(res.message);

    if (res.success) {
      setEmpleados([...listaEmpleados]);
      actualizarRoles();
      setMostrarEditar(false);
    }
  }

  return (
    <div className="relative mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
      <button
        className="absolute right-4 top-4 rounded-full border border-slate-300 bg-slate-100 px-3 py-2 text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        onClick={() => setMostrar(false)}
      >
        ✕
      </button>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-950 dark:text-slate-100">
            Generar Rol de Pago
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Introduce el mes para cargar empleados y editar datos. El IESS se aplica automáticamente y el gerente tiene 2% adicional.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={mesInput}
            onChange={(e) => setMesInput(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-950 placeholder:text-slate-500 outline-none transition dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
            placeholder="2026-04"
          />

          <button
            onClick={cargarEmpleados}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            Cargar empleados
          </button>
        </div>

        {mensajeRol && (
          <p className="rounded-xl border border-rose-500 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-400 dark:bg-rose-950 dark:text-rose-200">
            {mensajeRol}
          </p>
        )}

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
          <h3 className="mb-3 text-base font-semibold text-slate-950 dark:text-slate-100">
            Agregar empleado
          </h3>
          <div className="grid gap-3 sm:grid-cols-[1.5fr_1fr_1fr_auto]">
            <input
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-950 outline-none transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              placeholder="Nombre"
            />
            <select
              value={nuevoCargo}
              onChange={(e) => setNuevoCargo(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-950 outline-none transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option>Gerente</option>
              <option>Técnico</option>
              <option>Administrativo</option>
            </select>
            <input
              type="number"
              value={nuevoSueldo}
              onChange={(e) => setNuevoSueldo(Number(e.target.value))}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-950 outline-none transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              placeholder="Sueldo"
            />
            <button
              type="button"
              onClick={agregarEmpleado}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
            >
              Agregar
            </button>
          </div>
        </div>

        {empleados.length > 0 && (
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={crearRolDePago}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Guardar rol de pago
              </button>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950">
              <table className="min-w-full border-separate border-spacing-0">
                <thead className="bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  <tr>
                    <th className="border border-slate-200 px-4 py-3 text-left dark:border-slate-700">Nombre</th>
                    <th className="border border-slate-200 px-4 py-3 text-left dark:border-slate-700">Cargo</th>
                    <th className="border border-slate-200 px-4 py-3 text-left dark:border-slate-700">Sueldo</th>
                    <th className="border border-slate-200 px-4 py-3 text-left dark:border-slate-700">Horas extra</th>
                    <th className="border border-slate-200 px-4 py-3 text-left dark:border-slate-700">Descuento adicional</th>
                    <th className="border border-slate-200 px-4 py-3 text-left dark:border-slate-700">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {empleados.map((emp) => (
                    <tr
                      key={emp.id_empleado}
                      className="border-b border-slate-200 bg-white text-slate-950 last:border-b-0 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    >
                      <td className="px-4 py-3">
                        <div className="font-semibold">{emp.nombre}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{emp.id_empleado}</div>
                      </td>
                      <td className="px-4 py-3">{emp.cargo}</td>
                      <td className="px-4 py-3">${emp.sueldo}</td>

                      <td className="px-4 py-3">
                        <input
                          type="number"
                          className="w-20 rounded-lg border border-slate-300 bg-slate-50 px-2 py-1 text-slate-950 outline-none transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                          onChange={(e) =>
                            setExtras((prev) => ({
                              ...prev,
                              [emp.id_empleado]: {
                                horas: Number(e.target.value),
                                descuento: prev[emp.id_empleado]?.descuento || 0,
                              },
                            }))
                          }
                        />
                      </td>

                      <td className="px-4 py-3">
                        <input
                          type="number"
                          className="w-20 rounded-lg border border-slate-300 bg-slate-50 px-2 py-1 text-slate-950 outline-none transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                          onChange={(e) =>
                            setExtras((prev) => ({
                              ...prev,
                              [emp.id_empleado]: {
                                horas: prev[emp.id_empleado]?.horas || 0,
                                descuento: Number(e.target.value),
                              },
                            }))
                          }
                        />
                      </td>

                      <td className="px-4 py-3">
                        <button
                          onClick={() => abrirEditar(emp)}
                          className="text-sky-600 transition hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-200"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {mostrarEditar && (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
            <h3 className="mb-4 text-lg font-bold text-slate-950 dark:text-slate-100">Editar empleado</h3>

            {msg && <p className="mb-4 text-red-600 dark:text-red-400">{msg}</p>}

            <input
              value={editNombre}
              onChange={(e) => setEditNombre(e.target.value)}
              className="mb-3 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-950 outline-none transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />

            <input
              value={editCargo}
              onChange={(e) => setEditCargo(e.target.value)}
              className="mb-3 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-950 outline-none transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />

            <input
              type="number"
              value={editSueldo}
              onChange={(e) => setEditSueldo(Number(e.target.value))}
              className="mb-4 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-950 outline-none transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />

            <button
              onClick={guardarEdicion}
              className="rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
