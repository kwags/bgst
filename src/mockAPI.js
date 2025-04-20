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
    { id: 14, name: "Mysterium", players: "2-7", estimatedTime: "42-60 min" },
  ],

  users: [
    { id: 1, username: "user1", password: "password1" },
    { id: 2, username: "user2", password: "password2" },
    { id: 3, username: "user3", password: "password3" },
    { id: 4, username: "user4", password: "password4" },
    { id: 5, username: "user5", password: "password5" },
  ],

  gameSessions: [
    { id: 1, userId: 1, gameId: 1, date: "2025-03-01", numPlayers: 4, score: 10, result: "Win", time: 120, comments: "" },
    { id: 2, userId: 1, gameId: 2, date: "2025-03-02", numPlayers: 3, score: 5, result: "Loss", time: 60, comments: "" },
    { id: 3, userId: 1, gameId: 3, date: "2025-03-03", numPlayers: 2, score: 8, result: "Win", time: 90, comments: "" },
    { id: 4, userId: 2, gameId: 4, date: "2025-03-04", numPlayers: 4, score: 12, result: "Loss", time: 45, comments: "" },
    { id: 5, userId: 2, gameId: 5, date: "2025-03-05", numPlayers: 3, score: 15, result: "Win", time: 30, comments: "" },
    { id: 6, userId: 1, gameId: 14, date: "2025-03-08", numPlayers: 4, score: 4, result: "Win", time: 120, comments: "First time playing this game" },
    { id: 7, userId: 1, gameId: 3, date: "2025-03-13", numPlayers: 3, score: 105, result: "Loss", time: 180, comments: "This was really fun!" },
    { id: 8, userId: 1, gameId: 1, date: "2025-03-27", numPlayers: 3, score: 10, result: "Win", time: 180, comments: "Always a fun game" },
  ],

  collection: [
    { id: 1, userId: 1, gameId: 1, purchaseDate: '2025-03-01', purchasePrice: '25.99' },
    { id: 2, userId: 1, gameId: 2, purchaseDate: '2025-03-15', purchasePrice: '29.99' },
    { id: 3, userId: 1, gameId: 3, purchaseDate: '2025-03-20', purchasePrice: '40.99' },
    { id: 4, userId: 2, gameId: 4, purchaseDate: '2025-04-01', purchasePrice: '19.99' },
    { id: 5, userId: 2, gameId: 5, purchaseDate: '2025-04-02', purchasePrice: '31.99' },
    { id: 6, userId: 1, gameId: 6, purchaseDate: '2025-04-05', purchasePrice: '59.99' },
  ],

  bookmarks: [
    { id: 1, userId: 1, gameId: 1, wantToOwn: false, wantToPlay: true },
    { id: 2, userId: 1, gameId: 2, wantToOwn: true, wantToPlay: false },
    { id: 3, userId: 2, gameId: 3, wantToOwn: true, wantToPlay: true },
    { id: 4, userId: 3, gameId: 5, wantToOwn: false, wantToPlay: true },
    { id: 5, userId: 1, gameId: 6, wantToOwn: true, wantToPlay: true },
    { id: 6, userId: 4, gameId: 9, wantToOwn: true, wantToPlay: false }
  ],

  // Should be able to be removed, combined with gameSessions
  // playHistory: [
  //     { id: 1, 
  //     name: "Mysterium",
  //     date: "2025-03-08",
  //     numPlayers: 4,
  //     score: 4,
  //     result: "Win",
  //     time: 120,
  //     comments: "First time playing this game",
  //     },
  //     { id: 2,
  //     name: "Carcassonne",
  //     date: "2025-03-13",
  //     numPlayers: 3,
  //     score: 105,
  //     result: "Loss",
  //     time: 180,
  //     comments: "This was really fun!",
  //     },
  //     { id: 3,
  //     name: "Catan",
  //     date: "2025-03-27",
  //     numPlayers: 3,
  //     score: 10,
  //     result: "Win",
  //     time: 180,
  //     comments: "Always a fun game",
  //     }
  // ],

  // collection: [
  //   { id: 1, 
  //     name: "Catan", 
  //     players: "2-4", 
  //     estimatedTime: "60-120", 
  //     purchaseDate: "2025-03-01",
  //     purchasePrice: "25.99", 
  //     },

  //     { id: 2, 
  //     name: "Ticket to Ride", 
  //     players: "2-5", 
  //     estimatedTime: "30-60",
  //     purchaseDate: "2025-03-15",
  //     purchasePrice: "29.99", 
  //     },
  //     { id: 3,
  //     name: "Carcassonne", 
  //     players: "2-5", 
  //     estimatedTime: "30-45", 
  //     purchaseDate: "2025-03-20",
  //     purchasePrice: "40.99"
  //     },
  //     { id: 4, 
  //     name: "Pandemic", 
  //     players: "2-4", 
  //     estimatedTime: "45-60",
  //     purchaseDate: "2025-04-01",
  //     purchasePrice: "19.99"
  //     },
  //     { id: 5, 
  //     name: "Azul", 
  //     players: "2-4", 
  //     estimatedTime: "30-45",
  //     purchaseDate: "2025-04-02",
  //     purchasePrice: "31.99"
  //     },
  //     { id: 6, 
  //     name: "7 Wonders", 
  //     players: "2-7", 
  //     estimatedTime: "30",
  //     purchaseDate: "2025-04-05",
  //     purchasePrice: "59.99" },
  //   ]
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

