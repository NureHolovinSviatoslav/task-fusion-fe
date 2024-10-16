import { LoginForm } from '@/components/forms/LoginForm';

import styles from './auth.module.scss';

export const LoginPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Login</h1>

      <div className="contentWrapper">
        <LoginForm />
      </div>
    </div>
  );
};
