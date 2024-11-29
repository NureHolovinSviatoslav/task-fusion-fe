import { RequestPaymentForm } from '@/components/forms/RequestPaymentForm';

import styles from './payments.module.scss';

export const RequestPaymentView = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Request payment</h1>

      <div className="contentWrapper">
        <RequestPaymentForm />
      </div>
    </div>
  );
};
