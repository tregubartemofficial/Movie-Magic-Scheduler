import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header" role="banner">
      <nav
        className="navigation"
        role="navigation"
        aria-label="Main Navigation"
      >
        <Link to="/" className="link" aria-label="Go to Select movie page">
          Select movie
        </Link>
        <Link
          to="/movie-catalog"
          className="link"
          aria-label="Go to Movies page"
        >
          Movies
        </Link>
      </nav>
    </header>
  );
};

export default Header;
