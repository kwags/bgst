import React, { useState } from "react";
import { fetchUserByName } from "./mockAPI"; // Use the new function
import styles from "./styles/AddFriend.module.css";

const AddFriend = ({ userId, onFriendAdded }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setSearchResult(null);
    if (!searchTerm.trim()) {
      setError("Please enter a valid username.");
      return;
    }
    try {
      const user = await fetchUserByName(searchTerm); // Search by username
      if (user.id === userId) {
        setError("You cannot add yourself as a friend.");
        return;
      }
      setSearchResult(user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddFriend = () => {
    if (searchResult) {
      onFriendAdded(searchResult);
      setSearchResult(null);
      setSearchTerm("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {searchResult && (
        <div className={styles.result}>
          <div className={styles.avatarMask}>
            <img
              src={searchResult.image}
              alt={searchResult.username}
              className={styles.userImage} 
            />
          </div>
          <span>{searchResult.username}</span>
          <button onClick={handleAddFriend} className={styles.addButton}>
            Add Friend
          </button>
        </div>
      )}
    </div>
  );
};

export default AddFriend;