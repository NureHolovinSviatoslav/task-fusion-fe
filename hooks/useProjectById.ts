import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { getProjectById } from '@/utils/api/queries';

export const useProjectById = (projectId: string) => {
  return useQuery({
    queryKey: [QueryKeys.PROJECT + projectId],
    queryFn: () => getProjectById(projectId),
  });
};
