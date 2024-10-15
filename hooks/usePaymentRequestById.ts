import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { getPaymentRequestById } from '@/utils/api/queries';

export const usePaymentRequestById = (paymentRequestId: string) => {
  return useQuery({
    queryKey: [QueryKeys.PAYMENT_REQUEST + paymentRequestId],
    queryFn: () => getPaymentRequestById(+paymentRequestId),
  });
};