// Simulate fetching play history (all sessions)
export const fetchPlayHistory = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const history = mockData.gameSessions.map(session => ({
        id: session.id,
        gameId: session.gameId,
        username: mockData.users.find(user => user.id === session.userId)?.username || "Unknown",
        name: mockData.boardgames.find(game => game.id === session.gameId)?.name || "Unknown",
        date: session.date,
        numPlayers: session.numPlayers,
        score: session.score,
        result: session.result,
        time: session.time,
        comments: session.comments,
      }));
      resolve(history);
    }, 500);
  });
};

// Simulate fetching user-specific play history
export const fetchUserPlayHistory = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const history = mockData.gameSessions
        .filter(session => session.userId === userId)
        .map(session => ({
          id: session.id,
          username: mockData.users.find(user => user.id === session.userId)?.username || "Unknown",
          name: mockData.boardgames.find(game => game.id === session.gameId)?.name || "Unknown",
          date: session.date,
          numPlayers: session.numPlayers,
          score: session.score,
          result: session.result,
          time: session.time,
          comments: session.comments,
        }));
      resolve(history);
    }, 500);
  });
};

// Simulate saving a game session (play history) and can update an existing session
// Takes gameSession object required fields: userId, gameName, date, numPlayers, score, result, time, comments
export const saveGameSession = async (gameSession) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!gameSession.userId || !gameSession.name) {
        reject(new Error("User ID and Game name are required."));
        return;
      }
      const game = mockData.boardgames.find(g => g.name.toLowerCase() === gameSession.name.toLowerCase());
      if (!game) {
        reject(new Error(`Game "${gameSession.name}" not found.`));
        return;
      }
      const user = mockData.users.find(u => u.id === gameSession.userId);
      if (!user) {
        reject(new Error(`User ID "${gameSession.userId}" not found`));
        return;
      }
      const newSession = {
        id: gameSession.id || uuidv4(),
        userId: gameSession.userId,
        gameId: game.id,
        date: gameSession.date || new Date().toISOString().split('T')[0],
        numPlayers: parseInt(gameSession.numPlayers) || 1,
        score: parseInt(gameSession.score) || 0,
        result: gameSession.result || '',
        time: parseInt(gameSession.time) || 0,
        comments: gameSession.comments || '',
      };
      const existingIndex = mockData.gameSessions.findIndex(s => s.id === newSession.id);
      if (existingIndex !== -1) {
        mockData.gameSessions[existingIndex] = newSession; // Update existing
      } else {
        mockData.gameSessions.push(newSession); // Add new
      }
      resolve({
        id: newSession.id,
        username: user.username,
        name: game.name,
        date: newSession.date,
        numPlayers: newSession.numPlayers,
        score: newSession.score,
        result: newSession.result,
        time: newSession.time,
        comments: newSession.comments,
      });
    }, 300); // Keep 300ms to match addBoardGame, fetchBoardGameById
  });
};

