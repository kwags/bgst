import React, { useState } from "react";
import { addBoardGame } from "./mockAPI";

function AddBoardGameForm() {
    const [name, setName] = useState('');
    const [players, setPlayers] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');

    const handleAdd = async () => {
        if (!name || !players ||!estimatedTime) {
            alert("Please fill in all fields!");
            return;
        }

        const newGame = { name, players, estimatedTime };
        await addBoardGame (newGame);
        alert(`Added "${name}" to the database!`);
        setName('');
        setPlayers('');
        setEstimatedTime('');
    };

    return (
        <div>
            <h3>Add a New Board Game to the the Database</h3>
            <label>Name:</label><br />
            <input value={name} onChange={e => setName(e.target.value)} /><br />

            <label>Players:</label><br />
            <input value={players} onChange={e => setPlayers(e.target.value)} /><br />

            <label>Estimated Time:</label><br />
            <input value={estimatedTime} onChange={e => setEstimatedTime(e.target.value)} /><br />

            <button onClick={handleAdd}>Add Game</button>
        </div>
    );
}

export default AddBoardGameForm