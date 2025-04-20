// Play History is a List of Game Sessions

import React from 'react';
import { Link } from 'react-router-dom';
import BookmarkButtons from './BookmarkButtons';

function PlayHistory({ items, setItems, onEdit, bookmarks, setBookmarks, userId }) {
  const deleteGameSession = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h3>Play History</h3>
      <ul>
        {items.map(item => (
          <div key={item.id} style={{ borderBottom: "1px solid #ccc", padding: "1rem 0" }}>
            <strong>Game Name: </strong>
            <Link 
              to={`/game/${encodeURIComponent(item.name)}`} 
              style={{ textDecoration: 'underline', color: 'inherit' }}
            >
              {item.name}
            </Link>
            <br />
            <strong>Date:</strong> {item.date}<br />
            <strong>Players:</strong> {item.numPlayers}<br />
            <strong>Score:</strong> {item.score}<br />
            <strong>Result:</strong> {item.result}<br />
            <strong>Minutes Played:</strong> {item.time} mins<br />
            <strong>Comments:</strong> {item.comments}<br />
            <button onClick={() => onEdit(item)}>Edit</button>

            <BookmarkButtons
              gameId={item.gameId}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
            />

            <button onClick={() => deleteGameSession(item.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default PlayHistory;