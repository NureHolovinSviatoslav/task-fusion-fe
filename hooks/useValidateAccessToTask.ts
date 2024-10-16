import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { validateAccessToTask } from '@/utils/api/queries';

export const useValidateAccessToTask = (taskId: string) => {
  return useQuery({
    queryFn: () => validateAccessToTask(+taskId),
    queryKey: [QueryKeys.VALIDATE_ACCESS_TO_TASK + taskId],
  });
};
