import React, { useEffect, useState } from "react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { AiIcon, DollarIcon, TruckIcon } from "../../../assets/Icons";

const AIpoweredRecommendations = ({ data, dataLoading }) => {
  return (
    <div className="flex flex-col">
      <div className="p-8 mb-8 bg-[#191A23] border border-[#85869833] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] rounded-2xl">
        <h2 className="text-base font-semibold mb-6">AI powered recommendations</h2>

        {dataLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array(4).fill(null).map((_, index) => (
              <div key={index} className="p-5 bg-[#191A23] rounded-2xl shadow-lg border border-[#85869833] animate-pulse">
                <div className="flex items-start justify-start">
                  <div className="w-32 h-6 bg-gray-700 rounded"></div>
                  <ArrowUpIcon className="ml-3" boxSize={6} color="green.400" />
                </div>
                <p className="text-sm mt-4 font-normal text-[#FFFFFF]">
                  <div className="w-full h-4 bg-gray-700 rounded"></div>
                </p>
                <div className="grid grid-cols-2 gap-2 mt-5">
                  <div className="border border-[#85869833] rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-yellow-300 rounded"></div>
                        <div className="w-1/2 h-4 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="border border-[#85869833] rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-400 rounded"></div>
                        <div className="w-1/2 h-4 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-[#2294FF1A] border border-[#2294FF99] p-3 mt-4 rounded-lg">
                  <div className="w-4 h-4 bg-[#74BCFF] rounded"></div>
                  <div className="w-1/2 h-4 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // First 2 Cards
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.slice(0, 2).map((rec, index) => (
            <div key={index} className="p-5 bg-[#191A23] rounded-2xl shadow-lg border border-[#85869833]">
              <div className="flex items-start justify-start">
                <h3 className="text-base font-medium">{rec.title}</h3>
                <ArrowUpIcon className="ml-3" boxSize={6} color="green.400" />
              </div>
                <p className="text-sm mt-4 font-normal text-[#FFFFFF]">{rec.description}</p>
              <div className="grid grid-cols-2 gap-2 mt-5">
                <div className="border border-[#85869833] rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-300"><AiIcon/></span>
                      <span className="text-sm">{rec.recommended_discount_range} discount on all weight</span>
                    </div>
                  </div>
                    <p className="text-[10px] text-[#E8E8E8] mt-1">{rec.current_discount}</p>
                </div>
                <div className="border border-[#85869833] rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400"><DollarIcon color={"#4BEA9E"} fill={"#4BEA9E"}/></span>
                      <span className="text-sm">Potential annual saving: {rec.potential_annual_savings}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-[#2294FF1A] border border-[#2294FF99] p-3 mt-4 rounded-lg">
                <span className="text-[#74BCFF]">
                    <TruckIcon color={"#74BCFF"} />
                </span>
                  <span className="text-sm text-[#74BCFF] font-semibold">{rec.competitor_offer}</span>
              </div>
            </div>
          ))}
        </div>
        )}

        <div className="border-b-2 border-[#85869833] mt-5"></div>

        {/* Next 2 Cards */}
        {!dataLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          {data?.slice(2, 4).map((rec, index) => (
            <div key={index} className="p-5 bg-[#191A23] rounded-2xl shadow-lg border border-[#85869833]">
              <div className="flex items-start justify-start">
                <h3 className="text-base font-medium">{rec.title}</h3>
                <ArrowUpIcon className="ml-3" boxSize={6} color="green.400" />
              </div>
                <p className="text-sm mt-2 font-normal text-[#FFFFFF]">{rec.description}</p>
              <div className="grid grid-cols-2 gap-2 mt-5">
                <div className="border border-[#85869833] rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-300"><AiIcon/></span>
                      <span className="text-sm">{rec.recommended_discount_range} discount on all weight</span>
                    </div>
                  </div>
                    <p className="text-[10px] text-[#E8E8E8] mt-1">{rec.current_discount}</p>
                </div>
                <div className="border border-[#85869833] rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400"><DollarIcon color={"#4BEA9E"} fill={"#4BEA9E"}/></span>
                      <span className="text-sm">Potential annual saving: {rec.potential_annual_savings}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-[#2294FF1A] border border-[#2294FF99] p-3 mt-4 rounded-lg">
                <span className="text-[#74BCFF]">
                    <TruckIcon color={"#74BCFF"} />
                </span>
                  <span className="text-sm text-[#74BCFF] font-semibold">{rec.competitor_offer}</span>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default AIpoweredRecommendations;
