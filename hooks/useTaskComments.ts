import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { getCommentsByTaskId } from '@/utils/api/queries';

export const useTaskComments = (taskId: string) => {
  return useQuery({
    queryKey: [`${QueryKeys.COMMENTS}_${taskId}`],
    queryFn: () => getCommentsByTaskId(+taskId),
  });
};
