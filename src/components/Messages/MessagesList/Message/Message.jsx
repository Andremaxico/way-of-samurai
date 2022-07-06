import React from 'react'
import classes from './Message.module.scss';

const Message = (props) => {
  return (
    <div className={`${classes.message} ${props.isMy ? classes._myMessage : ''}`}>
      <p className={classes.text}>{props.data.text}</p>
    </div>
  )
}

export default Message;