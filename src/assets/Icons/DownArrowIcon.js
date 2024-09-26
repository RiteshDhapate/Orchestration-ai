const DownArrowIcon = ({ width = 24, height = 24, fill = "#A0A5AE", fillOpacity = 0.8, ...props }) => (
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
      d="m16 10-4 4-4-4"
    />
  </svg>
)
export default DownArrowIcon
