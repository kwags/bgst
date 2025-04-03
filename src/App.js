//import logo from './logo.svg';
//import './App.css';
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid'; // for creating unique id's for todo items
import PlayHistory from "./PlayHistory.js";


function App() {
  
  const [gameSessionName, setGameSessionName] = useState("");
  const [gameSessionDate, setGameSessionDate] = useState(new Date().toDateString());
  const [gameSessionComments, setGameSessionComments] = useState("");  
  const [gameSessionPlayers, setGameSessionPlayers] = useState(0);  
  const [gameSessionScore, setGameSessionScore] = useState(0);  
  const [gameSessionWinLoss, setGameSessionWinLoss] = useState("");  


  // all game session items are stored in the web app's memory on the client side (i.e., in the browser's memory)
  const [items, setItems] = useState([
    { name: "Mysterium", 
      date: "Sat Mar 08 2025", 
      numPlayers: 4, 
      score: 4,
      winloss: "Win", 
      comments: "First time playing this game",
      id: "1" },
    { name: "Carcassonne", 
      date: "Thu Mar 13 2025", 
      numPlayers: 3, 
      score: 105,
      winloss: "Loss", 
      comments: "This was really fun!", 
      id: "2" },
    { name: "Catan", 
      date: "Thu Mar 27 2025", 
      numPlayers: 3, 
      score: 10,
      winloss: "Win",
      comments: "Always a fun game", 
      id: "3" },
  ]);

  // functions to add/delete game session items from the array of game sessions (play history)
  function addGameSession() {
    const newItem = { name: gameSessionName, 
      date: gameSessionDate, 
      umPlayers: gameSessionPlayers, 
      score: gameSessionScore, 
      comments: gameSessionComments, 
      id: uuidv4() };
    setItems([...items, newItem]); // ... is called the spread operator
  }

  function deleteGameSession(id) {
    const newItemsArray = items.filter((item) => {return item.id !== id});
    setItems(newItemsArray);  
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo"  */}
        <h2>
          Board Game Statistic Tracker
        </h2>
        </header>
        <p>Demo User Logged In</p>
        <h3>Components</h3>

          <li>Search Board Game Database</li>
          <li>Add Board Game Session to Play History</li>
          <li>View Play History</li>
          <li>View Stats</li>

          <h3>Add a Game to Play History</h3>
          <label>Game Name:</label><br />
          <input id="name" value={gameSessionName} onChange={e => {setGameSessionName(e.target.value)}}/><br />
          <label>Game Session Date:</label><br />
          <input id="date" value={gameSessionDate} onChange={e => {setGameSessionDate(e.target.value)}}/><br />
          <label>Number of Players:</label><br />
          <input id="numPlayers" value={gameSessionPlayers} onChange={e => {setGameSessionPlayers(e.target.value)}}/><br />
          <label>Score:</label><br />
          <input id="score" value={gameSessionScore} onChange={e => {setGameSessionScore(e.target.value)}}/><br />
          <label>Win / Loss:</label><br />
          <input id="winloss" value={gameSessionWinLoss} onChange={e => {setGameSessionWinLoss(e.target.value)}}/><br />
          <label>Comments:</label><br />
          <textarea id="description" value={gameSessionComments} onChange={e => {setGameSessionComments(e.target.value)}}></textarea><br />
          <button onClick={addGameSession}>Add</button>

          <h2>Play History</h2>
          <PlayHistory items={items} deleteGameSession={deleteGameSession} />

    </div>
  );
}


export default App;
