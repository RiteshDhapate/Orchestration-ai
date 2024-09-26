import React from "react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";

const NumberField = ({ ...props }) => {
  return (
    <NumberInput variant={"filled"} {...props}>
      <NumberInputField
        className="!bg-[#85869833] !rounded !h-11 font-medium !border !p-0 text-center"
        _focusVisible={{ border: "1px solid #63b3ed" }}
        placeholder={props?.placeholder}
        _placeholder={{
          color: "rgba(235, 235, 235, 0.3) !important",
          fontWeight: 400,
        }}
      />
    </NumberInput>
  );
};

export default NumberField;
