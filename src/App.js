import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BoardGameDetails from './BoardGameDetails';
import React, { useState, useEffect, useRef, createContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import BoardGameSearch from './BoardgameSearch.js';
import GameSessionForm from './GameSessionForm';
import PlayHistory from "./PlayHistory.js";
import { fetchPlayHistory, fetchCollection, fetchUserBookmarks } from "./mockAPI";
import AddBoardGameForm from "./AddBoardGameForm.js";
import Collection from "./Collection.js";
import AddCollectionForm from './AddCollectionForm.js';
import UserStats from './UserStats.js';

export const UserContext = createContext();

function App() {
  const [userId] = useState(1);
  const [playHistory, setPlayHistory] = useState([]);
  const [collection, setCollection] = useState([]);
  const [editingPlayHistoryItem, setEditingPlayHistoryItem] = useState(null);
  const [editingCollectionItem, setEditingCollectionItem] = useState(null);
  const [selectedGameForSession, setSelectedGameForSession] = useState(null);
  const gameSessionFormRef = useRef(null);
  const [bookmarks, setBookmarks] = useState([]);

  const handleAddSession = (gameName) => {
    setSelectedGameForSession(gameName);
    if (gameSessionFormRef.current) {
      gameSessionFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
      setBookmarks(data); // Shallow clone to trigger updates
    };
    getBookmarks();
  }, [userId]);

  return (
    <Router>
      <UserContext.Provider value={userId} >
        <div className="app-container">
          <header className="app-header">
            <h1><Link to="/" style={{ textDecoration: "none", color: "inherit" }}>🎲 Board Game Statistic Tracker</Link></h1>
            <p className="app-user">Demo User Logged In</p>
          </header>

          <Routes>
            <Route path="/" element={

              <main className="app-main">
                <section className="app-section">
                  <h2>Search for Board Games</h2>
                  <BoardGameSearch
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                  />
                </section>

                <section className="app-section">
                  <h2>Add a Board Game to the Database</h2>
                  <AddBoardGameForm />
                </section>

                <div ref={gameSessionFormRef}>
                  <section className="app-section">

                    <h2>Add a Game Session</h2>
                    <GameSessionForm
                      onAdd={(newItem) => {
                        setPlayHistory([...playHistory, { ...newItem, id: uuidv4() }]);
                      }}
                      editingItem={editingPlayHistoryItem}
                      onUpdate={(updatedItem) => {
                        setPlayHistory(playHistory.map(item => item.id === updatedItem.id ? updatedItem : item
                        ));
                        setEditingPlayHistoryItem(null);
                      }}
                      onCancelEdit={() => setEditingPlayHistoryItem(null)}
                      autofillGameName={selectedGameForSession || ""} />

                  </section>
                </div>

                <section className="app-section">
                  <PlayHistory
                    items={playHistory}
                    setItems={setPlayHistory}
                    onEdit={(item) => setEditingPlayHistoryItem(item)}
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                    userId={userId}
                  />
                </section>

                <section className='app-section'>
                  <h2>User Stats</h2>
                  <UserStats userId={userId} />
                </section>

                <section className="app-section">
                  <h2>Add a Game to Collection</h2>
                  <AddCollectionForm
                    onAdd={(newItem) => {
                      setCollection([...collection, { ...newItem, id: uuidv4() }]);
                    }}
                    editingItem={editingCollectionItem}
                    onUpdate={(updatedItem) => {
                      setCollection(collection.map(item => item.id === updatedItem.id ? updatedItem : item
                      ));
                      setEditingCollectionItem(null);
                    }}
                    onCancelEdit={() => setEditingCollectionItem(null)} />
                </section>

                <section className="app-section">
                  <Collection
                    items={collection}
                    setItems={setCollection}
                    onEdit={(item) => { setEditingCollectionItem(item); setSelectedGameForSession(null); }}
                    onAddSession={handleAddSession}
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                    userId={userId}
                  />
                </section>



              </main>
            } />

            <Route path="/game/:name" element={<BoardGameDetails bookmarks={bookmarks} setBookmarks={setBookmarks} />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </Router >
  );
}

export default App;