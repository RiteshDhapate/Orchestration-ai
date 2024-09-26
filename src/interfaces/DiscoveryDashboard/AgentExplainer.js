import React from "react";
import { Button } from "../../componentLibrary";
import { Truck } from "../../interfaces/CustomIcons";

const AgentExplainer = (props) => {
  const { setShowAgentExplainer, agenticData = {}, replacedCarrier } = props;
  const getFormatedData = (data) => {
    return data
      ?.map((item) => {
        const [title, value] = Object.entries(item)[0]; // Extract title and value
        return { title, value };
      })
      ?.sort((a, b) => b.value - a.value);
  };
  const attributesData = getFormatedData(
    agenticData?.carrier_attributes_evaluated_vendors
  ) || [];
  const vendors = agenticData.coverage_area_filtered_vendors;
  const weightData = getFormatedData(
    agenticData?.weight_range_in_lbs_analyzed_vendors_
  ) || [];
  const returnData = getFormatedData(
    agenticData?.return_needed_assessed_vendors
  ) || [];
  let carrierRankData = [];
  agenticData?.ranked_vendors?.forEach((cur) => {
    if (Object.keys(cur)?.includes("first_ranked_carrier")) {
      carrierRankData.push({
        value: cur?.explanation,
        rank: 1,
        title: cur?.first_ranked_carrier,
      });
    }
    if (Object.keys(cur)?.includes("second_ranked_carrier")) {
      carrierRankData.push({
        value: cur?.explanation,
        rank: 2,
        title: cur?.second_ranked_carrier,
      });
    }
    if (Object.keys(cur)?.includes("third_ranked_carrier")) {
      carrierRankData.push({
        value: cur?.explanation,
        rank: 3,
        title: cur?.third_ranked_carrier,
      });
    }
    if (Object.keys(cur)?.includes("fourth_ranked_carrier")) {
      carrierRankData.push({
        value: cur?.explanation,
        rank: 4,
        title: cur?.fourth_ranked_carrier,
      });
    }
  });
  carrierRankData = carrierRankData.sort((a, b) => a?.rank - b?.rank);
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
          <p>Discovery Agent Explainer</p>
        </div>
        <Button
          type="button"
          context="outlined"
          className="mb-8 ml-auto !text-xs min-[768px]:!text-sm mt-4 font-medium min-w-[152px] h-6 min-[768px]:h-10 !rounded min-[768px]:!rounded-lg text-[#EBEBEB]"
          onClick={() => {
            setShowAgentExplainer(false);
          }}
        >
          Recommendation
        </Button>
      </div>
      {vendors?.length > 0 ? <div className="flex mb-8 flex-col gap-6 bg-[#191A23] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] border border-[#85869833] text-white rounded-[16px] p-6">
        <div className="text-white font-semibold">
          Based on the coverage area below vendors support shipping
        </div>
        <div className="flex flex-wrap gap-4">
          {vendors.map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center space-x-2 p-4 bg-[#171821] rounded-lg shadow-md w-60 border-[#85869833] border-[1px]"
              >
                <span className="text-2xl">
                  <Truck color="#74EFB4" />
                </span>
                <span className="text-md font-semibold text-sm">{item === replacedCarrier ? 'Orchestro' : item}</span>
              </div>
            );
          })}
        </div>
      </div> : <></>}

     { attributesData?.length > 0 ? <div className="flex mb-8 flex-col gap-6 bg-[#191A23] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] border border-[#85869833] text-white rounded-[16px] p-6">
        <div className="text-white font-semibold">
          Based on the carrier attributes the filtered vendors with the score
          from 0 to 1
        </div>
        <div className="flex flex-wrap gap-4">
          {attributesData.map((item, index) => {
            let color;
            if (item?.value >= 0.8) {
              color = "#74EFB4";
            } else if (item?.value > 0.5) {
              color = "#22E588";
            } else {
              color = "#10672E";
            }
            return (
              <div
                key={index}
                className="flex flex-col p-4 gap-2 bg-[#171821] rounded-lg shadow-md w-60 border-[#85869833] border-[1px]"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl text-blue-500">
                    <Truck color={color} />
                  </span>
                  <span className="text-md font-semibold text-sm">
                    {item.title === replacedCarrier ? 'Orchestro' : item.title}
                  </span>
                </div>
                <div className="bg-[#2294FF1A] rounded-3xl px-4 py-2 w-20 m-auto text-center font-semibold text-[#74BCFF]">
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>: <></>}

      {weightData?.length > 0 ? <div className="flex mb-8 flex-col gap-6 bg-[#191A23] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] border border-[#85869833] text-white rounded-[16px] p-6">
        <div className="text-white font-semibold">
          Based on the weight analysis listed vendors
        </div>
        <div className="flex flex-wrap gap-4">
          {weightData.map((item, index) => {
            let color;
            if (item?.value >= 0.8) {
              color = "#74EFB4";
            } else if (item?.value > 0.5) {
              color = "#22E588";
            } else {
              color = "#10672E";
            }
            return (
              <div
                key={index}
                className="flex flex-col p-4 gap-2 bg-[#171821] rounded-lg shadow-md w-60 border-[#85869833] border-[1px]"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl text-blue-500">
                    <Truck color={color} />
                  </span>
                  <span className="text-md font-semibold">{item.title === replacedCarrier ? 'Orchestro' : item.title}</span>
                </div>
                {/* {item?.value > 0 ? (
                  <div className="bg-[#2294FF1A] rounded-3xl p-2 px-4 w-full m-auto text-sm text-center text-[#74BCFF]">
                    Supports given weight
                  </div>
                ) : (
                  <></>
                )} */}
                <div className="bg-[#2294FF1A] rounded-3xl px-4 py-2 w-20 m-auto text-center font-semibold text-[#74BCFF]">
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>
      </div> : <></>}

      {returnData?.length > 0 ?<div className="flex mb-8 flex-col gap-6 bg-[#191A23] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] border border-[#85869833] text-white rounded-[16px] p-6">
        <div className="text-white font-semibold">
          Based on the return analysis listed vendors
        </div>
        <div className="flex flex-wrap gap-4">
          {returnData.map((item, index) => {
            let color;
            if (item?.value >= 0.8) {
              color = "#74EFB4";
            } else if (item?.value > 0.5) {
              color = "#22E588";
            } else {
              color = "#10672E";
            }
            return (
              <div
                key={index}
                className="flex flex-col p-4 gap-2 bg-[#171821] rounded-lg shadow-md w-60 border-[#85869833] border-[1px] justify-center"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl text-blue-500">
                    <Truck color={color} />
                  </span>
                  <span className="text-md font-semibold">{item.title === replacedCarrier ? 'Orchestro' : item.title}</span>
                </div>
                {item?.value > 0 ? (
                  <div className="bg-[#2294FF1A] rounded-3xl p-2 px-4 w-full m-auto text-sm text-center text-[#74BCFF]">
                    Supports returns
                  </div>
                ) : (
                  <div className="bg-[#2294FF1A] rounded-3xl p-2 px-4 w-full m-auto text-sm text-center text-[#74BCFF]">
                    Doesn't Support returns
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div> : <></>}

     {carrierRankData?.length > 0 ?
      <div className="flex mb-8 flex-col gap-6 bg-[#191A23] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] border border-[#85869833] text-white rounded-[16px] p-6">
        <div className="text-white font-semibold">
          Based on the coverage area below vendors support shipping
        </div>
        <div className="flex flex-col gap-2">
          {carrierRankData?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col p-4 gap-2 rounded-lg w-full"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex gap-1 items-center bg-[#2294FF1A] rounded-full p-1 w-20 justify-center">
                    {/* <img src="/Rank.png" alt="rank" className="h-5 w-5" /> */}
                    <span className="text-[#74BCFF] font-semibold text-sm text-center">
                      {item.rank === 1 ?  "1st": item.rank === 2 ? "2nd" :item.rank === 3 ? '3rd' : '4th'}
                    </span>
                  </div>
                  <span className="text-2xl text-blue-500">
                    <Truck  color= {item.rank === 1 ?  "#74EFB4": item.rank === 2 ? "#74EFB4" :item.rank === 3 ? '#22E588' : '#10672E'}/>
                  </span>
                  <span className="text-md font-semibold">{item.title === replacedCarrier ? 'Orchestro' : item.title}</span>
                </div>
                {/* <div className="flex items-center ml-auto gap-2">
                  <div className="bg-[#2294FF1A] ml-auto rounded-3xl px-4 py-2 min-w-20 m-auto text-center font-semibold text-[#74BCFF]">
                    0.5
                  </div>
                  <div className="bg-[#2294FF1A] rounded-3xl p-2 px-4 min-w-60 m-auto text-sm text-center text-[#74BCFF]">
                    Supports given weight
                  </div>

                  <div className="bg-[#2294FF1A] rounded-3xl p-2 px-4 w-full m-auto text-sm text-center text-[#74BCFF]">
                    Supports returns
                  </div>
                </div> */}
              </div>
              <div className="p-2 w-full text-sm text-[#fff]">
                {replaceCarrierName(item.value,replacedCarrier, 'Orchestro' )}
              </div>
            </div>
          ))}
        </div>
      </div> : <></>}
    </div>
  );
};

export default AgentExplainer;
