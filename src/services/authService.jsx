import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; 

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { 
            username, 
            password 
        });

        return response.data;

    } catch (error) {
        console.error("Error en el login:", error.response || error);
        if (error.response && error.response.status === 401) {
            throw new Error("Contraseña o nombre de usuario incorrecto, verifica tu usuario y contraseña.");
        } else {
            throw new Error("Error de conexión al servidor o al intentar iniciar sesión.");
        }
    }
};

// 💡 FUNCIÓN DE REGISTRO
export const register = async (username, email, password) => {
    try {
        const response = await axios.post(API_BASE_URL + '/register', {
            username,
            email, // Asegúrate de enviar el campo email, que es requerido por el backend
            password 
        });
        return response.data; // Mensaje de éxito del backend
    } catch (error) {
        // Lanza el error para que el componente Register lo maneje (ej: usuario duplicado)
        throw error;
    }
};

export const logout = () => {

    console.log("Logout no implementado.");
};