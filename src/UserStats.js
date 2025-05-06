import React, { useState, useEffect } from "react";
import ResultDonutChart, { GamesPerMonthChart, ScoreOverTimeChart }  from './StatsCharts';
import { fetchUserInfo } from './mockAPI';
import styles from './styles/SharedStyles.module.css';

const UserStats = ({ playHistory, userId }) => {
    const [activeTab, setActiveTab] = useState("results");
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUserInfo(userId)
            .then(setUser)
            .catch(err => console.error(err));
    }, [userId]);

    if (!user || !playHistory || playHistory.length === 0) {
        return <p>Loading stats...</p>;
    }

    const totalGames = playHistory.length;

    const resultCounts = {
        win: 0,
        loss: 0,
        draw: 0,
        dnf: 0,
        na: 0
    };

    let totalScore = 0;
    const gameFrequency = {};

    playHistory.forEach(session => {
        const gameName = session.name || "Unknown";
        gameFrequency[gameName] = (gameFrequency[gameName] || 0) + 1;

        const result = (session.result || "").toLowerCase();
        if (resultCounts.hasOwnProperty(result)) {
            resultCounts[result]++;
        } else {
            resultCounts.na++;
        }
    
        if (typeof session.score === "number") {
            totalScore += session.score;
        }
    
    });

    const averageScore = totalGames > 0 ? totalScore / totalGames : 0;
  
    const mostPlayedGameName = Object.keys(gameFrequency).reduce((mostPlayed, name) =>
        gameFrequency[name] > (gameFrequency[mostPlayed] || 0) ? name : mostPlayed,
        Object.keys(gameFrequency)[0]
    );

    const mostPlayedGame = mostPlayedGameName || "Unknown";
      
    const totalDifferentGamesPlayed = Object.keys(gameFrequency).length;      
      
    return (
        <div className={styles.container}>
            <div className="section-header">
            <h3 className="section-title">{user.username}'s Stats</h3>
            </div>
            <ul className={`${styles.list} ${styles.leftAlignedList}`}>
                <li className={`${styles.listItem} ${styles.leftCard}`}>
                    <div className={styles.cardContent}>
                    <div className={styles.avatarMask}>
                        <img src={user.image} alt={`${user.username}'s avatar`} className={styles.userImage}/>
                    </div>
                        <div className={`${styles.gameDetails} ${styles.leftDetails}`}>
                            <p><strong>Total Games Played:</strong> {totalGames}</p>
                            <p><strong>Total Wins:</strong> {resultCounts.win}</p>
                            <p><strong>Total Losses:</strong> {resultCounts.loss}</p>
                            <p><strong>Average Score:</strong> {averageScore.toFixed(2)}</p>
                            <p><strong>Most Played Game:</strong> {mostPlayedGame}</p>
                            <p><strong>Total Different Games Played:</strong> {totalDifferentGamesPlayed}</p>
                        </div>
                        <div className={styles.rightSection}>
                        <div className={styles.tabWrapper}>
                                <button onClick={() => 
                                    setActiveTab("results")} className={`${styles.tabButton} ${activeTab === "results" ? styles.activeTab : ""}`}>Results
                                </button>
                                <button onClick={() =>
                                    setActiveTab("monthly")} className={`${styles.tabButton} ${activeTab === "monthly" ? styles.activeTab : ""}`}>Plays in 2025</button>
                                <button onClick={() => 
                                    setActiveTab("scores")} className={`${styles.tabButton} ${activeTab === "scores" ? styles.activeTab : ""}`}>Score Over Time</button>
                            </div>
                            
                            <div className={styles.centeredChart}>
                            {activeTab === "results" && <ResultDonutChart sessions={playHistory} />}
                            {activeTab === "monthly" && <GamesPerMonthChart sessions={playHistory} />}
                            {activeTab === "scores" && <ScoreOverTimeChart sessions={playHistory} />}
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default UserStats;