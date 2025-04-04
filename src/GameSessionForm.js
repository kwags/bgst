//Game Session Form to Add Game to Play History
//import logo from './logo.svg';
//import './App.css';

import React, { useState } from "react";

function GameSessionForm({ onAdd }) {
  const [gameSessionName, setGameSessionName] = useState("");
  const [gameSessionDate, setGameSessionDate] = useState(new Date().toDateString());
  const [gameSessionPlayers, setGameSessionPlayers] = useState(0);  
  const [gameSessionScore, setGameSessionScore] = useState(0);  
  const [gameSessionWinLoss, setGameSessionWinLoss] = useState("");  
  const [gameSessionTime, setGameSessionTime] = useState(0);  
  const [gameSessionComments, setGameSessionComments] = useState("");  

  const handleAdd = () => {

    onAdd({
      name: gameSessionName,
      date: gameSessionDate,
      numPlayers: gameSessionPlayers,
      score: gameSessionScore,
      winloss: gameSessionWinLoss,
      time: gameSessionTime,
      comments: gameSessionComments,
    });

    // Clear form after add
    setGameSessionName("");
    setGameSessionDate(new Date().toDateString());
    setGameSessionPlayers(0);
    setGameSessionScore(0);
    setGameSessionWinLoss("");
    setGameSessionTime(0);
    setGameSessionComments("");
  };

  return (
    <div>
      <h3>Add Game Session to Play History</h3>
      <label>Game Name:</label><br />
      <input value={gameSessionName} onChange={e => setGameSessionName(e.target.value)} /><br />

      <label>Date:</label><br />
      <input type="date" value={gameSessionDate} onChange={e => setGameSessionDate(e.target.value)} /><br />

      <label>Players:</label><br />
      <input type="number" value={gameSessionPlayers} onChange={e => setGameSessionPlayers(Number(e.target.value))} /><br />

      <label>Score:</label><br />
      <input type="number" value={gameSessionScore} onChange={e => setGameSessionScore(Number(e.target.value))} /><br />

      <label>Win/Loss:</label><br />
      <select value={gameSessionWinLoss} onChange={(e) => setGameSessionWinLoss(e.target.value)}>
        <option value="">-- Select Result --</option>
        <option value="Win">Win</option>
        <option value="Loss">Loss</option>
        <option value="Draw">Draw</option>
        <option value="DNF">DNF</option>
      </select><br />        

      <label>Amount of Time Played (in mins):</label><br />
      <input type="number" value={gameSessionTime} onChange={e => setGameSessionTime(Number(e.target.value))} /><br />

      <label>Comments:</label><br />
      <textarea value={gameSessionComments} onChange={e => setGameSessionComments(e.target.value)} /><br /><br />

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default GameSessionForm;