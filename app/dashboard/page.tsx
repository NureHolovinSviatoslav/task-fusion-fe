import { UserType } from '@/types/enums';
import { getMyProfile } from '@/utils/api/queries';
import { ClientDashboardView } from '@/views/dashboard/ClientDashboardView';
import { DeveloperDashboardView } from '@/views/dashboard/DeveloperDashboardView';
import { PmDashboardView } from '@/views/dashboard/PmDashboardView';

export default async function Page() {
  const data = await getMyProfile();

  const renderDashboard = () => {
    switch (data?.userType) {
      case UserType.CLIENT:
        return <ClientDashboardView />;
      case UserType.DEVELOPER:
        return <DeveloperDashboardView />;
      case UserType.PM:
        return <PmDashboardView />;
      default:
        throw new Error('Invalid user type');
    }
  };

  return renderDashboard();
}
