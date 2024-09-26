import React, { useState, useEffect } from "react";
import FusionCharts from "fusioncharts";
import PowerCharts from "fusioncharts/fusioncharts.powercharts";
import TreeMap from "fusioncharts/fusioncharts.treemap";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, PowerCharts, TreeMap, FusionTheme);

const CarrierRateIncrease = ({ data, rateLoading }) => {
  const [sentimentDataSource, setSentimentDataSource] = useState({});
  const [carrierAverages, setCarrierAverages] = useState({});

  const seriesColor = ["#29FFFF", "#FFC58E", "#D5FF00", "#D486FF"]; 
  useEffect(() => {
    if (data?.length > 0) {
      const carriers = Object.keys(data[0]).filter((key) => key !== "year");

      const categories = data.map((data) => ({
        label: data.year.toString(),
      }));

      const dataset = carriers.map((carrier, index) => ({
        seriesname: carrier,
        showValues: "0",
        data: data.map((data) => ({
          value: data[carrier].toString(),
        })),
        color: seriesColor[index % seriesColor.length],
      }));

      const dataSource = {
        chart: {
          drawFullAreaBorder: true,
          palettecolors: seriesColor.join(", "),
          plotFillAlpha: "60",
          canvasBgColor: "#191A23",
          showAlternateHGridColor: "0",
          canvasBgAlpha: "100",
          legendBgAlpha: "0",
          legendBorderAlpha: "0",
          showLegend: true,
          showBorder: "0",
          numVDivLines: "8",
          bgColor: "#191A23",
          bgAlpha: "100",
          vDivLineAlpha: "100",
          divLineDashed: true,
          divLineAlpha: "100",
          theme: "candy",
          legendItemFontColor: "#fff",
          labelFontColor: "#fff",
          usePlotGradientColor: true,
          yAxisValueFontColor: "#fff",
          labelPadding: "15",
        },
        categories: [{ category: categories }],
        dataset: dataset,
      };

      setSentimentDataSource(dataSource);
      const averages = carriers.reduce((acc, carrier) => {
        const total = data.reduce((sum, data) => sum + data[carrier], 0);
        acc[carrier] = (total / data.length).toFixed(2); // average to 2 decimal places
        return acc;
      }, {});

      setCarrierAverages(averages);
    }
  }, [data]);

  return rateLoading ? (
    <div className="mb-4 flex flex-col w-[49%] p-6 bg-[#191A23] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] rounded-xl animate-pulse">
      <div className="h-5 bg-gray-700 rounded-md w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded-md w-2/3 mb-4"></div>
      <div className="h-48 bg-gray-700 rounded-md mb-4"></div>
      <div className="w-full flex justify-center gap-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center py-1 rounded-md text-white"
          >
            <div className="h-4 bg-gray-700 rounded-md w-16 mb-1"></div>
          </div>
        ))}
      </div>
    </div>
  ) : data?.length > 0 ? (
    <div className=" mb-8 flex flex-col w-[49%] p-6 bg-[#191A23] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] border border-[#85869833] rounded-2xl">
      <h4 className="font-semibold leading-7 text-lg mb-1">
        Carrier Rate Increase
      </h4>
      <p className="leading-7 font-normal text-base mb-2">
        Visualizing rate increase trends across major carriers
      </p>
      <div className="block">
        <ReactFC
          type="mssplinearea"
          width="100%"
          dataFormat="JSON"
          dataSource={sentimentDataSource}
        />
      </div>
      <div className="w-full flex justify-center gap-4">
        {data.length > 0 &&
          Object.keys(data[0])
            .filter((key) => key !== "year")
            .map((carrier, index) => (
              <div
                key={carrier}
                className="flex flex-col items-center py-1 rounded-md text-white"
              >
                <p style={{ color: seriesColor[index % seriesColor.length] }}>
                  {carrier}
                </p>
                <p className="text-[10px]">Avg. Yearly increase:</p>
                <p>{carrierAverages[carrier] || 0}%</p>
              </div>
            ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CarrierRateIncrease;
