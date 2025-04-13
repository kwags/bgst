import React, { useEffect, useState } from "react";
import { fetchUserStats } from "./mockAPI";

const UserStats = ({ userId }) => {
    const [stats, setStats] = useState(null); 

    useEffect(() => {
        fetchUserStats(userId).then(setStats);
    }, [userId]);

    if (!stats) {
        return <p>Loading stats...</p>;
    }

    return (
        <div>
            <h2>User Stats</h2>
            <p>Total Games Played: {stats.totalGames}</p>
            <p>Total Wins: {stats.totalWins}</p>
            <p>Total Losses: {stats.totalLosses}</p>
            <p>Average Score: {stats.averageScore.toFixed(2)}</p>
            <p>Most Played Game: {stats.mostPlayedGame}</p>
            <p>Total Different Games Played: {stats.totalDifferentGamesPlayed}</p>
        </div>
    );
};

export default UserStats;