import  * as React from 'react'
import { useSelector } from 'react-redux';
import { selectMyProfileInfo } from '../../../../Redux/profile-selectors';
import { MessageDataType } from '../../../../types/types';
import classes from './Message.module.scss';
import defaultAvatar from '../../../../assests/images/default-user-avatar.png';

type PropsType = {
  isMy?: boolean,
  data: MessageDataType,
}

const Message: React.FC<PropsType> = (props) => {
  const myUsername = useSelector(selectMyProfileInfo).fullName;
  const isMy = props.data.userName === myUsername;
  return (
    <div className={`${classes.message} ${isMy ? classes._myMessage : ''}`}>
      <div className={classes.userAvatar}>
        <img src={props.data.photo || defaultAvatar} alt="User avatar" />
      </div>
      <div className={classes.messageBody}>
        <h5 className={classes.username}>{props.data.userName}</h5>
        <p className={classes.text}>{props.data.message}</p>
      </div>
    </div>
  )
}

export default Message;