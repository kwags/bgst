import React, { useState, useEffect } from "react";
import styles from "./styles/GameSessionForm.module.css";

function AddCollectionForm({ onAdd, editingItem, onUpdate, onCancelEdit }) {
  const [collectionGameName, setCollectionGameName] = useState("");
  const [collectionPlayers, setCollectionPlayers] = useState("");  
  const [collectionTime, setCollectionTime] = useState("");  
  const [collectionDate, setCollectionDate] = useState("");
  const [collectionPrice, setCollectionPrice] = useState("");   

  useEffect(() => {
    if (editingItem) {
      setCollectionGameName(editingItem.name || "");
      setCollectionPlayers(editingItem.players || "");
      setCollectionTime(editingItem.estimatedTime || "");
      setCollectionDate(editingItem.purchaseDate || "");
      setCollectionPrice(editingItem.purchasePrice || "");
    } else {
    // clear form on cancel
      setCollectionGameName("");
      setCollectionPlayers("");
      setCollectionTime("");
      setCollectionDate(new Date().toDateString());
      setCollectionPrice("");
    }
  }, [editingItem]);
  
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
    setCollectionDate(new Date().toDateString());
    setCollectionPrice("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <input placeholder = "Game Name" value={collectionGameName} onChange={e => setCollectionGameName(e.target.value)} />
        </div>

        <div className={styles.inputGroup}>
          <input type="number" placeholder="Number of Players" value={collectionPlayers} onChange={e => setCollectionPlayers(e.target.value)}/>
        </div>

        <div className={styles.inputGroup}>
          <input type="number" placeholder="Estimated Playtime" value={collectionTime} onChange={e => setCollectionTime(e.target.value)} />
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