import React, { useState } from "react";
import styles from "./styles/GameSessionForm.module.css";

function GameSessionForm({ onAdd }) {
  const [gameSessionName, setGameSessionName] = useState("");
  const [gameSessionDate, setGameSessionDate] = useState(new Date().toDateString());
  const [gameSessionPlayers, setGameSessionPlayers] = useState(0);  
  const [gameSessionScore, setGameSessionScore] = useState(0);  
  const [gameSessionWinLoss, setGameSessionWinLoss] = useState("");  
  const [gameSessionTime, setGameSessionTime] = useState(0);  
  const [gameSessionComments, setGameSessionComments] = useState("");  

  const handleAdd = (e) => {
    e.preventDefault();

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
    <form className={styles.form} onSubmit={handleAdd}>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label>Game Name</label>
          <input value={gameSessionName} onChange={e => setGameSessionName(e.target.value)} />
        </div>

        <div className={styles.inputGroup}>
          <label>Date</label>
          <input type="date" value={gameSessionDate} onChange={e => setGameSessionDate(e.target.value)} />
        </div>

        <div className={styles.inputGroup}>
          <label>Number of Players</label>
          <input type="number" value={gameSessionPlayers} onChange={e => setGameSessionPlayers(Number(e.target.value))} />
        </div>

        <div className={styles.inputGroup}>
          <label>Score</label>
          <input type="number" value={gameSessionScore} onChange={e => setGameSessionScore(Number(e.target.value))} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label>Result</label>
          <select value={gameSessionWinLoss} onChange={e => setGameSessionWinLoss(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="Win">Win</option>
            <option value="Loss">Loss</option>
            <option value="Draw">Draw</option>
            <option value="DNF">Did Not Finish</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Time Played (minutes)</label>
          <input type="number" value={gameSessionTime} onChange={e => setGameSessionTime(Number(e.target.value))} />
        </div>

        <div className={styles.inputGroup} style={{ flex: 2 }}>
          <label>Comments</label>
          <textarea value={gameSessionComments} onChange={e => setGameSessionComments(e.target.value)} />
        </div>
      </div>

      <button type="submit">Add Session</button>
    </form>
  );
}

export default GameSessionForm;