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
