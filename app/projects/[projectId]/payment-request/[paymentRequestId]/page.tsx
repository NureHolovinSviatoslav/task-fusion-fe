import { PaymentRequestView } from '@/views/payments/PaymentRequestView';

export default async function Page(props: { params: { projectId: string; paymentRequestId: string } }) {
  const { paymentRequestId } = props.params;

  return <PaymentRequestView paymentRequestId={paymentRequestId} />;
}
