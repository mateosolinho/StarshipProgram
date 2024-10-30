import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const dataConfigs = [
  {
    timeIndex: 0,
    valueIndexes: [2, 14, 26, 38, 50],
    labels: ['Velocidad IFT-1 (km/h)', 'Velocidad IFT-2 (km/h)', 'Velocidad IFT-3 (km/h)', 'Velocidad IFT-4 (km/h)', 'Velocidad IFT-5 (km/h)'],
    lineColors: ['#82ca9d', '#ff7300', '#ff1200', '#ff3450', '#ff8980'],
    chartTitle: 'Gráfico 1',
    buttonLabel: 'general',
  },
  {
    timeIndex: 0,
    valueIndexes: [6, 18, 30, 42, 54],
    labels: ['Altura IFT-1 (m)', 'Altura IFT-2 (m)', 'Altura IFT-3 (m)', 'Altura IFT-4 (m)', 'Altura IFT-5 (m)'],
    lineColors: ['#82ca9d', '#ff7300', '#ff1200', '#ff3450', '#ff8980'],
    chartTitle: 'Gráfico 2',
    buttonLabel: 'general',
  },
  {
    timeIndex: 0,
    valueIndexes: [2],
    labels: ['Velocidad IFT-1 (km/h)'],
    lineColors: ['#82ca9d'],
    chartTitle: 'Gráfico 3',
    buttonLabel: 'IFT1',
  },
  {
    timeIndex: 12,
    valueIndexes: [14],
    labels: ['Velocidad IFT-2 (km/h)'],
    lineColors: ['#82ca9d'],
    chartTitle: 'Gráfico 4',
    buttonLabel: 'IFT2',
  },
  {
    timeIndex: 24,
    valueIndexes: [26],
    labels: ['Velocidad IFT-3 (km/h)'],
    lineColors: ['#ff3300'],
    chartTitle: 'Gráfico 5',
    buttonLabel: 'IFT3',
  },
  {
    timeIndex: 0,
    valueIndexes: [6, 18],
    labels: ['Altura IFT-1 (m)', 'Altura IFT-2 (m)'],
    lineColors: ['#82ca9d', '#ff7300'],
    chartTitle: 'Gráfico 6',
    buttonLabel: 'IFT2',
  },
];

const Visualization = () => {
  const [data, setData] = useState([]);
  const [selectedChart, setSelectedChart] = useState('general');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const allData = dataConfigs.map(config => {
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
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
  };

  const handleButtonClick = (chartType) => {
    setSelectedChart(chartType);
  };

  const filteredConfigs = dataConfigs.filter(config => 
    selectedChart === 'general' ? config.buttonLabel === 'general' : config.buttonLabel === selectedChart
  );

  return (
    <section id="visualization" className="p-10 w-full">
      <h2 className="text-4xl font-bold mb-4 text-center">Visualización de Datos</h2>
      <p className="text-lg mb-6 max-w-4xl mx-auto text-center">
        Nuestros datos de telemetría se visualizan a través de gráficos interactivos, facilitando la interpretación de resultados.
      </p>

      {/* Botones de selección */}
      <div className="flex justify-center mb-8 space-x-4">
        {['general','IFT1', 'IFT2', 'IFT3', 'IFT4', 'IFT5'].map((chartType) => (
          <button
            key={chartType}
            onClick={() => handleButtonClick(chartType)}
            className={`px-4 py-2 rounded-md font-semibold ${
              selectedChart === chartType ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            } hover:bg-blue-400`}
          >
            {chartType.toUpperCase()}
          </button>
        ))}
      </div>

      {filteredConfigs.length > 0 ? (
        <Slider {...sliderSettings}>
          {filteredConfigs.map((config, index) => {
            const chartData = data[index]; // Obtiene los datos correspondientes al gráfico
            return (
              <div key={index} className="px-4">
                <h3 className="text-2xl mb-4 text-center">{config.chartTitle}</h3>
                <ResponsiveContainer width="100%" height={500}>
                  <LineChart data={chartData} margin={{ top: 0, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Tiempo (s)" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {config.labels.map((label, i) => (
                      <Line key={i} type="monotone" dataKey={label} stroke={config.lineColors[i]} strokeWidth={1} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            );
          })}
        </Slider>
      ) : (
        <p className="text-center">Cargando datos...</p>
      )}
    </section>
  );
};

export default Visualization;
