import type { SVGProps } from "react";

const DevpostIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <g clipPath="url(#devpost_clip)">
      <path
        d="M7.40988 2.18094L0.000976563 15.0114L7.40988 27.8319L22.2178 27.8319L29.6267 15.0114L22.2178 2.18094L7.40988 2.18094ZM9.37629 7.22225L14.2485 7.22225C18.6985 7.22225 21.9956 9.31457 21.9956 15.0114C21.9956 20.4872 18.0332 22.7906 14.0263 22.7906L9.37629 22.7906L9.37629 7.22225ZM12.4833 10.2453L12.4833 19.7675H14.0152C17.2814 19.7675 18.7825 17.8542 18.7825 15.0015C18.7936 11.8303 17.4296 10.2453 14.1325 10.2453H12.4833Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="devpost_clip">
        <rect width="29.6257" height="29.6257" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default DevpostIcon;
