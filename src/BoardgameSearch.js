import React, { useState } from 'react';
import { fetchBoardGames, getGamesByMostOwned, getGamesByMostTimePlayed, getGamesByPrice, getGamesByMostWanted } from './mockAPI';
import BookmarkButtons from './BookmarkButtons';
import styles from './styles/BoardGameSearch.module.css';

const BoardGameSearch = ({ bookmarks, setBookmarks, setPlayHistory, setCollection }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [browseResults, setBrowseResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortType, setSortType] = useState('');
    const [showFilters, setShowFilters] = useState(false); // State to control filter visibility

    const searchForGame = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() === '') {
            setSearchResults([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const filteredGames = await fetchBoardGames(term);
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
        setBrowseResults([]);
        setShowFilters(false); // Hide filters when clearing search
    };

    const handleBrowse = (type) => {
        setSortType(type);
        setShowFilters(true); // Show filters when browsing games
        switch (type) {
            case 'mostOwned':
                setBrowseResults(getGamesByMostOwned());
                break;
            case 'mostTimePlayed':
                setBrowseResults(getGamesByMostTimePlayed());
                break;
            case 'byPrice':
                setBrowseResults(getGamesByPrice());
                break;
            case 'mostWanted':
                setBrowseResults(getGamesByMostWanted());
                break;
            default:
                setBrowseResults([]);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchWrapper}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search boardgames..."
                    value={searchTerm}
                    onChange={searchForGame}
                />
                <button
                    className={styles.searchButton}
                    onClick={searchResults.length > 0 || searchTerm.trim() !== '' ? handleClearSearch : null}
                >
                    <i className={`fas ${searchResults.length > 0 || searchTerm.trim() !== '' ? 'fa-times' : 'fa-search'}`}></i>
                </button>
                <button className={styles.browseButton} onClick={() => handleBrowse('mostOwned')}>
                    Browse Games
                </button>
            </div>
            {showFilters && ( // Only show filters if "Browse Games" is clicked
                <div className={styles.sortOptions}>
                    <button onClick={() => handleBrowse('mostOwned')}>Most Owned</button>
                    <button onClick={() => handleBrowse('mostTimePlayed')}>Most Time Played</button>
                    <button onClick={() => handleBrowse('byPrice')}>By Price</button>
                    <button onClick={() => handleBrowse('mostWanted')}>Most Wanted</button>
                </div>
            )}
            <div className={styles.results}>
                {loading ? (
                    <p className={styles.message}>Loading...</p>
                ) : browseResults.length > 0 ? (
                    <ul className={styles.list}>
                        {browseResults.map((game) => (
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
                                            <button className="edit-button">
                                                <i className="fas fa-plus-square"></i> Add Session
                                            </button>
                                            <button className="edit-button">
                                                <i className="fas fa-plus-square"></i> Add to Collection
                                            </button>
                                            <BookmarkButtons gameId={game.id} bookmarks={bookmarks} setBookmarks={setBookmarks} />
                                        </div>
                                        {sortType === 'mostOwned' && <p>Owned by: {game.count} users</p>}
                                        {sortType === 'mostTimePlayed' && <p>Time Played: {game.time} minutes</p>}
                                        {sortType === 'byPrice' && <p>Price: ${game.price.toFixed(2)}</p>}
                                        {sortType === 'mostWanted' && <p>Wanted by: {game.wants} users</p>}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
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
                                            <button className="edit-button">
                                                <i className="fas fa-plus-square"></i> Add Session
                                            </button>
                                            <button className="edit-button">
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
                ) : (
                    <p className={styles.message}>No games found for "{searchTerm}"</p>
                )}
            </div>
        </div>
    );
};

export default BoardGameSearch;