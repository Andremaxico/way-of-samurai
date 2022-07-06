import React from 'react';
import classes from '../FriendsList.module.scss';


export const FriendLink = (props) => {
  return (
    <a className={classes.friendLink}>
      <div className={classes.avatar}>
        <img src={props.friendInfo.avatarUrl} alt="Ypur friend's avatar" />
      </div>
      <p className={classes.name}>{props.friendInfo.name}</p>
    </a>
  )
}
