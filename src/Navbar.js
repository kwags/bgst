import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaXmark } from "react-icons/fa6";
import './styles/Navbar.css';

const NavBar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isFriendsActive = location.pathname === "/friends" || /^\/user\/\d+$/.test(location.pathname);

  // Close the menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="main-nav">
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        aria-controls="nav-links"
      >
        {menuOpen ? <FaXmark /> : <FaBars />}
      </button>

      <div id="nav-links" className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" className="nav-link">Play History</NavLink>
        <NavLink to="/collection" className="nav-link">Collection</NavLink>
        <NavLink to="/stats" className="nav-link">Stats</NavLink>
        <NavLink to="/bookmarks" className="nav-link">Bookmarks</NavLink>
        <NavLink
          to="/friends"
          className={isFriendsActive ? "nav-link active" : "nav-link"}
        >
          Friends
        </NavLink>
        <NavLink to="/browse" className="nav-link">Browse</NavLink>
      </div>
    </nav>
  );
};
  
export default NavBar;
