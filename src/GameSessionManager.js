import React, { useState } from "react";
import GameSessionForm from "./GameSessionForm";
import { v4 as uuidv4 } from 'uuid';
import { fetchBoardGames } from "./mockAPI";

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
      const results = await fetchBoardGames(newItem.name);
      const game = results.length > 0 ? results[0] : null;

      const enrichedItem = {
        ...newItem,
        id: uuidv4(),
        gameId: game ? game.id : uuidv4(),
        image: game ? game.image : null,
        players: game ? game.players : (newItem.numPlayers || "Unknown"),
        estimatedTime: game ? game.estimatedTime : "N/A",
      };

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
      loading={loading}
    />
  );
};

export default GameSessionManager;