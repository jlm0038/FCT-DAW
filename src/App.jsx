import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx'; 
import Register from './components/Register.jsx';

function App() {
  return (
    <BrowserRouter> 
      <div className="App">
        <Routes>
          {/* Ruta Login */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          
          {/* RUTA  REGISTRO */}
          <Route path="/registro" element={<Register />} /> 
  
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;