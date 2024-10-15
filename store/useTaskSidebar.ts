import { create } from 'zustand';

import { TaskStatus } from '@/types/enums';

export type TaskSidebarState = TaskStatus | null;

type TaskSidebarStore = {
  taskSidebarState: TaskSidebarState;
  setTaskSidebarState: (type: TaskSidebarState) => void;
};

const useTaskSidebar = create<TaskSidebarStore>((set) => ({
  taskSidebarState: null,
  setTaskSidebarState: (taskSidebarState) => set({ taskSidebarState }),
}));

export default useTaskSidebar;
