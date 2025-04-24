import React from "react";
import AddCollectionForm from "./AddCollectionForm";
import { v4 as uuidv4 } from 'uuid';


const CollectionManager = ({
    collection,
    setCollection,
    editingCollectionItem,
    setEditingCollectionItem,
    setShowCollectionForm,
  }) => {

    const handleAddCollection = (newItem) => {
        setCollection([...collection, { ...newItem, id: uuidv4() }]);
        setShowCollectionForm(false);
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