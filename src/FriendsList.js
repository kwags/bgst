import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFriends } from "./mockAPI";
import AddFriend from "./AddFriend"; 
import styles from "./styles/Friends.module.css";

const FriendsList = ({ userId }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const data = await fetchFriends(userId);
        setFriends(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getFriends();
  }, [userId]);

  const handleFriendAdded = (newFriend) => {
    setFriends((prevFriends) => [...prevFriends, newFriend]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <AddFriend userId={userId} onFriendAdded={handleFriendAdded} />
        <h1 className={styles.header}>Your Friends</h1>
        {friends.length > 0 ? (
          <ul className={styles.list}>
            {friends.map((friend) => (
              <li key={friend.id} className={styles.listItem}>
                <Link to={`/user/${friend.id}`} className={styles.friendName}>
                  {friend.username}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyMessage}>No friends found.</p>
        )}
      </div>
    </div>
  );
};

export default FriendsList;