import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { getPmInviteById } from '@/utils/api/queries';

export const usePmInviteById = (inviteId: string) => {
  return useQuery({
    queryKey: [QueryKeys.PM_INVITES + inviteId],
    queryFn: () => getPmInviteById(+inviteId),
    enabled: Boolean(inviteId),
  });
};
