import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { getClientPaymentRequests } from '@/utils/api/queries';

export const useClientPaymentRequests = () => {
  return useQuery({ queryKey: [QueryKeys.PAYMENT_REQUESTS], queryFn: getClientPaymentRequests });
};
