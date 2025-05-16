
import React, { useState } from 'react';
import { fetchBoardGames } from './mockAPI';
import GameSessionForm from './GameSessionForm';
import AddCollectionForm from './AddCollectionForm';
import styles from './styles/BoardGameSearch.module.css';
import AddBoardGameForm from './AddBoardGameForm';
import BookmarkButtons from './BookmarkButtons';
import SlidePanel from './SlidePanel';
import { enrichWithBoardGameData } from './mockAPI';
import { useNavigate } from 'react-router-dom';

const BoardGameSearch = ({ playHistory, handleSearch, bookmarks, setBookmarks, setPlayHistory, setCollection }) => {

    //State variables and their setter functions
    const [selectedGame, setSelectedGame] = useState(null);
    const [showSessionForm, setShowSessionForm] = useState(false);
    const [showCollectionForm, setShowCollectionForm] = useState(false);
    const [showAddGameForm, setShowAddGameForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

    const handleAddSession = (game) => {
        setSelectedGame(game);
        setShowSessionForm(true);
        
    };
    
    const handleAddToCollection = (game) => {
        setSelectedGame(game);
        setShowCollectionForm(true);
    };


    //Called by an event (onChange) and calls a mock API in mockAPI.js, passing it the searchTerm
    const searchForGame = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() === ''){
            setSearchResults([]); //Clear results if search term is empty
            setLoading(false);
            return;
        }

        setLoading(true);
        //Call to API with fetchBoardGames, loosely represents calling an API endpoint and can be swapped out later
        try{
            const filteredGames = await fetchBoardGames(term);
            setSearchResults(filteredGames);
        } catch (error){
            console.error('Error searching boardgames: ', error);
        } finally {
            setLoading(false);
        }
    }

    const handleClearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
        setShowAddGameForm(false);
    };

    return (
        // The classNames allow for specific css that wont affect other components
        <div >
            <div className={styles.searchWrapper}>
                <input type='text' className={styles.searchInput} placeholder='Search boardgames...' value={searchTerm} onChange={searchForGame} />
                <button className={styles.searchButton}
                    onClick={searchResults.length > 0 || searchTerm.trim() !== '' ? handleClearSearch : null}>
                    <i className={`fas ${searchResults.length > 0 || searchTerm.trim() !== '' ? 'fa-times' : 'fa-search'}`}></i>
                </button>
            </div>
            <div className={styles.results}>
                {loading ? (
                    <p className={styles.message}>Loading...</p>
                ) : searchResults.length > 0 ? (
                    <ul className={styles.list}>
                        {searchResults.map(game => (
                            <li key={game.id} className={styles.listItem}>
                                <div className={styles.cardContent}>
                                    {game.image && (
                                        <div className={styles.imageMask}>
                                            <img src={game.image} alt={game.name} className={styles.gameImage} />
                                        </div>
                                    )}
                                    <div className={styles.gameDetails}>
                                        <h3 className={styles.gameName}>{game.name}</h3>
                                        <p className={styles.gameInfo}><strong>Players:</strong>{game.players}</p>
                                        <p className={styles.gameInfo}><strong>Playtime:</strong> {game.estimatedTime}</p>
                                        <div className={styles.buttonGroup}>
                                        <button className="edit-button" onClick={() => handleAddSession(game)}>
                                            <i className="fas fa-plus-square"></i> Add Session
                                        </button>
                                        <button className="edit-button" onClick={() => handleAddToCollection(game)}>
                                            <i className="fas fa-plus-square"></i> Add to Collection
                                        </button>
                                        <button  className="edit-button" onClick={() => navigate(`/stats/${game.id}`, 
                                            { state: { gameName: game.name, playHistory: playHistory.filter((entry) => entry.gameId === game.id), item: game },
                                            })}>
                                            <i className="fas fa-chart-simple"></i>Game Stats
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

                        <AddBoardGameForm autofillGameName={searchTerm} onSuccess={async () => { 
                            setShowAddGameForm(false);
                            setLoading(true);
                            const updatedResults = await fetchBoardGames(searchTerm);
                            setSearchResults(updatedResults);
                            setLoading(false);}}/>

                    </div>
                )}


                {/* SlidePanel for Add Session */}
                <SlidePanel
                    show={showSessionForm}
                    onClose={() => setShowSessionForm(false)}
                    heading="Add Game Session">
                    <GameSessionForm
                        onAdd={async (sessionData) => {
                            const enrichedSession = await enrichWithBoardGameData(sessionData.name, sessionData);
                            setPlayHistory(prev => [...prev, enrichedSession]);
                            setShowSessionForm(false);
                        }}
                        onCancelEdit={() => setShowSessionForm(false)}
                        autofillGameName={selectedGame?.name}/>
                </SlidePanel>

                {/* SlidePanel for Add to Collection */}
                <SlidePanel
                    show={showCollectionForm}
                    onClose={() => setShowCollectionForm(false)}
                    heading="Add to Collection"
                    >
                    <AddCollectionForm
                        onAdd={async (collectionData) => {
                            const enrichedCollection = await enrichWithBoardGameData(collectionData.name, collectionData);
                            setCollection((prev) => [...prev, enrichedCollection]);
                            setShowCollectionForm(false);
                        }}
                        onCancelEdit={() => setShowCollectionForm(false)}
                        autofillGameName={selectedGame?.name}
                        autofillNumPlayers={selectedGame?.players}
                        autofillEstimatedTime={selectedGame?.estimatedTime}
                    />
                </SlidePanel>
            </div>
        </div>
    );
}

export default BoardGameSearch;