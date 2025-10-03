import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { login } from '../services/authService';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

// ESTADO DEL LOGIN
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const handleLogin = async (e) => {
// PREVIENE LA RECARGA DE PÁGINA
    e.preventDefault(); 
    setLoading(true);
    setMessage('');

    try {
      await login(username, password);

      setIsLoggedIn(true);
      setMessage('¡Inicio de sesión exitoso! Redirigiendo...');
      
      setTimeout(() => {
        navigate('/v1/home');
      }, 1500); 
      
      // petición al backend fue exitosa (código 200 OK)
      setIsLoggedIn(true);
      setMessage('¡Inicio de sesión exitoso! Ahora puedes acceder a rutas protegidas.');
      
    } catch (error) {
      //SI FALLA EL LOGIN: 
      setIsLoggedIn(false);
      setMessage(error.message || 'Error al iniciar sesión.');
      console.error('Error de login', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>Iniciar Sesión</h2>
      
      {isLoggedIn ? (
        <div style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>
          <p>{message}</p>
          {<button 
                  onClick={() => navigate('/v1/home')}
                  style={{ marginTop: '10px', padding: '8px 15px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                  Ir a la Página Principal
              </button>}
        </div>
      ) : (
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>
          
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              marginTop: '20px', 
              padding: '12px 25px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            {loading ? 'Iniciando sesión...' : 'Entrar'}
          </button>
          
          {message && (
            <p style={{ color: 'red', textAlign: 'center', marginTop: '15px' }}>
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default Login;