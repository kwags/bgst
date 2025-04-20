
import React, {useState} from 'react';
import { fetchBoardGames } from './mockAPI';
import GameSessionForm from './GameSessionForm';
import AddCollectionForm from './AddCollectionForm';
import styles from './styles/BoardGameSearch.module.css';
import slideStyles from './styles/SlidePanel.module.css';
import AddBoardGameForm from './AddBoardGameForm';

const BoardGameSearch = () => {

    //State variables and their setter functions
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [showSessionForm, setShowSessionForm] = useState(false);
    const [showCollectionForm, setShowCollectionForm] = useState(false);
    const [showAddGameForm, setShowAddGameForm] = useState(false);

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

    return (
        // The classNames allow for specific css that wont affect other components
        <div className={styles.container}>
            <input type='text' placeholder='Search boardgames...' value={searchTerm} onChange={searchForGame} />
            <div className={styles.results}>
                {loading ? (
                    <p className={styles.message}>Loading...</p>
                ) : searchResults.length > 0 ? (
                    <ul className={styles.list}>
                        {searchResults.map(game => (
                            <li key={game.id} className={styles.listItem}>
                                <h3 className={styles.gameName}>{game.name}</h3>
                                <p className={styles.gameInfo}>Players: {game.players}</p>
                                <p className={styles.gameInfo}>Playtime: {game.estimatedTime}</p>
                                <button onClick={() => handleAddSession(game)}>Add Session</button>
                                <button onClick={() => handleAddToCollection(game)}>Add to Collection</button>
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

                {/* Add Session Slide Panel */}
                <div className={`${slideStyles.backdrop} ${showSessionForm ? slideStyles.show : ''}`} 
                        onClick={() => setShowSessionForm(false)} />
                <div className={`${slideStyles["slide-panel"]} ${showSessionForm ? slideStyles.show : ''}`}>
                    <div className={slideStyles["slide-panel-inner"]}>
                        <button className={slideStyles["close-button"]} onClick={() => setShowSessionForm(false)}>×</button>
                        {selectedGame && (
                        <GameSessionForm
                            onAdd={() => setShowSessionForm(false)}
                            onCancelEdit={() => setShowSessionForm(false)}
                            autofillGameName={selectedGame.name}/>)}
                    </div>
                </div>

                {/* Add to Collection Slide Panel */}
                <div className={`${slideStyles.backdrop} ${showCollectionForm ? slideStyles.show : ''}`} 
                    onClick={() => setShowCollectionForm(false)} />
                <div className={`${slideStyles["slide-panel"]} ${showCollectionForm ? slideStyles.show : ''}`}>
                    <div className={slideStyles["slide-panel-inner"]}>
                        <button className={slideStyles["close-button"]} onClick={() => setShowCollectionForm(false)}>×</button>
                        {selectedGame && (
                        <AddCollectionForm
                        onAdd={() => setShowCollectionForm(false)}
                        onCancelEdit={() => setShowCollectionForm(false)}
                        autofillGameName={selectedGame.name}
                        autofillNumPlayers={selectedGame.players}
                        autofillEstimatedTime={selectedGame.estimatedTime}/>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoardGameSearch;