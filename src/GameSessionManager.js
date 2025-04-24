import React from "react";
import GameSessionForm from "./GameSessionForm";
import { v4 as uuidv4 } from 'uuid';

const GameSessionManager = ({
  playHistory,
  setPlayHistory,
  editingPlayHistoryItem,
  setEditingPlayHistoryItem,
  selectedGameForSession,
  setSelectedGameForSession,
  setShowSessionForm,
}) => {

  
  return (
    <GameSessionForm
      editingItem={editingPlayHistoryItem}
      autofillGameName={selectedGameForSession || ""}
      onAdd={(newItem) => {
        setPlayHistory([...playHistory, { ...newItem, id: uuidv4() }]);
        setShowSessionForm(false);
      }}
      onUpdate={(updatedItem) => {
        setPlayHistory(
          playHistory.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          )
        );
        setEditingPlayHistoryItem(null);
        setShowSessionForm(false);
      }}
      onCancelEdit={() => {
        setEditingPlayHistoryItem(null);
        setSelectedGameForSession("");
        setShowSessionForm(false);
      }}
    />
  );
};

export default GameSessionManager;