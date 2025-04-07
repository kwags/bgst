//Play History is a List of Game Sessions 
//import logo from './logo.svg';
//import './App.css';

import React from 'react';

function PlayHistory({ items, setItems }) {
  const deleteGameSession = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h3>Play History</h3>
      <ul>
        {items.map(item => (
          <li key={item.id} >
            <strong>Game:</strong> {item.name}<br/>
            <strong>Date:</strong> {item.date}<br/>
            <strong>Players:</strong> {item.numPlayers}<br/>
            <strong>Score:</strong> {item.score}<br/>
            <strong>Win/Loss:</strong> {item.winloss}<br/>
            <strong>Amount of Time Played:</strong> {item.time} mins<br/>
            <strong>Comments:</strong> {item.comments}<br/>
            <button onClick={() => deleteGameSession(item.id)}>Delete</button>
          </li> 
        ))}
      </ul>
    </div>
  );
}

export default PlayHistory;