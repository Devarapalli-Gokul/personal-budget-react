import React from 'react';
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="menu">
        <nav role="navigation">
            <ul>
                <li><Link to="#maincontent" className="skip-to-content">Skip to content</Link></li>
                <li><Link to="/">Homepage</Link></li>
                <li><Link to="about" aria-label="Information about us">About</Link></li>
                <li><Link to="login">Login</Link></li>
            </ul>
        </nav>
    </div>
  );
}

export default Menu;