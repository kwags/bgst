import React, { useContext } from "react";
import { toggleWantToOwn, toggleWantToPlay, fetchUserBookmarks } from "./mockAPI";
import { UserContext } from "./App";   
import styles from './styles/PlayHistory.module.css';

function BookmarkButtons({ gameId, bookmarks = [], setBookmarks }) {
  const userId = useContext(UserContext);

  const existingBookmark = bookmarks.find(
    (b) => b.userId === userId && b.gameId === gameId
  );

  const refreshBookmarks = async () => {
    const updated = await fetchUserBookmarks(userId);
    setBookmarks(updated);
  };

  const handleToggleWantToOwn = async () => {
    try {
      await toggleWantToOwn(userId, gameId);
      await refreshBookmarks();
    } catch (error) {
      console.error("Failed to toggle Want to Own", error);
    }
  };

  const handleToggleWantToPlay = async () => {
    try {
      await toggleWantToPlay(userId, gameId);
      await refreshBookmarks();
    } catch (error) {
      console.error("Failed to toggle Want to Play", error);
    }
  };

  return (
    <div>
       <button className={styles.bookmarkButton} onClick={handleToggleWantToOwn}>
        {existingBookmark?.wantToOwn ? "⭐️ Want to Own" : "☆ Want to Own"}
      </button>
      <button className={styles.bookmarkButton} onClick={handleToggleWantToPlay}>
        {existingBookmark?.wantToPlay ? "🎮 Want to Play" : "❌ Want to Play"}
      </button>
    </div>
  );
}

export default BookmarkButtons;