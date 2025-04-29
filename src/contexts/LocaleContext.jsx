import React, { createContext, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n'; // Import the i18n instance

const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  const { i18n } = useTranslation(); // Get the i18n instance from react-i18next
  const [locale, setLocale] = useState(i18n.language); // Initialize with current language

  const changeLanguage = (newLocale) => {
    i18n.changeLanguage(newLocale).then(() => {
      setLocale(newLocale);
    });
  };

  // Function to toggle between 'en' and potentially another language (e.g., 'fr')
  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en'; // Example toggle
    // Ensure 'fr' resources exist in i18n.js before using
    if (i18n.hasResourceBundle(newLocale, 'translation')) {
         changeLanguage(newLocale);
    } else {
        console.warn(`Language resources for '${newLocale}' not found. Add them to i18n.js`);
        // Optionally switch back to 'en' or handle differently
        if (locale !== 'en') changeLanguage('en');
    }

  };

  return (
    <LocaleContext.Provider value={{ locale, changeLanguage, toggleLanguage }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext); 