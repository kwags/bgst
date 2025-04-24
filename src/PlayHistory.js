// Play History is a List of Game Sessions
import React from 'react';
import { Link } from 'react-router-dom';
import BookmarkButtons from './BookmarkButtons';
import styles from './styles/PlayHistory.module.css';
import { useNavigate } from 'react-router-dom';

function PlayHistory({ items, setItems, onEdit, bookmarks, setBookmarks }) {
  const deleteGameSession = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <ul className={`${styles.list} ${styles.leftAlignedList}`}>
        {items.map(item => (
          <li key={item.id} className={`${styles.listItem} ${styles.leftCard}`}>
            <div className={styles.cardContent}>
              {item.image && (
                <div className={styles.imageMask}>
                  <img src={item.image} alt={item.name} className={styles.gameImage} />
                </div>
              )}
              <div className={`${styles.gameDetails} ${styles.leftDetails}`}>
                <h3 className={styles.gameName}>
                  <Link
                    to={`/game/${encodeURIComponent(item.name)}`}
                    style={{ textDecoration: 'none', color: '#0082BC' }}
                  >
                    {item.name}
                  </Link>
                </h3>
                <p className={styles.gameInfo}><strong>Date:</strong> {item.date}</p>
                <p className={styles.gameInfo}><strong>Players:</strong> {item.numPlayers}</p>
                <p className={styles.gameInfo}><strong>Score:</strong> {item.score}</p>
                <p className={styles.gameInfo}><strong>Result:</strong> {item.result}</p>
                <p className={styles.gameInfo}><strong>Minutes Played:</strong> {item.time} mins</p>
                <p className={styles.gameInfo}><strong>Comments:</strong> {item.comments}</p>
                <div className={styles.buttonGroup}>
                  <button onClick={() => onEdit(item)}>Edit Session</button>
                  <button onClick={() => deleteGameSession(item.id)}>Delete Session</button>
                  <button onClick={() => navigate(`/stats/${item.gameId}`)}>Game Stats</button>             
                  <BookmarkButtons
                    gameId={item.gameId}
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayHistory;