import React, { useState, useEffect } from "react";
import FusionCharts from "fusioncharts";
import PowerCharts from "fusioncharts/fusioncharts.powercharts";
import TreeMap from "fusioncharts/fusioncharts.treemap";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
import CarrierRateIncrease from "./CarrierRateIncrease";

ReactFC.fcRoot(FusionCharts, PowerCharts, TreeMap, FusionTheme);
const transformData = (data) => {
  const result = {};

  for (const company in data) {
    result[company] = {
      seriesname: company,
      data: data[company].map((item) => ({
        value: item.score.toString(),
      })),
    };
  }

  return result;
};

const CustomerSentiment = ({
  data,
  rateIncrease,
  sentimentLoading,
  rateLoading,
  replacedCarrier
}) => {
  const [sentimentDataSource, setSentimentDataSource] = useState({});
  const [selectedCompany, setSelectedCompany] = useState(Object.keys(data)[0]);
  const companyData = transformData(data);
  useEffect(() => {
    if (Object.keys(data)?.length > 0 && selectedCompany) {
      const dataSource = {
        chart: {
          theme: "candy",
          showlegend: "0",
          showBorder: "0",
          bgColor: "#191A23",
          bgAlpha: "100",
          labelFontColor: "#fff",
          plotFillColor: "#4BA8FF",
          showLegend: true,
          legendBgAlpha: "0",
          legendBorderAlpha: "0",
          showdivlinevalues: "0",
          showlimits: "0",
          radarFillAlpha: "0",
          showvalues: "1",
          plotfillalpha: "40",
          legendItemFontColor: "#fff",
          anchorAlpha: "0",
          valueFontColor: "#b7b7b7",
        },
        categories: [
          {
            category: data[selectedCompany].map((item) => ({
              label: item.attribute,
            })),
          },
        ],
        dataset: companyData ? [companyData[selectedCompany]] : [],
      };

      setSentimentDataSource(dataSource);
    }
  }, [selectedCompany, data]);
  useEffect(() => {
    if (Object.keys(data)?.length > 0) {
      setSelectedCompany(Object.keys(data)[0]);
    }
  }, [data]);

  return (
    <div className="flex w-full mt-8 mb-0 justify-between">
      {sentimentLoading ? (
        <div className="mb-4 flex flex-col w-[49%] p-6 bg-[#191A23] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] animate-pulse border border-[#85869833] rounded-2xl">
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
      ) : Object.keys(data)?.length > 0 ? (
        <div className="mb-8 flex flex-col w-[49%] p-6 bg-[#191A23] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] border border-[#85869833] rounded-2xl">
          <h4 className="font-semibold leading-7 text-lg mb-1">
            Customer Sentiment
          </h4>
          <p className="leading-7 font-normal text-base mb-2">
            Visualizing how customers experience the different carriers
          </p>
          <div className="block">
            <ReactFC
              type="radar"
              width="100%"
              dataFormat="JSON"
              dataSource={sentimentDataSource}
            />
            <div className="w-full flex flex-wrap justify-center gap-2">
              {Object.keys(companyData).map((key) => {
                return (
                  <div
                    onClick={() => {
                      setSelectedCompany(key);
                    }}
                    className={`py-1 px-2 cursor-pointer rounded-md border-[1px] text-white
                    ${key === selectedCompany ? "bg-[#2294FF1A] border-[#2294FF99]" : "bg-transparent border-[#85869833]"}`}
                  >
                    {key}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <CarrierRateIncrease data={rateIncrease} rateLoading={rateLoading} replacedCarrier={replacedCarrier}/>
    </div>
  );
};

export default CustomerSentiment;
