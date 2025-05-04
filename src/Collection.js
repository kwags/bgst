//Collection is a list of the User's Games

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookmarkButtons from './BookmarkButtons';
import styles from './styles/PlayHistory.module.css';

<<<<<<< HEAD
function Collection({ items = [], setItems, onEdit, onAddSession, bookmarks = [], setBookmarks, userId }) {
=======
function Collection({ items, setItems, onEdit, bookmarks, playHistory, setBookmarks, readOnly }) {
>>>>>>> e22e86c225da4fefd45ec588a3e407d8f703f4d6
  const deleteGame = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <ul className={`${styles.list} ${styles.leftAlignedList}`}>
        {items.map(item => (
          <li key={`${item.id}-${bookmarks.length}`} className={`${styles.listItem} ${styles.leftCard}`}>
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
                    state={{ collection: items, playHistory: [] }}
                    style={{ textDecoration: 'none', color: '#0082BC' }}
                  >
                    {item.name}
                  </Link>
                </h3>
                <p className={styles.gameInfo}><strong>Players:</strong> {item.players}</p>
                <p className={styles.gameInfo}><strong>Playtime:</strong> {item.estimatedTime} mins</p>
                <p className={styles.gameInfo}><strong>Purchase Date:</strong> {item.purchaseDate}</p>
                <p className={styles.gameInfo}><strong>Purchase Price:</strong> {item.purchasePrice}</p>
                <div className={styles.buttonGroup}>
<<<<<<< HEAD
                  {/* <button onClick={() => onAddSession(item.name)}>Add Session</button> */}
                  <button className="edit-button" onClick={() => onEdit(item)}><i className="far fa-edit"></i>Edit Game</button>
                  <button className="edit-button" onClick={() => deleteGame(item.id)}><i className="far fa-trash-can"></i>Delete Game</button>
                  <button className="edit-button" onClick={() => navigate(`/stats/${item.gameId}`)}><i className="fas fa-chart-simple"></i>Game Stats</button>
                  <BookmarkButtons
                    gameId={item.gameId}
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                  />
=======
                  {!readOnly && (
                    <>
                      <button className="edit-button" onClick={() => onEdit(item)}>
                        <i className="far fa-edit"></i>Edit Game
                      </button>
                      <button className="edit-button" onClick={() => deleteGame(item.id)}>
                        <i className="far fa-trash-can"></i>Delete Game
                      </button>
                      <button className="edit-button" onClick={() => navigate(`/stats/${item.gameId}`, { 
                        state: { gameName: item.name,
                          playHistory: playHistory.filter((entry) => entry.gameId === item.gameId),
                          item: item } })}>
                    <i className="fas fa-chart-simple"></i>Game Stats
                    </button>
                    <BookmarkButtons
                      gameId={item.gameId}
                      bookmarks={bookmarks}
                      setBookmarks={readOnly ? () => {} : setBookmarks} // Disable bookmark changes if readOnly
                    />

                    </>
                  )}
                  
>>>>>>> e22e86c225da4fefd45ec588a3e407d8f703f4d6
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Collection;