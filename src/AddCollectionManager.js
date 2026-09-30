import React, { useState } from "react";
import AddCollectionForm from "./AddCollectionForm";
import { enrichWithBoardGameData } from "./mockAPI";
import { mockData } from "./mockAPI.js";

const CollectionManager = ({
  collection,
  setCollection,
  editingCollectionItem,
  setEditingCollectionItem,
  selectedGameForCollection,
  setSelectedGameForCollection,
  setShowCollectionForm,
}) => {
  const [loading, setLoading] = useState(false);

  const handleAdd = async (newItem) => {
    setLoading(true);

    try {
      const enrichedItem = await enrichWithBoardGameData(newItem.name, newItem);
      setCollection([...collection, enrichedItem]);
      setShowCollectionForm(false);
    } catch (error) {
      console.error('Error enriching collection item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (updatedItem) => {
    setCollection(
      collection.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    setEditingCollectionItem(null);
    setShowCollectionForm(false);
  };

  return (
    <AddCollectionForm
      editingItem={editingCollectionItem}
      autofillGameName={selectedGameForCollection || ""}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onCancelEdit={() => {
        setEditingCollectionItem(null);
        setSelectedGameForCollection("");
        setShowCollectionForm(false);
      }}
      boardgames={mockData.boardgames}
    />
  );
};
export default CollectionManager;