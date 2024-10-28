import { TaskPage } from '@/views/tasks/TaskView';

export default function Page(props: { params: { taskId: string; projectId: string } }) {
  const { taskId, projectId } = props.params;

  return <TaskPage taskId={taskId} projectId={projectId} />;
}
