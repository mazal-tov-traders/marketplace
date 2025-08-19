import React from 'react';

export const LanguageToggle = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="language-toggle">
      <button
        onClick={() => onLanguageChange('en')}
        className={`language-toggle__option ${currentLanguage === 'en' ? 'language-toggle__option--active' : ''}`}
      >
        EN
      </button>
      <div className="language-toggle__separator"></div>
      <button
        onClick={() => onLanguageChange('ua')}
        className={`language-toggle__option ${currentLanguage === 'ua' ? 'language-toggle__option--active' : ''}`}
      >
        UA
      </button>
    </div>
  );
};
