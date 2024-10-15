import { PropsWithChildren, useState } from 'react';

import { Button } from './Button';
import { Modal } from './Modal';

type Props = PropsWithChildren & {
  title: string;
};

export const ButtonWithModal = (props: Props) => {
  const { title, children } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button text={title} isModalButton width="100%" isFontBold={false} onClick={() => setIsOpen(true)} />

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
        {children}
      </Modal>
    </>
  );
};
