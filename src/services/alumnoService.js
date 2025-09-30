import axios from "axios";

const API_URL = "http://localhost:8080/api/alumnos";

// Listar todos losa lumnos
export const listarAlumnos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al listar alumnos:", error);
    return [];
  }
};

// Crear un alumno
export const crearAlumno = async (alumno) => {
  try {
    const response = await axios.post(API_URL, alumno);
    return response.data;
  } catch (error) {
    console.error("Error al crear alumno:", error);
  }
};

// Actualizar un alumno
export const actualizarAlumno = async (id, alumno) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, alumno);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar alumno:", error);
  }
};

// Eliminar un alumno
export const eliminarAlumno = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error al eliminar alumno:", error);
  }
};