// src/components/StackedAreaChart.tsx
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StackedAreaChart: React.FC = () => {
  const options = {
    chart: {
      type: 'area',
    },
    title: {
      text: '',
    },
    yAxis: {
      title: {
        text: 't',
      },
      min: 0,
      max: 3500,
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%Y/%m}',
      },
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        marker: {
          enabled: false,
        },
      },
      series: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: 'Scope 1 / Switch to Biodiesel',
        data: [
          [Date.UTC(2025, 0, 1), 1000],
          [Date.UTC(2026, 0, 1), 900],
          [Date.UTC(2027, 0, 1), 800],
          [Date.UTC(2028, 0, 1), 700],
          [Date.UTC(2029, 0, 1), 600],
          [Date.UTC(2030, 0, 1), 500],
          [Date.UTC(2031, 0, 1), 400],
        ],
        type: 'area',
        color: '#2EC276',
        fillOpacity: 0.2,
      },
      {
        name: 'Scope 2 / Switch to renewable energy / photovoltaics',
        data: [
          [Date.UTC(2025, 0, 1), 900],
          [Date.UTC(2026, 0, 1), 850],
          [Date.UTC(2027, 0, 1), 800],
          [Date.UTC(2028, 0, 1), 750],
          [Date.UTC(2029, 0, 1), 700],
          [Date.UTC(2030, 0, 1), 650],
          [Date.UTC(2031, 0, 1), 600],
        ],
        type: 'area',
        color: '#0099FF',
        fillOpacity: 0.2,
      },
      {
        name: 'Scope 3 / Business Trip / Switch to Battery Electric Vehicle / Cars (by size)',
        data: [
          [Date.UTC(2025, 0, 1), 700],
          [Date.UTC(2026, 0, 1), 650],
          [Date.UTC(2027, 0, 1), 600],
          [Date.UTC(2028, 0, 1), 550],
          [Date.UTC(2029, 0, 1), 500],
          [Date.UTC(2030, 0, 1), 450],
          [Date.UTC(2031, 0, 1), 400],
        ],
        type: 'area',
        color: '#DD243B',
        fillOpacity: 0.2,
      },
      {
        name: 'Scope 3 / Delivery Vehicles / Switch to Battery Electric Vehicle',
        data: [
          [Date.UTC(2025, 0, 1), 600],
          [Date.UTC(2026, 0, 1), 550],
          [Date.UTC(2027, 0, 1), 500],
          [Date.UTC(2028, 0, 1), 450],
          [Date.UTC(2029, 0, 1), 400],
          [Date.UTC(2030, 0, 1), 350],
          [Date.UTC(2031, 0, 1), 300],
        ],
        type: 'area',
        color: '#ff80ed',
        fillOpacity: 0.2,
      },
      {
        name: 'With Measures',
        data: [
          [Date.UTC(2025, 0, 1), 3200],
          [Date.UTC(2026, 0, 1), 2950],
          [Date.UTC(2027, 0, 1), 2700],
          [Date.UTC(2028, 0, 1), 2450],
          [Date.UTC(2029, 0, 1), 2200],
          [Date.UTC(2030, 0, 1), 1950],
          [Date.UTC(2031, 0, 1), 1700],
        ],
        type: 'line',
        color: '#2caffe',
      },
      {
        name: 'Without Measures',
        data: [
          [Date.UTC(2025, 0, 1), 3200],
          [Date.UTC(2026, 0, 1), 3200],
          [Date.UTC(2027, 0, 1), 3200],
          [Date.UTC(2028, 0, 1), 3200],
          [Date.UTC(2029, 0, 1), 3200],
          [Date.UTC(2030, 0, 1), 3200],
          [Date.UTC(2031, 0, 1), 3200],
        ],
        type: 'line',
        dashStyle: 'Dash',
        color: 'red',
      },
      {
        name: 'Target',
        data: [
          [Date.UTC(2025, 0, 1), 2000],
          [Date.UTC(2031, 0, 1), 2000],
        ],
        type: 'line',
        dashStyle: 'Dash',
        color: 'orange',
      },
    ],
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StackedAreaChart;
