import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPlayHistory, fetchCollection, fetchUserBookmarks, fetchUserInfo } from "./mockAPI";
import UserStats from "./UserStats";
import PlayHistory from "./PlayHistory";
import Collection from "./Collection";
import styles from "./styles/SharedStyles.module.css";

const FriendPage = () => {
  const { userId } = useParams(); // Get userId from the URL
  const [playHistory, setPlayHistory] = useState([]);
  const [collection, setCollection] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [username, setUsername] = useState(""); // State to store the username

  const isFriendPage = !!userId; // If userId exists in the URL, it's a friend's page
  const readOnly = isFriendPage; // Set readOnly to true for friend's pages

  // Fetch the username based on userId
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await fetchUserInfo(parseInt(userId));
        setUsername(user.username);
      } catch (error) {
        console.error(error.message);
        setUsername("Unknown User");
      }
    };
    getUserInfo();
  }, [userId]);

  useEffect(() => {
    const getPlayHistory = async () => {
      const data = await fetchPlayHistory(userId);
      setPlayHistory(data);
    };
    getPlayHistory();
  }, [userId]);

  useEffect(() => {
    const getCollection = async () => {
      const data = await fetchCollection(userId);
      setCollection(data);
    };
    getCollection();
  }, [userId]);

  useEffect(() => {
    const getBookmarks = async () => {
      const data = await fetchUserBookmarks(userId);
      setBookmarks(data);
    };
    getBookmarks();
  }, [userId]);

  return (
    <div className={styles.container}>

        <div className={styles.sectionWrapper}>
          <UserStats playHistory={playHistory} userId={parseInt(userId)} />
        </div>
      
        <div className={styles.sectionWrapper}>
          <h3 className="section-title">{username}'s Play History</h3>
            <PlayHistory
              items={playHistory}
              setItems={readOnly ? () => {} : setPlayHistory} // Disable changes if readOnly
              bookmarks={bookmarks}
              setBookmarks={readOnly ? () => {} : setBookmarks} // Disable changes if readOnly
              userId={userId}
              readOnly={readOnly}
            />
        </div>

      <div className={styles.sectionWrapper}>
        <h3 className="section-title">{username}'s Collection</h3>
          <Collection
            items={collection}
            setItems={readOnly ? () => {} : setCollection} // Disable changes if readOnly
            bookmarks={bookmarks}
            setBookmarks={readOnly ? () => {} : setBookmarks} // Disable changes if readOnly
            userId={parseInt(userId)}
            readOnly={readOnly}
          />
      </div>
      
    </div>
  );
};

export default FriendPage;