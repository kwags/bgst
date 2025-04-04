//import logo from './logo.svg';
//import './App.css';
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'; // for creating unique id's
import BoardGameSearch from './BoardgameSearch.js';
import GameSessionForm from './GameSessionForm';
import PlayHistory from "./PlayHistory.js";
import { fetchPlayHistory } from "./mockAPI";

function App() {
  const [items, setItems] = useState([]);

  // Fetch mock game session data for Play History
  useEffect(() => {
    const getPlayHistory = async () => {
      const data = await fetchPlayHistory();
      setItems(data);
    };
    getPlayHistory();
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo"  */}
        <h2> Board Game Statistic Tracker </h2>
        </header>
        <p>Demo User Logged In</p>
        <h3>Components</h3>
        <li>Search Board Game Database</li>
          <li>Add Board Game Session to Play History</li>
          <li>View Play History</li>
          <li>View Stats</li>

          <BoardGameSearch/>

          <GameSessionForm
            onAdd={(newItem) => {
              setItems([...items, { ...newItem, id: uuidv4() }]);
            }}
          />

        <PlayHistory items={items} setItems={setItems} />

    </div>
  );
}


export default App;
