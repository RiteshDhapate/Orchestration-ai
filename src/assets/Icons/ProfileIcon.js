import * as React from "react";

const ProfileIcon = ({
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
      d="M17.6134 19.3323C16.3316 17.9008 14.4694 17 12.3967 17C10.3241 17 8.46165 17.9008 7.17993 19.3323M12.3967 21C7.42617 21 3.39673 16.9706 3.39673 12C3.39673 7.02944 7.42617 3 12.3967 3C17.3673 3 21.3967 7.02944 21.3967 12C21.3967 16.9706 17.3673 21 12.3967 21ZM12.3967 14C10.7399 14 9.39673 12.6569 9.39673 11C9.39673 9.34315 10.7399 8 12.3967 8C14.0536 8 15.3967 9.34315 15.3967 11C15.3967 12.6569 14.0536 14 12.3967 14Z"
      stroke={stroke}
      stroke-opacity="0.8"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default ProfileIcon;
