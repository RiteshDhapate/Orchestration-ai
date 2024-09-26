import React from "react";

const RepostIcon = ({
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
      d="M6.6665 10.6667H3.33317V14M9.33317 5.33333H12.6665V2M3.05518 6.00227C3.42897 5.07711 4.0548 4.27536 4.86154 3.68815C5.66828 3.10094 6.62441 2.75168 7.61967 2.68034C8.61494 2.609 9.60966 2.81827 10.4919 3.28441C11.3742 3.75055 12.1073 4.45503 12.6092 5.31742M12.9449 9.99805C12.5711 10.9232 11.9452 11.725 11.1385 12.3122C10.3318 12.8994 9.37661 13.2482 8.38135 13.3195C7.38608 13.3909 6.39055 13.1816 5.5083 12.7155C4.62605 12.2494 3.89239 11.545 3.39046 10.6826"
      stroke={stroke}
      stroke-opacity="0.8"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default RepostIcon;
