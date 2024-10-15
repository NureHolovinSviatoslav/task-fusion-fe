import { ReactNode } from 'react';

import { ListItem, Props as ListItemProps } from '@/components/common/ListItem';

import styles from './ListView.module.scss';
import { Loader } from './Loader';
import { NoData } from './NoData';

type Props = {
  title: string;
  listItems: ListItemProps[];
  rightElement?: ReactNode;
  isLoading?: boolean;
};

export const ListView = (props: Props) => {
  const { title, listItems, rightElement, isLoading } = props;

  const contentItems = () => {
    if (isLoading) {
      return <Loader isSmall />;
    }

    if (!listItems?.length) {
      return <NoData />;
    }

    return (
      <div className={styles.listItems}>
        {listItems.length ? listItems.map((listItem) => <ListItem key={listItem.title} {...listItem} />) : <NoData />}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <p className={styles.title}>{title}</p>

        {rightElement}
      </div>

      {contentItems()}
    </div>
  );
};
