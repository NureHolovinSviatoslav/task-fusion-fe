'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import useTaskSidebar from '@/store/useTaskSidebar';
import { QueryKeys, TaskPriority, TaskStatus } from '@/types/enums';
import { createTask } from '@/utils/api/mutations';
import { queryClient } from '@/utils/queryClient';
import { CreateTaskFormValues, createTaskSchema } from '@/utils/schemas/createTaskSchema';

import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';

import styles from './TaskSidebar.module.scss';

type Props = {
  projectId: number;
};

const TaskSidebar = (props: Props) => {
  const { projectId } = props;

  const { taskSidebarState, setTaskSidebarState } = useTaskSidebar();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),
  });

  const { mutate: createTaskMutation } = useMutation({
    mutationFn: (values: CreateTaskFormValues) => {
      if (!projectId) {
        throw new Error('Project ID is required');
      }

      return createTask({
        ...values,
        projectId,
      });
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.PROJECTS}_${projectId}_${QueryKeys.TASKS}_${data.data.taskStatus}`],
      });

      setTaskSidebarState(null);
    },
    onError: (error) => {
      setError('root', { message: error.message });
    },
  });

  const onSubmit: SubmitHandler<CreateTaskFormValues> = (data) => {
    createTaskMutation(data);
  };

  useEffect(() => {
    if (!taskSidebarState) {
      return;
    }

    setValue('taskStatus', taskSidebarState);
  }, [setValue, taskSidebarState]);

  return (
    <div className={`${styles.sidebar} ${taskSidebarState ? styles.active : ''}`}>
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Create Task</h2>

          <button className={styles.closeButton} onClick={() => setTaskSidebarState(null)}>
            ×
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Title" {...register('title')} />

          {errors.title && <p className={styles.validationText}>{errors.title.message}</p>}

          <Input placeholder="Description" multiline {...register('description')} />

          {errors.description && <p className={styles.validationText}>{errors.description.message}</p>}

          <Select
            placeholder="Priority"
            options={Object.values(TaskPriority).map((priority) => ({ value: priority, label: priority }))}
            {...register('taskPriority')}
          />

          {errors.taskPriority && <p className={styles.validationText}>{errors.taskPriority.message}</p>}

          <Select
            placeholder="Status"
            options={Object.values(TaskStatus).map((status) => ({ value: status, label: status }))}
            {...register('taskStatus')}
          />

          {errors.taskStatus && <p className={styles.validationText}>{errors.taskStatus.message}</p>}

          <Input
            type="date"
            placeholder="Deadline"
            defaultValue={moment().add(1, 'day').format('YYYY-MM-DD')}
            {...register('deadline')}
          />

          {errors.deadline && <p className={styles.validationText}>{errors.deadline.message}</p>}

          {errors.root && <p className={styles.validationText}>{errors.root.message}</p>}

          <div className={styles.buttonWrapper}>
            <Button text="Create Task" bgColor="orange" isFontBold textColor="white" width="12.75rem" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskSidebar;
