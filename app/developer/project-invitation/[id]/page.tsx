import { DeveloperProjectInvitationView } from '@/views/invites/DeveloperProjectInvitationView';

export default function Page(props: { params: { id: string } }) {
  return <DeveloperProjectInvitationView inviteId={props.params.id} />;
}
