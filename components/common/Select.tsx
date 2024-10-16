import React, { forwardRef } from 'react';
import { IoChevronDown } from 'react-icons/io5';

import styles from './Select.module.scss';

type Props = {
  options: { value: string; label: string }[];
  placeholder?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, Props>((props: Props, ref) => {
  const { options, placeholder = 'Select an option', defaultValue = '', ...rest } = props;

  return (
    <div className={styles.selectContainer}>
      <select className={styles.select} ref={ref} {...rest}>
        <option defaultValue={defaultValue} disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <IoChevronDown className={styles.selectIcon} />
    </div>
  );
});

Select.displayName = 'Select';
