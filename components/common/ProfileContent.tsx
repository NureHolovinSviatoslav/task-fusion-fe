import Image from 'next/image';
import Link from 'next/link';

import DefaultAvatarImage from '@/components/assets/Avatar.png';
import { getMyProfile } from '@/utils/api/queries';

import styles from './ProfileContent.module.scss';

export const ProfileContent = async () => {
  const data = await getMyProfile();

  return (
    <div className={styles.profileContainerWrapper}>
      <Link href="/profile">
        <div className={styles.profileContainer}>
          <Image src={DefaultAvatarImage.src} alt="Avatar" width={40} height={40} />

          <p>{data.name}</p>
        </div>
      </Link>
    </div>
  );
};
