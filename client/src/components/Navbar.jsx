import React from 'react';

/**
 * Navbar component for the Code Review app.
 * Includes app branding and a language selection dropdown.
 * 
 * @param {Object} props
 * @param {string} props.language - Currently selected language
 * @param {function} props.setLanguage - Function to update language state
 */
const Navbar = ({ language, setLanguage }) => {
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'go', label: 'Go' },
  ];

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 border-b border-gray-800 shadow-lg">
      <div className="flex items-center gap-2">
        <span className="text-2xl" role="img" aria-label="search">🔍</span>
        <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent tracking-tight">
          Debugify
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <label htmlFor="language-select" className="text-sm font-medium text-gray-400">
          Target Language:
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-800 text-gray-200 text-sm font-semibold rounded-lg block p-2.5 border border-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer hover:bg-gray-750"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
