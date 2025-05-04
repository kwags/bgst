// src/mockData.js

import { v4 as uuidv4 } from 'uuid'; // for creating unique id's

export const mockData = {
  boardgames: [
    { id: 1, name: "Catan", players: "2-4", estimatedTime: "60-120 min", image: '/img/catan.jpg' },
    { id: 2, name: "Ticket to Ride", players: "2-5", estimatedTime: "30-60 min", image: '/img/ticket.jpeg' },
    { id: 3, name: "Carcassonne", players: "2-5", estimatedTime: "30-45 min", image: '/img/carcassonne.jpg' },
    { id: 4, name: "Pandemic", players: "2-4", estimatedTime: "45-60 min", image: '/img/pandemic.jpg' },
    { id: 5, name: "Azul", players: "2-4", estimatedTime: "30-45 min", image: '/img/azul.jpg' },
    { id: 6, name: "7 Wonders", players: "2-7", estimatedTime: "30 min", image: '/img/7wonders.jpg' },
    { id: 7, name: "Dominion", players: "2-4", estimatedTime: "30 min", image: '/img/dominion.jpg' },
    { id: 8, name: "Wingspan", players: "1-5", estimatedTime: "40-70 min", image: '/img/wingspan.jpg' },
    { id: 9, name: "Scythe", players: "1-5", estimatedTime: "90-115 min", image: '/img/scythe.png' },
    { id: 10, name: "Gloomhaven", players: "1-4", estimatedTime: "60-120 min", image: '/img/gloomhaven.jpg' },
    { id: 11, name: "Splendor", players: "2-4", estimatedTime: "30 min", image: '/img/splendor.jpg' },
    { id: 12, name: "Betrayal at House on the Hill", players: "3-6", estimatedTime: "60 min", image: '/img/betrayal.png' },
    { id: 13, name: "Terraforming Mars", players: "1-5", estimatedTime: "120 min", image: '/img/terraMars.jpg' },
    { id: 14, name: "Mysterium", players: "2-7", estimatedTime: "42-60 min", image: '/img/mysterium.png' },
  ],


  users: [
    { id: 1, username: "user1", password: "password1" },
    { id: 2, username: "user2", password: "password2" },
    { id: 3, username: "user3", password: "password3" },
    { id: 4, username: "user4", password: "password4" },
    { id: 5, username: "user5", password: "password5" },
    
  ],

  gameSessions: [
    { id: 1, userId: 1, gameId: 1, date: "2025-01-04", numPlayers: 4, score: 10, result: "Win", time: 120, comments: "" },
    { id: 2, userId: 1, gameId: 2, date: "2025-01-02", numPlayers: 3, score: 5, result: "Loss", time: 60, comments: "" },
    { id: 3, userId: 1, gameId: 3, date: "2025-02-03", numPlayers: 2, score: 8, result: "Win", time: 90, comments: "" },
    { id: 4, userId: 2, gameId: 4, date: "2025-03-04", numPlayers: 4, score: 12, result: "Loss", time: 45, comments: "" },
    { id: 5, userId: 2, gameId: 5, date: "2025-02-05", numPlayers: 3, score: 15, result: "Win", time: 30, comments: "" },
    { id: 6, userId: 1, gameId: 14, date: "2025-03-08", numPlayers: 4, score: 4, result: "Win", time: 120, comments: "First time playing this game" },
    { id: 7, userId: 1, gameId: 3, date: "2025-03-13", numPlayers: 3, score: 105, result: "Draw", time: 180, comments: "This was really fun!" },
    { id: 8, userId: 1, gameId: 1, date: "2025-03-27", numPlayers: 3, score: 10, result: "Win", time: 180, comments: "Always a fun game" },
    { id: 9, userId: 1, gameId: 6, date: "2025-04-01", numPlayers: 5, score: 20, result: "Win", time: 150, comments: "Great teamwork!" },
    { id: 10, userId: 1, gameId: 7, date: "2025-04-05", numPlayers: 4, score: 18, result: "Loss", time: 90, comments: "Close game!" },
    { id: 11, userId: 2, gameId: 8, date: "2025-04-10", numPlayers: 3, score: 25, result: "Win", time: 120, comments: "Loved the strategy!" },
    { id: 12, userId: 2, gameId: 9, date: "2025-04-15", numPlayers: 2, score: 30, result: "Loss", time: 180, comments: "Tough opponent." },
    { id: 13, userId: 3, gameId: 10, date: "2025-04-20", numPlayers: 4, score: 50, result: "Win", time: 240, comments: "Epic game!" },
    { id: 14, userId: 3, gameId: 11, date: "2025-02-25", numPlayers: 3, score: 15, result: "Loss", time: 60, comments: "Quick match." },
    { id: 15, userId: 4, gameId: 12, date: "2025-04-30", numPlayers: 6, score: 40, result: "Win", time: 180, comments: "Amazing experience!" },
    { id: 16, userId: 4, gameId: 13, date: "2025-05-01", numPlayers: 5, score: 35, result: "DNF", time: 200, comments: "Challenging game." },
    { id: 17, userId: 1, gameId: 14, date: "2025-05-02", numPlayers: 4, score: 12, result: "Win", time: 90, comments: "Enjoyed this one!" },
    { id: 18, userId: 2, gameId: 1, date: "2025-05-03", numPlayers: 3, score: 8, result: "Loss", time: 60, comments: "Could have done better." },
    { id: 19, userId: 3, gameId: 2, date: "2025-05-04", numPlayers: 2, score: 10, result: "Win", time: 45, comments: "Quick and fun!" },
    { id: 20, userId: 4, gameId: 3, date: "2025-05-05", numPlayers: 4, score: 22, result: "Win", time: 120, comments: "Great strategy!" },
    { id: 21, userId: 1, gameId: 4, date: "2025-05-06", numPlayers: 3, score: 14, result: "Loss", time: 75, comments: "Close match." },
    { id: 22, userId: 2, gameId: 5, date: "2025-05-07", numPlayers: 4, score: 18, result: "Win", time: 100, comments: "Teamwork paid off!" },
    { id: 23, userId: 3, gameId: 6, date: "2025-05-08", numPlayers: 5, score: 25, result: "Draw", time: 150, comments: "Tough competition." },
  ],

  collection: [
    { id: 1, userId: 1, gameId: 1, purchaseDate: '2025-03-01', purchasePrice: '25.99' },
    { id: 2, userId: 1, gameId: 2, purchaseDate: '2025-03-15', purchasePrice: '29.99' },
    { id: 3, userId: 1, gameId: 3, purchaseDate: '2025-03-20', purchasePrice: '40.99' },
    { id: 4, userId: 2, gameId: 4, purchaseDate: '2025-04-01', purchasePrice: '19.99' },
    { id: 5, userId: 2, gameId: 5, purchaseDate: '2025-04-02', purchasePrice: '31.99' },
    { id: 6, userId: 1, gameId: 6, purchaseDate: '2025-04-05', purchasePrice: '59.99' },
    { id: 7, userId: 3, gameId: 7, purchaseDate: '2025-04-10', purchasePrice: '45.00' },
    { id: 8, userId: 3, gameId: 8, purchaseDate: '2025-04-15', purchasePrice: '50.00' },
    { id: 9, userId: 4, gameId: 9, purchaseDate: '2025-04-20', purchasePrice: '70.00' },
    { id: 10, userId: 4, gameId: 10, purchaseDate: '2025-04-25', purchasePrice: '80.00' },
    { id: 11, userId: 5, gameId: 11, purchaseDate: '2025-05-01', purchasePrice: '35.00' },
    { id: 12, userId: 5, gameId: 12, purchaseDate: '2025-05-05', purchasePrice: '60.00' },
    { id: 13, userId: 1, gameId: 13, purchaseDate: '2025-05-10', purchasePrice: '75.00' },
    { id: 14, userId: 2, gameId: 14, purchaseDate: '2025-05-15', purchasePrice: '40.00' },
    { id: 15, userId: 3, gameId: 1, purchaseDate: '2025-05-20', purchasePrice: '25.99' },
    { id: 16, userId: 4, gameId: 2, purchaseDate: '2025-05-25', purchasePrice: '29.99' },
    { id: 17, userId: 5, gameId: 3, purchaseDate: '2025-06-01', purchasePrice: '40.99' },
    { id: 18, userId: 1, gameId: 4, purchaseDate: '2025-06-05', purchasePrice: '19.99' },
    { id: 19, userId: 2, gameId: 5, purchaseDate: '2025-06-10', purchasePrice: '31.99' },
    { id: 20, userId: 3, gameId: 6, purchaseDate: '2025-06-15', purchasePrice: '59.99' },
    { id: 21, userId: 4, gameId: 7, purchaseDate: '2025-06-20', purchasePrice: '45.00' },
    { id: 22, userId: 5, gameId: 8, purchaseDate: '2025-06-25', purchasePrice: '50.00' },
    { id: 23, userId: 1, gameId: 9, purchaseDate: '2025-07-01', purchasePrice: '70.00' },
    { id: 24, userId: 2, gameId: 10, purchaseDate: '2025-07-05', purchasePrice: '80.00' },
    { id: 25, userId: 3, gameId: 11, purchaseDate: '2025-07-10', purchasePrice: '35.00' },
],

  bookmarks: [
    { id: 1, userId: 1, gameId: 1, wantToOwn: false, wantToPlay: true },
    { id: 2, userId: 1, gameId: 2, wantToOwn: true, wantToPlay: false },
    { id: 3, userId: 2, gameId: 3, wantToOwn: true, wantToPlay: true },
    { id: 4, userId: 3, gameId: 5, wantToOwn: false, wantToPlay: true },
    { id: 5, userId: 1, gameId: 6, wantToOwn: true, wantToPlay: true },
    { id: 6, userId: 4, gameId: 9, wantToOwn: true, wantToPlay: false }
  ],

  friends: [
    { userId: 1, friends: [2, 3] },
    { userId: 2, friends: [1, 4] },
    { userId: 3, friends: [1] },
    { userId: 4, friends: [2, 5] }, 
    { userId: 5, friends: [4] },
  ],

  
};


