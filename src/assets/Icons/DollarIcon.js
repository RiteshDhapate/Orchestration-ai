import * as React from "react"
const DollarIcon = ({ width = 24, height = 24, fill = "#A0A5AE", fillOpacity = 0.8, color = "#A0A5AE", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={fillOpacity}
      strokeWidth={2}
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
    />
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.8}
      strokeWidth={2}
      d="M14.357 9.539a1.845 1.845 0 0 0-1.741-1.23h-1.43a1.648 1.648 0 0 0-.352 3.257l2.176.476a1.847 1.847 0 0 1-.394 3.65h-1.231a1.847 1.847 0 0 1-1.741-1.23M12 8.308V6.46M12 17.538v-1.846"
    />
  </svg>
)
export default DollarIcon
