import React from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";
import { Flex } from "@chakra-ui/react";
import { Checkbox } from "../../componentLibrary";

const scrollBarStyle = {
  "::-webkit-scrollbar": {
    width: "12px",
  },
  "::-webkit-scrollbar-track": {
    background: "#85869833",
    borderRadius: "8px",
  },
  "::-webkit-scrollbar-thumb": {
    borderRadius: "8px",
    border: "1px solid #85869833",
    background: "#292A35CC",
  },
};

const MultiValueContainer = ({ selectProps, data }) => {
  const values = selectProps.value;
  if (values) {
    return values[values.length - 1].label === data.label
      ? data.label
      : data.label + ", ";
  } else return "";
};

const Option = (props) => {
  const onClickMultiOption = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div onClick={onClickMultiOption}>
      <components.Option {...props}>
        <Flex alignItems={"center"} gap={1}>
          <Checkbox checked={props.isSelected} onChange={() => null} />
          {props.label ?? ""}
        </Flex>
      </components.Option>
    </div>
  );
};

const MultiSelect = ({ className, components, customStyles, ...props }) => {
  return (
    <Select
      classNamePrefix="select"
      className={`!w-[340px] ${className}`}
      isClearable={false}
      isMulti
      hideSelectedOptions={false}
      backspaceRemovesValue={false}
      closeMenuOnSelect={false}
      components={{
        IndicatorSeparator: null,
        MultiValueContainer,
        Option,
        ...components,
      }}
      styles={{
        menuList: (styles) => ({
          ...styles,
          ...scrollBarStyle,
        }),
        ...customStyles,
      }}
      classNames={{
        control: (state) =>
          `${state.isDisabled ? "!bg-[#292A3599]" : "!bg-[#21232E]"}  !rounded-lg !border-[#85869833] !shadow-none`,
        input: () => "!text-[#EBEBEB]",
        valueContainer: (state) =>
          `!px-4 !py-1 ${state.isDisabled ? "!text-[#EBEBEB99]" : "!text-[#EBEBEB]"}`,
        dropdownIndicator: () => "!px-4 !py-2.5",
        menu: () => "!bg-[#21232E] !rounded-lg !py-2 !pl-3 !pr-2",
        menuList: () => "!max-h-[200px] !h-full !overflow-auto",
        option: ({ isFocused }) =>
          `!text-base !font-medium !bg-transparent !pl-1 !py-0 !rounded-lg ${isFocused && "!bg-[#2c303b]"}`,
      }}
      {...props}
    />
  );
};

export default MultiSelect;

MultiSelect.defaultProps = {
  className: "",
  components: {},
};

MultiSelect.propTypes = {
  className: PropTypes.string,
  components: PropTypes.object,
};
