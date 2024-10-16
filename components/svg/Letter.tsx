type Props = {
  isActive?: boolean;
};

export const Letter = (props: Props) => (
  <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.66665 6.66666H25.3333C26.6166 6.66666 27.6666 7.71666 27.6666 8.99999V23C27.6666 24.2833 26.6166 25.3333 25.3333 25.3333H6.66665C5.38331 25.3333 4.33331 24.2833 4.33331 23V8.99999C4.33331 7.71666 5.38331 6.66666 6.66665 6.66666Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M27.6666 9L16 17.1667L4.33331 9"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {props.isActive && <circle cx="28" cy="7" r="4" fill="#FD633D" />}
  </svg>
);