export const fetchBoardGames = async (searchTerm = '', filter = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredGames = mockData.boardgames;

      const term = typeof searchTerm === 'string' ? searchTerm.trim() : '';

      if (term.trim()) {
        filteredGames = filteredGames.filter((game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      switch (filter) {
        case 'mostOwned':
          filteredGames = filteredGames.map((game) => {
            const ownershipCount = mockData.collection.filter(
              (item) => item.gameId === game.id
            ).length;
            return { ...game, ownershipCount };
          }).sort((a, b) => b.ownershipCount - a.ownershipCount);
          break;

        case 'mostTimePlayed':
          filteredGames = filteredGames.map((game) => {
            const totalTimePlayed = mockData.gameSessions
              .filter((session) => session.gameId === game.id)
              .reduce((sum, session) => sum + session.time, 0);
            return { ...game, totalTimePlayed };
          }).sort((a, b) => b.totalTimePlayed - a.totalTimePlayed);
          break;

        case 'byPrice':
          filteredGames = filteredGames.map((game) => {
            const price = mockData.collection.find(
              (item) => item.gameId === game.id
            )?.purchasePrice || 0;
            return { ...game, price: parseFloat(price) };
          }).sort((a, b) => b.price - a.price);
          break;

        case 'mostWanted':
          filteredGames = filteredGames.map((game) => {
            const wantsCount = mockData.bookmarks.filter(
              (bookmark) => bookmark.gameId === game.id
            ).length;
            return { ...game, wantsCount };
          }).sort((a, b) => b.wantsCount - a.wantsCount);
          break;

        default:
          break;
      }

      resolve(filteredGames);
    }, 500); // Simulated network delay
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

// Simulate fetching play history (all sessions)
export async function fetchPlayHistory() {
  const history = mockData.gameSessions.map(session => {
    const game = mockData.boardgames.find(game => game.id === session.gameId);
    const user = mockData.users.find(user => user.id === session.userId);

    return {
      id: session.id,
      userId: session.userId,
      username: user ? user.username : "Unknown",
      gameId: game ? game.id : null,
      name: game ? game.name : "Unknown",
      image: game ? game.image : null,
      date: session.date,
      numPlayers: session.numPlayers,
      score: session.score,
      result: session.result,
      time: session.time,
      comments: session.comments,
    };
  });
  return history;
}


export const fetchUserInfo = async (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockData.users.find(u => u.id === userId);
      if (user) {
        resolve({ id: user.id, username: user.username });
      } else {
        reject(new Error(`User with ID ${userId} not found`));
      }
    }, 300); // Simulated delay
  });
};

