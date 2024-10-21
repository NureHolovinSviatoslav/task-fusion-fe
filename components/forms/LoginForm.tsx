'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

import { QueryKeys } from '@/types/enums';
import { nextApiClient } from '@/utils/nextApiClient';
import { queryClient } from '@/utils/queryClient';
import { LoginFormValues, loginSchema } from '@/utils/schemas/loginSchema';

import { Button } from '../common/Button';
import { Input } from '../common/Input';

import styles from './Form.module.scss';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormValues> = async (values: LoginFormValues) => {
    try {
      await nextApiClient.post('/login', values);

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER_PROFILE],
      });
      router.replace('/dashboard');
      router.refresh();
    } catch (error) {
      setError('root', { message: 'Invalid credentials' });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Email" {...register('email')} />

      {errors.email && <p className={styles.validationText}>{errors.email.message}</p>}

      <Input type="password" placeholder="Password" {...register('password')} />

      {errors.password && <p className={styles.validationText}>{errors.password.message}</p>}

      {errors.root && <p className={styles.validationText}>{errors.root.message}</p>}

      <div className={styles.buttonWrapper}>
        <Button text="Login" bgColor="orange" isFontBold textColor="white" width="12.75rem" />

        <p className={styles.forgotPassword}>Forgot password?</p>
      </div>
    </form>
  );
};
