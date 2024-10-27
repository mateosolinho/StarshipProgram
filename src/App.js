import React from 'react';

const App = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center">
      {/* Barra de navegación */}
      <nav className="w-full flex justify-between px-10 py-5 text-lg">
        <div className="font-bold text-2xl">Starship Program</div>
        <div className="flex gap-5">
          <a href="#mission" className="hover:text-gray-400">Misión</a>
          <a href="#extraction" className="hover:text-gray-400">Extracción</a>
          <a href="#visualization" className="hover:text-gray-400">Visualización</a>
        </div>
        <button className="hover:text-gray-400">Modo Día</button>
      </nav>

      {/* Contenido Principal */}
      <header className="flex-grow flex flex-col justify-center items-center text-center px-10">
        <h1 className="text-5xl font-bold mb-4">Bienvenido al Starship Program</h1>
        <p className="text-xl max-w-2xl">
          Descubre más sobre nuestra misión de análisis de datos de telemetría en las pruebas de vuelo de Starship.
        </p>
      </header>

      {/* Fondo */}
      <div
  className="fixed top-0 left-0 w-full h-full bg-cover bg-center opacity-30"
  style={{ backgroundImage: "url('/GPaXWoga0AccBpr.jpeg')" }}
></div>
    </div>
  );
}

export default App;
