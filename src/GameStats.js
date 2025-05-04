import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from './styles/SharedStyles.module.css';
import { Link } from 'react-router-dom';
import ResultDonutChart, { GamesPerMonthChart, ScoreOverTimeChart } from './StatsCharts';


const GameStats = () => {
    const location = useLocation();
    const { gameName, playHistory, item } = location.state || {};
    const [activeTab, setActiveTab] = useState("results");

    if (!gameName || !playHistory) {
      return <p>Stats data not available.</p>;
    }
  
    const filteredSessions = playHistory.filter(session => session.name === gameName);
  
    if (filteredSessions.length === 0) {
      return <p>No stats available for {gameName}</p>;
    }
  
    const totalPlays = filteredSessions.length;
    const totalWins = filteredSessions.filter(s => (s.result || "").toLowerCase() === "win").length;
    const totalLosses = filteredSessions.filter(s => (s.result || "").toLowerCase() === "loss").length;
    const averageScore = (
      filteredSessions.reduce((sum, session) => sum + (session.score || 0), 0) / totalPlays
    ).toFixed(2);
  
    return (
      <div className={styles.container}>
        <ul className={`${styles.list} ${styles.leftAlignedList}`}>
            <li key={item.id} className={`${styles.listItem} ${styles.leftCard}`}>
              <div className={styles.cardContent}>
                  {item.image && (
                    <div className={styles.imageMask}>
                       <img src={item.image} alt={item.name} className={styles.gameImage} />
                    </div>
                  )}
                    <div className={`${styles.gameDetails} ${styles.leftDetails}`}>
                      <h3 className={styles.gameName}>
                          <Link to={`/game/${encodeURIComponent(item.name)}`} style={{ textDecoration: 'none', color: '#0082BC' }}>
                              {item.name}
                          </Link>
                      </h3>
                      <p className={styles.gameInfo}><strong>Total Plays: </strong>{totalPlays}</p>
                      <p className={styles.gameInfo}><strong>Total Wins: </strong>{totalWins}</p>
                      <p className={styles.gameInfo}><strong>Total Losses: </strong>{totalLosses}</p>
                      <p className={styles.gameInfo}><strong>Average Score: </strong>{averageScore}</p>
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
                          {activeTab === "results" && <ResultDonutChart sessions={filteredSessions} />}
                          {activeTab === "monthly" && <GamesPerMonthChart sessions={filteredSessions} />}
                          {activeTab === "scores" && <ScoreOverTimeChart sessions={filteredSessions} />}
                        </div>
                  </div>
              </div>
            </li>
        </ul>
      </div>
    );
  };
  
  export default GameStats;