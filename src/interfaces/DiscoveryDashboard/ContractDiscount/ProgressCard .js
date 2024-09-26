import React from 'react';

const ProgressCard = ({ title, progress, showProgressBar, risk, riskLevel, colorClass, loading }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-[#191A23] border border-[#85869833] rounded-lg w-full mb-5 shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)]">
      <div className="w-full">
        {loading ? (
          <div className="animate-pulse">
            <div className="w-full h-6 bg-gray-700 rounded mb-2"></div>
            <div className="relative w-full h-2 bg-[#85869833] rounded-full">
              <div className="absolute h-2 rounded-full bg-gray-700"></div>
            </div>
            <div className="w-16 h-6 bg-gray-700 rounded mt-2"></div>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-medium mb-3">{title}</h3>
            {risk && (
              <span className="text-[#FFC252] font-normal text-base mt-2 block">
                {riskLevel}
              </span>
            )}
            {showProgressBar && (
              <div className="relative w-full h-2 mt-2 bg-[#85869833] rounded-full">
                <div
                  style={{ width: `${progress}%` }}
                  className={`absolute h-2 rounded-full ${colorClass}`}
                ></div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col items-end ml-5">
        {loading ? (
          <div className="w-20 h-10 bg-gray-700 rounded animate-pulse"></div>
        ) : (
          <span className={`text-5xl font-bold ${showProgressBar ? 'text-[#4BEA9E]' : colorClass}`}>
            {progress}%
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressCard;
