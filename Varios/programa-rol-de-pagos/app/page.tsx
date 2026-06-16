"use client";

import Button from "./Button";
import { useState } from "react";
import RolDePago from "./RolDePago";
import { obtenerRolDePago } from "@/services/rolPagoService";

export default function Home() {
  const [mostrar, setMostrar] = useState(false);
  const [roles, setRoles] = useState(obtenerRolDePago());

  function actualizarRoles() {
    setRoles([...obtenerRolDePago()]);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-100 px-5 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Sistema de pagos Centralino</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              Visualiza los roles de pago guardados de forma clara y ordenada.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setMostrar(true)}
              bgColor="bg-emerald-700"
              hoverColor="hover:bg-emerald-700/80"
              title="Generar rol de pago"
            />
          </div>
        </header>

        {mostrar && <RolDePago setMostrar={setMostrar} actualizarRoles={actualizarRoles} />}

        <div className="mt-8 flex flex-col gap-5">
          {roles.map((element) => {
            const totalMes = element.empleados.reduce(
              (total, empleado) => total + empleado.total_neto,
              0
            );

            return (
              <section
                key={element.id_mes}
                className="overflow-x-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
              >
                <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-lg font-bold text-slate-950 dark:text-slate-100">
                    {element.mes_nombre}
                  </span>

                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-slate-800 dark:text-emerald-300">
                    ${totalMes.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <table className="min-w-full border-separate border-spacing-0">
                  <thead className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300">
                    <tr>
                      <th className="border border-slate-200 px-4 py-3 text-left font-semibold dark:border-slate-700">
                        Nombre
                      </th>
                      <th className="border border-slate-200 px-4 py-3 text-left font-semibold dark:border-slate-700">
                        Cargo
                      </th>
                      <th className="border border-slate-200 px-4 py-3 text-right font-semibold dark:border-slate-700">
                        Sueldo
                      </th>
                      <th className="border border-slate-200 px-4 py-3 text-right font-semibold dark:border-slate-700">
                        Aumentos
                      </th>
                      <th className="border border-slate-200 px-4 py-3 text-right font-semibold dark:border-slate-700">
                        Descuentos
                      </th>
                      <th className="border border-slate-200 px-4 py-3 text-right font-semibold dark:border-slate-700">
                        Total
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {element.empleados.map((empleado) => (
                      <tr
                        key={empleado.id_empleado}
                        className="border-b border-slate-200 bg-white text-slate-950 last:border-b-0 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      >
                        <td className="px-4 py-3">{empleado.nombre}</td>
                        <td className="px-4 py-3">{empleado.cargo}</td>
                        <td className="px-4 py-3 text-right text-slate-700 dark:text-slate-400">
                          ${empleado.sueldo.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-4 py-3 text-right text-emerald-600 dark:text-emerald-300">
                          +${empleado.aumentos.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-4 py-3 text-right text-red-600 dark:text-red-400">
                          -${empleado.descuentos.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-4 py-3 text-right text-emerald-700 dark:text-emerald-300">
                          ${empleado.total_neto.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
