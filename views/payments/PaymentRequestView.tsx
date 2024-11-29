'use client';

import { useMutation } from '@tanstack/react-query';
import { notFound, useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { Button } from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';
import { PaymentRequestDetails } from '@/components/common/PaymentRequestDetails';
import { ProjectDetails } from '@/components/common/ProjectDetails';
import { usePaymentRequestById } from '@/hooks/usePaymentRequestById';
import { useMyProfile } from '@/hooks/useUserProfile';
import { PaymentRequestStatus, QueryKeys } from '@/types/enums';
import { createCheckoutSession, rejectPaymentRequest } from '@/utils/api/mutations';
import { queryClient } from '@/utils/queryClient';

import styles from './payments.module.scss';

type Props = {
  paymentRequestId: string;
};

export const PaymentRequestView = (props: Props) => {
  const { paymentRequestId } = props;

  const router = useRouter();

  const { data: userProfile } = useMyProfile();
  const { data: paymentRequest, isLoading: isLoadingPaymentRequest } = usePaymentRequestById(paymentRequestId);

  const { mutate: mutateRejectPaymentRequest } = useMutation({
    mutationFn: rejectPaymentRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PAYMENT_REQUESTS],
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PAYMENT_REQUEST + paymentRequestId],
      });

      setTimeout(() => {
        router.replace('/dashboard');
      }, 3000);
    },
  });

  const { mutate: mutateCreateCheckoutSession } = useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: ({ data }) => {
      window.location.href = data.url;
    },
  });

  const content = useCallback(() => {
    if (isLoadingPaymentRequest) {
      return <Loader />;
    }

    if (!paymentRequest) {
      notFound();
    }

    if (!paymentRequest?.status || paymentRequest?.status === PaymentRequestStatus.ACCEPTED) {
      return <h2 className={styles.text}>This request has already been accepted.</h2>;
    }

    if (!paymentRequest?.status || paymentRequest?.status === PaymentRequestStatus.REJECTED) {
      return <h2 className={styles.text}>This request has already been rejected.</h2>;
    }

    if (!userProfile || paymentRequest.clientUserId !== userProfile.id) {
      return <h2 className={styles.text}>Access denied. This request is not intended for your account.</h2>;
    }

    return (
      <>
        <div className={styles.formWrapper}>
          <p className={styles.text}>Would you like to approve this payment request?</p>
          <p className={styles.text}>You will be redirected to the checkout page</p>

          <div className={styles.buttonsWrapper}>
            <Button
              text="Approve Request"
              bgColor="green"
              isFontBold
              textColor="white"
              width="12.75rem"
              onClick={() =>
                mutateCreateCheckoutSession({
                  projectId: paymentRequest.projectId.toString(),
                  paymentRequestId: paymentRequest.id.toString(),
                  usdAmount: paymentRequest.usdAmount,
                })
              }
            />

            <Button
              text="Decline Request"
              bgColor="blue"
              isFontBold
              textColor="black"
              width="12.75rem"
              onClick={() =>
                mutateRejectPaymentRequest({
                  paymentRequestId,
                })
              }
            />
          </div>
        </div>

        <h2 className={styles.title}>Payment details and client comment:</h2>

        <PaymentRequestDetails paymentRequestId={paymentRequest.id.toString()} />

        <h2 className={styles.title}>Project details:</h2>

        <ProjectDetails projectId={paymentRequest.projectId.toString()} />
      </>
    );
  }, [
    isLoadingPaymentRequest,
    mutateCreateCheckoutSession,
    mutateRejectPaymentRequest,
    paymentRequest,
    paymentRequestId,
    userProfile,
  ]);

  return (
    <div>
      <h1>Payment Request</h1>

      <div className={styles.wrapper}>{content()}</div>
    </div>
  );
};
