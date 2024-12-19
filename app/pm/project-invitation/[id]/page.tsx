import { PmProjectInvitationView } from '@/views/invites/PmProjectInvitationView';

export default function Page(props: { params: { id: string } }) {
  return <PmProjectInvitationView inviteId={props.params.id} />;
}
