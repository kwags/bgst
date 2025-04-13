// src/mockData.js

import { v4 as uuidv4 } from 'uuid'; // for creating unique id's

export const mockData = {
    boardgames: [
        { id: 1, name: "Catan", players: "2-4", estimatedTime: "60-120 min" },
        { id: 2, name: "Ticket to Ride", players: "2-5", estimatedTime: "30-60 min" },
        { id: 3, name: "Carcassonne", players: "2-5", estimatedTime: "30-45 min" },
        { id: 4, name: "Pandemic", players: "2-4", estimatedTime: "45-60 min" },
        { id: 5, name: "Azul", players: "2-4", estimatedTime: "30-45 min" },
        { id: 6, name: "7 Wonders", players: "2-7", estimatedTime: "30 min" },
        { id: 7, name: "Dominion", players: "2-4", estimatedTime: "30 min" },
        { id: 8, name: "Wingspan", players: "1-5", estimatedTime: "40-70 min" },
        { id: 9, name: "Scythe", players: "1-5", estimatedTime: "90-115 min" },
        { id: 10, name: "Gloomhaven", players: "1-4", estimatedTime: "60-120 min" },
        { id: 11, name: "Splendor", players: "2-4", estimatedTime: "30 min" },
        { id: 12, name: "Betrayal at House on the Hill", players: "3-6", estimatedTime: "60 min" },
        { id: 13, name: "Terraforming Mars", players: "1-5", estimatedTime: "120 min" },
      ],

    users: [
        { id: 1, username: "user1", password: "password1" },
        { id: 2, username: "user2", password: "password2" },
        { id: 3, username: "user3", password: "password3" },
        { id: 4, username: "user4", password: "password4" },
        { id: 5, username: "user5", password: "password5" },
      ],
    
    gameSessions: [
      {id: 1, userId: 1, gameId: 1, date: "2025-03-01", numPlayers: 4, score: 10, result: "Win", time: 120},
      {id: 2, userId: 1, gameId: 2, date: "2025-03-02", numPlayers: 3, score: 5, result: "Loss", time: 60},
      {id: 3, userId: 1, gameId: 3, date: "2025-03-03", numPlayers: 2, score: 8, result: "Win", time: 90},
      {id: 4, userId: 2, gameId: 4, date: "2025-03-04", numPlayers: 4, score: 12, result: "Loss", time: 45},
      {id: 5, userId: 2, gameId: 5, date: "2025-03-05", numPlayers: 3, score: 15, result: "Win", time: 30},
    ],

    playHistory: [
        { id: 1, 
        name: "Mysterium",
        date: "2025-03-08",
        numPlayers: 4,
        score: 4,
        result: "Win",
        time: 120,
        comments: "First time playing this game",
        },
        { id: 2,
        name: "Carcassonne",
        date: "2025-03-13",
        numPlayers: 3,
        score: 105,
        result: "Loss",
        time: 180,
        comments: "This was really fun!",
        },
        { id: 3,
        name: "Catan",
        date: "2025-03-27",
        numPlayers: 3,
        score: 10,
        result: "Win",
        time: 180,
        comments: "Always a fun game",
        }
    ],
    
    collection: [
      { id: 1, 
        name: "Catan", 
        players: "2-4", 
        estimatedTime: "60-120", 
        purchaseDate: "2025-03-01",
        purchasePrice: "25.99", 
        },
        
        { id: 2, 
        name: "Ticket to Ride", 
        players: "2-5", 
        estimatedTime: "30-60",
        purchaseDate: "2025-03-15",
        purchasePrice: "29.99", 
        },
        { id: 3,
        name: "Carcassonne", 
        players: "2-5", 
        estimatedTime: "30-45", 
        purchaseDate: "2025-03-20",
        purchasePrice: "40.99"
        },
        { id: 4, 
        name: "Pandemic", 
        players: "2-4", 
        estimatedTime: "45-60",
        purchaseDate: "2025-04-01",
        purchasePrice: "19.99"
        },
        { id: 5, 
        name: "Azul", 
        players: "2-4", 
        estimatedTime: "30-45",
        purchaseDate: "2025-04-02",
        purchasePrice: "31.99"
        },
        { id: 6, 
        name: "7 Wonders", 
        players: "2-7", 
        estimatedTime: "30",
        purchaseDate: "2025-04-05",
        purchasePrice: "59.99" },
      ]
};


//simulates being an API endpoint
export const fetchBoardGames = async (searchTerm) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const filteredGames = mockData.boardgames.filter(game =>
                game.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            resolve(filteredGames);
        }, 500) // Fake delay in ms to simulate network delay
    })
};

// Simulate fetching game sessions (play history)
export const fetchPlayHistory = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.playHistory); // Return all game session data
      }, 500); // Fake delay in ms to simulate network delay
    });
};

// Simulate adding a new board game to the database
export const addBoardGame = async (newGame) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newGameWithId = { id: uuidv4(), ...newGame }; // Use uuid for ID
        mockData.boardgames.push(newGameWithId);            // Mutate the mock data
        resolve(newGameWithId);                             // Return the new game
      }, 300); // Simulated API delay
    });
};

// Simulate fetching game sessions (play history)
export const fetchCollection = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData.collection); // Return all game session data
    }, 500); // Fake delay in ms to simulate network delay
  });
};

// Simulate getting and calculating user stats
export const fetchUserStats = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userSessions = mockData.gameSessions.filter(session => session.userId === userId);

      // Calculate stats
      const stats = userSessions.reduce(
        (acc, session) => {
          acc.totalGames += 1;
          acc.totalWins += session.result === "Win" ? 1 : 0;
          acc.totalLosses += session.result === "Loss" ? 1 : 0;
          acc.totalScore += session.score;
          acc.gameFrequency[session.gameId] = (acc.gameFrequency[session.gameId] || 0) + 1;
          return acc;
        },
        { totalGames: 0, totalWins: 0, totalLosses: 0, totalScore: 0, gameFrequency: {} }
      );

      stats.averageScore = stats.totalGames > 0 ? stats.totalScore / stats.totalGames : 0;

      const mostPlayedGameId = Object.keys(stats.gameFrequency).reduce((mostPlayed, gameId) => {
        return stats.gameFrequency[gameId] > (stats.gameFrequency[mostPlayed] || 0) ? gameId : mostPlayed;
      }, null);

      stats.mostPlayedGame = mostPlayedGameId
        ? mockData.boardgames.find(game => game.id === parseInt(mostPlayedGameId)).name : "None";

      stats.totalDifferentGamesPlayed = Object.keys(stats.gameFrequency).length;


      resolve(stats);
    }, 500); 
});}


// Simulates fetching a single board game by its ID
export const fetchBoardGameById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const game = mockData.boardgames.find(game => String(game.id) === String(id));
      if (game) {
        resolve(game);
      } else {
        reject(new Error("Game not found"));
      }
    }, 300); // Sim network delay
  });
};