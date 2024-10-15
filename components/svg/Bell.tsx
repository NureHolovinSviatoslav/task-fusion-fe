type Props = {
  isActive?: boolean;
};

export const Bell = (props: Props) => (
  <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24.5001 10.8889C24.5001 8.72295 23.6397 6.64573 22.1081 5.11419C20.5766 3.58264 18.4993 2.72223 16.3334 2.72223C14.1675 2.72223 12.0902 3.58264 10.5587 5.11419C9.02711 6.64573 8.16669 8.72295 8.16669 10.8889C8.16669 20.4166 4.08334 23.1389 4.08334 23.1389H28.5834C28.5834 23.1389 24.5001 20.4166 24.5001 10.8889Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M18.6882 28.5834C18.4489 28.9959 18.1054 29.3383 17.6921 29.5764C17.2789 29.8144 16.8103 29.9397 16.3334 29.9397C15.8565 29.9397 15.388 29.8144 14.9747 29.5764C14.5615 29.3383 14.218 28.9959 13.9787 28.5834"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {props.isActive && <ellipse cx="23.3334" cy="5.83337" rx="4.66669" ry="4.66668" fill="#FD633D" />}
  </svg>
);
