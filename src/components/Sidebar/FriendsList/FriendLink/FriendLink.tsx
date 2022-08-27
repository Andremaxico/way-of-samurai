import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FriendCardType, UserCardType } from '../../../../types/types';
import classes from '../FriendsList.module.scss';
import defaultAvatar from '../../../../assests/images/default-user-avatar.png';

type PropsType = {
  friendInfo: UserCardType,
}

export const FriendLink: React.FC<PropsType> = (props) => {
  return (
    <NavLink to={`/profile/${props.friendInfo.id}`} className={classes.friendLink}>
      <div className={classes.avatar}>
        <img src={props.friendInfo.photos?.small || defaultAvatar} alt="Ypur friend's avatar" />
      </div>
      <p className={classes.name}>{props.friendInfo.name}</p>
    </NavLink>
  )
}
