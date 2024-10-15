import { useQuery } from '@tanstack/react-query';

import { QueryKeys, TaskStatus } from '@/types/enums';
import { getTasksByStatus } from '@/utils/api/queries';

export const useProjectTasksByStatus = (projectId: string, status: TaskStatus) => {
  return useQuery({
    queryKey: [`${QueryKeys.PROJECTS}_${projectId}_${QueryKeys.TASKS}_${status}`],
    queryFn: () => getTasksByStatus(+projectId, status),
  });
};
