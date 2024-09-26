const BackIcon = ({ width = 24, height = 24 }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    width={width}
    height={height}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
    />
  </svg>
);

export default BackIcon;