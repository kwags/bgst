//Play History is a List of Game Sessions 
//import logo from './logo.svg';
//import './App.css';


import React from "react";
import GameSession from "./GameSession.js";

function PlayHistory ({ items, deleteGameSession }) {
  return (
    <div>
      {items.map((item) => (
        <GameSession
          name={item.name}
          date={item.date}
          numPlayers={item.numPlayers}
          score={item.score}
          winloss={item.winloss}
          comments={item.comments}
          id={item.id}
          deleteGameSession={deleteGameSession}
        />
      ))}
    </div>
  );
}

export default PlayHistory;

