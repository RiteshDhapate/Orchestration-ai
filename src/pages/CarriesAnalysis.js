import React, { useEffect, useState } from "react";
import IndustryAnalysis from "../interfaces/DiscoveryDashboard/ContractDiscount/industryAnalysis";
import AIpoweredRecommendations from "../interfaces/DiscoveryDashboard/ContractDiscount/AIpoweredRecommendations";
import ProgressCard from "../interfaces/DiscoveryDashboard/ContractDiscount/ProgressCard ";
import CarrierDiscount from "../interfaces/DiscoveryDashboard/ContractDiscount/CarrierDiscount";
import HistoricalCarrierRates from "../interfaces/DiscoveryDashboard/ContractDiscount/HistoricalCarrierRates";
import "./Discovery.scss";

const CarriesAnalysis = ({ onBack, historicalData, discountData }) => {
  const [progressData, setProgressData] = useState();
  useEffect(() => {
    const updatedData = historicalData?.historical?.data;
    if (updatedData) {
      setProgressData([
        {
          title: "Negotiating Progress",
          progress: updatedData?.negotiationProgress,
          showProgressBar: true,
          risk: false,
          colorClass: "bg-[#4BEA9E]",
        },
        {
          title: "Vendor Flexibility",
          progress: updatedData?.vendorFlexibility,
          showProgressBar: false,
          risk: true,
          riskLevel: updatedData?.vendorRisk,
          colorClass: "text-yellow-500",
        },
      ]);
    }
  }, [historicalData]);

  return (
    <div className="discovery-chat w-full h-full overflow-auto px-12">
      <div className="flex flex-col">
        <IndustryAnalysis onBack={onBack} />
      </div>
      {/* {!loader && data && ( */}
      <CarrierDiscount
        discountData={discountData?.data?.carriers}
        dataLoading={discountData?.loading}
      />
      {/* )} */}
      <div>
        <AIpoweredRecommendations
          data={historicalData?.recommendation?.data?.recommendations}
          dataLoading={historicalData?.recommendation?.loading}
        />
        <div className="flex space-x-4">
          {progressData?.map((item, index) => (
            <ProgressCard
              key={index}
              title={item.title}
              progress={item.progress}
              showProgressBar={item.showProgressBar}
              risk={item.risk}
              riskLevel={item.riskLevel}
              colorClass={item.colorClass}
              dataLoading={historicalData?.historical?.loading}
            />
          ))}
        </div>
        <HistoricalCarrierRates
          historicData={
            historicalData?.historical?.data?.historicalCarrierRates || {}
          }
          dataLoading={historicalData?.historical?.loading}
        />
      </div>
    </div>
  );
};

export default CarriesAnalysis;
