import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { getTaskById } from '@/utils/api/queries';

export const useTaskById = (taskId: string) => {
  return useQuery({
    queryKey: [`${QueryKeys.TASK}_${taskId}`],
    queryFn: () => getTaskById(+taskId),
  });
};
