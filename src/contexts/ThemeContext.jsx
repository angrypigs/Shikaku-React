import { createContext, useState, useContext } from 'react';
import './ThemeContext.css';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'blue' ? 'dark' : 'blue'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div data-theme={theme} className="app-wrapper">
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
