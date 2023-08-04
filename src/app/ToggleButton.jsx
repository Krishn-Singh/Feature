"use client";
import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if the user has previously set the theme preference
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(userPrefersDark);
  }, []);

  const handleToggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer ${
        isDarkMode ? 'bg-gray-800' : 'bg-yellow-300'
      }`}
      onClick={handleToggleTheme}
    >
      {isDarkMode ? (
        <FiSun size={24} className="text-yellow-500" />
      ) : (
        <FiMoon size={24} className="text-gray-800" />
      )}
    </div>
  );
};

export default ToggleButton;