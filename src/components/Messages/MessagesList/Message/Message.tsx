import  * as React from 'react'
import { useSelector } from 'react-redux';
import { selectMyProfileInfo } from '../../../../Redux/profile-selectors';
import { MessageDataType } from '../../../../types/types';
import classes from './Message.module.scss';
import defaultAvatar from '../../../../assests/images/default-user-avatar.png';
import { Link } from 'react-router-dom';

type PropsType = {
  data: MessageDataType,
}

const Message: React.FC<PropsType> = React.memo(({data}) => {
  const myUsername = useSelector(selectMyProfileInfo).fullName;
  const isMy = data.userName === myUsername;

  return (
    <div className={`${classes.message} ${isMy ? classes._myMessage : ''}`}>
      <Link to={`/profile/${data.userId}`} className={classes.userAvatar}>
        <img src={data.photo || defaultAvatar} alt="User avatar" />
      </Link>
      <div className={classes.messageBody}>
        <Link to={`/profile/${data.userId}`}>
          <h5 className={classes.username}>{data.userName}</h5>
        </Link>
        <p className={classes.text}>{data.message}</p>
      </div>
    </div>
  )
});

export default Message;