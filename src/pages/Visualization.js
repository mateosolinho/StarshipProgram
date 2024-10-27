import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Visualization = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const processedData = jsonData.slice(1).map(row => {
        const velocidadIFT1 = parseFloat(row[2]) || 0; 
        const velocidadIFT2 = parseFloat(row[14]) || 0; 
        const time = row[0]; 

        // Solo incluir filas con datos válidos en las columnas relevantes
        if (time && !isNaN(velocidadIFT1) && !isNaN(velocidadIFT2)) {
          return {
            'Velocidad IFT-1 (km/h)': velocidadIFT1,
            'Velocidad IFT-2 (km/h)': velocidadIFT2,
            'Tiempo (s)': time, 
          };
        } else {
          return null; // Retorna null si no es válido
        }
      }).filter(row => row !== null); // Filtra los nulls

      setData(processedData);
    };

    fetchData();
  }, []);

  return (
    <section id="visualization" className="p-10">
      <h2 className="text-4xl font-bold mb-4">Visualización de Datos</h2>
      <p className="text-lg mb-6">
        Nuestros datos de telemetría se visualizan a través de gráficos interactivos y análisis visual, lo que facilita la interpretación de resultados.
        Creamos paneles intuitivos que permiten a los ingenieros y científicos explorar los datos y obtener información valiosa.
      </p>

      {data.length > 0 ? (
        <div style={{ width: '100%', height: '400px' }}>
          <h3 className="text-2xl mb-2">Gráfico de Velocidad (km/h) IFT-1 vs IFT-2</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 0, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="Tiempo (s)" 
                tickCount={data.length * 2} // Incrementa el número de ticks
                tickFormatter={(value) => value} // Formato de los valores del eje X
                angle={0} // Rota las etiquetas a -45 grados
                textAnchor="end" // Ancla el texto al final para una mejor alineación
              />
              <YAxis />
              <Tooltip />
              <Legend align="center" style={{ marginBottom: '1000px' }} /> {/* Espacio adicional aquí */}
              <Line type="monotone" dataKey="Velocidad IFT-1 (km/h)" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Velocidad IFT-2 (km/h)" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </section>
  );
};

export default Visualization;
