//Play History is a List of Game Sessions 
//import logo from './logo.svg';
//import './App.css';

import React from 'react';
import { Link } from 'react-router-dom';

function PlayHistory({ items, setItems, onEdit }) {
  const deleteGameSession = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h3>Play History</h3>
      <ul>
        {items.map(item => (
        <div key={item.id} style={{ borderBottom: "1px solid #ccc", padding: "1rem 0" }}>
            <strong>Game Name: </strong><Link to={`/game/${item.id}`} style={{ textDecoration: 'underline', color: 'inherit' }}>
              {item.name}
            </Link><br/>
            <strong>Date:</strong> {item.date}<br/>
            <strong>Players:</strong> {item.numPlayers}<br/>
            <strong>Score:</strong> {item.score}<br/>
            <strong>Result:</strong> {item.result}<br/>
            <strong>Minutes Played:</strong> {item.time} mins<br/>
            <strong>Comments:</strong> {item.comments}<br/>
            <button onClick={() => onEdit(item)}>Edit</button>
          <button onClick={() => deleteGameSession(item.id)}>Delete</button>
        </div>
        ))}
      </ul>
    </div>
  );
}

export default PlayHistory;