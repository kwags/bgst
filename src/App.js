//import logo from './logo.svg';
//import './App.css';
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid'; // for creating unique id's for todo items
import GameSession from './GameSession.js'


function App() {
  const [gameSessionName, setGameSessionName] = useState("");
  const [gameSessionDescription, setGameSessionDescription] = useState("");
  
  
          // all game session items are stored in the web app's memory on the client side (i.e., in the browser's memory)
          const [items, setItems] = useState([
            { name: "Game 1", description: "Win", id: '1'},
            { name: "Game 2", description: "Loss", id: '2' },
            { name: "Game 3", description: "Win", id: '3' },
            { name: "Game 4", description: "Loss", id: '4' },
          ]);

    // a function that creates an array of Game Session UI components
    function createGameSessionList() {
      let ret = []; 
      for (let i = 0; i < items.length; i++) {
        ret.push( <GameSession key={items[i].id} name={items[i].name} description={items[i].description} id={items[i].id} delete={deleteGameSession} /> );
      }
      return ret; 
    }
    // functions to add/delete game session items from the array of todos
  function addGameSession() {
    const newItem = { name: gameSessionName, description: gameSessionDescription, id: uuidv4() };
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
          <label>Description:</label><br />
          <textarea id="description" value={gameSessionDescription} onChange={e => {setGameSessionDescription(e.target.value)}}></textarea><br />
          <button onClick={addGameSession}>Add</button>

          <h2>Play History</h2>
          { createGameSessionList() }

    </div>
  );
}


export default App;
