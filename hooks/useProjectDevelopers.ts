import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { getProjectDeveloperUsers } from '@/utils/api/queries';

export const useProjectDevelopers = (projectId: string) => {
  return useQuery({
    queryKey: [QueryKeys.PROJECT_DEVELOPER_USERS + projectId],
    queryFn: () => getProjectDeveloperUsers(+projectId),
    retry: false,
  });
};
