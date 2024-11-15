'use client';

import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { Button } from '@/components/common/Button';
import { ButtonWithModal } from '@/components/common/ButtonWithModal';
import { Column } from '@/components/common/Column';
import { Comment } from '@/components/common/Comment';
import { CommentInput } from '@/components/common/CommentInput';
import { Details } from '@/components/common/Details';
import { Loader } from '@/components/common/Loader';
import { NoData } from '@/components/common/NoData';
import { Select } from '@/components/common/Select';
import { Check } from '@/components/svg/Check';
import { Participant } from '@/components/svg/Participant';
import { useProjectUsers } from '@/hooks/useProjectUsers';
import { useTaskActions } from '@/hooks/useTaskActions';
import { useTaskById } from '@/hooks/useTaskById';
import { useTaskComments } from '@/hooks/useTaskComments';
import { useValidateAccessToTask } from '@/hooks/useValidateAccessToTask';
import { QueryKeys, TaskPriority, TaskStatus } from '@/types/enums';
import { assignTaskToUser, changeTaskPriority, changeTaskStatus, unassignTaskFromUser } from '@/utils/api/mutations';
import { mapActionsToColumns, mapTaskToDetails } from '@/utils/helpers';
import { queryClient } from '@/utils/queryClient';

import styles from './tasks.module.scss';

type Props = {
  taskId: string;
  projectId: string;
};

export const TaskPage = (props: Props) => {
  const { taskId, projectId } = props;

  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>(TaskPriority.LOW);

  const { data: validate, isLoading: isLoadingValidate } = useValidateAccessToTask(taskId);

  const { data: task, isLoading: isTaskLoading, isError } = useTaskById(taskId);
  const { data: actions, isLoading: isLoadingActions } = useTaskActions(taskId);
  const { data: comments, isLoading: isCommentsLoading } = useTaskComments(taskId);
  const { data: projectDeveloperUsers } = useProjectUsers(projectId);

  const invalidateTask = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [`${QueryKeys.PROJECTS}_${projectId}_${QueryKeys.TASKS}`],
    });

    queryClient.invalidateQueries({
      queryKey: [`${QueryKeys.TASK}_${taskId}`],
    });

    queryClient.invalidateQueries({
      queryKey: [`${QueryKeys.ACTIONS}_${taskId}`],
    });
  }, [projectId, taskId]);

  const { mutateAsync: mutateTaskStatusAsync } = useMutation({
    mutationFn: changeTaskStatus,
    onSuccess: invalidateTask,
  });

  const { mutateAsync: mutateTaskPriorityAsync } = useMutation({
    mutationFn: changeTaskPriority,
    onSuccess: invalidateTask,
  });

  const { mutateAsync: mutateAssignTaskAsync } = useMutation({
    mutationFn: assignTaskToUser,
    onSuccess: invalidateTask,
  });

  const { mutateAsync: mutateUnassignTaskAsync } = useMutation({
    mutationFn: unassignTaskFromUser,
    onSuccess: invalidateTask,
  });

  const commentsContent = useCallback(() => {
    if (isCommentsLoading) {
      return <Loader isSmall />;
    }

    if (!comments?.length) {
      return <NoData />;
    }

    return comments.map((comment) => (
      <Comment key={comment.id} name={comment.user.name} text={comment.text} date={comment.createdAt} />
    ));
  }, [comments, isCommentsLoading]);

  const assignUserToTask = (userId: number) => {
    mutateAssignTaskAsync({
      taskId: +taskId,
      userId,
    });
  };

  const unassignUserFromTask = (userId: number) => {
    mutateUnassignTaskAsync({
      taskId: +taskId,
      userId,
    });
  };

  const handleCloseTask = () => {
    mutateTaskStatusAsync({
      taskId: +taskId,
      taskStatus: TaskStatus.CLOSED,
    });
  };

  if (isTaskLoading || !task || isError || isLoadingValidate) {
    return <Loader />;
  }

  if (!validate?.allowed) {
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.text}>You are not allowed to access this task.</h2>;
      </div>
    );
  }

  return (
    <div>
      <h1>{task.title}</h1>

      <div className={styles.contentWrapper}>
        <Column
          title="Actions"
          columns={mapActionsToColumns(actions)}
          isLoading={isLoadingActions}
          projectId={+projectId}
        />

        <div className={styles.commentSection}>
          <Details details={task.description} />

          <CommentInput taskId={taskId} />

          {commentsContent()}
        </div>

        <div className={styles.taskDetailsSection}>
          <Details details={mapTaskToDetails(task)} />

          <ButtonWithModal title="Change the priority">
            <Select
              options={Object.values(TaskPriority).map((priority) => ({ value: priority, label: priority }))}
              defaultValue={task.taskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value as TaskPriority)}
              value={newTaskPriority}
            />

            <Button
              text="Save"
              bgColor="green"
              textColor="white"
              width="100%"
              icon={<Check />}
              onClick={() => mutateTaskPriorityAsync({ taskId: +taskId, taskPriority: newTaskPriority })}
            />
          </ButtonWithModal>

          <ButtonWithModal title="Manage participants">
            {projectDeveloperUsers?.length ? (
              projectDeveloperUsers.map((user) => {
                const isParticipant = task.users.find((u) => u.id === user.id);

                return (
                  <Button
                    key={user.id}
                    text={isParticipant ? `Unassign ${user.name}` : `Assign ${user.name}`}
                    bgColor={isParticipant ? 'red' : 'green'}
                    textColor="white"
                    width="100%"
                    icon={<Participant />}
                    onClick={() => {
                      if (isParticipant) {
                        return unassignUserFromTask(user.id);
                      }

                      return assignUserToTask(user.id);
                    }}
                  />
                );
              })
            ) : (
              <NoData />
            )}
          </ButtonWithModal>

          {task.taskStatus !== TaskStatus.CLOSED && (
            <Button
              text="Close task"
              bgColor="red"
              textColor="white"
              width="100%"
              icon={<Check />}
              onClick={handleCloseTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};
