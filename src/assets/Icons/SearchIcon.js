import * as React from "react"
const SearchIcon = ({ width = 20, height = 20, fill = "#A0A5AE", fillOpacity = 0.8, ...props }) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width={width}
  viewBox="0 0 20 20"
  height={height}
  fill="none"
  {...props}
>
  <path
    stroke={fill}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeOpacity={fillOpacity}
    strokeWidth={2}
    d="m13 13 6 6M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14Z"
  />
</svg>
)
export default SearchIcon