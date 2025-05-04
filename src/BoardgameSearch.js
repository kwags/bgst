import React, { useState } from 'react';
import { fetchBoardGames } from './mockAPI';
import GameSessionForm from './GameSessionForm';
import AddCollectionForm from './AddCollectionForm';
import styles from './styles/BoardGameSearch.module.css';
// import styles from './styles/SharedStyles.module.css';
import AddBoardGameForm from './AddBoardGameForm';
import BookmarkButtons from './BookmarkButtons';
import SlidePanel from './SlidePanel';
import { enrichWithBoardGameData } from './mockAPI';

const BoardGameSearch = ({ bookmarks, setBookmarks, setPlayHistory, setCollection }) => {
    const [selectedGame, setSelectedGame] = useState(null);
    const [showSessionForm, setShowSessionForm] = useState(false);
    const [showCollectionForm, setShowCollectionForm] = useState(false);
    const [showAddGameForm, setShowAddGameForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState('');

    const handleAddSession = (game) => {
        setSelectedGame(game);
        setShowSessionForm(true);
    };

    const handleAddToCollection = (game) => {
        setSelectedGame(game);
        setShowCollectionForm(true);
    };

    const handleSearch = async (term = searchTerm, filter = activeFilter) => {
        setLoading(true);
        try {
            const filteredGames = await fetchBoardGames(term, filter);
            setSearchResults(filteredGames);
        } catch (error) {
            console.error('Error searching boardgames: ', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
        setActiveFilter('');
        setShowAddGameForm(false);
    };

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
        handleSearch(searchTerm, filter); 
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchWrapper}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search boardgames..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className={styles.searchButton}
                    onClick={handleSearch}
                >
                    <i className="fas fa-search"></i> Search
                </button>
                
            </div>
            <div className={styles.sortOptions}>
                <button
                    className={`${styles.filterButton} ${activeFilter === 'mostOwned' ? styles.active : ''}`}
                    onClick={() => handleFilterClick('mostOwned')}
                >
                    Most Owned
                </button>
                <button
                    className={`${styles.filterButton} ${activeFilter === 'mostTimePlayed' ? styles.active : ''}`}
                    onClick={() => handleFilterClick('mostTimePlayed')}
                >
                    Most Time Played
                </button>
                <button
                    className={`${styles.filterButton} ${activeFilter === 'byPrice' ? styles.active : ''}`}
                    onClick={() => handleFilterClick('byPrice')}
                >
                    Most Expensive
                </button>
                <button
                    className={`${styles.filterButton} ${activeFilter === 'mostWanted' ? styles.active : ''}`}
                    onClick={() => handleFilterClick('mostWanted')}
                >
                    Most Wanted
                </button>
                <button
                    className={styles.clearButton}
                    onClick={handleClearSearch}
                >
                    <i className="fas fa-times"></i> Clear
                </button>
            </div>
            <div className={styles.results}>
                {loading ? (
                    <p className={styles.message}>Loading...</p>
                ) : searchResults.length > 0 ? (
                    <ul className={styles.list}>
                        {searchResults.map((game) => (
                            <li key={game.id} className={styles.listItem}>
                                <div className={styles.cardContent}>
                                    {game.image && (
                                        <div className={styles.imageMask}>
                                            <img src={game.image} alt={game.name} className={styles.gameImage} />
                                        </div>
                                    )}
                                    <div className={styles.gameDetails}>
                                        <h3 className={styles.gameName}>{game.name}</h3>
                                        <p className={styles.gameInfo}>Players: {game.players}</p>
                                        <p className={styles.gameInfo}>Playtime: {game.estimatedTime}</p>
                                        <div className={styles.buttonGroup}>
                                            <button className="edit-button" onClick={() => handleAddSession(game)}>
                                                <i className="fas fa-plus-square"></i> Add Session
                                            </button>
                                            <button className="edit-button" onClick={() => handleAddToCollection(game)}>
                                                <i className="fas fa-plus-square"></i> Add to Collection
                                            </button>
                                            <BookmarkButtons gameId={game.id} bookmarks={bookmarks} setBookmarks={setBookmarks} />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : searchTerm.trim() === '' ? (
                    <p className={styles.message}>Enter a search term to find games</p>
                ) : !showAddGameForm ? (
                    <div className={styles.message}>
                        <p>No games found for "{searchTerm}"</p>
                        <button onClick={() => setShowAddGameForm(true)}>Add Game to Database</button>
                    </div>
                ) : null}

                {showAddGameForm && (
                    <div className={styles.addFormWrapper}>
                        <AddBoardGameForm
                            autofillGameName={searchTerm}
                            onSuccess={async () => {
                                setShowAddGameForm(false);
                                setLoading(true);
                                const updatedResults = await fetchBoardGames(searchTerm, activeFilter);
                                setSearchResults(updatedResults);
                                setLoading(false);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoardGameSearch;