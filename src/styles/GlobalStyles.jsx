import React from 'react';
import { Global, css } from '@emotion/react';
import { useTheme } from '../contexts/ThemeContext'; // Adjust path if needed

const GlobalStyles = () => {
  // We need the theme object from EmotionThemeProvider, not just the name from our context
  // So we use a dummy div to get the theme object provided by EmotionThemeProvider
  const theme = useThemeInternal();

  if (!theme) {
    // Theme might not be available on initial render or if provider is missing
    return null;
  }

  return (
    <Global
      styles={css`
        body {
          background: ${theme.body};
          color: ${theme.text};
          font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
          transition: all 0.25s linear;
          margin: 0; /* Reset default body margin */
          padding: 0;
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: inherit;
        }

        /* Add other global styles here */
        a {
          color: ${theme.primary};
          text-decoration: none;
        }
      `}
    />
  );
};

// Helper component to access the theme object from Emotion's context
const useThemeInternal = () => {
  const [theme, setTheme] = React.useState(null);

  return (
    <div
      css={theme => {
        setTheme(theme);
        return { display: 'none' }; // Make it invisible
      }}
    >
      {theme}
    </div>
  );
  // THIS IS A HACK: Emotion's `useTheme` hook can only be used within components
  // rendered inside the `<ThemeProvider>`. Since `GlobalStyles` might be rendered
  // alongside or slightly outside the main tree depending on setup,
  // directly using Emotion's `useTheme` here can be unreliable.
  // This helper component ensures it gets the theme from the correct context.
  // A cleaner approach might involve restructuring or passing theme directly.
};


export default GlobalStyles; 