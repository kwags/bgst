import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AddBoardGameForm from './AddBoardGameForm';
import { fetchBoardGames, fetchUserBookmarks, toggleBookmark, enrichWithBoardGameData } from './mockAPI';
import { UserContext } from './App';
import GameSessionForm from './GameSessionForm';
import AddCollectionForm from './AddCollectionForm';
import BookmarkButtons from './BookmarkButtons';
import styles from './styles/SharedStyles.module.css';
import SlidePanel from './SlidePanel';
import { useNavigate } from 'react-router-dom';

function BoardGameDetails({ bookmarks, setBookmarks, playHistory, setPlayHistory, collection, setCollection }) {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const navigate = useNavigate();

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

  const handleToggle = async () => {
    try {
      await toggleBookmark(userId, id);
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
    <div className={styles.container}>
      <div className="section-header">
        <h3 className="section-title">Game Details</h3>
      </div>
      <ul className={`${styles.list} ${styles.leftAlignedList}`}>
        <li className={`${styles.listItem} ${styles.leftCard}`}>
              <div className={styles.cardContent}>
                {game.image && (
                  <div className={styles.imageMask}>
                    <img src={game.image} alt={game.name} className={styles.gameImage} />
                    <BookmarkButtons
                      gameId={game.id}
                      bookmarks={bookmarks}
                      setBookmarks={setBookmarks}
                    />
                  </div>
                )}
              <div className={`${styles.gameDetails} ${styles.leftDetails}`}>
                <h3 className={styles.gameName}>{game.name}</h3>
                <p className={styles.gameInfo}><strong>Players:</strong> {game.players}</p>
                <p className={styles.gameInfo}><strong>Estimated Playtime:</strong> {game.estimatedTime}</p>
              <div className={styles.buttonGroup}>

                {/* Add Session Button */}
                <button className="edit-button" onClick={() => setShowSessionForm(true)}>                       
                  <i className="fas fa-plus-square"></i>Add Session
                </button>

                {/* Add to Collection Button */}
                  <button className="edit-button" onClick={() => setShowCollectionForm(true)}>
                    <i className="fas fa-plus-square"></i>Add to Collection
                  </button>
                  <button className="edit-button" onClick={() => navigate(`/stats/${game.id}`, { 
                    state: { gameName: game.name,
                      playHistory: playHistory.filter((entry) => entry.gameId === game.id),
                      item: game } })}>
                    <i className="fas fa-chart-simple"></i>Game Stats
                  </button>
              </div>
            </div>

            {/* Add Session Form Panel */}
              <SlidePanel
                show={showSessionForm}
                onClose={() => setShowSessionForm(false)}
                heading="Add Game Session"
              >
                <GameSessionForm
                  onAdd={async (sessionData) => {
                    const enrichedSession = await enrichWithBoardGameData(sessionData.name, sessionData);
                    setPlayHistory((prev) => [...prev, enrichedSession]);
                    setShowSessionForm(false);
                  }}
                  onCancelEdit={() => setShowSessionForm(false)}
                  autofillGameName={game.name}
                />
              </SlidePanel>


            {/* Add Collection Form Panel */}
            <SlidePanel
              show={showCollectionForm}
              onClose={() => setShowCollectionForm(false)}
              heading="Add to Collection"
            >
              <AddCollectionForm
                onAdd={async (collectionData) => {
                  const enrichedCollection = await enrichWithBoardGameData(collectionData.name, collectionData);
                  setCollection((prev) => [...prev, enrichedCollection]);
                  setShowCollectionForm(false);
                }}
                onCancelEdit={() => setShowCollectionForm(false)}
                autofillGameName={game.name}
                autofillNumPlayers={game.players}
                autofillEstimatedTime={game.estimatedTime}
              />
            </SlidePanel>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default BoardGameDetails;