import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { validateAccessToProject } from '@/utils/api/queries';

export const useValidateAccessToProject = (projectId: string) => {
  return useQuery({
    queryFn: () => validateAccessToProject(+projectId),
    queryKey: [QueryKeys.VALIDATE_ACCESS_TO_PROJECT + projectId],
  });
};
