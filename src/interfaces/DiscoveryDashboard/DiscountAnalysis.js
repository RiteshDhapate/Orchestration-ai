import React, { useState } from "react";
import SpiderChart from "./SpiderChart";

const DiscountAnalysis = () => {
  const [selected, setSelected] = useState("ups");
  return (
    <div className="flex flex-col py-5">
      <div className="flex p-5 mb-8 ml-[-50px] justify-between items-center">
        <img src="/loginLogo.png" alt="alt" className="w-[224px]" />
        <p className="text-2xl font-semibold">Carries Discount Analysis</p>
        <button className="border border-[#85869833] px-4 py-2 rounded-lg">
          Back
        </button>
      </div>
      <div className="rounded-lg shadow flex flex-col gap-4 flex-1 p-4">
        <div className="flex justify-between items-center flex-1">
          <p className="text-xl font-semibold">Carrier Discounts</p>
          <p className="text-xl font-semibold text-[#74BCFF]">
            Total Spend $567 M
          </p>
        </div>
        <div className="flex justify-between items-center flex-1">
          <div className="flex gap-2">
            <button
              className={`px-2 py-1 border ${selected === "ups" ? "bg-[#2294FF1A] border-[#2294FF99]" : "border-[#85869833]"} rounded-lg flex gap-2 items-center text-nowrap`}
              onClick={() => setSelected("ups")}
            >
              <img src="/partner-logo/ups.png" alt="UPS" />
              UPS
            </button>
            <button
              className={`px-2 py-1 border ${selected === "fedex" ? "bg-[#2294FF1A] border-[#2294FF99]" : "border-[#85869833]"} rounded-lg flex gap-2 items-center text-nowrap`}
              onClick={() => setSelected("fedex")}
            >
              <img src="/partner-logo/fedex.png" alt="UPS" />
              FedEx
            </button>
            <button
              className={`px-2 py-1 border ${selected === "usps" ? "bg-[#2294FF1A] border-[#2294FF99]" : "border-[#85869833]"} rounded-lg flex gap-2 items-center text-nowrap`}
              onClick={() => setSelected("usps")}
            >
              <img src="/partner-logo/usps.png" alt="USPS" />
              USPS
            </button>
            <button
              className={`px-2 py-1 border ${selected === "orchestro" ? "bg-[#2294FF1A] border-[#2294FF99]" : "border-[#85869833]"} rounded-lg flex gap-2 items-center text-nowrap`}
              onClick={() => setSelected("orchestro")}
            >
              <img src="/partner-logo/orchestro.png" alt="Orchestro" />
              Orchestro
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <p>Service Type</p>
            <select className="border border-[#85869833] px-2 py-1 rounded-lg bg-[#181921] focus-visible:outline-none">
              <option value={1}>Ground</option>
              <option value={2}>Standard</option>
              <option value={3}>2 Days</option>
              <option value={4}>Priority</option>
              <option value={5}>Express</option>
              <option value={6}>Express AIR</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-center flex-1">
          <SpiderChart />
        </div>
      </div>
    </div>
  );
};

export default DiscountAnalysis;
