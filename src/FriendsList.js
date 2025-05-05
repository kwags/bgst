import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFriends } from "./mockAPI";
import AddFriend from "./AddFriend"; 
//import styles from "./styles/Friends.module.css";
import Sorting from './Sorting';
import styles from "./styles/SharedStyles.module.css";
import SlidePanel from "./SlidePanel";

const FriendsList = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: 'name', direction: 'asc' });
  const [sortedFriends, setSortedFriends] = useState([]);
  const [showAddFriendPanel, setShowAddFriendPanel] = useState(false);

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


  useEffect(() => {
    const { direction } = sortConfig;
  
    const sorted = [...friends].sort((a, b) => {
      const comparison = (a.username || '').localeCompare(b.username || '');
      return direction === 'asc' ? comparison : -comparison;
    });
  
    setSortedFriends(sorted);
  }, [friends, sortConfig]);
  

  const handleFriendAdded = (newFriend) => {
    setFriends((prevFriends) => [...prevFriends, newFriend]);
  };

  return (
    <div className={styles.container}>
        <div className="section-header">
          <h3 className="section-title">Friends</h3>
              <button className="add-button" onClick={() => setShowAddFriendPanel(true)}>
                <i className="fas fa-plus-square"></i>Add Friends
              </button>
        </div>
      <SlidePanel
        show={showAddFriendPanel}
        onClose={() => setShowAddFriendPanel(false)}
        heading="Add a Friend"
      >
        <AddFriend userId={userId} onFriendAdded={(newFriend) => {
          handleFriendAdded(newFriend);
          setShowAddFriendPanel(false);
        }} />
      </SlidePanel>
      <Sorting onSortChange={setSortConfig} dateField={null} />
      {friends.length > 0 ? (
        <ul className={`${styles.list} ${styles.leftAlignedList}`}>
          {sortedFriends.map((friend) => (
            <li key={friend.id} className={`${styles.listItem} ${styles.leftCard}`}>
              <div className={styles.cardContent}>
              {friend.image && (
                <div className={styles.avatarMask}>
                  <img src={friend.image} alt={friend.name} className={styles.userImage} />
                </div>
              )}
                <h3 className={styles.gameName}>
                  <Link to={`/user/${friend.id}`} style={{ textDecoration: 'none', color: '#0082BC' }} >
                    {friend.username}
                  </Link>
                </h3>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyMessage}>No friends found.</p>
      )}
    </div>
  );
};

export default FriendsList;