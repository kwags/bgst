import React, { useState, useEffect } from "react";
import styles from "./styles/Form.module.css";

function GameSessionForm({ onAdd, editingItem, onUpdate, onCancelEdit, autofillGameName, boardgames }) {
  const [gameSessionName, setGameSessionName] = useState("");
  const [gameSessionDate, setGameSessionDate] = useState("");
  const [gameSessionPlayers, setGameSessionPlayers] = useState("");  
  const [gameSessionScore, setGameSessionScore] = useState("");  
  const [gameSessionResult, setGameSessionResult] = useState("");  
  const [gameSessionTime, setGameSessionTime] = useState("");  
  const [gameSessionComments, setGameSessionComments] = useState("");  
  const getTodayDateString = () => { const today = new Date(); return today.toISOString().split('T')[0]; };
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);


  const handleSuggestionClick = (game) => {
    setGameSessionName(game.name);
    setSuggestions([]);
  };

  const handleGameNameChange = (e) => {
    const value = e.target.value;
    setGameSessionName(value);
    setSelectedIndex(-1);
  
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    if (!Array.isArray(boardgames)) {
      setSuggestions([]);
      return;
    }
  
    const filteredSuggestions = boardgames
      ?.filter(game => game.name.toLowerCase().includes(value.toLowerCase()))
      .sort((a, b) => {
        const val = value.toLowerCase();
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
  
        const aStarts = aName.startsWith(val) ? 0 : 1;
        const bStarts = bName.startsWith(val) ? 0 : 1;
  
        if (aStarts !== bStarts) {
          return aStarts - bStarts;
        }
        return aName.localeCompare(bName);
      })
      .slice(0, 5);
  
    setSuggestions(filteredSuggestions);
  };


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
        <div className={styles.inputGroup} style={{ position: "relative" }}>
          <input
            placeholder="Game Name"
            value={gameSessionName}
            onChange={handleGameNameChange}
            onKeyDown={(e) => {
              if (suggestions.length === 0) return;

              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % suggestions.length);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) =>
                  prev === 0 ? suggestions.length - 1 : prev - 1
                );
              } else if (e.key === "Enter" && selectedIndex >= 0) {
                e.preventDefault();
                handleSuggestionClick(suggestions[selectedIndex]);
              }
            }}
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul className={styles.suggestionList}>
              {suggestions.map((game, index) => (
                <li
                  key={index}
                  className={`${styles.suggestionItem} ${index === selectedIndex ? styles.activeItem : ""}`}
                  onClick={() => handleSuggestionClick(game)}
                >
                  {game.name}
                </li>
              ))}
            </ul>
          )}
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