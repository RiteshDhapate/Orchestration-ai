import * as React from "react";
const HomeIcon = ({
  width = 16,
  height = 24,
  fill = "#A0A5AE",
  stroke = "#A0A5AE",
  fillOpacity = 0.8,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 27"
    fill="none"
    {...props}
  >
    <path
      fill={fill}
      fillOpacity={0.8}
      d="M16 14V8.452c0-.534 0-.801-.065-1.05a1.998 1.998 0 0 0-.28-.617c-.145-.213-.345-.39-.748-.741l-4.8-4.2C9.361 1.19 8.987.864 8.567.74c-.37-.11-.764-.11-1.135 0-.42.124-.792.45-1.538 1.102L1.093 6.044c-.402.352-.603.528-.747.74a2 2 0 0 0-.281.618C0 7.65 0 7.918 0 8.452V14c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.082 1.083C1.602 17 2.068 17 3 17s1.398 0 1.766-.152a2 2 0 0 0 1.082-1.083C6 15.398 6 14.932 6 14v-1a2 2 0 1 1 4 0v1c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.082 1.083C11.602 17 12.068 17 13 17s1.398 0 1.766-.152a2 2 0 0 0 1.082-1.083C16 15.398 16 14.932 16 14Z"
      stroke={stroke}
      stroke-opacity="0.8"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
export default HomeIcon;
