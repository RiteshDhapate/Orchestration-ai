import React from "react";
import { Button } from "../../componentLibrary";

const Industry = (props) => {
  const { industryData, setShowAgentExplainer, loading, replacedCarrier } = props;
  const replaceCarrierName = (text, oldCarrier, newCarrier) => {
    const updatedText = text?.replace(new RegExp(oldCarrier, 'g'), newCarrier);
    console.log({updatedText, oldCarrier, newCarrier})
    return updatedText;
}
  return (
    <div className="flex flex-col py-5">
      <div className="flex p-5 mb-8 ml-[-50px]">
        <img src="/loginLogo.png" alt="alt" className="w-[224px]" />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex text-[18px] font-semibold py-4">
          <p>Top 4 Recommended Carriers</p>
        </div>
        <Button
          type="button"
          className="mb-8 ml-auto !text-xs min-[768px]:!text-sm mt-4 font-medium min-w-[152px] min-[768px]:w-[142px] h-6 min-[768px]:h-10 !rounded min-[768px]:!rounded-lg"
          onClick={() => {
            setShowAgentExplainer(true);
          }}
          disabled={loading}
        >
          Explainer
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          <>
            {Array(4)
              .fill(null)
              ?.map((_, index) => {
                return (
                  <div
                    key={`${index}-shimmer`}
                    className="flex flex-col bg-[#191A23] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] border border-[#85869833] text-white rounded-[16px] p-4"
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-6 bg-gray-700 animate-pulse rounded"></div>
                      </div>
                      <div className="flex gap-1 items-center rounded p-1 min-w-[90px] max-h-8">
                        <div className="h-5 w-5 bg-gray-700 animate-pulse rounded-full"></div>
                        <div className="w-16 h-6 bg-gray-700 animate-pulse rounded"></div>
                      </div>
                    </div>
                    <div className="flex flex-1 gap-6 flex-col">
                      <div className="w-full h-6 mt-6 bg-gray-700 animate-pulse rounded"></div>
                      <div className="flex space-x-4 mt-auto">
                        <div className="flex items-center">
                          <div className="w-32 h-6 bg-gray-700 animate-pulse rounded"></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 w-full flex gap-2 items-center">
                      <div className="w-full flex flex-col gap-2 rounded p-4">
                        <div className="flex items-center">
                          <div className="h-6 w-6 bg-gray-700 animate-pulse rounded-full"></div>
                          <div className="ml-1 w-10 h-6 bg-gray-700 animate-pulse rounded"></div>
                        </div>
                        <div className="flex">
                          <div className="w-24 h-4 bg-gray-700 animate-pulse rounded"></div>
                        </div>
                      </div>
                      <div className="w-full flex flex-col gap-2 rounded p-4 pl-2">
                        <div className="flex items-center">
                          <div className="h-6 w-6 bg-gray-700 animate-pulse rounded-full"></div>
                          <div className="ml-1 w-10 h-6 bg-gray-700 animate-pulse rounded"></div>
                        </div>
                        <div className="flex">
                          <div className="w-24 h-4 bg-gray-700 animate-pulse rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </>
        ) : (
          industryData?.map((cur, index) => {
            return (
              <div className="flex flex-col bg-[#191A23] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] border border-[#85869833] text-white rounded-[16px] p-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-medium">{cur?.name === replacedCarrier ? 'Orchestro' : cur?.name}</h2>
                  </div>
                  <div className="flex gap-1 items-center bg-[#2294FF1A] rounded p-1 min-w-[90px] max-h-8">
                    <img src="/Rank.png" alt="rank" className="h-5 w-5" />
                    <span className="text-[#74BCFF] font-semibold text-sm whitespace-nowrap">
                      Rank {index + 1}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 gap-6 flex-col">
                  <p className="mt-6 text-base font-normal text-[#FFFFFF]">
                    {replaceCarrierName(cur?.explanation, replacedCarrier, 'Orchestro' )}
                  </p>
                  <div className="flex space-x-4 mt-auto">
                    {cur?.onboardingTime && <div className="flex items-center">
                      <p className="text-[#EBEBEB99] font-normal text-base">
                        Onboarding Time :
                      </p>
                      <span className="ml-1 text-[#EBEBEB99] font-normal text-base">
                        {cur?.onboardingTime} days
                      </span>
                    </div>}
                  </div>
                </div>

                {cur?.sustainabilityScore && <div className="mt-4 w-full flex gap-2 items-center">
                  <div className="w-full flex flex-col gap-2 border rounded p-4">
                    <div className="flex items-center">
                      <img src="/Leaf.png" alt="leaf" className="h-6 w-6" />
                      <span className="ml-1 text-[#EBEBEB] font-semibold text-sm">
                        {cur?.sustainabilityScore}%
                      </span>
                    </div>
                    <div className="flex">
                      <p className="text-[#E8E8E8] font-medium text-[10px]">
                        Sustainability score
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2 border rounded p-4 pl-2">
                    <div className="flex items-center">
                      <img src="/Star.png" alt="star" className="h-6 w-6" />
                      <span className="ml-1 text-[#EBEBEB] font-semibold text-xs 2xl:text-sm">
                        {cur?.trackingCapabilities}
                      </span>
                    </div>
                    <div className="flex">
                      <p className="text-[#E8E8E8] font-medium text-[10px]">
                        Tracking capabilities
                      </p>
                    </div>
                  </div>
                </div>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Industry;
