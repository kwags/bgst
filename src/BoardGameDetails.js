import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AddBoardGameForm from './AddBoardGameForm';
import { fetchBoardGames, fetchUserBookmarks, toggleWantToOwn, toggleWantToPlay, enrichWithBoardGameData } from './mockAPI';
import { UserContext } from './App';
import GameSessionForm from './GameSessionForm';
import AddCollectionForm from './AddCollectionForm';
import styles from "./styles/SlidePanel.module.css";

function BoardGameDetails({ bookmarks, setBookmarks, playHistory, setPlayHistory, collection, setCollection }) {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [showCollectionForm, setShowCollectionForm] = useState(false);

  const userId = useContext(UserContext);

  const existingBookmark = bookmarks.find(
    (b) => b.userId === userId && b.gameId === game?.id
  );

  useEffect(() => {
    const loadGame = async () => {
      try {
        const decodedName = decodeURIComponent(id);

        const allGames = await fetchBoardGames(""); // Fetch all boardgames
        let foundGame = allGames.find(g => g.name.toLowerCase() === decodedName.toLowerCase()); // ONLY check boardgames

        if (!foundGame && playHistory.length > 0) {
          foundGame = playHistory.find(g => g.name === decodedName);
        }

        if (!foundGame && collection.length > 0) {
          foundGame = collection.find(g => g.name === decodedName);
        }

        if (foundGame) {
          setGame(foundGame);
        } else {
          throw new Error('Game not found, consider adding game to the Board Game Database');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    loadGame();
  }, [id, playHistory, collection]);

  const refreshBookmarks = async () => {
    const updated = await fetchUserBookmarks(userId);
    setBookmarks(updated);
  };

  const handleToggle = async (type) => {
    try {
      if (type === 'own') {
        await toggleWantToOwn(userId, game.id);
      } else if (type === 'play') {
        await toggleWantToPlay(userId, game.id);
      }
      await refreshBookmarks();
    } catch (error) {
      console.error("Failed to toggle bookmark", error);
    }
  };

  if (error) return (
    <div style={{ padding: "2rem" }}>
      <p>{error}</p>
      <AddBoardGameForm autofillGameName={decodeURIComponent(id)} />
    </div>
  );

  if (!game) return <p>Loading game details...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{game.name}</h2>
      <p><strong>Players:</strong> {game.players}</p>
      <p><strong>Estimated Playtime:</strong> {game.estimatedTime}</p>

      {/* Bookmark Buttons */}
      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => handleToggle('own')}>
          {existingBookmark?.wantToOwn ? "⭐ Want to Own" : "☆ Want to Own"}
        </button>
        <button onClick={() => handleToggle('play')} style={{ marginLeft: "1rem" }}>
          {existingBookmark?.wantToPlay ? "🎮 Want to Play" : "❌ Want to Play"}
        </button>
      </div>

      {/* Add Session Button */}
      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => setShowSessionForm(true)}>Add Session</button>
      </div>

      {/* Add Session Form */}
      <div className={`${styles.backdrop} ${showSessionForm ? styles.show : ''}`} onClick={() => setShowSessionForm(false)} />
      <div className={`${styles["slide-panel"]} ${showSessionForm ? styles.show : ''}`}>
        <div className={styles["slide-panel-inner"]}>
          <button className={styles["close-button"]} onClick={() => setShowSessionForm(false)}>×</button>            
          <GameSessionForm
            onAdd={async (sessionData) => {
              const enrichedSession = await enrichWithBoardGameData(sessionData.name, sessionData);
              setPlayHistory(prev => [...prev, enrichedSession]);
            }}
            onCancelEdit={() => setShowSessionForm(false)}
            autofillGameName={game.name}
          />
        </div>
      </div>

      {/* Add to Collection Button */}
      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => setShowCollectionForm(true)}>Add to Collection</button>
      </div>

      {/* Add to Collection Form */}
      <div className={`${styles.backdrop} ${showCollectionForm ? styles.show : ''}`} onClick={() => setShowCollectionForm(false)} />
      <div className={`${styles["slide-panel"]} ${showCollectionForm ? styles.show : ''}`}>
        <div className={styles["slide-panel-inner"]}>
          <button className={styles["close-button"]} onClick={() => setShowCollectionForm(false)}>×</button>            
          <AddCollectionForm
            onAdd={async (collectionData) => {
              const enrichedCollection = await enrichWithBoardGameData(collectionData.name, collectionData);
              setCollection(prev => [...prev, enrichedCollection]);
            }}
            onCancelEdit={() => setShowCollectionForm(false)}
            autofillGameName={game.name}
            autofillNumPlayers={game.players}
            autofillEstimatedTime={game.estimatedTime}
          />
        </div>
      </div>
    </div>
  );
}

export default BoardGameDetails;