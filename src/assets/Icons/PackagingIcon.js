import * as React from "react"
const PackagingIcon = ({ width = 24, height = 24, fill = "#A0A5AE", fillOpacity = 0.8, ...props }) => (
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
      d="M12 3v5.538M3 8.539h18v11.077A1.385 1.385 0 0 1 19.615 21H4.385A1.385 1.385 0 0 1 3 19.616V8.539ZM3 8.538l2.077-4.001A2.77 2.77 0 0 1 7.487 3h9.027a2.77 2.77 0 0 1 2.478 1.537L21 8.538"
    />
  </svg>
)
export default PackagingIcon
