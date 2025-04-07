import React, { useState } from "react";
import { addBoardGame } from "./mockAPI";
import styles from "./styles/AddBoardGameForm.module.css";

function AddBoardGameForm() {
  const [name, setName] = useState('');
  const [players, setPlayers] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name || !players || !estimatedTime) {
      alert("Please fill in all fields!");
      return;
    }

    const newGame = { name, players, estimatedTime };
    await addBoardGame(newGame);
    alert(`Added "${name}" to the database!`);
    setName('');
    setPlayers('');
    setEstimatedTime('');
  };

  return (
    <form className={styles.form} onSubmit={handleAdd}>
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Players"
        value={players}
        onChange={e => setPlayers(e.target.value)}
      />
      <input
        placeholder="Estimated Time"
        value={estimatedTime}
        onChange={e => setEstimatedTime(e.target.value)}
      />
      <button type="submit">Add Game</button>
    </form>
  );
}

export default AddBoardGameForm;