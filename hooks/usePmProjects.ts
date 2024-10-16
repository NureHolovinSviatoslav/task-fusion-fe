import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { getPmProjects } from '@/utils/api/queries';

export const usePmProjects = () => {
  return useQuery({ queryKey: [QueryKeys.PROJECTS], queryFn: getPmProjects });
};
