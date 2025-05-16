import React from "react";
import { NavLink, useLocation } from 'react-router-dom';
import './styles/Navbar.css';

const NavBar = () => {
  const location = useLocation();
  const isFriendsActive = location.pathname === "/friends" || /^\/user\/\d+$/.test(location.pathname);

    return (
      <nav className="main-nav">
        <NavLink to="/" className="nav-link">Play History</NavLink>
        <NavLink to="/collection" className="nav-link">Collection</NavLink>
        <NavLink to="/stats" className="nav-link">Stats</NavLink>
        <NavLink to="/bookmarks" className="nav-link">Bookmarks</NavLink>
        <NavLink to="/friends" className={({ isActive }) => (isFriendsActive ? "nav-link active" : "nav-link")}>Friends</NavLink>
        <NavLink to="/browse" className="nav-link">Browse</NavLink>
      </nav>
    );
  };
  
export default NavBar;
