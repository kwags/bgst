import React from "react";
import AddCollectionForm from "./AddCollectionForm";
import { enrichWithBoardGameData } from "./mockAPI";

const CollectionManager = ({
  collection,
  setCollection,
  editingCollectionItem,
  setEditingCollectionItem,
  setShowCollectionForm,
}) => {

  const handleAddCollection = async (newItem) => {
    try {
      const enrichedItem = await enrichWithBoardGameData(newItem.name, newItem);
      setCollection([...collection, enrichedItem]);
      setShowCollectionForm(false);
    } catch (error) {
      console.error('Error enriching collection item:', error);
    }
  };


  return (
    <AddCollectionForm
      onAdd={handleAddCollection}
      editingItem={editingCollectionItem}
      onUpdate={(updatedItem) => {
        setCollection(
          collection.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          )
        );
        setEditingCollectionItem(null);
        setShowCollectionForm(false);
      }}
      onCancelEdit={() => {
        setEditingCollectionItem(null);
        setShowCollectionForm(false);
      }}
    />
  );
};

export default CollectionManager;