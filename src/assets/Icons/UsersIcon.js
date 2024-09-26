import * as React from "react";

const UsersIcon = ({
  width = 25,
  height = 24,
  fill = "#A0A5AE",
  stroke = "#A0A5AE",
  fillOpacity = 0.8,
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.3967 20C17.3967 18.3431 15.1582 17 12.3967 17C9.6353 17 7.39673 18.3431 7.39673 20M21.3967 17.0004C21.3967 15.7702 20.1626 14.7129 18.3967 14.25M3.39673 17.0004C3.39673 15.7702 4.63082 14.7129 6.39673 14.25M18.3967 10.2361C19.0105 9.68679 19.3967 8.8885 19.3967 8C19.3967 6.34315 18.0536 5 16.3967 5C15.6284 5 14.9275 5.28885 14.3967 5.76389M6.39673 10.2361C5.78298 9.68679 5.39673 8.8885 5.39673 8C5.39673 6.34315 6.73987 5 8.39673 5C9.16508 5 9.86597 5.28885 10.3967 5.76389M12.3967 14C10.7399 14 9.39673 12.6569 9.39673 11C9.39673 9.34315 10.7399 8 12.3967 8C14.0536 8 15.3967 9.34315 15.3967 11C15.3967 12.6569 14.0536 14 12.3967 14Z"
      stroke={stroke}
      stroke-opacity="0.8"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default UsersIcon;
