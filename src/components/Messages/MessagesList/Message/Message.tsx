import  * as React from 'react'
import { MessageDataType } from '../../../../types/types';
import classes from './Message.module.scss';

type PropsType = {
  isMy?: boolean,
  data: MessageDataType,
}

const Message: React.FC<PropsType> = (props) => {
  return (
    <div className={`${classes.message} ${props.isMy ? classes._myMessage : ''}`}>
      <p className={classes.text}>{props.data.text}</p>
    </div>
  )
}

export default Message;