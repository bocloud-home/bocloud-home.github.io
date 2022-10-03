import { NavLink as Link } from "react-router-dom";
import { useState } from "react";
import './NavBar.css';
import logo from '../assets/logo.png';
import React from 'react';

function NavBar() {
    const [inactive, setInactive] = useState(false);

    return (
    <>
      <nav className={inactive ? "inactive" : ""}>
        <div className="top-section">
          <div className="logo">
            <img src={logo} alt="bocloud"/>
          </div>
          <div className="toggle-menu">
            <i onClick={() => setInactive(!inactive)} className={`bi bi-backspace ${inactive ? "inactive" : ""}`}></i>
            <i onClick={() => setInactive(!inactive)} className={`bi bi-backspace-reverse ${inactive ? "" : "inactive"}`}></i>
          </div>
        </div>
        <div className="search-controller">
          <input type="text" placeholder="Search"/>
        </div>
        <div className="NavMenu">
          <Link className="page-title" to="/">
            <i className="bi bi-house"></i>
            <div className={inactive ? "inactive" : ""}>Home</div>
          </Link>
          <Link to="/recipes">
            <i className="bi bi-cup-straw"></i>
            <div className={inactive ? "inactive" : ""}>Recipes</div>
          </Link>
          <Link to="/storage">
            <i className="bi bi-basket"></i>
            <div className={inactive ? "inactive" : ""}>Storage</div>
          </Link>
          <Link to="/calendar">
            <i className="bi bi-calendar"></i>
            <div className={inactive ? "inactive" : ""}>Calendar</div>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;