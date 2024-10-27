'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { format, subDays } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useProjectById } from '@/hooks/useProjectById';
import { createPaymentRequest } from '@/utils/api/mutations';
import { createPaymentRequestSchema, CreatePaymentRequestValues } from '@/utils/schemas/createPaymentRequestSchema';

import { Button } from '../common/Button';
import { DatePicker } from '../common/DatePicker';
import { Input } from '../common/Input';

import styles from './Form.module.scss';

export const RequestPaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValidating, isLoading },
    setError,
  } = useForm<CreatePaymentRequestValues>({
    resolver: zodResolver(createPaymentRequestSchema),
  });

  const [isRequestSent, setIsRequestSent] = useState(false);

  const router = useRouter();
  const params = useParams<{ projectId: string }>();

  const projectId = params.projectId || '';

  const { data: project } = useProjectById(projectId);

  const { mutate: mutateCreatePaymentRequest } = useMutation({
    mutationFn: (values: CreatePaymentRequestValues) => {
      if (!projectId || !project) {
        throw new Error('Project ID is required');
      }

      return createPaymentRequest({
        clientUserId: +project.clientUserId,
        projectId: +projectId,
        usdAmount: +values.usdAmount,
        comment: values.comment,
        paymentPeriodStartDate: values.startDate,
        paymentPeriodEndDate: values.endDate,
      });
    },
    onSuccess: () => {
      setIsRequestSent(true);

      setTimeout(() => {
        router.replace(`/projects/${projectId}`);
      }, 3000);
    },
    onError: (error) => {
      setError('root', { message: error.message });
    },
  });

  const onSubmit: SubmitHandler<CreatePaymentRequestValues> = async (values) => {
    mutateCreatePaymentRequest(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Amount in USD" type="number" {...register('usdAmount')} />
      {errors.usdAmount && <p className={styles.validationText}>{errors.usdAmount.message}</p>}

      <DatePicker
        placeholder="Payment period start date"
        {...register('startDate')}
        defaultValue={format(subDays(new Date(), 1), 'yyyy-MM-dd')}
      />
      {errors.startDate && <p className={styles.validationText}>{errors.startDate.message}</p>}

      <DatePicker
        placeholder="Payment period end date"
        {...register('endDate')}
        defaultValue={format(new Date(), 'yyyy-MM-dd')}
      />
      {errors.endDate && <p className={styles.validationText}>{errors.endDate.message}</p>}

      <Input placeholder="Comment..." multiline {...register('comment')} />
      {errors.comment && <p className={styles.validationText}>{errors.comment.message}</p>}

      {errors.root && <p className={styles.validationText}>{errors.root.message}</p>}

      <div className={styles.buttonWrapper}>
        {isRequestSent ? (
          <p className={styles.requestText}>Request sent!</p>
        ) : (
          <Button
            text="Request payment"
            bgColor="orange"
            isFontBold
            textColor="white"
            width="12.75rem"
            disabled={isValidating || isLoading}
          />
        )}
      </div>
    </form>
  );
};
