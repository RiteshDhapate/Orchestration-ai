import React from "react";
import { default as ReactDatePicker } from "react-datepicker";

const DatePicker = ({ className, ...props }) => {
  return (
    <ReactDatePicker
      className={`!rounded !bg-[#85869833] text-[#ebebeb] !font-medium !pl-4 border border-transparent focus-visible:!outline-none focus-visible:border-[#63b3ed] ${className}`}
      calendarClassName={`!bg-[#21232E] !border-0`}
      dayClassName={() => "!text-[#ebebeb] hover:!bg-[#3b3b3b]"}
      popperClassName="[&>svg]:!fill-[#21232E] [&>svg]:!stroke-[#21232E] [&>svg]:!text-[#21232E]"
      clearButtonClassName="after:!bg-transparent after:!w-6 after:!h-6 after:!text-[36px] !right-1"
      wrapperClassName="w-full"
      {...props}
    />
  );
};

export default DatePicker;