export const fetchFriends = async (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching friends for userId:", userId); // Debugging log
      const userFriends = mockData.friends.find(f => f.userId === userId);
      if (!userFriends) {
        console.error(`No friends found for userId: ${userId}`); // Debugging log
        reject(new Error(`No friends found for user with ID ${userId}`));
        return;
      }

      const friendsDetails = userFriends.friends.map(friendId => {
        const friend = mockData.users.find(u => u.id === friendId);
        return friend ? { id: friend.id, username: friend.username } : null;
      }).filter(Boolean);

      console.log("Friends details:", friendsDetails); // Debugging log
      resolve(friendsDetails);
    }, 300);
  });
};

export const fetchUserByName = async (username) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockData.users.find(u => u.username.toLowerCase() === username.toLowerCase());
      if (user) {
        resolve({ id: user.id, username: user.username });
      } else {
        reject(new Error(`User with username "${username}" not found`));
      }
    }, 300); // Simulated delay
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
export async function fetchCollection() {
  const collection = mockData.collection.map(session => {
    const game = mockData.boardgames.find(game => game.id === session.gameId);
    const user = mockData.users.find(user => user.id === session.userId);

    return {
      id: session.id,
      userId: session.userId,
      username: user ? user.username : "Unknown",
      gameId: game ? game.id : null,
      name: game ? game.name : "Unknown",
      image: game ? game.image : null,
      players: game.players,
      estimatedTime: game.estimatedTime,
      purchaseDate: session.purchaseDate,
      purchasePrice: session.purchasePrice,
    };
  });
  return collection;
}



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
            image: game ? game.image : null,
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
      const userSessions = mockData.gameSessions.filter(session => session.userId === Number(userId));
      console.log("Filtered sessions for userId:", userId, userSessions); // Debugging log

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
};

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
      const bookmarksWithGameInfo = mockData.bookmarks
        .filter(bookmark => bookmark.userId === userId)
        .map(bookmark => {
          const game = mockData.boardgames.find(game => game.id === bookmark.gameId);
          return {
            id: bookmark.id,
            userId: bookmark.userId,
            gameId: bookmark.gameId,
            wantToOwn: bookmark.wantToOwn,
            wantToPlay: bookmark.wantToPlay,
            name: game?.name || "Unknown",
            players: game?.players || "Unknown",
            estimatedTime: game?.estimatedTime || "N/A",
            image: game?.image || null
          };
        });
      resolve(bookmarksWithGameInfo);
    }, 300);
  });
};

