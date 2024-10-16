import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { getProjectPmUser } from '@/utils/api/queries';

export const useProjectPmUser = (projectId: string) => {
  return useQuery({
    queryKey: [QueryKeys.PROJECT_PM_USER + projectId],
    queryFn: () => getProjectPmUser(+projectId),
    retry: false,
  });
};
