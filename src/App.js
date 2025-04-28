import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BoardGameDetails from './BoardGameDetails';
import React, { useState, useEffect, useRef, createContext } from "react";
import BoardGameSearch from './BoardgameSearch.js';
import PlayHistory from "./PlayHistory.js";
import { fetchPlayHistory, fetchCollection, fetchUserBookmarks } from "./mockAPI";
import GameSessionManager from "./GameSessionManager.js";
import CollectionManager from "./AddCollectionManager.js";
import Collection from "./Collection.js";
import UserStats from './UserStats.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SlidePanel from './SlidePanel';
import Navbar from './Navbar.js';
import Bookmarks from "./Bookmarks.js";
import GameStats from "./GameStats.js";

export const UserContext = createContext();

function App() {
  const [userId] = useState(1);
  const [playHistory, setPlayHistory] = useState([]);
  const [collection, setCollection] = useState([]);
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [editingPlayHistoryItem, setEditingPlayHistoryItem] = useState(null);
  const [editingCollectionItem, setEditingCollectionItem] = useState(null);
  const [selectedGameForSession, setSelectedGameForSession] = useState(null);
  const gameSessionFormRef = useRef(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showSessionForm, setShowSessionForm] = useState(false);

  useEffect(() => {
    const getPlayHistory = async () => {
      const data = await fetchPlayHistory();
      setPlayHistory(data);
    };
    getPlayHistory();
  }, []);

  useEffect(() => {
    const getCollection = async () => {
      const data = await fetchCollection();
      setCollection(data);
    };
    getCollection();
  }, []);

  useEffect(() => {
    const getBookmarks = async () => {
      const data = await fetchUserBookmarks(userId);
      setBookmarks(data);
    };
    getBookmarks();
  }, [userId]);

  return (
    <Router>
      <UserContext.Provider value={userId} >
        <div className="topBar">
          <div className="userSection">
            <i className="fas fa-user"></i>
            <span className="username">DEMO_USER</span>
          </div>
        </div>
        <div className="app-container">
          <header className="app-header">
            <h1><Link to="/" style={{ textDecoration: "none", color: "inherit" }}>🎲 Board Game Statistic Tracker</Link></h1>
          </header>

          <main className="app-main">
            <BoardGameSearch
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              playHistory={playHistory}
              setPlayHistory={setPlayHistory}
              collection={collection}
              setCollection={setCollection} />
          </main>

          <Navbar />

          <Routes>
            <Route path="/" element={

              <main className="app-main">


                <div ref={gameSessionFormRef}></div>
                {/* Add a Play Session Button and Slide Panel */}
                <section className="app-section">
                  <div className="section-header">
                    <h3 className="section-title">Play History</h3>
                    <button className="add-button" onClick={() => setShowSessionForm(true)}><i className="fas fa-plus-square"></i>Add Play Session</button>
                  </div>
                  <SlidePanel show={showSessionForm}
                    onClose={() => { setShowSessionForm(false); setEditingPlayHistoryItem(null); setSelectedGameForSession(""); }}
                    heading={editingPlayHistoryItem ? "Edit Play Session" : "Add Play Session"}>

                    <GameSessionManager
                      playHistory={playHistory}
                      setPlayHistory={setPlayHistory}
                      editingPlayHistoryItem={editingPlayHistoryItem}
                      setEditingPlayHistoryItem={setEditingPlayHistoryItem}
                      selectedGameForSession={selectedGameForSession}
                      setSelectedGameForSession={setSelectedGameForSession}
                      setShowSessionForm={setShowSessionForm}
                    />

                  </SlidePanel>

                  <PlayHistory
                    items={playHistory}
                    setItems={setPlayHistory}
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                    userId={userId}
                    onEdit={(item) => {
                      setEditingPlayHistoryItem(item);
                      setSelectedGameForSession(item.name);
                      setShowSessionForm(true);
                    }} />
                </section>
              </main>
            } />

            <Route path="/collection" element={
              <main className="app-main">
                <section className="app-section">
                  <div className="section-header">
                    <h3 className="section-title">Collection</h3>
                    <button className="add-button" onClick={() => setShowCollectionForm(true)}><i className="fas fa-plus-square"></i>Add to Collection</button>
                  </div>
                  <SlidePanel
                    show={showCollectionForm}
                    onClose={() => {
                      setShowCollectionForm(false);
                      setEditingCollectionItem(null);
                    }}
                    heading={editingCollectionItem ? "Edit Collection Item" : "Add to Collection"}>

                    <CollectionManager
                      collection={collection}
                      setCollection={setCollection}
                      editingCollectionItem={editingCollectionItem}
                      setEditingCollectionItem={setEditingCollectionItem}
                      setShowCollectionForm={setShowCollectionForm}
                    />

                  </SlidePanel>

                  <Collection
                    items={collection}
                    setItems={setCollection}
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                    onEdit={(item) => {
                      setEditingCollectionItem(item);
                      setSelectedGameForSession(item.name);
                      setShowCollectionForm(true);
                    }} />
                </section>
              </main>
            } />

            <Route path="/stats" element={
              <main className="app-main">
                <section className="app-section">
                  <UserStats userId={userId} />
                </section>
              </main>
            } />

            <Route path="/bookmarks" element={
              <main className="app-main">
                <section className="app-section">
                  <div className="section-header">
                    <h3 className="section-title">Bookmarks</h3>
                  </div>
                  <Bookmarks bookmarks={bookmarks} setBookmarks={setBookmarks} />
                </section>
              </main>
            } />

            <Route path="/stats/:id" element={
              <main className="app-main">
                <section className="app-section">
                  <div className="section-header">
                    <h3 className="section-title">Game Stats</h3>
                    <Link to={'/stats/'} className="stats-button">
                      <i className="fas fa-chart-simple"></i>Overall Stats
                    </Link>
                  </div>
                  <GameStats />
                </section>
              </main>
            } />

            <Route path="/game/:id" element={<BoardGameDetails
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              playHistory={playHistory}
              setPlayHistory={setPlayHistory}
              collection={collection}
              setCollection={setCollection}
            />} />
            <Route path="/friends" element={<FriendsList userId={userId} />} />
            <Route path='/user/:userId' element={<FriendPage />} />
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