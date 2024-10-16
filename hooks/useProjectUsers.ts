import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { getProjectUsers } from '@/utils/api/queries';

export const useProjectUsers = (projectId: string) => {
  return useQuery({
    queryKey: [QueryKeys.PROJECT_USERS + projectId],
    queryFn: () => getProjectUsers(+projectId),
    retry: false,
  });
};
