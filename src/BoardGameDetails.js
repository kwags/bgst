import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBoardGameById } from './mockAPI';
import GameSessionForm from './GameSessionForm';

function BoardGameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [showSessionForm, setShowSessionForm] = useState(false);

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
      {showSessionForm && (
        <div className={`slide-panel ${showSessionForm ? 'show' : ''}`}>
          <div className="slide-panel-inner">
            <button className="close-button" onClick={() => setShowSessionForm(false)}>×</button>
            <GameSessionForm
                onAdd={() => setShowSessionForm(false)}
                onCancelEdit={() => setShowSessionForm(false)}
                autofillGameName={game.name}/>
          </div>
        </div>
      )}

    </div>
  );
}

export default BoardGameDetails;