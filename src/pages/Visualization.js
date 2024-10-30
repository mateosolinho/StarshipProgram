import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const Visualization = ({ configs }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const allData = configs.map(config => {
        return jsonData.slice(1).map(row => {
          const time = row[config.timeIndex];
          const values = config.valueIndexes.map(index => parseFloat(row[index]) || 0);

          if (time && values.every(value => !isNaN(value))) {
            return {
              'Tiempo (s)': time,
              ...values.reduce((acc, value, i) => {
                acc[config.labels[i]] = value;
                return acc;
              }, {}),
            };
          }
          return null;
        }).filter(row => row !== null);
      });

      setData(allData);
    };

    fetchData();
  }, [configs]);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
  };

  return (
    <section id="visualization" className="p-10 w-full">
      <h2 className="text-4xl font-bold mb-4 text-center">Visualización de Datos</h2>
      <p className="text-lg mb-6 max-w-4xl mx-auto text-center">
        Nuestros datos de telemetría se visualizan a través de gráficos interactivos, facilitando la interpretación de resultados.
      </p>

      {data.length > 0 ? (
        <Slider {...sliderSettings}>
          {data.map((chartData, index) => (
            <div key={index} className="px-4">
              <h3 className="text-2xl mb-4 text-center">{configs[index].chartTitle}</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData} margin={{ top: 0, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Tiempo (s)" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {configs[index].labels.map((label, i) => (
                    <Line key={i} type="monotone" dataKey={label} stroke={configs[index].lineColors[i]} strokeWidth={1} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center">Cargando datos...</p>
      )}
    </section>
  );
};

export default Visualization;
