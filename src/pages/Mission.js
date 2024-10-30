import React from 'react';

const MissionPage = () => {
  return (
    <div className="p-10">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">Nuestra Misión</h1>
        <p className="text-lg max-w-2xl mx-auto">
          En nuestro proyecto, nos dedicamos a innovar y proporcionar soluciones efectivas para la captura de datos de telemetría. 
          Nuestro compromiso es mejorar constantemente y hacer una diferencia en la industria.
        </p>
      </header>

      <section className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Nuestra Historia</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Comenzamos con la idea de utilizar tecnologías avanzadas para optimizar la captura de datos durante las pruebas de vuelo. 
          Desde entonces, hemos crecido y enfrentado varios desafíos, siempre aprendiendo y mejorando.
        </p>
      </section>

      <section className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Objetivos a Largo Plazo</h2>
        <ul className="list-disc list-inside max-w-2xl mx-auto">
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
          <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex</li>
          <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li>
        </ul>
      </section>
      
      <section className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Conoce al Equipo</h2>
        <div className="flex justify-center space-x-10">
          {/* Miembro 1 */}
          <a href="https://link-a-perfil1.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-4 rounded-lg text-center">
            <img src="ruta/a/tu/imagen1.jpg" alt="Miembro del equipo" className="rounded-full mb-2 w-52 h-32 mx-auto" />
            <h3 className="font-semibold">Nombre 1</h3>
            <p>Rol en el equipo</p>
          </a>
          {/* Miembro 2 */}
          <a href="https://link-a-perfil2.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-4 rounded-lg text-center">
            <img src="ruta/a/tu/imagen2.jpg" alt="Miembro del equipo" className="rounded-full mb-2 w-52 h-32 mx-auto" />
            <h3 className="font-semibold">Nombre 2</h3>
            <p>Rol en el equipo</p>
          </a>
        </div>
      </section>


      {/* <section className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Logros</h2>
        <ul className="list-disc list-inside max-w-2xl mx-auto">
          <li>Desarrollo de nuestra primera plataforma de captura de datos.</li>
          <li>Colaboración con empresas líderes en el sector.</li>
          <li>Presentación en conferencias internacionales.</li>
        </ul>
      </section>

      <section className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Galería</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <img src="ruta/a/tu/imagen4.jpg" alt="Descripción de la imagen" className="rounded-lg shadow-lg" />
          <img src="ruta/a/tu/imagen5.jpg" alt="Descripción de la imagen" className="rounded-lg shadow-lg" />
          <img src="ruta/a/tu/imagen6.jpg" alt="Descripción de la imagen" className="rounded-lg shadow-lg" />
        </div>
      </section> */}
    </div>
  );
};

export default MissionPage;