export const deleteGameSession = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockData.gameSessions.findIndex(session => session.id === id);
      if (index === -1) {
        reject(new Error('Game session not found'));
        return;
      }
      mockData.gameSessions.splice(index, 1);
      resolve();
    }, 300);
  });
};

// Simulate saving a collection item. pass in a collectionItem object with required fields: userId, name (of game), purchaseDate, purchasePrice
export const saveCollectionItem = async (collectionItem) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!collectionItem.userId) {
        reject(new Error('User ID is required'));
        return;
      }
      if (!collectionItem.name) {
        reject(new Error('Game name is required'));
        return;
      }
      const game = mockData.boardgames.find(g => g.name.toLowerCase() === collectionItem.name.toLowerCase());
      if (!game) {
        reject(new Error(`Game "${collectionItem.name}" not found`));
        return;
      }
      const user = mockData.users.find(u => u.id === collectionItem.userId);
      if (!user) {
        reject(new Error(`User ID "${collectionItem.userId}" not found`));
        return;
      }
      const newItem = {
        id: uuidv4(),
        userId: collectionItem.userId,
        gameId: game.Id,
        purchaseDate: collectionItem.purchaseDate || new Date().toISOString().split('T')[0], // Default to today
        purchasePrice: parseFloat(collectionItem.purchasePrice) || 0.00,
      };
      mockData.collection.push(newItem);
      resolve(newItem);
    }, 300);
  });
};


// Simulate fetching all collection items
export const fetchCollection = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const collection = mockData.collection.map(item => {
        const game = mockData.boardgames.find(g => g.id === item.gameId) || {
          name: 'Unknown',
          players: 'Unknown',
          estimatedTime: 'Unknown',
        };
        return {
          id: item.id,
          name: game.name,
          players: game.players,
          estimatedTime: game.estimatedTime,
          purchaseDate: item.purchaseDate,
          purchasePrice: item.purchasePrice,
        };
      });
      resolve(collection);
    }, 500);
  });
};

// Simulate fetching user-specific collection items
export const fetchUserCollection = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const collection = mockData.collection
        .filter(item => item.userId === userId)
        .map(item => {
          const game = mockData.boardgames.find(g => g.id === item.gameId) || {
            name: 'Unknown',
            players: 'Unknown',
            estimatedTime: 'Unknown',
          };
          return {
            id: item.id,
            name: game.name,
            players: game.players,
            estimatedTime: game.estimatedTime,
            purchaseDate: item.purchaseDate,
            purchasePrice: item.purchasePrice,
          };
        });
      resolve(collection);
    }, 500);
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
        ? mockData.boardgames.find(game => game.id === parseInt(mostPlayedGameId))?.name || 'None'
        : 'None';

      stats.totalDifferentGamesPlayed = Object.keys(stats.gameFrequency).length;


      resolve(stats);
    }, 500);
  });
}

// Toggle Want to Own
export const toggleWantToOwn = async (userId, gameId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const bookmark = mockData.bookmarks.find(
        (b) => b.userId === userId && b.gameId === gameId
      );
      if (bookmark) {
        bookmark.wantToOwn = !bookmark.wantToOwn;
        resolve({ ...bookmark });
      } else {
        const newBookmark = { id: uuidv4(), userId, gameId, wantToOwn: true, wantToPlay: false };
        mockData.bookmarks.push(newBookmark);
        resolve(newBookmark);
      }
    }, 300);
  });
};

// Toggle Want to Play
export const toggleWantToPlay = async (userId, gameId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const bookmark = mockData.bookmarks.find(
        (b) => b.userId === userId && b.gameId === gameId
      );
      if (bookmark) {
        bookmark.wantToPlay = !bookmark.wantToPlay;
        resolve({ ...bookmark });
      } else {
        const newBookmark = { id: uuidv4(), userId, gameId, wantToOwn: false, wantToPlay: true };
        mockData.bookmarks.push(newBookmark);
        resolve(newBookmark);
      }
    }, 300);
  });
};

// Fetch bookmarks for a user
export const fetchUserBookmarks = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userBookmarks = mockData.bookmarks.filter(b => b.userId === userId);
      resolve(userBookmarks);
    }, 300);
  });
};

/* DEPRECATED
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
};*/