export async function enrichWithBoardGameData(name, formValues) {
  const results = await fetchBoardGames(name);
  const game = results.length > 0 ? results[0] : null;

  const safeGet = (formValue, gameValue, fallback) => {
    if (formValue !== undefined && formValue !== '') return formValue;
    if (gameValue !== undefined && gameValue !== '') return gameValue;
    return fallback;
  };

  return {
    id: formValues.id || crypto.randomUUID(),
    gameId: game ? game.id : crypto.randomUUID(),
    name: safeGet(formValues.name, game?.name, "Unknown"),
    image: game?.image || null,
    players: safeGet(formValues.players, game?.players || "Unknown"),
    numPlayers: safeGet(formValues.numPlayers, game?.players, ""),
    estimatedTime: safeGet(formValues.estimatedTime, game?.estimatedTime, "N/A"),
    purchaseDate: safeGet(formValues.purchaseDate, null, new Date().toISOString().split('T')[0]),
    purchasePrice: safeGet(formValues.purchasePrice, null, 0),
    date: safeGet(formValues.date, null, new Date().toISOString().split('T')[0]),
    score: safeGet(formValues.score, null, 0),
    result: safeGet(formValues.result, null, ''),
    time: safeGet(formValues.time, null, 0),
    comments: safeGet(formValues.comments, null, ''),
  };
}

