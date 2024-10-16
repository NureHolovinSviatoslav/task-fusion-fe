import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { getUserNotitifications } from '@/utils/api/queries';

export const useMyNotifications = () => {
  return useQuery({
    queryKey: [QueryKeys.NOTIFICATIONS],
    queryFn: getUserNotitifications,
    refetchInterval: 5000,
    enabled: true,
  });
};
