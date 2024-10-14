import React from 'react';

const Header = ({ menuOpen, setMenuOpen, searchVisible, setSearchVisible, searchTerm, setSearchTerm }) => {
  return (
    <header className={`header ${menuOpen ? "menu-open" : ""}`}>
      <div
        className={`menu-button ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </div>
      <div className="logo">
        <h1>
          duacode<span>.</span>
        </h1>
      </div>
      <div className="search-toggle">
        <button onClick={() => setSearchVisible(!searchVisible)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>
      {searchVisible && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar empleado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
