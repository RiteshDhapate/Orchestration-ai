import React from "react";

const ShippingComparision = (props) => {
  const getFilterData = (data) => {
    return data?.map((entry) => {
      const filteredEntry = {};
      Object.keys(entry).forEach((key) => {
        const value = entry[key];
        if (
          key !== "average_savings" &&
          key !== "percent_savings" &&
          key !== "averageSavings" &&
          key !== "percentSavings" &&
          key !== "cheapest"
        ) {
          if (typeof value === "number" || typeof value === "string") {
            const updatedKeys = industryData?.find((cur) =>
              key
                ?.split("_")
                ?.find((curkey) => cur?.name?.toLowerCase()?.includes(curkey))
            );
            filteredEntry[updatedKeys?.name || key] = updatedKeys
              ? `$${value}`
              : value;
          }
        }
      });
      return filteredEntry;
    });
  };
  const { shippingData: { data } = {}, industryData = [], loading, replacedCarrier } = props;
  const filterData = getFilterData(data?.data, industryData);
  return loading ? (
    <div className="flex flex-col w-full bg-[#191A23] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] border border-[#85869833] rounded-2xl mt-4">
      <div className="px-6 py-8">
        <h4 className="font-semibold leading-7 text-lg animate-pulse w-40 bg-[#21232E]">
          
        </h4>
        <p className="font-normal text-base mt-2 animate-pulse w-60 bg-[#21232E]">
          
        </p>
      </div>
      <hr className="border-[#292A35]" />
      <div className="min-w-max px-10">
        <div className="py-4 w-full flex flex-col gap-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="block w-full bg-[#21232E] py-2 gap-4 font-normal text-[#21232E] animate-pulse rounded-md"
            >
              ''
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : filterData?.length > 0 ? (
    <div className="flex mt-4 flex-col w-full bg-[#191A23] shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] border border-[#85869833] rounded-2xl">
      <div className="px-6 py-8">
        <h4 className="font-semibold leading-7 text-lg">
          Shipping Cost Comparison
        </h4>
        <p className="font-normal text-base mt-2">
          Comparing shipping costs across major carriers and Orchestro
        </p>
      </div>
      <hr className="border-[#292A35]" />
      <div className="w-full py-3 overflow-x-auto">
        <div className="min-w-max">
          <div className="flex w-full py-3 gap-4 justify-center font-medium text-[#fff] text-base items-center border-b-[1px] border-[#292A35]">
            {Object.keys(filterData[0]).map((header, index) => (
              <div
                key={index}
                className={`flex ${header === "Distance" ? "pl-8" : ""} min-w-[100px] flex-1 justify-center text-center`}
              >
                {header
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ") === replacedCarrier ? "Orchestro" : header
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </div>
            ))}
          </div>

          <div className="py-4 w-full flex flex-col">
            {filterData.map((row, index) => (
              <div
                key={index}
                className="flex w-full py-6 gap-4 font-normal text-[#fff] text-base items-center hover:bg-[#21232E]"
              >
                {Object.entries(row).map(([key, value], i) => (
                  <div
                    key={i}
                    className={`flex ${key === "Distance" ? "pl-8" : ""} min-w-[100px] flex-1 justify-center text-center`}
                  >
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ShippingComparision;
