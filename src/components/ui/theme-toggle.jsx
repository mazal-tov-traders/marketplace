import React from 'react';

export const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="theme-toggle__container">
        <div className={`theme-toggle__icon ${theme === 'light' ? 'theme-toggle__icon--active' : ''}`}>
          <img src={"/images/sun-icon.svg"} alt="sun" className="theme-toggle__sun" />
        </div>
        <div className={`theme-toggle__icon ${theme === 'dark' ? 'theme-toggle__icon--active' : ''}`}>
          <img src={"/images/moon-icon.svg"} alt="moon" className="theme-toggle__moon" />
        </div>
      </div>
    </button>
  );
};
