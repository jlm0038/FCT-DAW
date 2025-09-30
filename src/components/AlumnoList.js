

import React, { useEffect, useState } from 'react';

//aqui se importa el alumnoService.js

import * as AlumnoService from '../services/alumnoService';
import AlumnoForm from './AlumnoForm';

function AlumnoList() {
  //ESTADOS
    const [alumnos, setAlumnos] = useState([]);
    const [editingAlumno, setEditingAlumno] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); // Para errores de carga inicial

    // FUNCIÓN DE LECTURA
    const fetchAlumnos = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await AlumnoService.listarAlumnos(); 
            setAlumnos(data);
        } catch (err) {
            console.error("Error al obtener alumnos:", err);
            setError("No se pudo conectar con el servidor o cargar los datos.");
        } finally {
            setIsLoading(false);
        }
    };

    // FUNCIÓN DE BORRAR
    const deleteAlumno = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este alumno?")) {
            try {
                await AlumnoService.eliminarAlumno(id); 

                 // Refresca la lista
                fetchAlumnos();
            } catch (err) {
                console.error("Error al eliminar alumno:", err);
                alert("Error al eliminar alumno.");
            }
        }
    };

    // EDITAR
    const editAlumno = (alumno) => {
        setEditingAlumno(alumno);
    };

    // EFECTO: 
    useEffect(() => {
        fetchAlumnos();
    }, []);

    // FUNCIÓN DE RENDERIZADO CONDICIONAL
    const renderTableOrMessage = () => {
        if (error) {
            return <p style={{ color: 'red' }}>Error de carga: {error}</p>;
        }

        if (isLoading) {
            return <p>Cargando lista de alumnos...</p>;
        }

        if (alumnos.length === 0) {
            return <p>No hay alumnos registrados. ¡Usa el formulario de arriba para crear uno!</p>;
        }
        
        // Renderizado de la tabla
        return (
            <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Curso</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {alumnos.map(alumno => (
                        <tr key={alumno.id}>
                            <td>{alumno.nombre}</td>
                            <td>{alumno.apellidos}</td>
                            <td>{alumno.email}</td>
                            <td>{alumno.curso}</td>
                            <td>
                                <button onClick={() => editAlumno(alumno)}>Editar</button>
                                <button onClick={() => deleteAlumno(alumno.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    // RENDERIZADO PRINCIPAL
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <AlumnoForm 
                fetchAlumnos={fetchAlumnos} 
                editingAlumno={editingAlumno} 
                setEditingAlumno={setEditingAlumno} 
            />

            <h2>Lista de Alumnos</h2>
            
            {renderTableOrMessage()} 

        </div>
    );
}

export default AlumnoList;