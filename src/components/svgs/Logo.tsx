import type { SVGProps } from "react";

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.22195 35.8246L1 30.5311L15.314 3.86201L25.8904 22.7848L19.966 22.889L15.4856 15.5431L4.22195 35.8246Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M28.2541 24.144L16.4856 3.08827L22.6169 3L38.1865 29.211L17.3615 29.3782L20.0079 24.2889L28.2541 24.144Z"
      fill="currentColor"
    />
    <path
      d="M5.44881 36.5015L35.5645 36.0973L38.2726 30.6097L14.8615 30.812L18.7885 23.5981L15.5446 18.3202L5.44881 36.5015Z"
      fill="currentColor"
    />
  </svg>
);

export default Logo;
