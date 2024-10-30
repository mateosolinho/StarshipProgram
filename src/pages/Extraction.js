import React from 'react';

const Extraction = () => {
  return (
    <section id="extraction" className="flex flex-col items-center justify-center p-10 text-center text-white">
      <h2 className="text-4xl font-bold mb-4">Extracción de Datos</h2>
      <p className="text-lg mb-8 max-w-2xl">
        Utilizamos tecnologías avanzadas para extraer datos de telemetría en tiempo real durante las pruebas de vuelo. 
        Esto incluye la captura de parámetros críticos como la velocidad, altitud y más, lo que nos permite tomar decisiones informadas.
      </p>
      <div className="flex justify-center w-full">
        <video
          className="rounded-lg shadow-lg w-full h-auto max-w-full max-h-[60vh]" // Ajuste de tamaño más grande
          autoPlay
          loop
          muted
        >
          <source src="demo.mp4" type="video/mp4" />
          Tu navegador no soporta video.
        </video>
      </div>
    </section>
  );
};

export default Extraction;
