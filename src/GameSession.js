//Add a Game Session to Play History
//import logo from './logo.svg';
//import './App.css';


import React from "react";

function GameSession({ name, date, numPlayers, score, winloss, comments, id, deleteGameSession }) {
  return (
    <div>
      <h4>Board Game Name: {name}</h4>
      <p>Date: {date}</p>
      <p>Number of Players: {numPlayers}</p>
      <p>Score: {score}</p>
      <p>Win / Loss: {winloss}</p>
      <p>Comments: {comments}</p>
      <button onClick={() => deleteGameSession(id)}>Delete</button>
    </div>
  );
}

export default GameSession;