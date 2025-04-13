//Collection is a list of the User's Games
//import logo from './logo.svg';
//import './App.css';

import React from 'react';
import { Link } from 'react-router-dom';

function Collection({ items, setItems, onEdit }) {
  const deleteGame = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h3>Game Collection</h3>
      <ul>
        {items.map(item => (
          <div key={item.id} style={{ borderBottom: "1px solid #ccc", padding: "1rem 0" }}>
            <strong>Game Name: </strong><Link to={`/game/${item.id}`} style={{ textDecoration: 'underline', color: 'inherit' }}>
              {item.name}
            </Link><br />
            <strong>Players:</strong> {item.players}<br />
            <strong>Playtime:</strong> {item.estimatedTime} mins<br />
            <strong>Purchase Date:</strong> {item.purchaseDate}<br />
            <strong>Purchase Price:</strong> {item.purchasePrice}<br />
            <button onClick={() => onEdit(item)}>Edit</button>
            <button onClick={() => deleteGame(item.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Collection;