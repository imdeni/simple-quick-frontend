const InboxIcon = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 68 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_2_188)">
      <path
        d="M64 30C64 46.5685 50.5685 60 34 60C17.4315 60 4 46.5685 4 30C4 13.4315 17.4315 0 34 0C50.5685 0 64 13.4315 64 30Z"
        fill="#F2F2F2"
      />
    </g>
    <path
      // fill-rule="evenodd"
      // clip-rule="evenodd"
      d="M38.4443 21.1107H23.9999C23.3888 21.1107 22.8888 21.6107 22.8888 22.2218V37.7774L27.3332 33.3329H38.4443C39.0555 33.3329 39.5555 32.8329 39.5555 32.2218V22.2218C39.5555 21.6107 39.0555 21.1107 38.4443 21.1107ZM37.3332 23.3329V31.1106H26.411L25.7555 31.7662L25.111 32.4106V23.3329H37.3332ZM41.7777 25.5552H43.9999C44.611 25.5552 45.111 26.0552 45.111 26.6663V43.333L40.6666 38.8885H28.4443C27.8332 38.8885 27.3332 38.3885 27.3332 37.7774V35.5552H41.7777V25.5552Z"
      fill="#8885FF"
    />
    <defs>
      <filter
        id="filter0_d_2_188"
        x="0"
        y="0"
        width="68"
        height="68"
        filterUnits="userSpaceOnUse"
        // color-interpolation-filters="sRGB"
      >
        {/* <feFlood flood-opacity="0" result="BackgroundImageFix" /> */}
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2_188"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2_188"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default InboxIcon;
