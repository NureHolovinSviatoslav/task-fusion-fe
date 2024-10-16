import { SignupForm } from '@/components/forms/SignupForm';

import styles from './auth.module.scss';

export const SignupPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Signup</h1>

      <div className="contentWrapper">
        <SignupForm />
      </div>
    </div>
  );
};
