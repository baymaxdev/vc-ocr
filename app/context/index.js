import React from 'react';

export const themes = {
  light: {
    mainColor: '#F4511E',
    headerTintColor: '#FFF',
    selectedColor: '#AA004488',
    editedColor: '#44AA0088',
    addedColor: '#0044AA88',
  },
  dark: {
    mainColor: '#F4511E',
    headerTintColor: '#FFF',
    selectedColor: '#AA004488',
    editedColor: '#44AA0088',
    addedColor: '#0044AA88',
  },
};

export const ThemeContext = React.createContext(themes.light);
