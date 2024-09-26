import React from "react";
import PropTypes from "prop-types";
import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";

const Checkbox = ({ label, ...props }) => {
  return (
    <div className={`flex items-center py-2 `}>
      <ChakraCheckbox {...props}>{label}</ChakraCheckbox>
    </div>
  );
};

export default Checkbox;

Checkbox.defaultProps = {
  label: "",
};

Checkbox.propTypes = {
  label: PropTypes.any,
};
