const EcoFriendlyIcon = ({ width = 24, height = 24, fill = "#A0A5AE", fillOpacity = 0.8, ...props }) => (
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
      d="M6.83 17.08c7.07 4.243 12.727-1.414 12.02-12.02C8.244 4.353 2.587 10.01 6.83 17.08Zm0 0c-.001 0 0 0 0 0Zm0 0L5 18.91m1.83-1.828 3.827-3.829"
    />
  </svg>
)
export default EcoFriendlyIcon