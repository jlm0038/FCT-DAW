
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { register } from '../services/authService';

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await register(username, email, password); 
            
            setMessage(response || '¡Registro exitoso! Redirigiendo a Iniciar Sesión...');
        
            setTimeout(() => navigate('/login'), 2500); 
            
        } catch (error) {
            const errorMessage = error.response?.data || error.message || 'Error desconocido al registrar.';
            setMessage(errorMessage);
            console.error('Error de registro', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '30px', maxWidth: '400px', margin: '50px auto', border: '1px solid #28a745', borderRadius: '8px', boxShadow: '0 4px 8px rgba(40, 167, 69, 0.2)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#28a745' }}>Crear Cuenta</h2>
            
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                <div>
                    {/* usuario */}
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                
                {/* correo */}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                
                {/*Contraseña */}
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                
                <button type="submit" disabled={loading} style={{ 
                    marginTop: '20px', 
                    padding: '12px 25px', 
                    backgroundColor: loading ? '#6c757d' : '#28a745', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '16px'
                }}>
                    {loading ? 'Procesando...' : 'Registrar'}
                </button>
                {message && (
                    <p style={{ color: message.startsWith('¡Registro') ? 'green' : 'red', textAlign: 'center', marginTop: '15px', fontWeight: 'bold' }}>
                        {message}
                    </p>
                )}
            </form>
            
            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Iniciar Sesión</Link>
            </p>
        </div>
    );
}

export default Register;