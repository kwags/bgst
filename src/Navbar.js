import React from "react";
import { NavLink } from 'react-router-dom';
import './styles/Navbar.css';

const NavBar = () => {

    return (
      <nav className="main-nav">
        <NavLink to="/" className="nav-link">Play History</NavLink>
        <NavLink to="/collection" className="nav-link">Collection</NavLink>
        <NavLink to="/stats" className="nav-link">Stats</NavLink>
        <NavLink to="/bookmarks" className="nav-link">Bookmarks</NavLink>
      </nav>
    );
  };
  
export default NavBar;
