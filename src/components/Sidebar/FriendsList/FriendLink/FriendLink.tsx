import * as React from 'react';
import { FriendCardType } from '../../../../types/types';
import classes from '../FriendsList.module.scss';

type PropsType = {
  friendInfo: FriendCardType,
}

export const FriendLink: React.FC<PropsType> = (props) => {
  return (
    <a className={classes.friendLink}>
      <div className={classes.avatar}>
        <img src={props.friendInfo.avatarUrl} alt="Ypur friend's avatar" />
      </div>
      <p className={classes.name}>{props.friendInfo.name}</p>
    </a>
  )
}
