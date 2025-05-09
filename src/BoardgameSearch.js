import React, { useState, useEffect } from 'react';
import { fetchBoardGames } from './mockAPI';
import styles from './styles/BoardGameSearch.module.css';
import BookmarkButtons from './BookmarkButtons';
import GameSessionForm from './GameSessionForm';
import AddCollectionForm from './AddCollectionForm';
import SlidePanel from './SlidePanel';
import { Link, useNavigate } from 'react-router-dom';

const BoardGameSearch = ({ bookmarks, setBookmarks, playHistory, setPlayHistory, setCollection }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState('');
    const [showSessionForm, setShowSessionForm] = useState(false);
    const [showCollectionForm, setShowCollectionForm] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async (term = searchTerm, filter = activeFilter) => {
        setLoading(true);
        try {
            let filteredGames = await fetchBoardGames(term, filter);

            if (!Array.isArray(filteredGames)) {
                filteredGames = [];
            }
            if(!filter){
                filteredGames = filteredGames.sort((a, b) => a.name.localeCompare(b.name));
            }
            
            setSearchResults(filteredGames);
        } catch (error) {
            console.error('Error searching boardgames: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    const handleFilterClick = (filter) => {
        setActiveFilter((prevFilter) => (prevFilter === filter ? '' : filter));
        handleSearch(searchTerm, activeFilter === filter ? '' : filter);
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
                {['mostOwned', 'mostTimePlayed', 'byPrice', 'mostWanted'].map((filter) => (
                    <button
                        key={filter}
                        className={`${styles.filterButton} ${activeFilter === filter ? styles.active : ''}`}
                        onClick={() => handleFilterClick(filter)}
                    >
                        {filter === 'mostOwned' && 'Most Owned'}
                        {filter === 'mostTimePlayed' && 'Most Time Played'}
                        {filter === 'byPrice' && 'Most Expensive'}
                        {filter === 'mostWanted' && 'Most Wanted'}
                    </button>
                ))}
            </div>
            <div className={styles.results}>
                {loading ? (
                    <p className={styles.message}>Loading...</p>
                ) : searchResults.length > 0 ? (
                    <ul className={`${styles.list} ${styles.leftAlignedList}`}>
                        {searchResults.map((game) => (
                            <li key={game.id} className={`${styles.listItem} ${styles.leftCard}`}>
                                <div className={styles.cardContent}>
                                    {game.image && (
                                        <div className={styles.imageMask}>
                                            <img src={game.image} alt={game.name} className={styles.gameImage} />
                                        </div>
                                    )}
                                    <div className={`${styles.gameDetails} ${styles.leftDetails}`}>
                                        <h3 className={styles.gameName}>
                                            <Link
                                                to={`/game/${encodeURIComponent(game.name)}`}
                                                style={{ textDecoration: 'none', color: '#0082BC' }}
                                            >
                                                {game.name}
                                            </Link>
                                        </h3>
                                        <p className={styles.gameInfo}><strong>Players:</strong> {game.players || "N/A"}</p>
                                        <p className={styles.gameInfo}><strong>Playtime:</strong> {game.estimatedTime || "N/A"}</p>
                                        <p className={styles.gameInfo}><strong>Amount Owned:</strong> {game.ownershipCount || 0}</p>
                                        <p className={styles.gameInfo}><strong>Total Time Played:</strong> {game.totalTimePlayed || 0} minutes</p>
                                        <p className={styles.gameInfo}><strong>Cost:</strong> ${game.price || "N/A"}</p>
                                        <p className={styles.gameInfo}><strong>Amount Wanted:</strong> {game.wantsCount || 0}</p>
                                        <div className={styles.buttonGroup}>
                                            <button
                                                className="edit-button"
                                                onClick={() => { setSelectedGame(game); setShowSessionForm(true); }}
                                            >
                                                <i className="fas fa-plus-square"></i> Add Session
                                            </button>
                                            <button
                                                className="edit-button"
                                                onClick={() => { setSelectedGame(game); setShowCollectionForm(true); }}
                                            >
                                                <i className="fas fa-plus-square"></i> Add to Collection
                                            </button>
                                            <button
                                                className="edit-button"
                                                onClick={() => navigate(`/stats/${game.id}`, {
                                                    state: {
                                                        gameName: game.name,
                                                        playHistory: playHistory.filter((entry) => entry.gameId === game.id),
                                                        item: game,
                                                    },
                                                })}
                                            >
                                                <i className="fas fa-chart-simple"></i> Game Stats
                                            </button>
                                            <BookmarkButtons
                                                gameId={game.id}
                                                bookmarks={bookmarks}
                                                setBookmarks={setBookmarks}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.message}>No games found</p>
                )}
            </div>

            {/* Slide Panel for Add Session */}
            <SlidePanel
                show={showSessionForm}
                onClose={() => setShowSessionForm(false)}
                heading="Add Game Session"
            >
                {selectedGame && (
                    <GameSessionForm
                        onAdd={(sessionData) => {
                            setPlayHistory((prev) => [...prev, { ...sessionData, ...selectedGame }]);
                            setShowSessionForm(false);
                        }}
                        onCancelEdit={() => setShowSessionForm(false)}
                        autofillGameName={selectedGame.name}
                    />
                )}
            </SlidePanel>

            {/* Slide Panel for Add to Collection */}
            <SlidePanel
                show={showCollectionForm}
                onClose={() => setShowCollectionForm(false)}
                heading="Add to Collection"
            >
                {selectedGame && (
                    <AddCollectionForm
                        onAdd={(collectionData) => {
                            setCollection((prev) => [...prev, { ...collectionData, ...selectedGame }]);
                            setShowCollectionForm(false);
                        }}
                        onCancelEdit={() => setShowCollectionForm(false)}
                        autofillGameName={selectedGame.name}
                        autofillNumPlayers={selectedGame.players}
                        autofillEstimatedTime={selectedGame.estimatedTime}
                    />
                )}
            </SlidePanel>
        </div>
    );
};

export default BoardGameSearch;