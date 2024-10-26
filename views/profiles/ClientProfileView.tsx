'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import DefaultAvatar from '@/components/assets/Avatar.png';
import { Details } from '@/components/common/Details';
import { ListView } from '@/components/common/ListView';
import { LogoutButtonWrapper } from '@/components/common/LogoutButtonWrapper';
import { TextWithIcon } from '@/components/common/TextWithIcon';
import { useClientProjects } from '@/hooks/useClientProjects';
import { ProfileResponse } from '@/types';
import { mapClientProjectsToListItems } from '@/utils/helpers';

import styles from './profiles.module.scss';

type Props = {
  profile: ProfileResponse;
};

export const ClientProfileView = (props: Props) => {
  const { profile } = props;

  const { data: projects } = useClientProjects();

  const mappedProjects = useMemo(() => {
    if (!projects) {
      return [];
    }

    return mapClientProjectsToListItems(projects);
  }, [projects]);

  const DETAILS = [
    {
      title: 'Position',
      value: profile.userType,
    },
    {
      title: 'Email',
      value: profile.email,
    },
    {
      title: 'ID',
      value: profile.id || 'Not set',
    },
  ];

  return (
    <div>
      <h1>{profile.name}</h1>

      <div className={styles.contentWrapper}>
        <div className={styles.personalDetailsWrapper}>
          <div className={styles.avatarWrapper}>
            <Image src={DefaultAvatar} alt="Avatar" className={styles.avatar} />
          </div>

          <Details details={profile.description} />

          <Details details={DETAILS} />
        </div>

        <ListView
          title="Projects"
          rightElement={<TextWithIcon iconName="export" text="Export" isClickable />}
          listItems={mappedProjects}
        />
      </div>

      <div className={styles.logoutButtonWrapper}>
        <LogoutButtonWrapper />
      </div>
    </div>
  );
};
