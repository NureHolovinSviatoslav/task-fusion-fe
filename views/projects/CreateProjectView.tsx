import { CreateProjectForm } from '@/components/forms/CreateProjectForm';

import styles from './projects.module.scss';

export const CreateProjectView = () => {
  return (
    <div className={styles.createProjectWrapper}>
      <h1>Create new project</h1>

      <div className="contentWrapper">
        <CreateProjectForm />
      </div>
    </div>
  );
};
