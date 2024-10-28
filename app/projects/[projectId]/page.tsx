import { ProjectView } from '@/views/projects/ProjectView';

export default async function Page(props: { params: { projectId: string } }) {
  const { projectId } = props.params;

  return <ProjectView projectId={projectId} />;
}
