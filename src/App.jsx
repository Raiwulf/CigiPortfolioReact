import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from './contexts/ThemeContext';
import { useLocale } from './contexts/LocaleContext';
import styled from '@emotion/styled';
import GlobalStyles from './styles/GlobalStyles';

const Container = styled.div`
  text-align: center;
  padding: 2rem;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.25s linear;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  padding: 0.6em 1.2em;
  border-radius: 8px;
  cursor: pointer;
  margin: 0.5rem;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;

  &:hover {
    opacity: 0.9;
  }
`;

function App() {
  const { t } = useTranslation();
  const { toggleTheme } = useTheme();
  const { toggleLanguage } = useLocale();

  return (
    <>
      <GlobalStyles />
      <Container>
        <h1>{t('welcome')}</h1>
        <Button onClick={toggleTheme}>{t('toggle_theme')}</Button>
        <Button onClick={toggleLanguage}>{t('toggle_language')}</Button>
      </Container>
    </>
  );
}

export default App;
