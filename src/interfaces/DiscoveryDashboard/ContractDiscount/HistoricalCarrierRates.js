import React, { useState, useEffect } from "react";
import FusionCharts from "fusioncharts";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependency
Charts(FusionCharts);

const CarrierDiscount = ({
  dataLoading,
  historicData
}) => {
  const [historicalDataSource, setHistoricalDataSource] = useState({});
  const [selectedCompany, setSelectedCompany] = useState(Object.keys(historicData)[0]);
  const [selectedItem, setSelectedItem] = useState("Select an option");
  const [currentMenuItems, setCurrentMenuItems] = useState();
  const [currentServiceData, setCurrentServiceData] = useState();

  const generateChartData = (data) => {
    const categories = data?.map(entry => ({ label: entry?.year?.toString() }));
  
    const seriesNames = Object.keys(data[0].rates);
  
    const colors = [
      "#74BCFF", 
      "#D48EFA",
      "#74EFB4",
      "#FFCF75",
      "#FF9B9B"
    ];
  
    const dataset = seriesNames?.map((seriesname, index) => ({
      seriesname,
      color: colors[index % colors.length],
      data: data?.map(entry => ({ value: entry?.rates[seriesname]?.toFixed(2) }))
    }));
  
    return {
      categories: [{ category: categories }],
      dataset
    };
  }
  useEffect(() => {
    if (currentServiceData?.length > 0 && selectedCompany) {
      const generatedData = generateChartData(currentServiceData)
      const dataSource = {
        chart: {
          xaxisname: "",
          yaxisname: "",
          theme: "fusion",
          bgColor: "#181921",
          canvasBgColor: "#181921",
          canvasBaseColor: "#181921",
          canvasBgAlpha: "100",
          bgAlpha: "100",
          baseFontColor: "#FFFFFF",
          showAlternateHGridColor: "0",
          showAlternateVGridColor: "0",
          divLineColor: "#181921",
          canvasBorderColor: "#181921",
          showToolTip: "1",
          toolTipBgColor: "#000",
          toolTipBorderColor: "#000",
          toolTipColor: "#FFFFFF",
          toolTipPadding: "12",
          toolTipBorderRadius: "8",
          showValues: "0",
          labelPadding: "20",
          drawAnchors: "0",
          legendIconShape: "circle", 
          legendBgAlpha: "0",
          legendBorderAlpha: "0",
          legendShadow: "0",
          legendItemFontColor: "#858698",
          legendPosition: "bottom",
          legendIconScale: "1",
          canvasRightPadding: '10'          
        },
        categories: generatedData?.categories,
        dataset: generatedData?.dataset,
      };

      setHistoricalDataSource(dataSource);
    }
  }, [currentServiceData]);

  useEffect(() => {
    if (Object.keys(historicData)?.length > 0) {
      const currentCarrier = Object.keys(historicData)[0];
      setSelectedCompany(currentCarrier);
      const currentItems = Object.keys(historicData[`${currentCarrier}`])
      setCurrentMenuItems(currentItems)
      setSelectedItem(currentItems[0]);
      setCurrentServiceData(historicData[`${currentCarrier}`][`${currentItems[0]}`])
    }
  }, [historicData]);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setCurrentServiceData(historicData[`${selectedCompany}`][`${item}`])
  };

  return (
    <div className="flex w-full mt-8 mb-0 justify-between">
      {dataLoading ? (
        <div className="mb-4 flex flex-col w-full p-6 bg-[#191A23] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] animate-pulse border border-[#85869833] rounded-2xl">
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
      ) : Object.keys(historicData)?.length > 0 ? (
        <div className="mb-8 flex flex-col w-full p-6 bg-[#191A23] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] border border-[#85869833] rounded-2xl">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold leading-7 text-lg mb-1">
            Predicting Carrier Rates Based On Historic Data     
            </h4>
          </div>
          <div className="block">
            <div className="flex justify-between items-center">
              <div className="w-full flex flex-wrap justify-start gap-2 my-6">
                {Object.keys(historicData).map((key) => {
                  return (
                    <div
                      onClick={() => {
                        setSelectedCompany(key);
                        const currentItems = Object.keys(
                          historicData[`${key}`]
                        );
                        setCurrentMenuItems(currentItems);
                        setSelectedItem(currentItems[0]);
                        setCurrentServiceData(
                          historicData[`${key}`][`${currentItems[0]}`]
                        );
                      }}
                      className={`py-1 px-4 cursor-pointer rounded-md border-2 text-white text-base font-medium flex gap-2 justify-center items-center ${
                      key === selectedCompany
                        ? "bg-[#2294FF1A] border-[#2294FF99]"
                        : "bg-transparent border-[#85869833]"
                      }`}
                       style={{ width: '140px', height: '4vh' }} 
                      >
                      <img
                        src={`/partner-logo/${key.toLowerCase()}.png`}
                        alt={key}
                      />
                      {key}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center items-center gap-4">
                <div className="whitespace-nowrap text-lg font-normal">Service Type</div>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    className="!bg-[#191a23] text-white hover:!bg-gray-700 border rounded-lg w-[300px] text-left"
                  >
                    {selectedItem}
                  </MenuButton>
                  <MenuList className="bg-black border-gray-700 w-[300px]  !text-base !font-normal">
                    {currentMenuItems?.map((cur) => {
                      return <MenuItem
                      onClick={() => handleSelect(cur)}
                      className="hover:bg-gray-700 text-white"
                    >
                      {cur}
                    </MenuItem>
                    })}
                  </MenuList>
                </Menu>
              </div>
            </div>
            <div className="flex justify-center items-center h-[500px] mt-10">
            <ReactFusioncharts
              type="stackedarea2d"
              width="900"
              height="500"
              dataFormat="JSON"
              dataSource={historicalDataSource}
            />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CarrierDiscount;
