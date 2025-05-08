import React, { useState, useEffect } from "react";
import styles from "./styles/Form.module.css";

function AddCollectionForm({ onAdd, editingItem, onUpdate, onCancelEdit, autofillGameName, autofillNumPlayers, autofillEstimatedTime, boardgames }) {
  const [collectionGameName, setCollectionGameName] = useState("");
  const [collectionPlayers, setCollectionPlayers] = useState("");  
  const [collectionTime, setCollectionTime] = useState("");  
  const [collectionDate, setCollectionDate] = useState("");
  const [collectionPrice, setCollectionPrice] = useState("");   
  const getTodayDateString = () => { const today = new Date(); return today.toISOString().split('T')[0]; };
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSuggestionClick = (game) => {
    setCollectionGameName(game.name);
    setCollectionPlayers(game.players || "");
    setCollectionTime(game.estimatedTime || "");
    setSuggestions([]);
  };

  const handleGameNameChange = (e) => {
    const value = e.target.value;
    setCollectionGameName(value);
    setSelectedIndex(-1);
  
    if (!value.trim()) {
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
      setCollectionGameName(editingItem.name || "");
      setCollectionPlayers(editingItem.players || "");
      setCollectionTime(editingItem.estimatedTime || "");
      setCollectionDate(editingItem.purchaseDate || "");
      setCollectionPrice(editingItem.purchasePrice || "");
    } else {
    // clear form on cancel
      setCollectionGameName(autofillGameName || "");
      setCollectionPlayers(autofillNumPlayers || "");
      setCollectionTime(autofillEstimatedTime || "");
      setCollectionDate(getTodayDateString());
      setCollectionPrice("");
    }
  }, [editingItem, autofillGameName, autofillNumPlayers, autofillEstimatedTime]);
  
  useEffect(() => {
    const matchedGame = boardgames?.find(
      (game) => game.name.toLowerCase() === collectionGameName.toLowerCase()
    );
  
    if (matchedGame && !editingItem) {
      setCollectionPlayers(matchedGame.players || "");
      setCollectionTime(matchedGame.estimatedTime || "");
    }
  }, [collectionGameName, boardgames, editingItem]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const collectionData = {
      name: collectionGameName,
      players: collectionPlayers,
      estimatedTime: collectionTime,
      purchaseDate: collectionDate,
      purchasePrice: collectionPrice,
    };

    if (editingItem) {
      onUpdate({ ...editingItem, ...collectionData });
    } else {
      onAdd(collectionData);
    }

    // Clear form after add
    setCollectionGameName("");
    setCollectionPlayers("");
    setCollectionTime("");
    setCollectionDate(getTodayDateString());
    setCollectionPrice("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.inputGroup} style={{ position: "relative" }}>
          <input
            placeholder="Game Name"
            value={collectionGameName}
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
          <input placeholder="Number of Players" value={collectionPlayers} onChange={e => setCollectionPlayers(e.target.value)}/>
        </div>

        <div className={styles.inputGroup}>
          <input placeholder="Estimated Playtime" value={collectionTime} onChange={e => setCollectionTime(e.target.value)} />
        </div>

        <div className={styles.inputGroup}>
          <input placeholder ="Purchase Date" type="date" value={collectionDate} onChange={e => setCollectionDate(e.target.value)} />
        </div>

        <div className={styles.inputGroup}>
          <input type="number" step="1.00" placeholder ="Purchase Price" value={collectionPrice} onChange={e => setCollectionPrice(Number(e.target.value))} />
        </div>


      </div>

      <button type="submit">{editingItem ? "Save Changes" : "Add Game"}</button>
      {editingItem && (
        <button type="button" onClick={onCancelEdit} style={{ marginLeft: "1rem" }}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default AddCollectionForm;