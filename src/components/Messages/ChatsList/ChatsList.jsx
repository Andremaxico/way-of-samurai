import React from 'react'
import classes from '../Messages.module.scss';
import Chat from '../../../UI/Chat';

const ChatsList = (props) => {
  const list = props.chatsData.map(data => <Chat data={data} key={data.id}/>)
  return (
    <div className={classes.ChatsList}>
      {list}
    </div>
  )
}

export default ChatsList;