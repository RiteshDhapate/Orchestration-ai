import React, { useState } from "react";
import "./Discovery.scss";
import Mapbox from "../interfaces/DiscoveryDashboard/Map";
import Industry from "../interfaces/DiscoveryDashboard/Industry";
import ShippingComparision from "../interfaces/DiscoveryDashboard/ShippingComparision";
import CustomerSentiment from "../interfaces/DiscoveryDashboard/CustomerSentiment";
import AgentExplainer from "../interfaces/DiscoveryDashboard/AgentExplainer";
import DiscountAnalysis from "../interfaces/DiscoveryDashboard/DiscountAnalysis";

const DiscoveryDashboard = ({ dataState, discoveryData, replacedCarrier }) => {
  const {
    agenticData: { data: agenticData },
  } = discoveryData;

  const [showAgentExplainer, setShowAgentExplainer] = useState(false);

  const loadingDiscoveryPage =
    discoveryData?.agenticData?.loading ||
    discoveryData?.jsonifyContent?.loading;
  const industryData = [];
  agenticData?.ranked_vendors?.forEach((cur, index) => {
    if (index === 0) {
      const interactiveData =
        dataState?.interactiveComparison?.data?.data?.find(
          (interactive) => interactive?.name === cur.first_ranked_carrier
        );
      industryData.push({
        ...cur,
        name: cur.first_ranked_carrier,
        ...interactiveData,
      });
    } else if (index === 1) {
      const interactiveData =
        dataState?.interactiveComparison?.data?.data?.find(
          (interactive) => interactive?.name === cur.second_ranked_carrier
        );
      industryData.push({
        ...cur,
        name: cur.second_ranked_carrier,
        ...interactiveData,
      });
    } else if (index === 2) {
      const interactiveData =
        dataState?.interactiveComparison?.data?.data?.find(
          (interactive) => interactive?.name === cur.third_ranked_carrier
        );
      industryData.push({
        ...cur,
        name: cur.third_ranked_carrier,
        ...interactiveData,
      });
    } else if (index === 3) {
      const interactiveData =
        dataState?.interactiveComparison?.data?.data?.find(
          (interactive) => interactive?.name === cur.fourth_ranked_carrier
        );
      industryData.push({
        ...cur,
        name: cur.fourth_ranked_carrier,
        ...interactiveData,
      });
    }
  });

  const replaceCarrierKey = (data, oldCarrier, newCarrier) => {
    if (data) {
      const newData = { ...data };
      if (newData[oldCarrier]) {
        newData[newCarrier] = newData[oldCarrier];
        delete newData[oldCarrier];
      }

      return newData;
    }
  };

  const replaceRate = (data) => {
    return data?.map((entry) => {
      if (entry.hasOwnProperty(replacedCarrier)) {
        const { [replacedCarrier]: value, ...rest } = entry;
        return { ...rest, Orchestro: value };
      }
      return entry;
    });
  };

  return (
    <div className="discovery-chat w-full h-full overflow-auto px-12">
      {showAgentExplainer ? (
        <div className="flex flex-col w-full h-full">
          <AgentExplainer
            setShowAgentExplainer={setShowAgentExplainer}
            agenticData={agenticData}
            replacedCarrier={replacedCarrier}
          />
        </div>
      ) : (
        <div className="flex flex-col w-full h-full">
          {/* <DiscountAnalysis /> */}
          <Industry
            industryData={industryData || []}
            setShowAgentExplainer={setShowAgentExplainer}
            loading={
              dataState.interactiveComparison?.loading || loadingDiscoveryPage
            }
            replacedCarrier={replacedCarrier}
          />
          <ShippingComparision
            shippingData={dataState?.shippingCostComparison}
            industryData={industryData}
            loading={
              dataState.interactiveComparison?.loading ||
              dataState?.shippingCostComparison?.loading ||
              loadingDiscoveryPage
            }
            replacedCarrier={replacedCarrier}
          />
          <CustomerSentiment
            data={
              replaceCarrierKey(
                dataState.customerSentimental?.data || {},
                replacedCarrier,
                "Orchestro"
              ) || {}
            }
            rateIncrease={replaceRate(
              dataState.carrierRateComparison?.data?.data || []
            )}
            sentimentLoading={
              loadingDiscoveryPage || dataState.customerSentimental?.loading
            }
            rateLoading={
              loadingDiscoveryPage || dataState.carrierRateComparison?.loading
            }
            replacedCarrier={replacedCarrier}
          />
          <div className="flex flex-col flex-1">
            {dataState?.stateCoverageData?.loading ? (
              <div className="mt-4 mb-8 flex flex-col w-full bg-[#191A23] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] border border-[#85869833] rounded-2xl">
                <div className="px-6 py-8 flex flex-col items-center">
                  <h4 className="font-semibold leading-7 text-lg bg-[#21232E] animate-pulse w-40"></h4>
                  <div className="w-full flex justify-center gap-4">
                    {[...Array(4)].map((_, index) => (
                      <div
                        key={index}
                        className="flex py-2 flex-col items-center rounded-md text-white"
                      >
                        <div className="py-4 bg-[#21232E] animate-pulse rounded-md w-16 mb-1"></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative w-full h-[500px] animate-pulse bg-[#191A23] rounded-b-2xl">
                  <div className="absolute inset-0 bg-[#21232E] animate-pulse"></div>
                </div>
              </div>
            ) : (
              dataState?.stateCoverageData?.data && (
                <Mapbox
                  stateCoverageData={replaceCarrierKey(
                    dataState.stateCoverageData.data,
                    replacedCarrier,
                    "Orchestro"
                  )}
                  replacedCarrier={replacedCarrier}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoveryDashboard;
