import React from 'react';
import classes from './WriteMessage.module.scss';

const WriteMessage = (props) => {
  const sendMessage = (event) => {
    event.preventDefault();
    if(props.newMessageValue.length > 0) {
      props.methods.sendMessage();
    }
  } 
  const updateTextareaValue = (event) => {
    const text = event.target.value;
    props.methods.updateNewMessageValue(text);
  }
  return (
    <form action='#' className={classes.WriteMessage} onSubmit={ sendMessage }>
      <textarea name="newMessageText" className={classes.textarea} placeholder='Input your message...' value={props.newMessageValue} onChange={ updateTextareaValue } />
      <button className={classes.btn}>Send Message</button>
    </form>
  )
}

export default WriteMessage;
