// Play History is a List of Game Sessions

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookmarkButtons from './BookmarkButtons';
import styles from './styles/SharedStyles.module.css';
import Sorting from './Sorting';
import SlidePanel from './SlidePanel';
import GameSessionManager from "./GameSessionManager.js";
import { fetchPlayHistory } from "./mockAPI";

function PlayHistory({ userId, items, setItems, bookmarks, setBookmarks, readOnly, showHeading=true }) {

  const [sortConfig, setSortConfig] = useState({ sortBy: 'date', direction: 'desc' });
  const [sortedItems, setSortedItems] = useState([]);
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [editingPlayHistoryItem, setEditingPlayHistoryItem] = useState(null);
  const [playHistory, setPlayHistory] = useState([]);

  useEffect(() => {
    const getPlayHistory = async () => {
      const data = await fetchPlayHistory(userId);
      setPlayHistory(data);
    };
    getPlayHistory();
  }, [userId]);

  useEffect(() => {
    const { sortBy, direction } = sortConfig;
  
    const sorted = [...items].sort((a, b) => {
      let comparison = 0;
  
      if (sortBy === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      }
  
      return direction === 'asc' ? comparison : -comparison;
    });
  
    setSortedItems(sorted);
  }, [items, sortConfig]);

  const deleteGameSession = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {showHeading && (
        <div className="section-header">
          <h3 className="section-title">Play History</h3>
          <button className="add-button" onClick={() => setShowSessionForm(true)}>
            <i className="fas fa-plus-square"></i>Add Play Session
          </button>
        </div>
      )}
      <Sorting onSortChange={setSortConfig} dateField="date"/>
      <ul className={`${styles.list} ${styles.leftAlignedList}`}>
      {sortedItems.map(item => (
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
                    state={{ playHistory: items, collection: [] }}
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
                  {!readOnly && (
                    <>
                      <button className="edit-button" onClick={() => {
                        setEditingPlayHistoryItem(item);
                        setShowSessionForm(true);
                      }}>
                        <i className="far fa-edit"></i>Edit Session
                      </button>
                      <button className="edit-button" onClick={() => deleteGameSession(item.id)}>
                        <i className="far fa-trash-can"></i>Delete Session
                      </button>
                      <button className="edit-button" onClick={() => navigate(`/stats/${item.gameId}`, { state: { gameName: item.name, playHistory: items, item: item } })}>
                        <i className="fas fa-chart-simple"></i>Game Stats
                      </button>
                    <BookmarkButtons
                      gameId={item.gameId}
                      bookmarks={bookmarks}
                      setBookmarks={readOnly ? () => {} : setBookmarks} // Disable bookmark changes if readOnly
                    />
                    </>
                  )}
                  
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <SlidePanel show={showSessionForm}
          onClose={() => { setShowSessionForm(false); setEditingPlayHistoryItem(null); }}
          heading={editingPlayHistoryItem ? "Edit Play Session" : "Add Play Session"}>

          <GameSessionManager
            key={showSessionForm ? (editingPlayHistoryItem?.id || 'new') : 'closed'}
            playHistory={items}
            setPlayHistory={(newList) => {
              setPlayHistory(newList);
              setItems(newList);
            }}
            editingPlayHistoryItem={editingPlayHistoryItem}
            setEditingPlayHistoryItem={setEditingPlayHistoryItem}
            setShowSessionForm={setShowSessionForm}
            selectedGameForSession={null}
            setSelectedGameForSession={() => {}} 
          />
        </SlidePanel>
    </div>
  );
}

export default PlayHistory;