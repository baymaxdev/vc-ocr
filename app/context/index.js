import React from 'react';

export const themes = {
  light: {
    mainColor: '#F4511E',
    headerTintColor: '#FFF',
    editedColor: '#00FF0044',
  },
  dark: {
    mainColor: '#F4511E',
    editedColor: '#88FF88',
  },
};

export const ThemeContext = React.createContext(themes.light);
