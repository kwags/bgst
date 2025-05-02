import React, { useState, useEffect } from "react";
import BookmarkButtons from "./BookmarkButtons";
import GameSessionForm from './GameSessionForm'; 
import AddCollectionForm from './AddCollectionForm';
import SlidePanel from './SlidePanel';
import styles from './styles/SharedStyles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Sorting from './Sorting';

function Bookmarks({ items, setItems, onEdit, bookmarks = [], playHistory, setBookmarks, setPlayHistory, setCollection }) {
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ sortBy: 'name', direction: 'asc' });
  const [sortedBookmarks, setSortedBookmarks] = useState([]);

  useEffect(() => {
    const { sortBy, direction } = sortConfig;
  
    const sorted = [...bookmarks].sort((a, b) => {
      let comparison = 0;
  
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      }
  
      return direction === 'asc' ? comparison : -comparison;
    });
  
    setSortedBookmarks(sorted);
  }, [bookmarks, sortConfig]);

  if (!Array.isArray(bookmarks)) {
    return <p>Loading bookmarks...</p>;
  }

  return (
    <div className={styles.container}>
      <Sorting onSortChange={setSortConfig} dateField={null} />
      <ul className={`${styles.list} ${styles.leftAlignedList}`}>
        {sortedBookmarks.map(bookmark => (
          <li key={bookmark.id} className={`${styles.listItem} ${styles.leftCard}`}>
            <div className={styles.cardContent}>
              {bookmark.image && (
                <div className={styles.imageMask}>
                  <img src={bookmark.image} alt={bookmark.name} className={styles.gameImage} />
                </div>
              )}
              <div className={`${styles.gameDetails} ${styles.leftDetails}`}>
                <h3 className={styles.gameName}>
                  <Link
                    to={`/game/${encodeURIComponent(bookmark.name)}`}
                    style={{ textDecoration: 'none', color: '#0082BC' }}
                  >
                    {bookmark.name}
                  </Link>
                </h3>
                <p className={styles.gameInfo}><strong>Players:</strong> {bookmark.players || "N/A"}</p>
                <p className={styles.gameInfo}><strong>Playtime:</strong> {bookmark.estimatedTime || "N/A"}</p>
                <div className={styles.buttonGroup}>
                  <button className="edit-button" onClick={() => { setSelectedGame(bookmark); setShowSessionForm(true); }}>
                      <i className="fas fa-plus-square"></i> Add Session
                  </button>
                  <button className="edit-button" onClick={() => { setSelectedGame(bookmark); setShowCollectionForm(true); }}>
                    <i className="fas fa-plus-square"></i> Add to Collection
                  </button>
                  <button className="edit-button" onClick={() => navigate(`/stats/${bookmark.gameId}`, { 
                    state: { gameName: bookmark.name,
                      playHistory: playHistory.filter((entry) => entry.gameId === bookmark.gameId),
                      item: bookmark } })}>
                    <i className="fas fa-chart-simple"></i>Game Stats
                  </button>
                  <BookmarkButtons
                    gameId={bookmark.gameId}
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
       {/* Slide Panel for Add Session */}
       <SlidePanel
        show={showSessionForm}
        onClose={() => setShowSessionForm(false)}
        heading="Add Game Session"
      >
        {selectedGame && (
          <GameSessionForm
            onAdd={(sessionData) => {
              setPlayHistory((prev) => [...prev, { ...sessionData, ...selectedGame }]);
              setShowSessionForm(false);
            }}
            onCancelEdit={() => setShowSessionForm(false)}
            autofillGameName={selectedGame.name}
          />
        )}
      </SlidePanel>

      {/* Slide Panel for Add to Collection */}
      <SlidePanel
        show={showCollectionForm}
        onClose={() => setShowCollectionForm(false)}
        heading="Add to Collection"
      >
        {selectedGame && (
          <AddCollectionForm
            onAdd={(collectionData) => {
              setCollection((prev) => [...prev, { ...collectionData, ...selectedGame }]);
              setShowCollectionForm(false);
            }}
            onCancelEdit={() => setShowCollectionForm(false)}
            autofillGameName={selectedGame.name}
            autofillNumPlayers={selectedGame.players}
            autofillEstimatedTime={selectedGame.estimatedTime}
          />
        )}
      </SlidePanel>
    </div>
  );
}

export default Bookmarks;