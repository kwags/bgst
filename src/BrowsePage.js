import React, { useState, useEffect } from 'react';
import styles from './styles/SharedStyles.module.css';
import BoardGameSearch from './BoardgameSearch';
import BrowseGames from "./BrowseGames.js";
import { fetchBoardGames } from './mockAPI.js';

const BrowsePage = ({ bookmarks, setBookmarks, playHistory, setPlayHistory, collection, setCollection }) => {
const [searchTerm, setSearchTerm] = useState('');
const [activeFilter, setActiveFilter] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [loading, setLoading] = useState(false);
const [showSessionForm, setShowSessionForm] = useState(false);
const [showCollectionForm, setShowCollectionForm] = useState(false);
const [selectedGame, setSelectedGame] = useState(null);
  

  const handleSearch = async (term = searchTerm, filter = activeFilter) => {
    setLoading(true);
    try {
      let filteredGames = await fetchBoardGames(term, filter);
      if (!Array.isArray(filteredGames)) filteredGames = [];
      if (!filter) {
        filteredGames = filteredGames.sort((a, b) => a.name.localeCompare(b.name));
      }
      setSearchResults(filteredGames);
    } catch (error) {
      console.error('Error searching boardgames: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = (filter) => {
    const newFilter = activeFilter === filter ? '' : filter;
    setActiveFilter(newFilter);
    handleSearch(searchTerm, newFilter);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    
    <div className={styles.container}>
        <div className="section-header">
          <h3 className="section-title">Browse Games</h3>
        </div>
      <BoardGameSearch
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              playHistory={playHistory}
              setPlayHistory={setPlayHistory}
              collection={collection}
              setCollection={setCollection} />
      <div>
        <div className="section-header">
          <h3 className="section-title center-title">Sort Games</h3>
        </div>
         <BrowseGames
          searchResults={searchResults}
          loading={loading}
          activeFilter={activeFilter}
          handleFilterClick={handleFilterClick}
          showSessionForm={showSessionForm}
          setShowSessionForm={setShowSessionForm}
          showCollectionForm={showCollectionForm}
          setShowCollectionForm={setShowCollectionForm}
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
          playHistory={playHistory}
          setPlayHistory={setPlayHistory}
          collection={collection}
          setCollection={setCollection}
          bookmarks={bookmarks}
          setBookmarks={setBookmarks}
      />

      </div>
    </div>
  );
};

export default BrowsePage;