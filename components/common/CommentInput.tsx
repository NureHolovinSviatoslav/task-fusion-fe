'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';

import { QueryKeys } from '@/types/enums';
import { createComment } from '@/utils/api/mutations';
import { queryClient } from '@/utils/queryClient';
import { CreateCommentFormValues, createCommentSchema } from '@/utils/schemas/createCommentSchema';

import { Button } from './Button';
import styles from './CommentInput.module.scss';
import { Input } from './Input';

type Props = {
  taskId: string;
};

export const CommentInput = (props: Props) => {
  const { taskId } = props;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateCommentFormValues>({
    resolver: zodResolver(createCommentSchema),
  });

  const { mutate: createCommentMutation } = useMutation({
    mutationFn: (values: CreateCommentFormValues) => {
      if (!values.comment) {
        throw new Error('Comment is required');
      }

      if (!taskId) {
        throw new Error('Task ID is required');
      }

      return createComment({
        ...values,
        taskId: +taskId,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.COMMENTS}_${taskId}`],
      });

      await queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.ACTIONS}_${taskId}`],
      });
    },
    onError: (error) => {
      setError('root', { message: error.message });
    },
  });

  const onSubmit: SubmitHandler<CreateCommentFormValues> = (data) => {
    createCommentMutation(data);
  };

  return (
    <form className={styles.commentInputWrapper} onSubmit={handleSubmit(onSubmit)}>
      <Input multiline className={styles.commentInput} placeholder="Add comment..." {...register('comment')} />

      {errors.comment && <p className={styles.validationText}>{errors.comment.message}</p>}

      {errors.root && <p className={styles.validationText}>{errors.root.message}</p>}

      <div className={styles.buttonWrapper}>
        <Button text="Publish" bgColor="orange" textColor="white" width="12.75rem" />
      </div>
    </form>
  );
};
