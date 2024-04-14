import { createContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark')

  useEffect(() => {
    const appElement = document.querySelector('.app');
    if (theme === 'dark') {
      appElement.classList.add('dark');
      appElement.classList.remove('light');
    } else {
      appElement.classList.add('light');
      appElement.classList.remove('dark');
    }
  }, [theme]);

  return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};