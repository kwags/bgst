import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { fetchPlayHistory, fetchCollection, fetchUserBookmarks, fetchUserInfo } from "./mockAPI";
import Navbar from './Navbar.js';
import BoardGameDetails from './BoardGameDetails';
import PlayHistory from "./PlayHistory.js";
import Collection from "./Collection.js";
import UserStats from './UserStats.js';
import GameStats from "./GameStats.js";
import Bookmarks from "./Bookmarks.js";
import FriendPage from './FriendPage.js';
import FriendsList from './FriendsList.js';
import BrowsePage from "./BrowsePage.js";
import './styles/App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const UserContext = createContext();

function App() {
  const [userId] = useState(1);
  const [playHistory, setPlayHistory] = useState([]);
  const [collection, setCollection] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

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

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo(userId);
        setUserInfo(data);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };
    getUserInfo();
  }, [userId]);

  return (
    <Router>
      <UserContext.Provider value={userId} >
        <div className="topBar">
          <div className="userSection">
            {userInfo && (
              <>
                <img src={userInfo.image} alt={userInfo.username} className="user-avatar"
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
                <span className="username">{userInfo.username}</span>
              </>
            )}          
          </div>
        </div>
        <div className="app-container">
          <header className="app-header">
            <h1><Link to="/" style={{ textDecoration: "none", color: "inherit" }}>🎲 Board Game Statistic Tracker</Link></h1>
          </header>

          <Navbar />

          <Routes>
            <Route path="/" element={

              <main className="app-main">
                <section className="app-section">
                  <PlayHistory
                    userId={userId}
                    items={playHistory}
                    setItems={setPlayHistory}
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                  />
                </section>
              </main>
            } />

            <Route path="/collection" element={
              <main className="app-main">
                <section className="app-section">
                  <Collection
                    userId={userId}
                    items={collection}
                    setItems={setCollection}
                    playHistory={playHistory}
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                  />
                </section>
              </main>
            } />

            <Route path="/stats" element={
              <main className="app-main">
                <section className="app-section">

                  <UserStats userId={userId}
                    playHistory={playHistory}
                  />
                </section>
              </main>
            } />

            <Route path="/bookmarks" element={
              <main className="app-main">
                <section className="app-section">
                  <div className="section-header">
                    <h3 className="section-title">Bookmarks</h3>
                  </div>
                  <Bookmarks bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                    playHistory={playHistory}
                    setPlayHistory={setPlayHistory}
                    collection={collection}
                    setCollection={setCollection}
                  />
                </section>
              </main>
            } />

            <Route path="/stats/:id" element={
              <main className="app-main">
                <section className="app-section">
                  <GameStats 
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}/>
                </section>
              </main>
            } />

            <Route path="/game/:id" element={
              <main className="app-main">
                <section className="app-section">
                  <BoardGameDetails
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                    playHistory={playHistory}
                    setPlayHistory={setPlayHistory}
                    collection={collection}
                    setCollection={setCollection} />
                </section>
              </main>
            } />

            <Route path="/friends" element={
              <main className="app-main">
                <section className="app-section">
                  <FriendsList userId={userId} />
                </section>
              </main>
              } />

            <Route path='/user/:userId' element={
              <main className="app-main">
                <section className="app-section">
                  <FriendPage 
                    currentUserId={userId}
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                  />
                </section>
              </main>
              } />

            <Route
              path="/browse"
              element={
                <main className="app-main">
                  <section className="app-section">
                  <BrowsePage
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                    playHistory={playHistory}
                    setPlayHistory={setPlayHistory}
                    collection={collection}
                    setCollection={setCollection}
                  />
                  </section>
                </main>
              }
            />
          </Routes>

        </div>
        <footer>
          <section className='app-footer'>
            <p> &copy; Board Game Statistic Tracker</p>
          </section>
        </footer>
      </UserContext.Provider>
    </Router>
  );
}

export default App;