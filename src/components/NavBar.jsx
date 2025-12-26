import React, { useState } from "react";
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
                <a href="#">Home</a>
                <a href="#">Dashboard</a>
                <a href="#">Students</a>
                <a href="#">Classes</a>
                <a href="#">Teachers</a>
                <a href="#">Settings</a>
            </div>
        </div>
    );
};

export default NavBar;