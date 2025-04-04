// src/mockData.js
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