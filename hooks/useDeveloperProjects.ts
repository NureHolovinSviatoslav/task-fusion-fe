import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { getDeveloperProjects } from '@/utils/api/queries';

export const useDeveloperProjects = () => {
  return useQuery({ queryKey: [QueryKeys.PROJECTS], queryFn: getDeveloperProjects });
};
