//Collection is a list of the User's Games

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookmarkButtons from './BookmarkButtons';
import styles from './styles/SharedStyles.module.css';
import Sorting from './Sorting';
import SlidePanel from './SlidePanel';
import CollectionManager from "./AddCollectionManager.js";
import { fetchCollection } from "./mockAPI";

function Collection({ userId, items, setItems, bookmarks, playHistory, setBookmarks, readOnly, showHeading=true }) {

  const [sortConfig, setSortConfig] = useState({ sortBy: 'purchaseDate', direction: 'desc' });
  const [sortedItems, setSortedItems] = useState([]);
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [editingCollectionItem, setEditingCollectionItem] = useState(null);
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const getCollection = async () => {
     const data = await fetchCollection(userId);
          setCollection(data);
        };
        getCollection();
      }, [userId]);

  useEffect(() => {
    const { sortBy, direction } = sortConfig;


    const sorted = [...items].sort((a, b) => {
      let comparison = 0;
  
      if (sortBy === 'purchaseDate') {
        comparison = new Date(a.purchaseDate) - new Date(b.purchaseDate);
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      }
  
      return direction === 'asc' ? comparison : -comparison;
    });
  
    setSortedItems(sorted);
  }, [items, sortConfig]);


  const deleteGame = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {showHeading && (
        <div className="section-header">
          <h3 className="section-title">Collection</h3>
          <button className="add-button" onClick={() => setShowCollectionForm(true)}><i className="fas fa-plus-square"></i>Add to Collection</button>
        </div>
      )}
        <Sorting onSortChange={setSortConfig} dateField="purchaseDate" />
      <ul className={`${styles.list} ${styles.leftAlignedList}`}>
      {sortedItems.map(item => (
          <li key={`${item.id}-${bookmarks.length}`} className={`${styles.listItem} ${styles.leftCard}`}>
            <div className={styles.cardContent}>
              {item.image && (
                <div className={styles.imageMask}>
                  <img src={item.image} alt={item.name} className={styles.gameImage} />
                </div>
              )}
              <div className={`${styles.gameDetails} ${styles.leftDetails}`}>
                <h3 className={styles.gameName}>
                  <Link
                    to={`/game/${encodeURIComponent(item.name)}`}
                    state={{ collection: items, playHistory: [] }}
                    style={{ textDecoration: 'none', color: '#0082BC' }}
                  >
                    {item.name}
                  </Link>
                </h3>
                <p className={styles.gameInfo}><strong>Players:</strong> {item.players}</p>
                <p className={styles.gameInfo}><strong>Playtime:</strong> {item.estimatedTime}</p>
                <p className={styles.gameInfo}><strong>Purchase Date:</strong> {item.purchaseDate}</p>
                <p className={styles.gameInfo}><strong>Purchase Price:</strong> {item.purchasePrice}</p>
                <div className={styles.buttonGroup}>
                  {/* <button onClick={() => onAddSession(item.name)}>Add Session</button> */}
                  <button className="edit-button" onClick={() => onEdit(item)}><i className="far fa-edit"></i>Edit Game</button>
                  <button className="edit-button" onClick={() => deleteGame(item.id)}><i className="far fa-trash-can"></i>Delete Game</button>
                  <button className="edit-button" onClick={() => navigate(`/stats/${item.gameId}`)}><i className="fas fa-chart-simple"></i>Game Stats</button>
                  <BookmarkButtons
                    gameId={item.gameId}
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <SlidePanel
        show={showCollectionForm}
        onClose={() => {
          setShowCollectionForm(false);
          setEditingCollectionItem(null);
        }}
        heading={editingCollectionItem ? "Edit Collection Item" : "Add to Collection"}>

        <CollectionManager
          collection={collection}
          setCollection={(newList) => {
            setCollection(newList);
            setItems(newList);
          }}
          editingCollectionItem={editingCollectionItem}
          setEditingCollectionItem={setEditingCollectionItem}
          setShowCollectionForm={setShowCollectionForm}
        />
      </SlidePanel>
    </div>
  );
}

export default Collection;