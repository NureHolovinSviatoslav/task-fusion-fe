'use client';

import classNames from 'classnames';
import { ReactNode } from 'react';

import styles from './Button.module.scss';

type Props = {
  text: string;
  isModalButton?: boolean;
  icon?: ReactNode;
  textColor?: 'white' | 'black';
  bgColor?: 'orange' | 'red' | 'green' | 'blue' | 'gray';
  width?: string;
  isFontBold?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export const Button = (props: Props) => {
  const {
    text,
    icon,
    width,
    bgColor = 'gray',
    textColor = 'black',
    isFontBold = true,
    onClick = () => {},
    disabled = false,
    type = 'submit',
  } = props;

  return (
    <button
      className={classNames(
        styles.button,
        styles[bgColor],
        styles['textColor_' + textColor],
        isFontBold && styles.fontBold,
        disabled && styles.disabled,
      )}
      style={{ width }}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon} <span>{text}</span>
    </button>
  );
};
