import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Mission from './pages/Mission';
import Extraction from './pages/Extraction';
import Visualization from './pages/Visualization';

const App = () => {
  return (
    <Router>
      <div 
        className="bg-black text-white min-h-screen flex flex-col items-center relative" 
        style={{ backgroundImage: 'url(/fondo.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Capa superpuesta oscura - Overlay oscuro solo sobre el fondo */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        {/* Contenedor principal */}
        <div className="relative z-10 w-full flex-grow flex flex-col items-center">
          {/* Barra de navegación */}
          <nav className="w-full flex items-center px-10 py-5 text-lg">
            <div className="flex items-center">
              <Link to="/" className="font-bold text-2xl">Starship Program</Link>
            </div>
            <div className="flex gap-10 mx-auto">
              <Link to="/mission" className="hover:text-gray-400 transition duration-300">Misión</Link>
              <Link to="/extraction" className="hover:text-gray-400 transition duration-300">Extracción</Link>
              <Link to="/visualization" className="hover:text-gray-400 transition duration-300">Visualización</Link>
            </div>
          </nav>

          {/* Definición de Rutas */}
          <Routes>
            <Route path="/mission" element={<Mission />} />
            <Route path="/extraction" element={<Extraction />} />
            <Route path="/visualization" element={<Visualization />} />
            <Route path="/" element={
              <header className="flex-grow flex flex-col justify-center items-center text-center px-10">
                <h1 className="text-5xl font-bold mb-4">Bienvenido al Starship Program</h1>
                <p className="text-xl max-w-2xl">
                  Descubre más sobre nuestra misión de análisis de datos de telemetría en las pruebas de vuelo de Starship.
                </p>
              </header>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
