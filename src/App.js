import './styles/App.css';
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import BoardGameSearch from './BoardgameSearch.js';
import GameSessionForm from './GameSessionForm';
import PlayHistory from "./PlayHistory.js";
import { fetchPlayHistory } from "./mockAPI";
import AddBoardGameForm from "./AddBoardGameForm.js";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getPlayHistory = async () => {
      const data = await fetchPlayHistory();
      setItems(data);
    };
    getPlayHistory();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎲 Board Game Statistic Tracker</h1>
        <p className="app-user">Demo User Logged In</p>
      </header>

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
              setItems([...items, { ...newItem, id: uuidv4() }]);
            }}
          />
        </section>

        <section className="app-section">
          <PlayHistory items={items} setItems={setItems} />
        </section>
      </main>
    </div>
  );
}

export default App;