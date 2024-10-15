import { useQuery } from '@tanstack/react-query';

import { QueryKeys, TaskStatus } from '@/types/enums';
import { getMyTasksByStatus } from '@/utils/api/queries';

export const useMyTasksByStatus = (taskStatus: TaskStatus) => {
  return useQuery({
    queryKey: [QueryKeys.MY_TASKS_BY_STATUS + taskStatus],
    queryFn: () => getMyTasksByStatus(taskStatus),
  });
};
