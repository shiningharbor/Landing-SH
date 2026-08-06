"use client"

import db from "@/db/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useState } from 'react';
import * as XLSX from 'xlsx';

interface register {
    id: number;
    nombre: string;
    apellidos: string;
    empresa: string;
    cargo: string;
    correo: string;
    telefono: number;
    fecha?: number | string;
}

export default function Registers() {

    const [registers, setRegisters] = useState<register[]>([]);

    const getRegisters = async (collectionName: string) => {
        const userCollection = collection(db, collectionName)
        // const q = query(userCollection, orderBy("sumResult", "desc"), orderBy("timeTaken"))
        const userDocs = await getDocs(userCollection)
        const registerList = userDocs.docs.map((doc, i) => {
            const { nombre, apellidos, empresa, cargo, correo, telefono, fecha } = doc.data()
            const fechaMod = fecha ? new Date(fecha).toISOString().split('T')[0] : '' 
            return { id: i + 1, nombre, apellidos, empresa, cargo, correo, telefono, fecha: fechaMod }
        }) as register[]
        // const fecha = new Date(registerList[0].fecha)
        // console.log(fecha.toLocaleDateString());
        // const parseFecha = registerList.map((doc) => {
        //     let fecha
        //     if (doc.fecha) {
        //         fecha = new Date(doc.fecha).toLocaleDateString()
        //     } else {
        //         fecha = ''
        //     }
        //     return {
        //         ...doc,
        //         fecha
        //     }
        // })
        console.log(registerList);
        setRegisters(registerList)
    }

    const getExcel = () => {
        // Convertir datos a hoja de trabajo
        const ws = XLSX.utils.json_to_sheet(registers);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Datos");

        // Generar archivo Excel y descargar
        XLSX.writeFile(wb, 'Reporte.xlsx');

    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-6xl text-left text-sm my-3">
                {
                    registers.length > 0 ?
                        <div className="flex justify-center">
                            <table className="table-auto border-collapse border border-black bg-white shadow-lg">
                                <thead className="text-lg text-center bg-gray-200">
                                    <tr>
                                        <th className="border border-black p-2">ID</th>
                                        <th className="border border-black p-2">Nombre</th>
                                        <th className="border border-black p-2">Apellido</th>
                                        <th className="border border-black p-2">Organización</th>
                                        <th className="border border-black p-2">Cargo</th>
                                        <th className="border border-black p-2">Correo</th>
                                        <th className="border border-black p-2">Telefono</th>
                                        <th className="border border-black p-2">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registers.map((reg) => (
                                        <tr key={reg.id} className="text-center">
                                            <td className="border border-black p-2">{reg.id}</td>
                                            <td className="border border-black p-2">{reg.nombre}</td>
                                            <td className="border border-black p-2">{reg.apellidos}</td>
                                            <td className="border border-black p-2">{reg.empresa}</td>
                                            <td className="border border-black p-2">{reg.cargo}</td>
                                            <td className="border border-black p-2">{reg.correo}</td>
                                            <td className="border border-black p-2">{reg.telefono}</td>
                                            <td className="border border-black p-2">{reg.fecha}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        :
                        <p className="text-3xl text-center m-10">Aún no hay registros</p>
                }

                <div className="flex justify-center my-5 gap-5">
                    <button className="h-10 px-5 bg-yellow-200 rounded-xl text-black text-xl" onClick={() => getRegisters('Tech-Day-HP')}>
                        Registros
                    </button>
                    {registers.length > 0 &&
                        <button className="h-10 px-5 bg-yellow-200 rounded-xl text-black text-xl" onClick={getExcel}>
                            Exportar a Excel
                        </button>
                    }
                </div>
            </div>
        </main>
    );
}
