import React, { useContext } from "react";
import { toggleBookmark, fetchUserBookmarks } from "./mockAPI";
import { UserContext } from "./App";
import styles from './styles/SharedStyles.module.css';

function BookmarkButton({ gameId, bookmarks = [], setBookmarks }) {
  const userId = useContext(UserContext);

  const isBookmarked = bookmarks.some(
    (b) => b.userId === userId && b.gameId === gameId
  );

  const handleToggleBookmark = async () => {
    await toggleBookmark(userId, gameId);
    const updated = await fetchUserBookmarks(userId);
    setBookmarks(updated); 
  };

  return (
    <button
      className={styles.overlayBookmarkButton}
      onClick={handleToggleBookmark}>
      <i className={`${isBookmarked ? "fa-solid" : "fa-regular"} fa-bookmark ${isBookmarked ? styles.bookmarkedIcon : styles.unbookmarkedIcon}`} ></i>
    </button>
  );
}

export default BookmarkButton;