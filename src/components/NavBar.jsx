import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
        <div className="nav-container">
            <div
                className={`nav-icon ${open ? "open" : ""}`}
                onClick={() => setOpen(!open)}
            >
                ☰
            </div>
            <div className={`nav-menu ${open ? "show" : ""}`}>
                <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                <Link to="/students" onClick={() => setOpen(false)}>Students</Link>
                <Link to="/classes" onClick={() => setOpen(false)}>Classes</Link>
                <Link to="/teachers" onClick={() => setOpen(false)}>Teachers</Link>
                <Link to="/settings" onClick={() => setOpen(false)}>Settings</Link>
            </div>
        </div>
    );
};

export default NavBar;