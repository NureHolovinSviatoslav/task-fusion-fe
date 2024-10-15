import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { getDeveloperInviteById } from '@/utils/api/queries';

export const useDeveloperInviteById = (inviteId: string) => {
  return useQuery({
    queryKey: [QueryKeys.DEV_INVITES + inviteId],
    queryFn: () => getDeveloperInviteById(+inviteId),
    enabled: Boolean(inviteId),
  });
};
