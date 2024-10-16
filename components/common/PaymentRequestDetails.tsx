import moment from 'moment';

import { getPaymentRequestById } from '@/utils/api/queries';

import { Details } from './Details';
import styles from './PaymentRequestDetails.module.scss';

type Props = {
  paymentRequestId: string;
};

export const PaymentRequestDetails = async (props: Props) => {
  const { paymentRequestId } = props;

  const paymentRequest = await getPaymentRequestById(+paymentRequestId);

  const DETAILS = [
    {
      title: 'Start date',
      value: moment(paymentRequest.paymentPeriodStartDate).format('MM/DD/YYYY, h:mm a'),
    },
    {
      title: 'End date',
      value: moment(paymentRequest.paymentPeriodEndDate).format('MM/DD/YYYY, h:mm a'),
    },
    {
      title: 'Status',
      value: paymentRequest.status,
    },
    {
      title: 'Amount',
      value: `$${paymentRequest.usdAmount}`,
    },
    {
      title: 'Created at',
      value: moment(paymentRequest.createdAt).format('MM/DD/YYYY, h:mm a'),
    },
  ];

  return (
    <div className={styles.detailsWrapper}>
      <Details details={DETAILS} />

      <Details details={paymentRequest.comment} stringDetailsHeading="Comment" />
    </div>
  );
};
