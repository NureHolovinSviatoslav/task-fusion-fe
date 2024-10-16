type Props = {
  isOpen?: boolean;
};

export const DownArrow = (props: Props) => (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'all 0.3s',
    }}
  >
    <path d="M1 1.5L6 6.5L11 1.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
