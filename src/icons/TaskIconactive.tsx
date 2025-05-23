interface InboxIconactiveProps {
  className?: string;
}

const TaskIcon: React.FC<InboxIconactiveProps> = ({ className }) => (
  <svg
    className={className}
    width="60"
    height="60"
    viewBox="0 0 76 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_2_266)">
      <path
        d="M72 34C72 52.7777 56.7777 68 38 68C19.2223 68 4 52.7777 4 34C4 15.2223 19.2223 0 38 0C56.7777 0 72 15.2223 72 34Z"
        fill="#F8B76B"
      />
    </g>
    <path
      // fill-rule="evenodd"
      // clip-rule="evenodd"
      d="M28.1111 24.6663H48.1111C49.3334 24.6663 50.3334 25.6663 50.3334 26.8885V41.3329C50.3334 42.5551 49.3334 43.5551 48.1111 43.5551H28.1111C26.8889 43.5551 25.8889 42.5551 25.8889 41.3329V26.8885C25.8889 25.6663 26.8889 24.6663 28.1111 24.6663ZM28.1111 26.8885V41.3329H37V26.8885H28.1111ZM48.1111 41.3329H39.2222V26.8885H48.1111V41.3329ZM47 30.7774H40.3334V32.444H47V30.7774ZM40.3334 33.5551H47V35.2218H40.3334V33.5551ZM47 36.3329H40.3334V37.9996H47V36.3329Z"
      fill="white"
    />
    <defs>
      <filter
        id="filter0_d_2_266"
        x="0"
        y="0"
        width="76"
        height="76"
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
          result="effect1_dropShadow_2_266"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2_266"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default TaskIcon;
