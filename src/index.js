import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

const usersInfo = [
  {
    avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
    name: 'Andriy',
    id: 1,
  },
  {
    avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
    name: 'Ivan',
    id: 2,
  },
  {
    avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
    name: 'Vasya',
    id: 3,
  },
  {
    avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
    name: 'David',
    id: 4,
  },
];
const messagesData = [
  {
    text: 'Hi',
  },
  {
    text: 'How are you?',
  },
  {
    text: 'Where are you?',
  },
  {
    text: 'Want to home?...',
  },
  {
    text: 'Me too...:(',
  },
];
const postsData = [
  {
    text: 'Hi',
    likesCount: 0,
  },
  {
    text: 'How are you?',
    likesCount: 0,
  },
  {
    text: 'Where are you?',
    likesCount: 5,
  },
  {
    text: 'Want to home?...',
    likesCount: 8,
  },
  {
    text: 'Me too...:(',
    likesCount: 6,
  },
];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App data={{
      messages: {messagesData, usersInfo},
      profile: postsData,
    }} />
  </React.StrictMode>
);

