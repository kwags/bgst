import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BoardGameDetails from './BoardGameDetails';
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import BoardGameSearch from './BoardgameSearch.js';
import GameSessionForm from './GameSessionForm';
import PlayHistory from "./PlayHistory.js";
import { fetchPlayHistory } from "./mockAPI";
import AddBoardGameForm from "./AddBoardGameForm.js";
import Collection from "./Collection.js";
import { fetchCollection } from "./mockAPI";
import AddCollectionForm from './AddCollectionForm.js';
import UserStats from './UserStats.js';

function App() {
  const [userId, setUserId] = useState(1);
  const [playHistory, setPlayHistory] = useState([]);
  const [collection, setCollection] = useState([]);
  const [editingPlayHistoryItem, setEditingPlayHistoryItem] = useState(null);
  const [editingCollectionItem, setEditingCollectionItem] = useState(null);

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


  return (
    <Router>
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
                <BoardGameSearch />
              </section>

              <section className="app-section">
                <h2>Add a Board Game to the Database</h2>
                <AddBoardGameForm />
              </section>

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
                  onCancelEdit={() => setEditingPlayHistoryItem(null)} />
              </section>

              <section className="app-section">
                <PlayHistory items={playHistory} setItems={setPlayHistory} onEdit={(item) => setEditingPlayHistoryItem(item)} />
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
          <Collection items={collection} setItems={setCollection} onEdit={(item) => setEditingCollectionItem(item)} />
        </section>



            </main>
          } />

          <Route path="/game/:id" element={<BoardGameDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;