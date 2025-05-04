import React, { useState } from 'react';
import styles from './styles/BrowseGames.module.css';
import BoardGameSearch from './BoardgameSearch';

const BrowseGames = ({bookmarks, setBookmarks, playHistory, setPlayHistory, collection, setCollection}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [sortType, setSortType] = useState('');
  return (
    
    <div className={styles.container}>
      <h1>Browse Games</h1>
      <BoardGameSearch
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              playHistory={playHistory}
              setPlayHistory={setPlayHistory}
              collection={collection}
              setCollection={setCollection} />

      
      <div className={styles.results}>
        {results.map((game) => (
          <div key={game.id} className={styles.gameCard}>
            <img src={game.image} alt={game.name} className={styles.gameImage} />
            <h3>{game.name}</h3>
            <p>Players: {game.players}</p>
            <p>Playtime: {game.estimatedTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseGames;