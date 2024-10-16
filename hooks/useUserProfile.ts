import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/types/enums';
import { getMyProfile } from '@/utils/api/queries';

export const useMyProfile = () => {
  return useQuery({
    queryKey: [QueryKeys.USER_PROFILE],
    queryFn: getMyProfile,
    retry: false,
  });
};
