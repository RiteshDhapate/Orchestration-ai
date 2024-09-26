import React, { useState, useEffect } from "react";
import FusionCharts from "fusioncharts";
import PowerCharts from "fusioncharts/fusioncharts.powercharts";
import TreeMap from "fusioncharts/fusioncharts.treemap";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

ReactFC.fcRoot(FusionCharts, PowerCharts, TreeMap, FusionTheme);

const CarrierDiscount = ({ dataLoading, discountData }) => {
  const [sentimentDataSource, setSentimentDataSource] = useState({});
  const [selectedCompany, setSelectedCompany] = useState(discountData?.[0]?.name);
  const [currentCarrier, setCurrentCarrier] = useState(discountData?.[0]);
  const [selectedItem, setSelectedItem] = useState(discountData?.[0]?.serviceTypes?.[0]?.name);
  const [serviceData, setServiceData] = useState(discountData?.[0]?.serviceTypes?.[0]?.discounts)

  function convertPercentageToNumber(value) {
    if (value === null || value === undefined || value === '') {
      return 0;
    }
    const numberValue = parseFloat(value.replace('%', ''));
    if (isNaN(numberValue)) {
      return 0;
    }
  
    return numberValue;
  }
  useEffect(() => {
    if (serviceData?.length > 0 && selectedCompany) {
      const dataSource = {
        chart: {
          theme: "candy",
          showlegend: "0",
          numberSuffix: "%",
          showBorder: "0",
          bgColor: "#191A23",
          bgAlpha: "100",
          labelFontColor: "#fff",
          plotFillColor: "#4BA8FF",
          legendBgAlpha: "0",
          legendBorderAlpha: "0",
          showdivlinevalues: "0",
          showlimits: "1",
          radarFillAlpha: "0",
          showvalues: "1",
          plotfillalpha: "40",
          legendItemFontColor: "#fff",
          toolTipBgColor: "#000",
          toolTipBorderColor: "#000",
          toolTipColor: "#fff",
          valueFontColor: "#1A8DBE",
          valueFontSize: "12",
          valueFontBold: '1',
          anchorBgColor: "#1A8DBE",
          anchorBorderColor: "#1A8DBE",
          showTooltip: "0",
          labelFontSize: "12"
        },
        categories: [
          {
            category: serviceData?.map((item) => ({
              label: item.type,
            })),
          },
        ],
        dataset: serviceData?.length > 0 ? [{seriesname: selectedItem, data: serviceData?.map(cur => {
          return {value: convertPercentageToNumber(cur?.value)}
        })}] : [],
      };

      setSentimentDataSource(dataSource);
    }
  }, [serviceData]);
  useEffect(() => {
    if (discountData?.length > 0) {
      setSelectedCompany(discountData?.[0]?.name);
      setCurrentCarrier(discountData?.[0])
      setSelectedItem(discountData?.[0]?.serviceTypes?.[0]?.name);
      setServiceData(discountData?.[0]?.serviceTypes?.[0]?.discounts)
    }
  }, [discountData]);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setServiceData(currentCarrier?.serviceTypes?.find(cur => cur?.name === item)?.discounts);
  };

  const totalSum = discountData?.reduce((acc, spend) => {
    // Remove '$' and 'M', then convert to a number
    const numericValue = parseFloat(spend?.totalSpend?.replace(/[$M]/g, ''));
    return acc + numericValue;
  }, 0);
  
  const formatNumber = (value, rounded) => {
    if (value === undefined || value === null || isNaN(Number(value))) {
      value = 0; // Default to 0 if invalid
    } else {
      value = Number(value); // Convert value to a number if it's a valid numeric string
    }

    const formatValue = (val, divisor, suffix) => {
      return {
        number: rounded
          ? Math.round(val / divisor)
          : (val / divisor).toFixed(1),
        suffix,
      };
    };

    if (value >= 1_000_000_000) {
      return formatValue(value, 1_000_000_000, "B");
    } else if (value >= 1_000_000) {
      return formatValue(value, 1_000_000, "MM");
    } else if (value >= 1_000) {
      return formatValue(value, 1_000, "K");
    }

    return {
      number: rounded ? Math.round(value) : value.toFixed(1),
      suffix: "",
    };
  };
  const totalSpend = formatNumber(totalSum * 1000000)
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
      ) : discountData?.length > 0 ? (
        <div className="mb-8 flex flex-col w-full p-6 bg-[#191A23] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] border border-[#85869833] rounded-2xl">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold leading-7 text-xl mb-1">
              Carrier Discounts
            </h4>
            <div className="text-[#74BCFF] text-xl font-medium">Total Spend ${totalSpend?.number} {totalSpend?.suffix}</div>
          </div>
          <div className="block">
            <div className="flex justify-between items-center">
              <div className="w-full flex flex-wrap justify-start gap-4 my-6">
                {discountData?.map((current) => {
                  return (
                    <div
                      onClick={() => {
                        setSelectedCompany(current?.name);
                        const currentCarrier = discountData?.find(cur => cur?.name === current?.name);
                        setCurrentCarrier(currentCarrier)
                        setSelectedItem(currentCarrier?.serviceTypes?.[0]?.name)
                        setServiceData(currentCarrier?.serviceTypes?.[0]?.discounts)
                      }}
                    className={`py-1 px-4 cursor-pointer rounded-md border-2 text-white text-base font-medium flex gap-2 justify-center items-center ${
                      current.name === selectedCompany
                        ? "bg-[#2294FF1A] border-[#2294FF99]"
                        : "bg-transparent border-[#85869833]"
                    }`}
                    style={{ width: '140px', height: '4vh' }} 
                    >
                      <img
                        src={`/partner-logo/${current?.name?.toLowerCase()}.png`}
                        alt={current?.name}
                      />
                      {current?.name}
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
                  <MenuList className="bg-black border-gray-700 w-[300px] text-white !text-base !font-normal">
                    {currentCarrier?.serviceTypes?.map(cur => {
                      return <MenuItem
                      onClick={() => {
                        handleSelect(cur?.name)
                      }}
                      className="hover:bg-gray-700 text-white text-base font-normal"
                    >
                      {cur?.name}
                    </MenuItem>
                    })}
                  </MenuList>
                </Menu>
              </div>
            </div>

            <ReactFC
              type="radar"
              width="100%"
              dataFormat="JSON"
              height="500"
              dataSource={sentimentDataSource}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CarrierDiscount;
