import React from 'react';
import FusionCharts from 'fusioncharts';
import ReactFusioncharts from 'react-fusioncharts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Resolve charts dependencies
ReactFusioncharts.fcRoot(FusionCharts, Widgets, FusionTheme);

const GaugeChart = ({chartData}) => {

  const chartConfigs = {
    type: 'angulargauge', // The chart type
    width: '500', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data format
    dataSource: {
      chart: {
        caption: 'Speedometer',
        lowerLimit: chartData?.data.lowerlimit,
        upperLimit: chartData?.data.upperlimit,
        showValue:  chartData?.data.value,
        theme: 'fusion',
      },
      colorRange: {
        color: [
          {
            minValue: '0',
            maxValue: '50',
            code: '#F2726F',
          },
          {
            minValue: '50',
            maxValue: '75',
            code: '#FFC533',
          },
          {
            minValue: '75',
            maxValue: '100',
            code: '#62B58F',
          },
        ],
      },
      dials: {
        dial: [
          {
            value: chartData.data.value,
          },
        ],
      },
    },
  };

  return (
  <ReactFusioncharts {...chartConfigs} />
  
  );
};

export default GaugeChart;