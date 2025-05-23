interface InboxIconactiveProps {
  className?: string;
}

const InboxIconactive: React.FC<InboxIconactiveProps> = ({ className }) => (
  <svg
    className={className}
    width="54"
    height="54"
    viewBox="0 0 68 68"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M68 34C68 52.7777 52.7777 68 34 68C15.2223 68 0 52.7777 0 34C0 15.2223 15.2223 0 34 0C52.7777 0 68 15.2223 68 34Z"
      fill="#8785FF"
    />
    <path
      // fill-rule="evenodd"
      // clip-rule="evenodd"
      d="M39.0371 23.9261H22.6667C21.9741 23.9261 21.4075 24.4928 21.4075 25.1854V42.815L26.4445 37.778H39.0371C39.7297 37.778 40.2964 37.2113 40.2964 36.5187V25.1854C40.2964 24.4928 39.7297 23.9261 39.0371 23.9261ZM37.7779 26.4446V35.2594H25.3993L24.6564 36.0024L23.926 36.7327V26.4446H37.7779ZM42.8149 28.9632H45.3334C46.026 28.9632 46.5927 29.5299 46.5927 30.2225V49.1114L41.5556 44.0743H27.7038C27.0112 44.0743 26.4445 43.5077 26.4445 42.8151V40.2965H42.8149V28.9632Z"
      fill="white"
    />
  </svg>
);

export default InboxIconactive;
