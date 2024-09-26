import React from "react";

const UpArrowIcon = ({
  width = 16,
  height = 16,
  fill = "#A0A5AE",
  stroke = "#A0A5AE",
  fillOpacity = 0.8,
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 12.6668V3.3335M8 3.3335L4 7.3335M8 3.3335L12 7.3335"
      stroke={stroke}
      stroke-opacity="0.8"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default UpArrowIcon;
