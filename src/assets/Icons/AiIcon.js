import * as React from "react";

const AiIcon = ({
  width = 20,
  height = 20,
  fill = "#FFC252",
  stroke = "#FFC252",
  fillOpacity = 0.8,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.436 10.0828L11.404 8.59844L9.91958 4.56328C9.83168 4.32448 9.67264 4.11838 9.46393 3.9728C9.25521 3.82722 9.00687 3.74917 8.75239 3.74917C8.49792 3.74917 8.24958 3.82722 8.04086 3.9728C7.83215 4.11838 7.67311 4.32448 7.58521 4.56328L6.09927 8.59375L2.06411 10.0781C1.82531 10.166 1.61921 10.3251 1.47363 10.5338C1.32806 10.7425 1.25 10.9908 1.25 11.2453C1.25 11.4998 1.32806 11.7481 1.47363 11.9568C1.61921 12.1656 1.82531 12.3246 2.06411 12.4125L6.0938 13.9062L7.57818 17.9391C7.66608 18.1779 7.82512 18.384 8.03383 18.5295C8.24255 18.6751 8.49089 18.7532 8.74536 18.7532C8.99983 18.7532 9.24818 18.6751 9.45689 18.5295C9.66561 18.384 9.82465 18.1779 9.91255 17.9391L11.3969 13.907L15.4321 12.4227C15.6709 12.3348 15.877 12.1757 16.0226 11.967C16.1681 11.7583 16.2462 11.5099 16.2462 11.2555C16.2462 11.001 16.1681 10.7527 16.0226 10.5439C15.877 10.3352 15.6709 10.1762 15.4321 10.0883L15.436 10.0828ZM10.968 12.7344C10.7991 12.7964 10.6457 12.8944 10.5185 13.0216C10.3913 13.1488 10.2933 13.3022 10.2313 13.4711L8.74693 17.4914L7.26568 13.468C7.20364 13.3 7.10594 13.1474 6.9793 13.0208C6.85266 12.8941 6.70009 12.7964 6.53208 12.7344L2.51177 11.25L6.53208 9.76562C6.70009 9.70359 6.85266 9.60589 6.9793 9.47925C7.10594 9.35261 7.20364 9.20004 7.26568 9.03203L8.75005 5.01172L10.2344 9.03203C10.2964 9.20093 10.3944 9.35431 10.5216 9.48153C10.6489 9.60875 10.8022 9.70676 10.9711 9.76875L14.9915 11.2531L10.968 12.7344ZM11.2501 3.125C11.2501 2.95924 11.3159 2.80027 11.4331 2.68306C11.5503 2.56585 11.7093 2.5 11.8751 2.5H13.1251V1.25C13.1251 1.08424 13.1909 0.925268 13.3081 0.808058C13.4253 0.690848 13.5843 0.625 13.7501 0.625C13.9158 0.625 14.0748 0.690848 14.192 0.808058C14.3092 0.925268 14.3751 1.08424 14.3751 1.25V2.5H15.6251C15.7908 2.5 15.9498 2.56585 16.067 2.68306C16.1842 2.80027 16.2501 2.95924 16.2501 3.125C16.2501 3.29076 16.1842 3.44973 16.067 3.56694C15.9498 3.68415 15.7908 3.75 15.6251 3.75H14.3751V5C14.3751 5.16576 14.3092 5.32473 14.192 5.44194C14.0748 5.55915 13.9158 5.625 13.7501 5.625C13.5843 5.625 13.4253 5.55915 13.3081 5.44194C13.1909 5.32473 13.1251 5.16576 13.1251 5V3.75H11.8751C11.7093 3.75 11.5503 3.68415 11.4331 3.56694C11.3159 3.44973 11.2501 3.29076 11.2501 3.125ZM19.3751 6.875C19.3751 7.04076 19.3092 7.19973 19.192 7.31694C19.0748 7.43415 18.9158 7.5 18.7501 7.5H18.1251V8.125C18.1251 8.29076 18.0592 8.44973 17.942 8.56694C17.8248 8.68415 17.6658 8.75 17.5001 8.75C17.3343 8.75 17.1753 8.68415 17.0581 8.56694C16.9409 8.44973 16.8751 8.29076 16.8751 8.125V7.5H16.2501C16.0843 7.5 15.9253 7.43415 15.8081 7.31694C15.6909 7.19973 15.6251 7.04076 15.6251 6.875C15.6251 6.70924 15.6909 6.55027 15.8081 6.43306C15.9253 6.31585 16.0843 6.25 16.2501 6.25H16.8751V5.625C16.8751 5.45924 16.9409 5.30027 17.0581 5.18306C17.1753 5.06585 17.3343 5 17.5001 5C17.6658 5 17.8248 5.06585 17.942 5.18306C18.0592 5.30027 18.1251 5.45924 18.1251 5.625V6.25H18.7501C18.9158 6.25 19.0748 6.31585 19.192 6.43306C19.3092 6.55027 19.3751 6.70924 19.3751 6.875Z"
        fill={fill}
      />
    </svg>
  );
};

export default AiIcon;
