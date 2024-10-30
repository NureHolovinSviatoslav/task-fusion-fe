'use client';

import Image from 'next/image';
import React, { useRef } from 'react';

import ImagePlaceholder from '@/components/assets/ImagePlaceholder.png';

import { Button } from './Button';
import styles from './ImageInput.module.scss';

type Props = {
  file: File | null;
  setFile: (file: File | null) => void;
};

export const ImageInput = (props: Props) => {
  const { file, setFile } = props;

  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!ref.current) {
      return;
    }

    if (file) {
      return setFile(null);
    }

    ref.current.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const [file] = e.target.files;

    setFile(file);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src={file ? URL.createObjectURL(file) : ImagePlaceholder.src}
          alt="Avatar"
          className={styles.image}
          width={120}
          height={120}
        />
      </div>

      <div className={styles.selectorWrapper}>
        <p className={styles.text}>Please upload a square image, size less than 1MB</p>

        <div className={styles.buttonWrapper}>
          <Button
            text={file ? 'Reset' : 'Choose File'}
            bgColor={file ? 'blue' : 'blue'}
            isFontBold
            textColor="black"
            onClick={handleClick}
            type="button"
          />

          <p className={styles.chosenFileText}>{file ? file.name : 'No file chosen'}</p>
        </div>
      </div>

      <input type="file" accept="image/*" ref={ref} onChange={handleChange} className={styles.hiddenInput} />
    </div>
  );
};
