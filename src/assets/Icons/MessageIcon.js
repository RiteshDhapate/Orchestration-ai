import * as React from "react";

const MessageIcon = ({
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
  >
    <path
      d="M16.3967 8H20.3967C20.949 8 21.3967 8.44772 21.3967 9V20L18.0637 17.231C17.8842 17.0818 17.6575 17 17.4241 17H9.39673C8.84444 17 8.39673 16.5523 8.39673 16V13M16.3967 8V5C16.3967 4.44772 15.949 4 15.3967 4H4.39673C3.84444 4 3.39673 4.44772 3.39673 5V16.0003L6.72974 13.2308C6.90928 13.0817 7.13597 13 7.36938 13H8.39673M16.3967 8V12C16.3967 12.5523 15.949 13 15.3967 13H8.39673"
      stroke={stroke}
      stroke-opacity="0.8"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
export default MessageIcon;
