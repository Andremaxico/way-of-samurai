import  * as React from 'react'
import { useSelector } from 'react-redux';
import { selectMyProfileInfo } from '../../../../Redux/profile-selectors';
import { MessageDataType } from '../../../../types/types';
import classes from './Message.module.scss';

type PropsType = {
  isMy?: boolean,
  data: MessageDataType,
}

const Message: React.FC<PropsType> = (props) => {
  const myUsername = useSelector(selectMyProfileInfo).fullName;
  console.log( `my username: ${myUsername}, curr name: ${props.data.username}`);
  const isMy = props.data.username === myUsername;
  return (
    <div className={`${classes.message} ${isMy ? classes._myMessage : ''}`}>
      <p className={classes.text}>{props.data.message}</p>
    </div>
  )
}

export default Message;