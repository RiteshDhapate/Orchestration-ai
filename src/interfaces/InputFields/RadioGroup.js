import React from "react";
import PropTypes from "prop-types";
import { Radio, RadioGroup as ChakraRadioGroup } from "@chakra-ui/react";

const RadioGroup = ({ options, ...props }) => {
  return (
    <ChakraRadioGroup fontWeight={500} {...props}>
      {options.length > 0 &&
        options.map(({ value, name }, i) => (
          <Radio
            key={i}
            value={value}
            className={`!w-[24px] !h-[24px] !border-[#E0E1EC] ${i === 0 ? "" : "ml-20"}`}
            _checked={{
              backgroundColor: "unset",
              borderColor: "#3BA0E6 !important",
              _before: {
                background: "linear-gradient(to right, #3BA0E6, #3B6EF3)",
                content: "''",
                height: "60%",
                width: "60%",
                borderRadius: "50%",
              },
            }}
          >
            {name}
          </Radio>
        ))}
    </ChakraRadioGroup>
  );
};

export default RadioGroup;

RadioGroup.defaultProps = {
  options: [],
};

RadioGroup.propTypes = {
  options: PropTypes.array,
};
