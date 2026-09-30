import React, { useState } from "react";
import GameSessionForm from "./GameSessionForm";
import { enrichWithBoardGameData } from "./mockAPI";
import { mockData } from "./mockAPI.js";

const GameSessionManager = ({
  playHistory,
  setPlayHistory,
  editingPlayHistoryItem,
  setEditingPlayHistoryItem,
  selectedGameForSession,
  setSelectedGameForSession,
  setShowSessionForm,
}) => {
  const [loading, setLoading] = useState(false);

  const handleAdd = async (newItem) => {
    setLoading(true);
    try {
      const enrichedItem = await enrichWithBoardGameData(newItem.name, newItem);
      setPlayHistory([...playHistory, enrichedItem]);
      setShowSessionForm(false);
    } catch (error) {
      console.error('Error enriching game session:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (updatedItem) => {
    setPlayHistory(
      playHistory.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    setEditingPlayHistoryItem(null);
    setShowSessionForm(false);
  };

  return (
    <GameSessionForm
      editingItem={editingPlayHistoryItem}
      autofillGameName={selectedGameForSession || ""}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onCancelEdit={() => {
        setEditingPlayHistoryItem(null);
        setSelectedGameForSession("");
        setShowSessionForm(false);
      }}
      boardgames={mockData.boardgames} 
    />
  );
};

export default GameSessionManager;