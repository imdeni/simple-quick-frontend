interface InboxIconactiveProps {
  className?: string;
}

const TaskIcon: React.FC<InboxIconactiveProps> = ({ className }) => (
  <svg
    className={className}
    width="60"
    height="60"
    viewBox="0 0 68 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_2_175)">
      <path
        d="M64 30C64 46.5685 50.5685 60 34 60C17.4315 60 4 46.5685 4 30C4 13.4315 17.4315 0 34 0C50.5685 0 64 13.4315 64 30Z"
        fill="#F2F2F2"
      />
    </g>
    <path
      // fill-rule="evenodd"
      // clip-rule="evenodd"
      d="M25.1111 21.6667H45.1111C46.3334 21.6667 47.3334 22.6667 47.3334 23.889V38.3334C47.3334 39.5556 46.3334 40.5556 45.1111 40.5556H25.1111C23.8889 40.5556 22.8889 39.5556 22.8889 38.3334V23.889C22.8889 22.6667 23.8889 21.6667 25.1111 21.6667ZM25.1111 23.889V38.3334H34V23.889H25.1111ZM45.1111 38.3334H36.2222V23.889H45.1111V38.3334ZM44 27.7779H37.3334V29.4445H44V27.7779ZM37.3334 30.5556H44V32.2223H37.3334V30.5556ZM44 33.3334H37.3334V35.0001H44V33.3334Z"
      fill="#F8B76B"
    />
    <defs>
      <filter
        id="filter0_d_2_175"
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
          result="effect1_dropShadow_2_175"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2_175"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default TaskIcon;
