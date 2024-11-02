'use client';

import { useMutation } from '@tanstack/react-query';
import { notFound, useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { Button } from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';
import { ProjectDetails } from '@/components/common/ProjectDetails';
import { usePmInviteById } from '@/hooks/usePmInviteById';
import { useMyProfile } from '@/hooks/useUserProfile';
import { InviteStatus, QueryKeys } from '@/types/enums';
import { acceptPmInvite, rejectPmInvite } from '@/utils/api/mutations';
import { queryClient } from '@/utils/queryClient';

import styles from './invites.module.scss';

type Props = {
  inviteId: string;
};

export const PmProjectInvitationView = (props: Props) => {
  const { inviteId } = props;

  const router = useRouter();

  const { data: userProfile, isLoading: isLoadingProfile } = useMyProfile();
  const { data: invite, isLoading: isLoadingInvite } = usePmInviteById(inviteId);

  const projectId = invite?.projectId?.toString() || '';

  const { mutate: acceptInviteMutation } = useMutation({
    mutationFn: acceptPmInvite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PROJECTS + userProfile?.id],
      });

      setTimeout(() => {
        router.replace('/dashboard');

        queryClient.invalidateQueries({
          queryKey: [QueryKeys.PM_INVITES + inviteId],
        });
      }, 3000);
    },
  });

  const { mutate: rejectInviteMutation } = useMutation({
    mutationFn: rejectPmInvite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PROJECTS + userProfile?.id],
      });

      setTimeout(() => {
        router.replace('/dashboard');

        queryClient.invalidateQueries({
          queryKey: [QueryKeys.PM_INVITES + inviteId],
        });
      }, 3000);
    },
  });

  const handleAcceptInvite = useCallback(() => {
    acceptInviteMutation({
      inviteId: +inviteId,
    });
  }, [acceptInviteMutation, inviteId]);

  const handleRejectInvite = useCallback(() => {
    rejectInviteMutation({
      inviteId: +inviteId,
    });
  }, [inviteId, rejectInviteMutation]);

  const content = useCallback(() => {
    if (isLoadingInvite || isLoadingProfile) {
      return <Loader />;
    }

    if (!invite) {
      notFound();
    }

    if (!invite?.inviteStatus || invite.inviteStatus === InviteStatus.ACCEPTED) {
      return <h2 className={styles.text}>This invitation has already been accepted.</h2>;
    }

    if (!invite?.inviteStatus || invite.inviteStatus === InviteStatus.REJECTED) {
      return <h2 className={styles.text}>This invitation has already been rejected.</h2>;
    }

    if (!invite?.expiresAt || new Date(invite.expiresAt) < new Date()) {
      return <h2 className={styles.text}>This invitation has expired. Please contact the sender for a new invite.</h2>;
    }

    if (!userProfile || invite.pmUserId !== userProfile.id) {
      return <h2 className={styles.text}>Access denied. This invitation is not intended for your account.</h2>;
    }

    return (
      <>
        <div className={styles.formWrapper}>
          <p className={styles.text}>Would you like to accept this invite?</p>

          <div className={styles.buttonsWrapper}>
            <Button
              text="Accept Invite"
              bgColor="green"
              isFontBold
              textColor="white"
              width="12.75rem"
              onClick={handleAcceptInvite}
            />

            <Button
              text="Reject Invite"
              bgColor="blue"
              isFontBold
              textColor="black"
              width="12.75rem"
              onClick={handleRejectInvite}
            />
          </div>
        </div>

        <h2 className={styles.title}>Project Details:</h2>

        <ProjectDetails projectId={projectId} />
      </>
    );
  }, [handleAcceptInvite, handleRejectInvite, invite, isLoadingInvite, isLoadingProfile, projectId, userProfile]);

  return (
    <div>
      <h1>Project Invitation</h1>

      <div className={styles.wrapper}>{content()}</div>
    </div>
  );
};
