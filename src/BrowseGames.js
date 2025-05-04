import React, { useState } from "react";
import { getGamesByMostOwned, getGamesByMostTimePlayed, getGamesByPrice, getGamesByMostWanted } from "./mockAPI";
import styles from "./styles/BrowseGames.module.css";

const BrowseGames = () => {
  const [games, setGames] = useState([]);
  const [sortType, setSortType] = useState("");

  const handleSort = (type) => {
    setSortType(type);
    switch (type) {
      case "mostOwned":
        setGames(getGamesByMostOwned());
        break;
      case "mostTimePlayed":
        setGames(getGamesByMostTimePlayed());
        break;
      case "byPrice":
        setGames(getGamesByPrice());
        break;
      case "mostWanted":
        setGames(getGamesByMostWanted());
        break;
      default:
        setGames([]);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Browse Games</h1>
      <div className={styles.sortOptions}>
        <button onClick={() => handleSort("mostOwned")}>Most Owned</button>
        <button onClick={() => handleSort("mostTimePlayed")}>Most Time Played</button>
        <button onClick={() => handleSort("byPrice")}>By Price</button>
        <button onClick={() => handleSort("mostWanted")}>Most Wanted</button>
      </div>
      <div className={styles.gamesList}>
        {games.map((game) => (
          <div key={game.id} className={styles.gameCard}>
            <img src={game.image} alt={game.name} className={styles.gameImage} />
            <h3>{game.name}</h3>
            {sortType === "mostOwned" && <p>Owned by: {game.count} users</p>}
            {sortType === "mostTimePlayed" && <p>Time Played: {game.time} minutes</p>}
            {sortType === "byPrice" && <p>Price: ${game.price.toFixed(2)}</p>}
            {sortType === "mostWanted" && <p>Wanted by: {game.wants} users</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseGames;