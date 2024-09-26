import React from "react";

const industryAnalysis = ({onBack}) => {
  
  return (
    <div className="flex flex-col pt-5">
    <div className="flex p-5 mb-8 justify-between items-center">
      <img src="/loginLogo.png" alt="alt" className="w-[224px]" />
      <p className="font-bold text-2xl">Carries Discount Analysis</p>
      <button className="border p-2 rounded-lg px-6" onClick={onBack} type="button">Back</button>
    </div>
  </div>
  );
};

export default industryAnalysis;
