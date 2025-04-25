import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./App";
import { fetchUserBookmarks } from "./mockAPI";
import styles from './styles/PlayHistory.module.css';

function Bookmarks() {
  const userId = useContext(UserContext);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      const data = await fetchUserBookmarks(userId);
      setBookmarks(data);
    };
    loadBookmarks();
  }, [userId]);

  return (
    <div className={styles.container}>
        <ul className={`${styles.list} ${styles.leftAlignedList}`}>
            {bookmarks.map(bookmark => (
            <li key={bookmark.id} className={`${styles.listItem} ${styles.leftCard}`}>
                <div className={styles.cardContent}>
                {bookmark.image && (
                    <div className={styles.imageMask}>
                    <img src={bookmark.image} alt={bookmark.name} className={styles.gameImage} />
                    </div>
                )}
                <div className={`${styles.gameDetails} ${styles.leftDetails}`}>
                    <h3 className={styles.gameName}>{bookmark.name}</h3>
                    <p className={styles.gameInfo}><strong>Players:</strong> {bookmark.players}</p>
                    <p className={styles.gameInfo}><strong>Playtime:</strong> {bookmark.estimatedTime} mins</p>
                    <p className={styles.gameInfo}>
                    <label>
                        <input type="checkbox" checked={bookmark.wantToOwn} readOnly />
                        {" "}Want to Own
                    </label>
                    </p>
                    <p className={styles.gameInfo}>
                    <label>
                        <input type="checkbox" checked={bookmark.wantToPlay} readOnly />
                        {" "}Want to Play
                    </label>
                    </p>
                </div>
                </div>
            </li>
            ))}
      </ul>
    </div>
  );
}

export default Bookmarks;