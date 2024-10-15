import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { getActionsByTaskId } from '@/utils/api/queries';

export const useTaskActions = (taskId: string) => {
  return useQuery({
    queryKey: [`${QueryKeys.ACTIONS}_${taskId}`],
    queryFn: () => getActionsByTaskId(+taskId),
  });
};
