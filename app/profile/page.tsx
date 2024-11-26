import { UserType } from '@/types/enums';
import { getMyProfile } from '@/utils/api/queries';
import { ClientProfileView } from '@/views/profiles/ClientProfileView';
import { DeveloperProfileView } from '@/views/profiles/DeveloperProfileView';
import { PmProfileView } from '@/views/profiles/PmProfileView';

export default async function Page() {
  const data = await getMyProfile();

  const renderProfile = () => {
    switch (data?.userType) {
      case UserType.CLIENT:
        return <ClientProfileView profile={data} />;
      case UserType.DEVELOPER:
        return <DeveloperProfileView profile={data} />;
      case UserType.PM:
        return <PmProfileView profile={data} />;
      default:
        return 'error';
    }
  };

  return renderProfile();
}
