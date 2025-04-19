import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBoardGameById } from './mockAPI';
import GameSessionForm from './GameSessionForm';
import AddCollectionForm from './AddCollectionForm';
import styles from "./styles/SlidePanel.module.css";

function BoardGameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  
  useEffect(() => {
    fetchBoardGameById(id)
      .then(data => setGame(data))
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!game) return <p>Loading game details...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{game.name}</h2>
      <p><strong>Players:</strong> {game.players}</p>
      <p><strong>Estimated Playtime:</strong> {game.estimatedTime}</p>
      {/* More details coming soon... */}

      {/* Add Session Button */}
      <div style={{marginTop: "1rem"}}>
        <button onClick={() => setShowSessionForm(true)}>Add Session</button>
      </div>

      {/* Add Session Form */}
      <div className={`${styles.backdrop} ${showSessionForm ? styles.show : ''}`}
        onClick={() => setShowSessionForm(false)}/>
        <div className={`${styles["slide-panel"]} ${showSessionForm ? styles.show : ''}`}>
          <div className={styles["slide-panel-inner"]}>
            <button className={styles["close-button"]} onClick={() => setShowSessionForm(false)}>×</button>            
            <GameSessionForm
              onAdd={() => setShowSessionForm(false)}
              onCancelEdit={() => setShowSessionForm(false)}
              autofillGameName={game.name}/>
          </div>
        </div>

      {/* Add to Colleciton Button */}
      <div style={{marginTop: "1rem"}}>
        <button onClick={() => setShowCollectionForm(true)}>Add to Collection</button>
      </div>

      {/* Add to Collection Form */}
      <div className={`${styles.backdrop} ${showCollectionForm ? styles.show : ''}`}
        onClick={() => setShowCollectionForm(false)}/>
        <div className={`${styles["slide-panel"]} ${showCollectionForm ? styles.show : ''}`}>
          <div className={styles["slide-panel-inner"]}>
            <button className={styles["close-button"]} onClick={() => setShowCollectionForm(false)}>×</button>            
            <AddCollectionForm
              onAdd={() => setShowCollectionForm(false)}
              onCancelEdit={() => setShowCollectionForm(false)}
              autofillGameName={game.name}
              autofillNumPlayers={game.players}
              autofillEstimatedTime={game.estimatedTime}/>
          </div>
        </div>
  </div>
  );
}

export default BoardGameDetails;