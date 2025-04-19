import React, { useState, useEffect } from "react";
import styles from "./styles/GameSessionForm.module.css";

function GameSessionForm({ onAdd, editingItem, onUpdate, onCancelEdit, autofillGameName }) {
  const [gameSessionName, setGameSessionName] = useState("");
  const [gameSessionDate, setGameSessionDate] = useState("");
  const [gameSessionPlayers, setGameSessionPlayers] = useState("");  
  const [gameSessionScore, setGameSessionScore] = useState("");  
  const [gameSessionResult, setGameSessionResult] = useState("");  
  const [gameSessionTime, setGameSessionTime] = useState("");  
  const [gameSessionComments, setGameSessionComments] = useState("");  
  const getTodayDateString = () => { const today = new Date(); return today.toISOString().split('T')[0]; };

  useEffect(() => {
    if (editingItem) {
      setGameSessionName(editingItem.name || "");
      setGameSessionDate(editingItem.date || "");
      setGameSessionPlayers(editingItem.numPlayers || "");
      setGameSessionScore(editingItem.score || "");
      setGameSessionResult(editingItem.result || "");
      setGameSessionTime(editingItem.time || "");
      setGameSessionComments(editingItem.comments || "");
    } else {
      // Clear form on cancel
      setGameSessionName(autofillGameName || "");
      setGameSessionDate(getTodayDateString());
      setGameSessionPlayers("");
      setGameSessionScore("");
      setGameSessionResult("");
      setGameSessionTime("");
      setGameSessionComments("");
    }
  }, [editingItem, autofillGameName]);

  const handleSubmit = (e) => {
    e.preventDefault();

  const sessionData = {
      name: gameSessionName,
      date: gameSessionDate,
      numPlayers: gameSessionPlayers,
      score: gameSessionScore,
      result: gameSessionResult,
      time: gameSessionTime,
      comments: gameSessionComments,
    };

    if (editingItem) {
      onUpdate({ ...editingItem, ...sessionData });
    } else {
      onAdd(sessionData);
    }

    // Clear form after add
    setGameSessionName("");
    setGameSessionDate(getTodayDateString());
    setGameSessionPlayers("");
    setGameSessionScore("");
    setGameSessionResult("");
    setGameSessionTime("");
    setGameSessionComments("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <input placeholder = "Game Name" value={gameSessionName} onChange={e => setGameSessionName(e.target.value)} />
        </div>

        <div className={styles.inputGroup}>
          <input type="date" value={gameSessionDate} onChange={e => setGameSessionDate(e.target.value)} />
        </div>

        <div className={styles.inputGroup}>
          <input type="number" placeholder="Number of Players" value={gameSessionPlayers} onChange={e => setGameSessionPlayers(Number(e.target.value))}/>
        </div>

        <div className={styles.inputGroup}>
          <input type="number" placeholder="Score" value={gameSessionScore} onChange={e => setGameSessionScore(Number(e.target.value))} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <select value={gameSessionResult} onChange={e => setGameSessionResult(e.target.value)}>
            <option value="">-- Select Result --</option>
            <option value="Win">Win</option>
            <option value="Loss">Loss</option>
            <option value="Draw">Draw</option>
            <option value="DNF">Did Not Finish</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <input type="number" placeholder="Minutes Played" value={gameSessionTime} onChange={e => setGameSessionTime(Number(e.target.value))} />
        </div>

        <div className={styles.inputGroup} style={{ flex: 2 }}>
          <textarea placeholder="Comments" value={gameSessionComments} onChange={e => setGameSessionComments(e.target.value)} />
        </div>
      </div>

      <button type="submit">{editingItem ? "Save Changes" : "Add Session"}</button>
      {editingItem && (
        <button type="button" onClick={onCancelEdit} style={{ marginLeft: "1rem" }}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default GameSessionForm;