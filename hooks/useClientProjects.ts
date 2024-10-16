import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { getClientProjects } from '@/utils/api/queries';

export const useClientProjects = () => {
  return useQuery({ queryKey: [QueryKeys.PROJECTS], queryFn: getClientProjects });
};
