import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

FusionCharts.options.license({
  key: "AA-65A15wje1E5C1E4B1A17B8A3D3C2A1B3D1E2gvxC3E5qyuiI-7B6B1mA-13tF5H2E4J2A4D4C4C6E2D1F4E1D1A7C8A3cE-11B-9F2A2H2vB2D3D2knyE1C3C11gapB4E4D4kH-7C-21D7E4F4C1H5G1G1I4B6C1E3pzzC1G4AB3zD-13mD1D3G4dwB14XB6C6mmC-8D3J2A9B2C1E7B5F1C4G4B1A9B11B2d==",
  creditLabel: false,
});

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
const SpiderChart = () => {
  const chartData = {
    chart: {
      theme: "fusion",
      baseFontColor: "#FFFFFF",
      baseFontSize: "18",
      baseFont: "MONTSERRAT, sans-serif",
      bgColor: "#181921",
      showlegend: "0",
      showdivlinevalues: "1",
      showlimits: "0",
      showvalues: "1",
      plotfillalpha: "40",
      plotFillColor: "#1A8DBE",
      showPlotBorder: "1",
      plotBorderColor: "#1A8DBE",
      plotBorderThickness: "2",
      radarFillColor: "#181921",
      drawAnchors: "1",
      anchorBgColor: "#1A8DBE",
      valueFontColor: "#1A8DBE",
    },
    categories: [
      {
        category: [
          {
            label: "DAS",
          },
          {
            label: "Oversize Package",
          },
          {
            label: "Additional Handling",
          },
          {
            label: "Address Correction",
          },
          {
            label: "Fuel",
          },
          {
            label: "EDAS",
          },
        ],
      },
    ],
    dataset: [
      {
        seriesname: "Ground",
        data: [
          {
            value: "36",
            displayValue: "36%",
          },
          {
            value: "80",
            displayValue: "80%",
          },
          {
            value: "84",
            displayValue: "84%",
          },
          {
            value: "92",
            displayValue: "92%",
          },
          {
            value: "92",
            displayValue: "92%",
          },
          {
            value: "66",
            displayValue: "66%",
          },
        ],
      },
    ],
  };
  return (
    <div className="w-full">
      <ReactFC
        key={`spider-overview`}
        {...{
          type: "radar",
          width: "100%",
          height: "100%",
          dataFormat: "JSON",
          dataSource: chartData,
        }}
      />
    </div>
  );
};

export default SpiderChart;
