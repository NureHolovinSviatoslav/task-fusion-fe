import React from 'react';
import { forwardRef } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

import styles from './Input.module.scss';

type Props = {
  isSearch?: boolean;
  multiline?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>((props: Props, ref) => {
  const { isSearch = false, multiline = false, ...rest } = props;

  return (
    <div className={styles.searchContainer}>
      {isSearch && <IoSearchOutline className={styles.searchIcon} />}
      {multiline ? (
        <textarea
          className={styles.textarea}
          style={{ paddingLeft: isSearch ? '2.5rem' : '1.5rem' }}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          {...rest}
        />
      ) : (
        <input
          className={styles.search}
          style={{ paddingLeft: isSearch ? '2.5rem' : '1.5rem' }}
          ref={ref as React.Ref<HTMLInputElement>}
          {...rest}
        />
      )}
    </div>
  );
});

Input.displayName = 'Input';
