
import React, {useState} from 'react';
import { fetchBoardGames } from './mockAPI';
import styles from './styles/BoardGameSearch.module.css';

const BoardGameSearch = () => {

    //State variables and their setter functions
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

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
            <h1 className={styles.title}>Boardgame Search Component</h1>
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
}

export default BoardGameSearch;