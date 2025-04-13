import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBoardGameById } from './mockAPI';

function BoardGameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);

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
    </div>
  );
}

export default BoardGameDetails;