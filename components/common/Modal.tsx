import { PropsWithChildren } from 'react';

import styles from './Modal.module.scss';

type Props = PropsWithChildren & {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const Modal = (props: Props) => {
  const { title, children, isOpen, setIsOpen } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{title}</h2>

          <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
            ×
          </button>
        </div>

        <div className={styles.listItems}>{children}</div>
      </div>
    </div>
  );
};
