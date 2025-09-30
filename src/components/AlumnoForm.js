/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AlumnoForm({ fetchAlumnos, editingAlumno, setEditingAlumno }) {
  const [alumno, setAlumno] = useState({ nombre: '', apellidos: '', email: '', curso: '' });
  const apiUrl = 'http://localhost:8080/api/alumnos';

  useEffect(() => {
    if (editingAlumno) {
      setAlumno(editingAlumno);
    } else {
      setAlumno({ nombre: '', apellidos: '', email: '', curso: '' });
    }
  }, [editingAlumno]);

  const handleChange = (e) => {
    setAlumno({ ...alumno, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (alumno.id) {
      // Actualizar
      axios.put(`${apiUrl}/${alumno.id}`, alumno)
        .then(() => {
          fetchAlumnos();
          setEditingAlumno(null);
        });
    } else {
      // Crear
      axios.post(apiUrl, alumno)
        .then(() => fetchAlumnos());
    }
    setAlumno({ nombre: '', apellidos: '', email: '', curso: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" value={alumno.nombre} onChange={handleChange} placeholder="Nombre" required />
      <input name="apellidos" value={alumno.apellidos} onChange={handleChange} placeholder="Apellidos" required />
      <input name="email" value={alumno.email} onChange={handleChange} placeholder="Email" required />
      <input name="curso" value={alumno.curso} onChange={handleChange} placeholder="Curso" required />
      <button type="submit">{alumno.id ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
}

export default AlumnoForm; 

*/

import React, { useEffect, useState } from 'react';
import * as AlumnoService from '../services/alumnoService'; // Importa el servicio

function AlumnoForm({ fetchAlumnos, editingAlumno, setEditingAlumno }) {
  const [alumno, setAlumno] = useState({ 
    nombre: '', 
    apellidos: '', 
    email: '', 
    curso: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Nuevo estado de envío
  const [error, setError] = useState(null); // Nuevo estado de error

  // Lógica para precargar datos si estamos editando
  useEffect(() => {
    if (editingAlumno) {
      setAlumno(editingAlumno);
      setError(null);
    } else {
      setAlumno({ nombre: '', apellidos: '', email: '', curso: '' });
    }
  }, [editingAlumno]);

  const handleChange = (e) => {
    setAlumno({ ...alumno, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (alumno.id) {
        // Actualizar
        await AlumnoService.actualizarAlumno(alumno.id, alumno);
      } else {
        // Crear
        await AlumnoService.crearAlumno(alumno);
      }
      
      // Si todo es exitoso:
      fetchAlumnos(); // Refresca la lista en el padre
      setEditingAlumno(null); // Sale del modo edición
      setAlumno({ nombre: '', apellidos: '', email: '', curso: '' }); // Limpia el formulario
      
    } catch (err) {
      // Manejo del error
      setError(`Error al guardar alumno: ${err.message}`);
      console.error("Detalle del error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{alumno.id ? 'Editar Alumno' : 'Crear Nuevo Alumno'}</h3>
      
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra error */}

      <input name="nombre" value={alumno.nombre} onChange={handleChange} placeholder="Nombre" required />
      <input name="apellidos" value={alumno.apellidos} onChange={handleChange} placeholder="Apellidos" required />
      <input name="email" value={alumno.email} onChange={handleChange} placeholder="Email" required />
      <input name="curso" value={alumno.curso} onChange={handleChange} placeholder="Curso" required />
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : alumno.id ? 'Actualizar' : 'Crear'}
      </button>
      
      {editingAlumno && (
        <button type="button" onClick={() => setEditingAlumno(null)}>
          Cancelar Edición
        </button>
      )}
    </form>
  );
}

export default AlumnoForm;