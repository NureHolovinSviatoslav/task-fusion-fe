import { InviteDeveloperView } from '@/views/invites/InviteDeveloperView';

export default async function Page(props: { params: { projectId: string } }) {
  const { projectId } = props.params;

  return <InviteDeveloperView projectId={projectId} />;
}
