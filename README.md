# Board Game Statistic Tracker

A React web application designed to help board game players organize their collections, track play history, and view statistics about their games.

The project was developed as a software engineering project and focuses on creating an organized, user-friendly interface for managing board game data.

## Features

* **Play History** — View and manage previously recorded game sessions
* **Game Collection** — Browse and manage games in a personal collection
* **Game Statistics** — View statistics and interactive charts for games
* **Bookmarks** — Save games for quick access
* **Friends** — View and manage friends and their game-related information
* **Game Search & Browse** — Search for and browse board games
* **Game Details** — View detailed information about individual games
* **Sorting** — Sort play history, collection, bookmarks, and friends lists

## My Contributions

I focused on the application's **front-end development, programming, and implementation of user-facing features** including play history, collection, sorting, and data visualization charts. I also contributed to the application's **styling, layout, and overall user experience**.

### Play History

* Developed the Play History interface using reusable React components
* Implemented the rendering and organization of recorded game sessions from application data
* Structured play history views to display relevant game, player, date, and session information
* Added client-side sorting functionality to allow users to organize and filter their recorded sessions
* Integrated play history components with the application's session management and state-handling logic
  
<img width="1000" alt="playhistory" src="https://github.com/user-attachments/assets/8aaa9863-c314-4c33-814d-2fef6a636e64" />

### Collection

* Developed the Collection interface using React components and reusable UI patterns
* Implemented the rendering of games stored in a user's collection
* Designed the collection layout to present game information in a clear and consistent format
* Added client-side sorting functionality for organizing games within the collection
* Integrated collection views with the application's collection management and data-handling logic

<img width="1000" alt="collection" src="https://github.com/user-attachments/assets/868a1f7b-6b7e-48f6-b015-0c1541c9e12d" />

### Sorting

Implemented reusable sorting functionality across multiple areas of the application to help users organize and navigate their data more efficiently.

* Added sorting controls for:
  * Play History
  * Collection
  * Bookmarks
  * Friends
* Integrated sorting with React component state to update displayed results dynamically
* Supported sorting based on the data available in each section, such as game information, play history, bookmarked games, and friend lists
* Designed the sorting controls to remain consistent with the application's overall UI and styling
* Ensured sorting worked alongside each section's existing data display and user interactions

### Statistics & Data Visualization

* Implemented interactive data visualizations for the statistics pages using **Recharts**
* Created charts to help users visually understand their game statistics
* Integrated chart components with the application's existing game data

### UI/UX & CSS

- Designed the overall UI/UX of the application
- Developed the visual layout and styling throughout the application
- Created and maintained the CSS, including:
  - Color palette
  - Typography
  - Spacing and layout
  - Buttons, slider windows, and interactive elements
  - Navigation and page styling
  - Desktop-focused interface design

## Technologies

* **React**
* **JavaScript**
* **React Router**
* **Recharts**
* **Font Awesome**
* **HTML5**
* **CSS3**
* **Create React App**

## Project Structure

```text
bgst/
├── public/
├── src/
│   ├── styles/
│   ├── AddBoardGameForm.js
│   ├── AddCollectionForm.js
│   ├── AddCollectionManager.js
│   ├── AddFriend.js
│   ├── App.js
│   ├── BoardGameDetails.js
│   ├── BoardgameSearch.js
│   ├── BookmarkButtons.js
│   ├── Bookmarks.js
│   ├── BrowseGames.js
│   ├── BrowsePage.js
│   ├── Collection.js
│   ├── FriendPage.js
│   ├── FriendsList.js
│   ├── GameSessionForm.js
│   ├── GameSessionManager.js
│   ├── GameStats.js
│   ├── Navbar.js
│   ├── PlayHistory.js
│   ├── SlidePanel.js
│   ├── Sorting.js
│   ├── StatsCharts.js
│   ├── UserStats.js
│   └── mockAPI.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/)
* npm

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/kwags/bgst.git
cd bgst
npm install
```

### Run the Development Server

```bash
npm start
```

The application will open in your browser at:

```text
http://localhost:3000
```

### Create a Production Build

```bash
npm run build
```

## Notes

The current version uses mock API data for development and demonstration purposes rather than a production backend or database.
