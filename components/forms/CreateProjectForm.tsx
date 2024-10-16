'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useMyProfile } from '@/hooks/useUserProfile';
import { QueryKeys } from '@/types/enums';
import { createProject } from '@/utils/api/mutations';
import { CreateProjectFormValues, createProjectSchema } from '@/utils/schemas/createProjectSchema';

import { Button } from '../common/Button';
import { DatePicker } from '../common/DatePicker';
import { Input } from '../common/Input';

import styles from './Form.module.scss';

export const CreateProjectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectSchema),
  });

  const router = useRouter();
  const { data } = useMyProfile();

  const { mutate: createProjectMutation } = useMutation({
    mutationFn: (values: CreateProjectFormValues) => {
      if (!data?.id) {
        throw new Error('You are not a client');
      }

      return createProject({
        ...values,
        clientUserId: data.id,
      });
    },
    mutationKey: [QueryKeys.PROJECTS + data?.id],
    onSuccess: () => {
      router.push('/dashboard');
    },
    onError: (error) => {
      setError('root', { message: error.message });
    },
  });

  const onSubmit: SubmitHandler<CreateProjectFormValues> = async (values) => {
    return createProjectMutation(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Title" {...register('title')} />

      {errors.title && <p className={styles.validationText}>{errors.title.message}</p>}

      <Input placeholder="Description" multiline {...register('description')} />

      {errors.description && <p className={styles.validationText}>{errors.description.message}</p>}

      <DatePicker placeholder="Deadline" isFuture {...register('deadline')} />

      {errors.deadline && <p className={styles.validationText}>{errors.deadline.message}</p>}

      {errors.root && <p className={styles.validationText}>{errors.root.message}</p>}

      <div className={styles.buttonWrapper}>
        <Button text="Create" bgColor="orange" isFontBold textColor="white" width="12.75rem" />
      </div>
    </form>
  );
};
