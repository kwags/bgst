import './styles/App.css';
import styles from './styles/SlidePanel.module.css';
import slideStyles from './styles/SlidePanel.module.css';
import { BrowserRouter as Router, Routes, Route, LInk } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
import '@fortawesome/fontawesome-free/css/all.min.css';
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
  const [showSessionForm, setShowSessionForm] = useState(false);

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

        <Routes>
          <Route path="/" element={

            <main className="app-main">
              <section className="app-section">
                <BoardGameSearch 
                  bookmarks={bookmarks}
                  setBookmarks={setBookmarks}/>
              </section>
              
              {/*  Moved Within BoardGameSearch
              <section className="app-section">
                <h2>Add a Board Game to the Database</h2>
                <AddBoardGameForm />
              </section>
              */}
              
              <div ref={gameSessionFormRef}></div>
              {/* Add a Play Session Button and Slide Panel */}
              <section className="app-section">

                <button className="add-session-button" onClick={() => setShowSessionForm(true)}><i className="fas fa-plus-square"></i>Add Play Session </button>
                <div className={`${slideStyles.backdrop} ${showSessionForm ? slideStyles.show : ''}`} 
                          onClick={() => setShowSessionForm(false)} />
                  <div className={`${slideStyles["slide-panel"]} ${showSessionForm ? slideStyles.show : ''}`}>
                  <div className={styles['slide-panel-inner']}>
                    <button className={slideStyles["close-button"]} onClick={() => setShowSessionForm(false)}>×</button>
                    <GameSessionForm
                      onAdd={(newItem) => {
                        setPlayHistory([...playHistory, { ...newItem, id: uuidv4() }]);
                      }}
                      editingItem={editingPlayHistoryItem}
                      onUpdate={(updatedItem) => {
                        setPlayHistory(
                          playHistory.map((item) =>
                            item.id === updatedItem.id ? updatedItem : item
                          )
                        );
                        setEditingPlayHistoryItem(null);
                      }}
                      onCancelEdit={() => setEditingPlayHistoryItem(null)}
                      autofillGameName={selectedGameForSession || ""}
                    />
                  </div>
                </div>


                <PlayHistory items={playHistory} setItems={setPlayHistory} bookmarks={bookmarks} setBookmarks={setBookmarks} userId={userId} onEdit={(item) => {
                    setEditingPlayHistoryItem(item);
                    setSelectedGameForSession(item.name); // Optional: if you want to autofill game name
                    setShowSessionForm(true);
                }} />
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
            items={collection} setItems={setCollection} 
            onEdit={(item) => { setEditingCollectionItem(item); setSelectedGameForSession(null);}} 
            onAddSession={handleAddSession} />
        </section>




            </main>
          } />

          <Route path="/game/:id" element={<BoardGameDetails bookmarks={bookmarks} setBookmarks={setBookmarks} />} />
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