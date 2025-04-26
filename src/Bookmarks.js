import React from "react";
import BookmarkButtons from "./BookmarkButtons";
import styles from './styles/PlayHistory.module.css';

function Bookmarks({ bookmarks = [], setBookmarks }) {
  if (!Array.isArray(bookmarks)) {
    return <p>Loading bookmarks...</p>;
  }

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
                <p className={styles.gameInfo}><strong>Players:</strong> {bookmark.players || "N/A"}</p>
                <p className={styles.gameInfo}><strong>Playtime:</strong> {bookmark.estimatedTime || "N/A"} mins</p>
                <div className={styles.buttonGroup}>
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
    </div>
  );
}

export default Bookmarks;